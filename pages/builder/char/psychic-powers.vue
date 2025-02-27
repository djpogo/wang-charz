<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-layout justify-center row wrap>

    <v-flex>
      <h1 class="headline">Manage Powers</h1>

      <v-alert
        :value="true"
        v-for="alert in alerts"
        :key="alert.key"
        :type="alert.type"
      >{{alert.text}}</v-alert>
    </v-flex>

    <v-flex xs12>

      <v-card>
        <v-card-text>
          <v-chip
            v-for="item in characterPowers"
            v-bind:key="item.name"
            v-bind:close="item.cost !== 0"
            @input="removePower(item.name)"
          >
            {{item.name}}
          </v-chip>
        </v-card-text>
      </v-card>

    </v-flex>

    <v-flex xs12>

      <v-chip
        v-for="discipline in disciplines"
        :key="discipline.key"
        @click="toggleDisciplineFilter(discipline.name)"
        :color="selectedDisciplines.includes(discipline.name) ? 'green' : ''"
        small
        label
      >
        {{discipline.name}}
      </v-chip>
    </v-flex>

    <v-flex xs12>

      <v-card>

        <v-card-title>
          <v-text-field
            v-model="searchQuery"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :items="filteredPowers"
          :search="searchQuery"
          :headers="headers"
          hide-actions
        >
          <template v-slot:no-data>
          </template>
          <template v-slot:items="props">
            <td class="caption">{{props.item.name}}</td>
            <td class="caption">{{props.item.discipline}}</td>
            <td class="caption hidden-sm-and-down">{{props.item.effect}}</td>
            <td class="caption text-xs-center" >{{props.item.cost}}</td>
            <td>
              <v-btn
                icon
                @click="addPower(props.item)"
                :disabled="characterPowers.includes(props.item.name)"
              >
                <v-icon
                  :color="affordableColor(props.item.cost)"
                >add_circle</v-icon>
              </v-btn>
            </td>
          </template>
          <template v-slot:no-results>
            <div class="text-lg-center">Your search for "{{ searchQuery }}" found no results.</div>
          </template>
        </v-data-table>

      </v-card>

    </v-flex>

  </v-layout>

</template>

<script lang="js">
export default {
  name: 'psychic-powers',
  layout: 'builder',
  props: [],
  async asyncData({ params, $axios, error }) {
    const response = await $axios.get(`/api/psychic-powers/`);
    return {
      psychicPowersRepository: response.data,
    };
  },
  data() {
    return {
      searchQuery: '',
      headers: [
        {
          text: 'Name',
          value: 'name',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Discipline',
          value: 'discipline',
          sortable: true,
        },
        {
          text: 'Effect',
          value: 'effect',
          sortable: false,
          class: 'hidden-sm-and-down',
        },
        {
          text: 'Cost',
          value: 'cost',
          align: 'center',
          sortable: true,
        },
        {
          text: 'Learn',
          align: 'center',
          sortable: false,
        },
      ],
      disciplines: [
        { name: 'Minor' },
        { name: 'Universal' },
        { name: 'Biomancy' },
        { name: 'Divination' },
        { name: 'Pyromancy' },
        { name: 'Telekinesis' },
        { name: 'Telepathy' },
        { name: 'Maleficarum' },
        { name: 'Runes of Battle' },
      ],
      selectedDisciplines: [],
      access: [
        {
          source: 'Eldar',
          disciplines: [],
          permission: [
            { type: 'Discipline', value: 'Minor' },
          ],
        },
        {
          source: 'Sanctioned Psyker',
          disciplines: ['Minor', 'Universal'],
          free: [
            { type: 'Power', value: 'Smite' },
            { type: 'Discipline', value: 'Minor' },
          ],
        },
        {
          source: 'Rogue Psyker',
          disciplines: ['Minor', 'Universal', 'Maleficarum'],
          free: [
            { type: 'Power', value: 'Smite' },
            { type: 'Discipline', value: 'Minor' },
          ],
        },
        {
          source: 'Warlock',
          disciplines: ['Minor', 'Universal', 'Runes of Battle'],
          free: [
            { type: 'Power', value: 'Psyniscience' },
            { type: 'Power', value: 'Smite' },
          ],
        },
        {
          source: 'Psychic Revelations',
          disciplines: ['Minor', 'Universal', '*'],
          free: [
            { type: 'Power', value: 'Smite' },
            { type: 'Discipline', value: 'Minor' },
          ],
        },
      ],
    };
  },
  computed: {
    allThe() {
      this.psychicPowersRepository.forEach( w => {
        //console.log(`INSERT INTO wrath_glory.psychic_powers (name, cost, keywords, effect) VALUES ('${w.name}', ${w.cost}, '{${w.keywords.join(',')}}', '${w.effect}' );`);
        //console.log(`UPDATE wrath_glory.psychic_powers SET discipline = '${w.discipline}' WHERE name = '${w.name}';`);
      });
    },
    alerts() {
      const alerts = [];

      if (!this.isPsychic) {
        const alert = {
          type: 'warning',
          text: 'You need to either possess the Psychic Keyword or have at least learned one rank in the Psychic Mastery skill',
        };
        alerts.push(alert);
      }
      return alerts;
    },
    isPsychic() {
      const hasSkill = this.$store.state.skills.psychicMastery > 0;
      const hasKeyword = this.$store.state.keywords.includes('Psychic');
      return (hasSkill || hasKeyword);
    },
    settingTier() { return this.$store.state.settingTier; },
    maximumMinorPowers() { return this.settingTier; },
    maximumDisciplinePowers() { return Math.max(1, this.settingTier - 1); },
    maximumPsychicPowers() { return this.settingTier + 3; },
    characterPowers() { return this.$store.state.psychicPowers; },
    filteredPowers() {
      if (this.psychicPowersRepository === undefined) {
        return [];
      }

      let filteredPowers = this.psychicPowersRepository;

      console.log(this.selectedDisciplines);
      if (this.selectedDisciplines.length > 0) {
        filteredPowers = filteredPowers.filter(p => this.selectedDisciplines.includes(p.discipline));
      }

      // filteredTalents = filteredTalents.filter( t => !this.characterTalents.includes(t.name) );

      return filteredPowers;
    },
    remainingBuildPoints() { return this.$store.getters.remainingBuildPoints; },
  },
  methods: {
    affordableColor(cost) {
      return (cost <= this.remainingBuildPoints) ? 'green' : 'grey';
    },
    addPower(power) {
      this.$store.commit('addPower', { name: power.name, cost: power.cost });
    },
    removePower(power) {
      this.$store.commit('removePower', { name: power });
    },
    toggleDisciplineFilter(name) {
      if (this.selectedDisciplines.includes(name)) {
        this.selectedDisciplines = this.selectedDisciplines.filter(d => d != name);
      } else {
        this.selectedDisciplines.push(name);
      }
    },
  },
};
</script>

<style scoped lang="css">
</style>
