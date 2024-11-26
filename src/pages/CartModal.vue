<template>
  <a-modal
      :footer="null"
      :open="true"
      title="Bilgi"
      @cancel="close()"
  >
    <a-input v-model:value="cartInfo.title" placeholder="title" class="input"/>
    <a-input v-model:value="cartInfo.description" placeholder="description" class="input"/>
    <a-input v-model:value="cartInfo.yaw" placeholder="yaw" class="input" type="number"/>
    <a-input v-model:value="cartInfo.pitch" placeholder="pitch" class="input" type="number"/>
    <div class="buttons">
      <Button title="Kaydet" :click-event="() => save()"/>
      <Button title="Vazgeç" :click-event="() => close()"/>
    </div>
  </a-modal>
</template>

<script>

import Button from "@/components/Atom/Button.vue";
import {CART_API} from "@/api/cart.js";

export default {
  name: 'CartModal',
  components: {Button},
  props: {
    close: {
      type: Function,
      required: true
    },
    cartInfo: {
      type: {
        title: "",
        description: "",
        yaw: 0,
        pitch: 0
      }
    }
  },
  data() {
    return {
      payload: {
        title: "",
        description: "",
        yaw: 0,
        pitch: 0
      }
    };
  },
  methods: {
    async save(){
      const result = await CART_API.create(this.payload)
      console.log("save result..", result)
    }
  },
  mounted() {
    if(Object.keys(this.cartInfo)) {
      this.payload = this.cartInfo
    }
  },
};
</script>

<style lang="scss" scoped>
.buttons{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 15px;
  column-gap: 5px;
}

.input{
  margin-top: 10px;
}
</style>
