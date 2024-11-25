<template>
  <img class="loadingStyle" src="../images/new.png" v-if="loadingCheck" />
</template>

<script>
export default {
  props: {
    loadingCheck: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style>
.loadingStyle {
  position: absolute;
  z-index: 10;
  top: 40vh;
  left: 50vw;
  height: 40px;
  animation: loading 888ms linear infinite;
  border-radius: 100vh;
  pointer-events: none;
}
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
