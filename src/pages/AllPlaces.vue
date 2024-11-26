<template>
  <div id="all-places">
    <Button :click-event="() => modalVisible = true" title="Yeni Ekle"/>
    <div class="carts">
      <div v-for="place of places" class="cart" @click="getPlaceDetail(place.id)">
        <img :src="place.imageUrl" class="img"/>
        <div class="info">{{ place.name }}</div>
        <div class="info">{{ place.description }}</div>
        <div class="info">{{ place.city }}</div>
        <div class="info">{{ place.district }}</div>
      </div>
    </div>
    <PlaceModal
        v-if="modalVisible"
        :close="() => modalVisible = false"
        :saveOrUpdate="($event) => createPlace($event)"
    />
  </div>
</template>

<script>
import {PLACE_API} from "@/api/place.js";
import Button from "@/components/Atom/Button.vue";
import PlaceModal from "@/pages/PlaceModal.vue";

export default {
  name: 'AllPlaces',
  components: {
    PlaceModal,
    Button
  },
  data() {
    return {
      modalVisible: false,
      places: []
    };
  },
  methods: {
    getPlaceDetail(cartId) {
      this.$router.replace(`/place/${cartId}`)
    },
    async createPlace(payload) {
      this.modalVisible = false;
      const result = await PLACE_API.create(payload)
      if (result.status === 200) {
        this.places = [...this.places, result]
      }
    }
  },
  async mounted() {
    this.places = await PLACE_API.getAll()
  },

};
</script>

<style>
#all-places {
  padding: 20px;

  .carts {
    margin-top: 10px;
    display: flex;
    flex-direction: row;


    .cart {
      margin-right: 10px;
      width: fit-content;
      background-color: #d2d2d2;
      padding: 10px;
      border-radius: 10px;
      cursor: pointer;

      .img {
        width: 300px;
        height: 150px;
      }

      .info {
        margin-top: 5px;
        padding: 3px;
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
