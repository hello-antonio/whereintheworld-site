<template>
  <div class="row">
    <div class="row">
      <!-- back button -->
      <app-button
        type="router-link"
        to="/"
        tag="button"
        class="button--primary"
      >
        <template>
          <app-icon iconName="icon-arrow-left"></app-icon>
          <span>Back</span>
        </template>
      </app-button>
    </div>
    <div class="wrapper flex-center page-nf">
      <div class="msg">
        <h2>We are sorry, the page you requested cannot be found.</h2>
        <h3 class="semibold">
          The URL may be misspelled or the page you're looking for is no longer
          available.
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import AppButtonVue from '../components/AppButton.vue'
import AppIconVue from '../components/AppIcon.vue'
export default {
  name: 'NotFoundPage',
  components: { 'app-button': AppButtonVue, 'app-icon': AppIconVue },
  beforeRouteEnter(to, from, next) {
    window.document.title = to.meta.title
    next()
  }
}
</script>

<style>
.page-nf {
  margin: auto;
  min-height: 50vh;
}
.msg {
  height: 50%;
  padding: 4rem 0;
  text-align: center;
}
</style>
