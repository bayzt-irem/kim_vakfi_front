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
  border: 1px solid grey;
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
    background-color: #a2a2a2;
  }
}
</style>
