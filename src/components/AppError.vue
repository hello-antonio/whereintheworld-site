<template>
  <div class="error">
    <div class="error__details">
      <h2>
        <slot name="title"></slot>
      </h2>
      <div class="error__details__body">
        <slot name="message"></slot>
        <div class="flex-center" v-if="reload">
          <!-- button -->
          <app-button
            style="width:120px"
            class="button--primary"
            :event="reloadPage"
          >
            <span>Try Again</span>
            <template>
              <app-icon iconName="icon-refresh-ccw"></app-icon>
            </template>
          </app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppIconVue from './AppIcon.vue'
import AppButtonVue from './AppButton.vue'
export default {
  components: {
    'app-button': AppButtonVue,
    'app-icon': AppIconVue
  },
  props: {
    reload: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    reloadPage() {
      this.$router.go()
    }
  }
}
</script>

<style scoped>
.error__details {
  width: 100%;
  max-width: 375px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  margin: 2rem auto;
  padding: 4rem 0;
}
</style>
