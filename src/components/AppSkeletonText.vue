<template>
  <div
    class="skeleton"
    :class="{ animated: animated }"
    :style="{ width: width, height: height }"
  >
    skeleton text
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: undefined
    },
    width: {
      type: String,
      default: undefined
    },
    animated: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.dark-mode .skeleton {
  background-color: rgba(12, 18, 34, 0.133);
}

.skeleton {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #f0f0f0;
  text-indent: -99999px;
  overflow: hidden;
}

.animated.skeleton::after {
  content: '';
  position: absolute;
  left: 0;
  background: rgb(238, 238, 238);
  background: linear-gradient(
      90deg,
      rgba(238, 238, 238, 0.20211834733893552) 30%,
      rgb(255, 249, 249) 50%,
      rgba(238, 238, 238, 0.19931722689075626) 70%
    )
    no-repeat center;
  background-size: 100%;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  animation: loading 1s infinite;
}

.dark-mode .animated.skeleton::after {
  content: '';
  background: rgba(12, 18, 34, 0.2) 50%;
  background: linear-gradient(
      90deg,
      rgba(238, 238, 238, 0) 30%,
      rgba(12, 18, 34, 0.2) 50%,
      rgba(238, 238, 238, 0) 70%
    )
    no-repeat center;
}

@keyframes loading {
  to {
    transform: translateX(100%);
  }
}
</style>
