<template>
  <span class="app-icon">
    <svg class="icon">
      <use :xlink:href="`#${iconName}`"></use>
    </svg>
  </span>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style scoped>
.app-icon {
  width: 1em;
  height: 1em;
  color: inherit;
  vertical-align: middle;
}
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}

/* ==========================================
Single-colored icons can be modified like so:
.icon-name {
  font-size: 32px;
  color: red;
}
========================================== */
</style>
