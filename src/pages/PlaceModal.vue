<template>
  <a-modal
      :footer="null"
      :open="true"
      title="Yerleşke"
      @cancel="close()"
  >
    <a-input v-model:value="payload.name" class="input" placeholder="Name"/>
    <a-input v-model:value="payload.description" class="input" placeholder="description"/>
    <a-input v-model:value="payload.city" class="input" placeholder="city"/>
    <a-input v-model:value="payload.district" class="input" placeholder="district"/>
    <a-input v-model:value="payload.imageUrl" class="input" placeholder="imageUrl"/>
    <div class="buttons">
      <Button :click-event="() => save()" title="Kaydet"/>
      <Button :click-event="() => close()" title="Vazgeç"/>
    </div>
  </a-modal>
</template>

<script>

import Button from "@/components/Atom/Button.vue";

export default {
  name: 'PlaceModal',
  components: {Button},
  props: {
    saveOrUpdate: {
      type: Function,
      required: true
    },
    close: {
      type: Function,
      required: true
    },
    placeInfo: {
      type: {
        name: "",
        description: "",
        city: "",
        district: "",
        imageUrl: ""
      }
    }
  },
  data() {
    return {
      payload: {
        name: "",
        description: "",
        city: "",
        district: "",
        imageUrl: ""
      }
    };
  },
  methods: {
    async save() {
      await this.saveOrUpdate(this.payload)
    }
  },
  mounted() {
    if (!!this.placeInfo) {
      this.payload = this.placeInfo
    }
  },
};
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 15px;
  column-gap: 5px;
}

.input {
  margin-top: 10px;
}
</style>
