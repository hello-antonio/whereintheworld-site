<template>
  <div class="app-input theme-light">
    <slot>Base input</slot>
  </div>
</template>

<script>
export default {}
</script>

<style>
input {
  background-color: inherit;
  color: inherit;
  border: transparent;
  padding: 0;
  height: 100%;
  font-size: inherit;
  font-weight: 600;
}

input::placeholder {
  color: inherit;
  font-weight: inherit;
}

.app-input {
  width: 100%;
  max-width: 480px;
  height: 48px;
  margin: 1rem 0;
  position: relative;
  border-radius: 6px;
  box-shadow: 0 0 0.875em rgba(0, 0, 0, 0.16);
  font-size: 0.875rem;
  background-color: #fff;
  color: #111517;
  overflow: hidden;
}

.app-input__placeholder {
  position: absolute;
  right: 0;
  left: 10%;
  width: 80%;
  height: auto;
  pointer-events: none;
  visibility: visible;
  opacity: 1;
  transition: opacity 0.5s;
  color: #848484;
}

.hide {
  visibility: hidden;
  opacity: 0;
}

.app-input input {
  width: 80%;
}
@media screen and (min-width: 500px) {
  .app-input {
    height: 58px;
  }
}
</style>
