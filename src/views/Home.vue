<template>
  <app-error reload v-if="$store.state.networkError">
    <template #title
      >Oops!</template
    >
    <template #message>
      <p>
        Seems like your network connection is offline. Please try again later!
      </p>
    </template>
  </app-error>
  <div class="wrapper" v-else>
    <div class="row flex-wrap">
      <app-search-box />
      <app-select-dropdown />
    </div>
    <app-cards></app-cards>
  </div>
</template>

<script>
import AppCardsVue from '../components/AppCards.vue'
import AppErrorVue from '../components/AppError.vue'
import AppSelectBoxVue from '../components/AppSelectBox.vue'
import AppSearchBoxVue from '../components/AppSearchBox.vue'

export default {
  name: 'home',
  data() {
    return {
      loading: true
    }
  },
  components: {
    'app-cards': AppCardsVue,
    'app-error': AppErrorVue,
    'app-select-dropdown': AppSelectBoxVue,
    'app-search-box': AppSearchBoxVue
  },
  beforeRouteEnter(to, from, next) {
    window.document.title = to.meta.title
    next()
  }
}
</script>
