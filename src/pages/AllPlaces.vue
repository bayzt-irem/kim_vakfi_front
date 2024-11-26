<template>
  <div id="all-places">
    All Places
  </div>
</template>

<script>
import {PLACE_API} from "@/api/place.js";

export default {
  name: 'AllPlaces',
  components:{
  },
  data() {
    return {
    };
  },
  methods: {

  },
  async mounted() {
    const places = await PLACE_API.getAll()
    console.log("places: ", places)
  },

};
</script>

<style>
#all-places {
}
</style>
