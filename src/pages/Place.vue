<template>
  <div id="place"></div>
</template>

<script>
import {PLACE_API} from "@/api/place.js";

export default {
  name: 'Place',
  components:{
  },
  data() {
    return {
    };
  },
  methods: {},
  async mounted() {
    const place = await PLACE_API.get(this.$route.params.id)
    console.log("place: ", place)
  },
};
</script>

<style>
#place {
}
</style>
