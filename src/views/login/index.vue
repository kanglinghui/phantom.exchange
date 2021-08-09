<template>
  <div class="login">
    <Logins @btn="change($event)" v-if="show.login" />
    <Register @btn="change($event)" v-if="show.register" />
    <Password @btn="change($event)" v-if="show.password" />
  </div>
</template>
<script>
import Logins from "./componetns/Login.vue";
import Register from "./componetns/Register.vue";
import Password from "./componetns/Password.vue";
import { reactive, toRefs, watch } from "vue";
export default {
  components: {
    Logins,
    Register,
    Password,
  },
  props: {
    type: String,
  },
  setup(props) {
    const data = reactive({
      show: {
        login: true,
        register: false,
        password: false,
      },
    });
    watch(
      () => props.type,
      (newVal) => {
        if (newVal === "login") {
          data.show = {
            login: true,
            register: false,
            password: false,
          };
        } else {
          data.show = {
            login: false,
            register: true,
            password: false,
          };
        }
      }
    );
    const change = (val) => {
      data.show = val;
    };
    return {
      ...toRefs(data),
      change,
    };
  },
};
</script>
<style lang="scss" scoped></style>
