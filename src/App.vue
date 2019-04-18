<template>
  <app-page>
    <template #header>
      <app-header></app-header>
    </template>
    <template #view>
      <keep-alive>
        <router-view :key="$route.fullPath" />
      </keep-alive>
    </template>
  </app-page>
</template>

<script>
import AppPageVue from './components/AppPage.vue'
import AppHeaderVue from './components/AppHeader.vue'
export default {
  name: 'app',
  components: {
    'app-page': AppPageVue,
    'app-header': AppHeaderVue
  }
}
</script>
