<template>
  <div id="button" @click="clickEvent()">
    {{ title }}
    <slot />
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    title: {
      type: String,
    },
    clickEvent: {
      type: Function,
    },
  },
  data() {},
  computed: {},
  methods: {},
  async mounted() {},
};
</script>

<style lang="scss" scoped>
#button {
  background-color: #096782;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  align-items: center;
  display: flex;
  justify-content: center;
  height: fit-content;
  font-size: 14px;
  width: fit-content;

  &:hover {
    background-color: #000000;
  }
}
</style>
