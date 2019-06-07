<template>
  <div class="wrapper" id="details">
    <div class="row flex-wrap">
      <!-- back button -->
      <app-button :event="goBack" class="button--primary">
        <template>
          <app-icon iconName="icon-arrow-left"></app-icon>
          <span>Back</span>
        </template>
      </app-button>
    </div>
    <div class="row flex-wrap">
      <!-- Details content -->
      <div
        class="wrapper flex-row"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div class="content">
          <div class="content__img">
            <skeleton-text v-if="isLoading" animated></skeleton-text>
            <img :src="details.flag" :alt="`Country flag of ${details.name}`" />
          </div>
        </div>
        <div class="content">
          <h2 class="content__title">
            <skeleton-text
              width="75%"
              animated
              v-if="isLoading"
            ></skeleton-text>
            <span v-else>{{ details.name }}</span>
          </h2>
          <div class="content__body flex-row">
            <div class="list">
              <skeleton-text v-if="isLoading" animated></skeleton-text>
              <ul v-else>
                <li>
                  <span class="semibold">Native Name:</span>
                  {{ details.nativeName }}
                </li>
                <li>
                  <span class="semibold">Population:</span>
                  {{ details.population.toLocaleString() }}
                </li>
                <li>
                  <span class="semibold">Region:</span>
                  {{ details.region }}
                </li>
                <li>
                  <span class="semibold">Sub Region:</span>
                  {{ details.subregion }}
                </li>
                <li>
                  <span class="semibold">Capital:</span>
                  {{ details.capital }}
                </li>
              </ul>
            </div>
            <div class="list">
              <skeleton-text v-if="isLoading" animated></skeleton-text>
              <ul v-else>
                <li>
                  <span class="semibold">Top Level Domain:</span>
                  {{ details.topLevelDomain[0] }}
                </li>
                <li>
                  <span class="semibold">Currencies:</span>
                  {{ details.currencies.map(curr => curr.name).join(`, `) }}
                </li>
                <li>
                  <span class="semibold">Languages:</span>
                  {{ details.languages.map(lang => lang.name).join(`, `) }}
                </li>
              </ul>
            </div>
            <div class="list">
              <skeleton-text v-if="isLoading" animated></skeleton-text>
              <ul class="list__inline" v-else>
                <li>
                  <span class="semibold">Borders:</span>
                </li>
                <template v-if="details.borders.length > 0">
                  <li
                    v-for="(name, index) in details.borders"
                    :key="`ui${index}`"
                  >
                    <app-button
                      type="router-link"
                      style="width: auto"
                      class="button--primary"
                      :to="{
                        name: 'detail',
                        params: {
                          id: getLinks[name].alpha3Code.toLowerCase()
                        },
                        hash: '#details'
                      }"
                    >
                      <template>
                        <span>{{ getLinks[name].name }}</span>
                      </template>
                    </app-button>
                  </li>
                </template>
                <li v-else>None</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButtonVue from '../components/AppButton.vue'
import AppIconVue from '../components/AppIcon.vue'
import AppSkeletonTextVue from '../components/AppSkeletonText.vue'
import RestCountries from '../services/RestCountries'

export default {
  name: 'detail',
  props: {
    id: {
      type: String,
      default: undefined
    }
  },
  components: {
    'app-button': AppButtonVue,
    'app-icon': AppIconVue,
    'skeleton-text': AppSkeletonTextVue
  },
  filters: {
    toStrings: function(value) {
      if (value.length > 0) {
        return value
      }
      return value[0]
    }
  },
  data() {
    return {
      country: {},
      loading: true,
      links: []
    }
  },
  methods: {
    addMetaTitle(title) {
      window.document.title = title
    },
    fetchCountryData() {
      if (this.$store.state.data.length > 0) {
        // User coming from Home
        // lets find the country in the data and assign it to the page
        this.country = this.$store.state.data.find(
          country => country.alpha3Code === this.id.toUpperCase()
        )
        this.loading = false
      } else {
        // User coming from URL
        RestCountries.getCountryByAlphaCode(this.id.toLowerCase())
          .then(res => (this.country = res))
          .then(() => {
            RestCountries.getAllLinks(this.country.borders).then(res =>
              this.$store.dispatch('setCountryLinks', res)
            )
          })
          .catch(error => {
            this.$store.dispatch('networkStatus', true)
            console.log(error)
          })
          .finally(() => (this.loading = false))
      }
      this.addMetaTitle(`About ${this.country.name}`)
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    this.fetchCountryData()
  },
  computed: {
    isLoading() {
      return this.loading
    },
    details() {
      return this.country
    },
    getLinks() {
      return this.$store.state.countriesLinks
    }
  }
}
</script>

<style scoped>
.content {
  width: 100%;
}

#details {
  width: 93.5%;
}

@media screen and (min-width: 900px) {
  .content {
    width: 48%;
  }
}

.content__title {
  font-size: 32px;
  margin: 2rem 0;
}

.content__img {
  height: 230px;
  width: 100%;
  max-width: 320px;
  overflow: hidden;
}

@media screen and (min-width: 1200px) {
  .content__img {
    height: 400px;
    max-width: 560px;
  }
  #details {
    width: 100%;
  }
}

.content__img img {
  object-fit: cover;
}

.list {
  margin: 0 0 2rem;
  min-width: 264px;
  font-size: 1em;
}

.list__inline li {
  margin: 0 1rem 0 0;
  display: inline-block;
}
</style>
