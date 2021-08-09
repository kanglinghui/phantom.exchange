<template>
  <div class="login-box">
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="60px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入用户名"
          clearable
        ></el-input>
        <span class="register-btn" @click="register">点击注册</span>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          clearable
        ></el-input>
        <span class="password-btn" @click="password">忘记密码?</span>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button type="primary" class="form-login" @click="submit"
          >登 录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import noti from "@/utils/noti.js";
export default {
  setup(props, { emit }) {
    const store = useStore();
    const data = reactive({
      form: {
        username: "",
        password: "",
      },
      rules: [],
    });
    const submit = () => {
      store.commit("SET_LOGIN_SHOW", false);
      noti({ type: "success", msg: "登录成功!" });
    };
    const register = () => {
      emit("btn", { register: true, login: false, password: false });
    };
    const password = () => {
      emit("btn", { register: false, login: false, password: true });
    };
    return {
      ...toRefs(data),
      submit,
      register,
      password,
    };
  },
};
</script>
<style lang="scss" scoped>
:deep(.el-input) {
  width: 350px;
  .el-input__inner {
    line-height: 28px;
    height: 28px;
    font-size: 14px;
  }
}
.register-btn {
  cursor: pointer;
  margin-left: 20px;
  transition: 0.5s;
  &:hover {
    color: #409eff;
  }
}
.form-login {
  width: 350px;
}
.password-btn {
  cursor: pointer;
  margin-left: 20px;
  transition: 0.5s;
  &:hover {
    color: #dc2828;
  }
}
</style>
