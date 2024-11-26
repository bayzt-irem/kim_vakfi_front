<template>
  <div id="register" :style="loading ? 'pointer-events: none' : ''">
    <Loading :loadingCheck="loading"></Loading>
    <h1>Register</h1>
    <a-input v-model:value="name" placeholder="Name" class="input" />
    <a-input v-model:value="surname" placeholder="Surname" class="input" />
    <a-input v-model:value="email" placeholder="Email" class="input" />
    <a-input-password
      v-model:value="password"
      placeholder="Password"
      class="input"
    />
    <Button
      title="Sign Up"
      :click-event="() => register()"
      style="color: black"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Loading from "../components/Loading.vue";
import Button from "@/components/Atom/Button.vue";

export default {
  name: "Register",
  components: {
    Button,
    Loading,
  },
  data() {
    return {
      name: "",
      surname: "",
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
      registerAction: "auth/register",
    }),
    async register() {
      const result = await this.registerAction({
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
      });
      if (result) this.$router.replace("/all-places");
    },
  },
  mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
#register {
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
