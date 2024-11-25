<template>
  <div id="config-provider">
    <a-config-provider
      :theme="{
        token: {
          colorPrimary: '#eb5931',
        },
        components: {
          Table: {
            color: 'white',
            colorFillAlter: '#6c757d',
            colorTextHeading: 'white',
            colorTextLabel: 'white',
          },
        },
      }"
    >
      <slot />
    </a-config-provider>
  </div>
</template>

<script>
export default {
  name: "ConfigProvider",
  components: {},

  data() {
    return {};
  },
  methods: {
    async mounted() {},
    watch: {},
  },
};
</script>

<style lang="scss" scoped>
#config-provider {
}
</style>
