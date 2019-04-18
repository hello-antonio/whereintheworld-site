<template>
  <div id="observer">
    <div class="loader theme-light" v-show="hasObserver">Loading...</div>
    <app-button
      class="button--primary"
      :event="observerLoader"
      v-show="!hasObserver"
    >
      <template>
        <span>Load More</span>
        <app-icon iconName="icon-plus"></app-icon>
      </template>
    </app-button>
  </div>
</template>

<script>
import AppButtonVue from './AppButton.vue'
import AppIconVue from './AppIcon.vue'
export default {
  name: 'observer',
  components: { 'app-button': AppButtonVue, 'app-icon': AppIconVue },
  props: {},
  data() {
    return {
      options: {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      },
      observer: null,
      isObserving: true
    }
  },
  methods: {
    observerLoader() {
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver(([entry]) => {
          if (entry && entry.isIntersecting) {
            this.$emit('intersect')
          }
        }, this.options)
        this.observer.observe(this.$el)
      } else {
        this.isObserving = false
        this.$emit('intersect')
      }
    }
  },
  mounted() {
    this.observerLoader()
  },
  destroyed() {
    if (this.isObserving) this.observer.disconnect()
  },
  computed: {
    hasObserver() {
      return this.isObserving
    }
  }
}
</script>
