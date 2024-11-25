<template>
  <div id="header">
    <div
      class="material-icons dehaze"
      @click="changeSidebarVisible"
      :style="
        Object.keys(user).length ? 'visibility: visible' : 'visibility: hidden'
      "
    >
      dehaze
    </div>
    <div>
      <Button
        title="Login"
        :click-event="() => $router.replace('/login')"
        v-if="$route.name === 'Register'"
      />
      <Button
        title="Register"
        :click-event="() => $router.replace('/register')"
        v-if="$route.name === 'Login'"
      />
      <a-popover trigger="click" v-if="Object.keys(user).length">
        <div class="full-name">{{ user.name + " " + user.surname }}</div>
        <template #content>
          <div class="profile-content">
            <div class="logout" @click="logout">Çıkış Yap</div>
          </div>
        </template>
      </a-popover>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Button from "@/components/Atom/Button.vue";

export default {
  name: "Header",
  components: { Button },
  props: {
    title: {
      type: String,
      default: "Anasayfa",
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    ...mapMutations({
      logoutAction: "auth/logout",
      changeSidebarVisibleAction: "app/changeSidebarVisible",
    }),
    logout() {
      this.logoutAction();
      this.$router.replace("/login");
    },
    changeSidebarVisible() {
      this.changeSidebarVisibleAction();
    },
  },
  async mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.ant-popover-inner {
  padding: 0;
}

.logout {
  cursor: pointer;

  &:hover {
    background-color: #ededed;
  }
}

#header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #003e4f;
  color: white;

  .dehaze {
    cursor: pointer;
  }

  .full-name {
    cursor: pointer;
  }
}
</style>
