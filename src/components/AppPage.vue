<template>
  <div id="app">
    <header class="app-header theme-light">
      <div class="container">
        <slot name="header"></slot>
      </div>
    </header>
    <main class="app-main">
      <div class="container">
        <slot name="view"></slot>
      </div>
    </main>
    <app-svg-icons />
  </div>
</template>

<script>
import AppSvgIconsVue from './AppSvgIcons.vue'
export default {
  name: 'app-page',
  components: { 'app-svg-icons': AppSvgIconsVue }
}
</script>

<style>
.container {
  width: 100%;
  max-width: 1280px;
  margin: auto;
  padding: 0 1rem;
}

.row {
  width: 100%;
  min-height: 80px;
}

@media screen and (min-width: 500px) {
  .container {
    width: 92%;
    padding: 0;
  }
}
.flex-row {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
.flex-wrap {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-wrap--start {
  justify-content: flex-start;
}
.wrapper {
  margin: 2rem auto 0;
  width: 100%;
}

.app-header {
  box-shadow: 0 0 0.875em rgba(0, 0, 0, 0.16);
}
</style>
