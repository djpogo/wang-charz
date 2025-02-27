<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>
    <div class="elevation-4 mb-4 p-0">
      <ul class="v-breadcrumbs theme--light">
        <li class="v-breadcrumbs__item">
          <nuxt-link to="/" class="v-breadcrumbs__item"><img src="/favicon-16x16.png" /></nuxt-link>
        </li>
        <li class="v-breadcrumbs__divider">/</li>
        <li class="v-breadcrumbs__item">
          <nuxt-link to="/library" class="v-breadcrumbs__item">Library</nuxt-link>
        </li>
        <li class="v-breadcrumbs__divider">/</li>
        <li class="v-breadcrumbs__item">
          <nuxt-link to="/library/wargear" class="v-breadcrumbs__item--disabled v-breadcrumbs__item">Wargear</nuxt-link>
        </li>
      </ul>
    </div>

  <v-layout justify-center row wrap>

    <v-flex xs12>

      <v-card>

        <v-card-text>

          <v-layout justify-center row wrap>

            <v-flex xs12 >

              <v-text-field
                v-model="searchQuery"
                box
                dense
                clearable
                label="Search"></v-text-field>
            </v-flex>

            <v-flex xs12>

              <v-chip
                v-for="filter in typeFilters"
                v-bind:key="filter.key"
                v-bind:color="selectedTypeFilters.includes(filter.name) ? 'primary' : ''"
                v-on:click="toggleTypeFilter(filter.name)"
                small
                label
              >
                {{filter.name}}
              </v-chip>
            </v-flex>

          </v-layout>

        </v-card-text>

      </v-card>

    </v-flex>

    <v-flex xs12>
      <v-card>
        <v-data-table
          v-bind:headers="headers"
          v-bind:items="searchResult"
          v-bind:pagination.sync="pagination"
          v-bind:expand="expand"
          v-bind:search="searchQuery"
          item-key="title"
          disable-initial-sort
        >
          <template v-slot:items="props">
            <tr>
              <td>{{ props.item.name }}</td>
              <td>{{ toTypeString(props.item) }}</td>
              <td>{{ props.item.value }} {{ props.item.rarity }}</td>
              <td>{{ props.item.keywords.join(', ') }}</td>
            </tr>
          </template>

        </v-data-table>

        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" />
        </div>
      </v-card>
    </v-flex>

    <v-flex xs12>

      <v-card>
        <v-card-text>
          <h1>Search the Library for available wargear</h1>
          <p>
            This is a reference table for the wargear used in the Wrath and Glory Role Playing Game.
           </p>
        </v-card-text>
      </v-card>

    </v-flex>
  </v-layout>
  </div>


</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: 'Wargear - Wrath & Glory Reference | Library',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
      ],
    };
  },
  layout: 'library',
  async asyncData({ app }) {
    const response = await app.$axios.get(`/api/wargear/`);
    return {
      wargearRepository: response.data,
    };
  },
  data() {
    return {
      searchQuery: '',
      selectedTypeFilters: [],
      pagination: {
        sortBy: 'title',
        rowsPerPage: 25,
      },
      headers: [
        { text: 'Name', align: 'left', value: 'name', class: '' },
        { text: 'Type', align: 'left', value: 'type', class: '' },
        { text: 'Value', align: 'left', value: 'value', class: '' },
        { text: 'Keywords', align: 'left', value: 'keywords', class: '' },
      ],
      expand: false,
    };
  },
  computed: {
    searchResult() {
      if ( this.wargearRepository === undefined ) {
        return [];
      }
      let searchResult = this.wargearRepository;

      console.log(this.selectedTypeFilters);
      if (this.selectedTypeFilters.length > 0) {
        searchResult = searchResult.filter( item => this.selectedTypeFilters.includes(item.type));
      }

      return searchResult;
    },
    typeFilters() {
      const reduceToType = this.wargearRepository.map( item => item.type );
      const distinctTypes = [ ...new Set(reduceToType) ];
      const types = distinctTypes.map( t => { return { name: t } });
      return types;
    },
    breadcrumbItems() {
      return [
        {
          text: 'D', disabled: false, nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Vault', disabled: false, nuxt: true, exact: true, to: '/vault',
        },
      ];
    },
    pages() {
      if (this.pagination.rowsPerPage == null
        || this.pagination.totalItems == null
      ) return 0;

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    },
  },
  methods: {
    toTypeString(item) {
      let types = [ item.type ];
      if ( item.subtype ) {
        types.push(item.subtype)
      }
      return types.join(' • ');
    },
    toggleTypeFilter(name) {
      if (this.selectedTypeFilters.includes(name)) {
        this.selectedTypeFilters = this.selectedTypeFilters.filter(d => d != name);
      } else {
        this.selectedTypeFilters.push(name);
      }
    },
  },
};
</script>

<style scoped lang="css">
</style>
                                                                                                                                                                                                                                                                                                                                                                                           
