<template>
  <div id="app" :style="loading ? 'pointer-events: none' : ''">
    <Loading :loadingCheck="loading" />
    <Sidebar
      v-if="Object.keys(user).length > 0 && sidebarVisible"
      class="sidebar"
    />
    <div
      class="container"
      :style="
        Object.keys(user).length > 0 && sidebarVisible
          ? 'width: 90%;'
          : 'width: 100%;'
      "
    >
      <Header class="header" />
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import Loading from "../src/components/Loading.vue";
import { getToken } from "@/utils/persistenceStorage.js";

export default {
  name: "App",
  components: { Sidebar, Loading, Header },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      sidebarVisible: (state) => state.app.sidebarVisible,
    }),
  },
  methods: {
    ...mapActions({
      currentUser: "auth/currentUser",
    }),
  },
  async mounted() {
    if (getToken()) await this.currentUser();
    else this.$router.replace("/login");
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  .sidebar {
    width: 15%;
  }

  .container {
    display: flex;
    flex-direction: column;

    .header {
      height: 7%;
    }
  }
}
</style>
