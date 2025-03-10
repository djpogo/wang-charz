<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>
    <div class="elevation-4 mb-4 p-0">
      <ul class="v-breadcrumbs theme--light">
        <li class="v-breadcrumbs__item">
          <nuxt-link to="/" class="v-breadcrumbs__item"><img src="/favicon-16x16.png" /></nuxt-link>
        </li>
        <li class="v-breadcrumbs__divider">/</li>
        <li class="v-breadcrumbs__item">
          <nuxt-link to="/vault" class="v-breadcrumbs__item">Vault</nuxt-link>
        </li>
        <li class="v-breadcrumbs__divider">/</li>
        <li class="v-breadcrumbs__item">
          <nuxt-link :to="$route.path" class="v-breadcrumbs__item--disabled v-breadcrumbs__item">{{ item.title }}</nuxt-link>
        </li>
      </ul>
    </div>

  <v-layout justify-center row wrap>

    <v-flex xs12 md8>

      <div class="mb-4">
        <h1 class="headline">{{ item.title }}</h1>
        <span class="grey--text">{{ item.subtitle }}</span>
      </div>

      <v-layout row wrap>

        <v-flex xs12 sm6>

          <h2 class="body-2">Author</h2>
          <p>
            {{ item.author }}
          </p>

          <div>
            <h2 class="body-2">Version Info</h2>
            <p>
              {{ item.status }} {{ item.version }}
            </p>
          </div>

          <h2 class="body-2">Abstract</h2>
          <p>
            {{ item.abstract }}
          </p>

        </v-flex>

        <v-flex xs12 sm3 v-if="item.thumbnail">
          <v-img v-bind:src="item.thumbnail" />
        </v-flex>

        <v-flex xs12 sm3>
            <span class="body-2">Topics / Content:</span>
          <ul>
            <li v-for="parts in item.topics" v-bind:key="parts">
              {{ parts }}
            </li>
          </ul>

        </v-flex>

        <v-flex xs12 sm3 v-if="item.links && item.links.length > 0">

          <span class="body-2">Support or follow the author:</span>

          <ul class="mb-4" v-if="item.links && item.links.length > 0">
            <li v-for="link in item.links" :key="link.title">
              <a class="mr-2" :href="link.url" target="_blank">{{ link.name }}</a>
            </li>
          </ul>

        </v-flex>

      </v-layout>

      <div>
        <p v-if="item.keywords">
          <span class="body-2">Keywords / Tags:</span><br/>
          <v-chip v-for="keyword in item.keywords" :key="keyword">
            {{ keyword }}
          </v-chip>
        </p>
      </div>

      <div>
        <v-btn color="primary" :href="item.url" target="_blank" @click="trackEvent(item.url)">
          View the document
          <v-icon right dark>launch</v-icon>
        </v-btn>
      </div>

    </v-flex>

  </v-layout>
  </div>
</template>

<script>
  import SchemaDigitalDocument from '~/assets/SchemaDigitalDocument.json';

  export default {
  components: {},
  head() {
    const itemSchema = {
      ...SchemaDigitalDocument,
      name: this.item.title,
      alternativeHeadline: this.item.subtitle,
      author: this.item.author,
      version: this.item.version || this.item.status,
      url: this.item.url,
      thumbnailUrl: this.item.thumbnail ? `https://www.doctors-of-doom.com${this.item.thumbnail}` : null,
      description: this.item.abstract,
      keywords: [...this.item.keywords, 'Wrath & Glory'].join(','),
    };

    return {
      title: `${this.item.title} by ${this.item.author} | Vault`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.item.abstract}`,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: [
            ...this.item.keywords,
            'Homebrew',
            'Supplement',
            'Wrath & Glory',
          ].join(',') ,
        },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(itemSchema), type: 'application/ld+json' }
      ]
    };
  },
  layout: 'vault',
  validate({}) {
    return true;
  },
  async asyncData({ params, $axios, error }) {
    const slug = params.slug;
    const vaultItemResponse = await $axios.get(`/api/homebrews/${slug}`);
    const vaultItem = vaultItemResponse.data;

    if ( vaultItem === undefined || vaultItem.length <= 0 ) {
      error({ statusCode: 404, message: 'Post not found' });
    }

    return {
        item: vaultItem,
        breadcrumbItems: [
          {
            text: 'D', disabled: false, nuxt: true, exact: true, to: '/',
          },
          {
            text: 'Vault', disabled: false, nuxt: true, exact: true, to: '/vault',
          },
          { text: vaultItem.title, disabled: true },
        ],
    };
  },
  data() {
    return {};
  },
  methods: {
    trackEvent(url) {
      this.$ga.event('Outbound Link', 'click', url, 0);
    },
  },
};
</script>
 
