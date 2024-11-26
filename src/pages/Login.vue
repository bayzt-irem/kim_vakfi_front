<template>
  <div id="login" :style="loading ? 'pointer-events: none' : ''">
    <Loading :loadingCheck="loading"></Loading>
    <h1>Welcome</h1>
    <a-input v-model:value="email" placeholder="Email" class="input" />
    <a-input-password
      v-model:value="password"
      placeholder="Password"
      class="input"
    />
    <Button title="Login" :click-event="() => login()" style="color: black" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Loading from "../components/Loading.vue";
import Button from "@/components/Atom/Button.vue";

export default {
  name: "Login",
  components: {
    Button,
    Loading,
  },
  data() {
    return {
      email: "",
      password: "",
      loading: false,
    };
  },
  computed: {
    ...mapState({}),
  },
  methods: {
    ...mapActions({
      loginAction: "auth/login",
    }),
    async login() {
      const result = await this.loginAction({
        email: this.email,
        password: this.password,
      });
      console.log("login result: ", result);
      if (result) this.$router.replace("/all-places");
    },
  },
  mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
#login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  .input {
    width: 300px;
  }
}
</style>
