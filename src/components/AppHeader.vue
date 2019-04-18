<template>
  <div class="row flex-wrap">
    <h1 class="app-title">{{ title }}</h1>
    <!-- Dark mode Button -->
    <app-button :event="handleClick">
      <template>
        <app-icon iconName="icon-moon"></app-icon>
        <span>Dark Mode</span>
      </template>
    </app-button>
  </div>
</template>

<script>
import AppButtonVue from './AppButton.vue'
import AppIconVue from './AppIcon.vue'
export default {
  name: 'app-header',
  components: { 'app-button': AppButtonVue, 'app-icon': AppIconVue },
  data() {
    return {
      title: 'Where in the world?',
      theme: 'light'
    }
  },
  methods: {
    handleClick() {
      this.themeOn()
      if (this.theme === 'light') this.theme = 'dark'
      else this.theme = 'light'
      localStorage.theme = this.theme
    },
    themeOn() {
      document.querySelector('html').classList.toggle('dark-mode')
    }
  },
  mounted() {
    // dark mode setting is save on localStorage
    if (localStorage.theme) {
      this.theme = localStorage.theme
    }
    if (localStorage.theme === 'dark') {
      this.themeOn()
    }
  },
  // this watches when a chage has been made and updates the state
  watch: {
    theme(newtheme) {
      localStorage.theme = newtheme
    }
  }
}
</script>

<style scoped>
.app-title {
  font-size: 0.875rem;
}

@media screen and (min-width: 500px) {
  .app-title {
    font-size: 1.25rem;
  }
}
@media screen and (min-width: 1440px) {
  .app-title {
    font-size: 1.5rem;
  }
}
</style>
