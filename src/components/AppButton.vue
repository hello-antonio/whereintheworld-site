<template>
  <a class="button theme-light" :href="href" v-if="type === 'link'">
    <slot>link button</slot>
  </a>
  <router-link
    class="button theme-light"
    :to="to"
    :tag="tag"
    v-else-if="type === 'router-link'"
  >
    <slot>router link button</slot>
  </router-link>
  <button
    class="button theme-light"
    @click="event"
    v-else-if="type === 'button'"
  >
    <slot>button</slot>
  </button>
</template>

<script>
export default {
  name: 'app-button',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    to: {
      type: [String, Object],
      default: undefined
    },
    tag: {
      type: String,
      default: undefined
    },
    href: {
      type: String,
      default: undefined
    },
    event: {
      type: Function,
      default: function() {
        return
      }
    }
  }
}
</script>

<style>
button,
.button {
  min-width: 90px;
  height: 48px;
  border: transparent;
  border-radius: 6px;
  background-color: transparent;
  font-size: 0.875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 300;
  cursor: pointer;
}

.button--primary {
  margin: 1rem 0;
  padding: 0 1rem;
  background-color: #fff;
  box-shadow: 0 0 0.875em rgba(0, 0, 0, 0.16);
}

.button--basic {
  padding: 0.75rem 1rem;
  box-shadow: none;
  height: auto !important;
}

.button--basic:hover {
  background-color: #eee;
}

@media screen and (min-width: 500px) {
  .button {
    height: 58px;
  }
}

.selected {
  background-color: #eee;
}

.dark-mode .selected,
.dark-mode .button--basic:hover {
  background-color: #26333f;
}
</style>
