<template>
  <app-input class="flex-wrap flex-wrap--start">
    <template>
      <app-button
        tabindex="-1"
        aria-disabled="true"
        aria-hidden="true"
        style="min-width:10%"
        :event="handleSearchInput"
      >
        <template>
          <app-icon iconName="icon-search" class="pad"></app-icon>
        </template>
      </app-button>
      <label
        id="label1"
        for="search"
        ref="placeholder"
        class="app-input__placeholder theme-light"
        v-show="!hasQuery()"
        >Search for a country name...</label
      >
      <input
        aria-labelledby="label1"
        type="text"
        ref="search"
        id="search"
        name="search"
        maxlength="100"
        v-model.trim="query"
        @keydown="handleSearchInput"
      />
      <app-button
        ref="clearButton"
        tabindex="-1"
        aria-disabled="true"
        aria-hidden="true"
        style="min-width:10%"
        :event="handleClearInput"
        v-show="hasQuery()"
      >
        <template>
          <app-icon iconName="icon-delete" class="pad"></app-icon>
        </template>
      </app-button>
    </template>
  </app-input>
</template>

<script>
import AppInputVue from './AppInput.vue'
import AppButtonVue from './AppButton.vue'
import AppIconVue from './AppIcon.vue'
export default {
  name: 'search-box',
  components: {
    'app-input': AppInputVue,
    'app-button': AppButtonVue,
    'app-icon': AppIconVue
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    handleSearchInput({ code, key, type }) {
      let keyCode = code || key
      if (keyCode === 'Enter' || type === 'click')
        if (this.hasQuery()) {
          this.makeSearch()
        } else {
          this.clear()
        }
      if (keyCode === 'Delete') this.clear()
    },
    handleClearInput() {
      this.clear()
      this.$refs.search.focus()
    },
    hasQuery() {
      if (this.query.length > 0) return true
      else return false
    },
    clear() {
      this.query = ''
      this.setQuery(this.query)
    },
    makeSearch() {
      this.setQuery(this.query)
    },
    setQuery(query) {
      this.$store.dispatch('setSearchQuery', query)
    }
  }
}
</script>
