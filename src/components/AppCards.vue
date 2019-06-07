<template>
  <div class="row" id="results" ref="pageResults">
    <div class="row flex-center flex-wrap--start" key="s0">
      <skeleton-text animated v-if="isLoading" width="40%" height="40%"></skeleton-text>
      <p class="results" tabindex="-1" role="status" aria-live="polite" aria-atomic="true" v-else>
        <span v-if="getData.length > 0">
          Showing {{ getData.length }} &ndash;
          {{ $store.state.regionTotals[$store.state.selection] }} countries of
          {{ $store.state.selection }}.
        </span>
      </p>
    </div>
    <div class="row flex-center" v-if="!getData.length > 0 && !isLoading">
      <h2 class="semibold">
        😔 Sorry your search &ndash;
        <strong>{{ $store.state.searchQuery }}</strong>
        &ndash; did not match any country in
        {{
        $store.state.selection == 'All'
        ? 'the world'
        : $store.state.selection
        }}.
      </h2>
    </div>
    <transition-group
      class="cards cards--grid wrapper"
      ref="cardsList"
      name="list-complete"
      tag="ul"
    >
      <li class="card theme-light" v-for="(card, index) in getData" :key="`uid${index}`">
        <router-link
          class="card__link theme-light"
          tabindex="0"
          :to="{
            name: 'detail',
            params: {
              id: validateId(card.alpha3Code)
            },
            hash: '#details'
          }"
          tag="a"
          :id="validateId(card.alpha3Code)"
        >
          <div class="card__img">
            <skeleton-text animated v-if="isLoading"></skeleton-text>
            <figure class="card__img__wrapper" v-else>
              <img :src="card.flag" :alt="`country flag of ${card.name}`" loading="lazy">
            </figure>
          </div>
          <div class="card__body">
            <skeleton-text width="50%" animated v-if="isLoading"></skeleton-text>
            <div class="card__body__title" v-else>{{ card.name }}</div>
            <br>
            <div class="card__body__details">
              <skeleton-text animated v-if="isLoading" height="10vh"></skeleton-text>
              <p v-else>
                <span class="semibold">Population:</span>
                {{ card.population.toLocaleString() }}
                <br>
                <span class="semibold">Region:</span>
                {{ card.region }}
                <br>
                <span class="semibold">Capital:</span>
                {{ card.capital }}
              </p>
            </div>
          </div>
        </router-link>
      </li>
    </transition-group>
    <div class="row flex-center" key="s1">
      <app-observer @intersect="intersected" v-show="hasItemsToShow()"></app-observer>
      <div class="back-to-top" v-show="!hasItemsToShow()">
        <a href="#" class="semibold button button--basic theme-light">Back to top</a>
      </div>
    </div>
  </div>
</template>

<script>
import AppSkeletonTextVue from './AppSkeletonText.vue'
import AppObserverVue from './AppObserver.vue'
export default {
  name: 'cards',
  components: {
    'skeleton-text': AppSkeletonTextVue,
    'app-observer': AppObserverVue
  },
  data() {
    return {
      data: 8,
      count: 16,
      limit: 16,
      currentDataLength: 0,
      loading: true
    }
  },
  async created() {
    this.$store.dispatch('setAllData')
    await setTimeout(() => {
      this.$store.dispatch('setData', this.$store.state.data)
      this.$store.dispatch('setCountryLinks', this.$store.state.data)
      this.loading = false
    }, 1000)
  },
  methods: {
    async intersected() {
      // handle observer
      if (this.hasItemsToShow()) await this.loadMoreItemsToPage()
    },
    loadMoreItemsToPage() {
      setTimeout(() => {
        this.count += this.limit
      }, 1000)
    },
    hasItemsToShow() {
      if (
        this.count >= this.$store.state.data.length ||
        this.currentDataLength < this.count
      )
        return false
      else return true
    },
    validateId(value) {
      if (value) {
        return value.toLowerCase()
      } else return 'abc'
    }
  },
  watch: {
    getData(newData) {
      this.currentDataLength = newData.length
    }
  },
  computed: {
    getData() {
      if (!this.$store.state.data.length > 0) return this.data
      return this.$store.state.data
        .filter(item => {
          if (this.$store.state.selection.toLowerCase().includes('all'))
            return item
          else if (item.region)
            return item.region
              .toLowerCase()
              .includes(this.$store.state.selection.toLowerCase())
        })
        .filter(item => {
          if (this.$store.state.searchQuery.length > 0)
            return item.name
              .toLowerCase()
              .includes(this.$store.state.searchQuery.toLowerCase())
          return item
        })
        .slice(0, this.count)
    },
    isLoading() {
      return this.loading
    }
  }
}
</script>

<style scoped>
.cards {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: stretch;
  align-items: flex-start;
}

.card {
  order: 0;
  flex: 0 1 auto;
  align-self: auto;
  width: 265px;
  max-width: 265px;
  margin: 0 auto 3rem;
  border-radius: 6px;
  box-shadow: 0 0 0.875em rgba(0, 0, 0, 0.16);
  transition: opacity 0.25s;
}

.cards--grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: minmax(265px, auto);
  grid-gap: 60px;
}

.card,
.card__img {
  overflow: hidden;
}
.card__link {
  width: 100%;
}
.card__img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 160px;
}
.card__img__wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.card__img__wrapper img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card__body {
  padding: 2rem 1.5rem;
}

.card__body__title {
  margin: 0 0 1rem;
  font-size: 18px;
  font-weight: 800;
}

.card__body__details {
  font-size: 0.875rem;
}

@media screen and (max-width: 500px) {
  .card {
    margin: 0 auto 3rem;
  }
}

@media screen and (min-width: 700px) {
  .cards {
    width: 90%;
  }

  .cards--grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 1000px) {
  .cards {
    width: 90%;
  }

  .cards--grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: 1280px) {
  .cards {
    width: 100%;
  }
  .cards--grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
}

.results {
  font-size: 0.875rem;
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-complete-leave-active {
  /* position: absolute; */
  /* opacity: 1; */
  transform: translateX(0px);
}
</style>
