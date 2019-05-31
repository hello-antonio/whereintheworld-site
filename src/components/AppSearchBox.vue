<template>
  <app-input class="flex-wrap flex-wrap--start">
    <template>
      <app-button
        ref="searchButton"
        tabindex="-1"
        aria-disabled="true"
        aria-hidden="true"
        style="min-width:10%"
        :event="handleSearch"
      >
        <template>
          <app-icon iconName="icon-search" class="pad"></app-icon>
        </template>
      </app-button>
      <label
        v-show="!hasText()"
        id="label1"
        for="search"
        ref="placeholder"
        class="app-input__placeholder theme-light"
        >Search for a country name...</label
      >
      <input
        aria-labelledby="label1"
        type="text"
        ref="search"
        id="search"
        name="search"
        maxlength="100"
        :value="query"
        @input="query = $event.target.value"
        @keydown="handleSearch"
      />
      <app-button
        v-show="hasText()"
        ref="deleteButton"
        tabindex="-1"
        aria-disabled="true"
        aria-hidden="true"
        style="min-width:10%"
        :event="handleDelete"
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
    handleSearch({ code, key, type }) {
      let keyCode = code || key
      if (this.hasText())
        if (keyCode === 'Enter' || type === 'click') {
          this.search(this.query)
          this.$refs.searchButton.$el.focus()
        }
      if (keyCode === 'Delete') this.handleDelete()
    },
    handleDelete() {
      if (this.hasText()) {
        this.query = ''
        this.search(this.query)
        this.$refs.search.focus()
      }
    },
    hasText() {
      if (this.query.length > 0) {
        return true
      } else {
        return false
      }
    },
    search(str) {
      this.$store.dispatch('setSearchQuery', str)
    }
  }
}
</script>
