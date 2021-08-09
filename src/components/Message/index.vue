<template>
  <div class="message" :style="loginShow ? 'top:65px' : 'top:30px'" v-if="show">
    <i class="el-icon-bell"></i>
    <div class="msg">
      <span>{{ "[" + message.date + "]" }}</span>
      <span>{{ message.msg }}</span>
      <a :href="message.link" target="_blank">{{ message.link }}</a>
    </div>
    <i class="el-icon-close exit" @click="exit"></i>
  </div>
</template>
<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup(props, { emit }) {
    const store = useStore();
    const data = reactive({
      message: {
        msg: "虚拟交易所PhantomExchange V1.0.0正式上线，产品说明请参阅",
        date: "2021年12月31日",
        link: "http://xxx.xxx",
      },
      show: true,
    });
    const loginShow = computed(() => {
      return store.state.loginShow;
    });
    emit("status", data.show);
    const exit = () => {
      data.show = false;
      store.commit("SET_MSG_SHOW", data.show);
      emit("status", false);
    };
    return {
      ...toRefs(data),
      exit,
      loginShow,
    };
  },
};
</script>
<style lang="scss" scoped>
.message {
  width: 100vw;
  position: fixed;
  top: 30px;
  left: 0;
  z-index: 9;
  overflow: hidden;
  box-sizing: border-box;
  line-height: 20px;
  background-color: rgb(237, 237, 237);
  padding: 0 10px;
  font-size: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  &:hover {
    .exit {
      opacity: 1;
      color: #dc2828;
      cursor: pointer;
    }
  }
  .msg {
    width: calc(100vw - 50px);
    overflow-x: auto;
  }
  i {
    margin-right: 10px;
    line-height: 20px;
  }
  .exit {
    opacity: 0;
  }
  a {
    color: #409eff;
  }
}
</style>
