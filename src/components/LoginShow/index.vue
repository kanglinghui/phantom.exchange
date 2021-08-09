<template>
  <div class="login-show" v-if="show">
    <div class="icon"><i class="el-icon-warning"></i></div>
    <div>
      <p>
        您当前未登录, 请<span @click="register"
          ><i class="el-icon-arrow-left"></i>注册<i
            class="el-icon-arrow-right"
          ></i></span
        >或<span @click="login"
          ><i class="el-icon-arrow-left"></i>登录<i
            class="el-icon-arrow-right"
          ></i></span
        >。
      </p>
      <p>
        系统为您提供了guest/guest用户体验各项业务 ,
        您也可以使用API接入撮合服务。
      </p>
    </div>
    <el-dialog
      title="注册或登录您的账户"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="550px"
    >
      <LoginDia :type="type" />
    </el-dialog>
  </div>
</template>
<script>
import LoginDia from "@/views/login";
import { reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    LoginDia,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      dialogVisible: false,
      show: true,
      type: "login",
    });
    const login = () => {
      data.type = "login";
      data.dialogVisible = true;
    };
    watch(
      () => store.state.loginShow,
      (newVal) => {
        if (!newVal) {
          data.dialogVisible = false;
          data.show = false;
        } else {
          data.dialogVisible = true;
          data.show = true;
        }
      }
    );
    const register = () => {
      data.dialogVisible = true;
      data.type = "register";
    };
    return {
      ...toRefs(data),
      login,
      register,
    };
  },
};
</script>
<style lang="scss" scoped>
.login-show {
  height: 35px;
  display: flex;
  box-sizing: border-box;
  border: 1px solid #f56c6c;
  background-color: #fef0f0;
  color: #f56c6c;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 11;
  padding: 0 10px;
  .icon {
    margin-right: 10px;
    i {
      font-size: 28px;
      line-height: 33px;
    }
    color: #f56c6c;
  }
  p {
    font-size: 12px;
    line-height: 14px;
    padding-top: 2px;
    span {
      font-weight: 600;
      margin: 0 2px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
