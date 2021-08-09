<template>
  <div class="register-box">
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="60px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号">
        <el-input
          v-model="form.username"
          placeholder="请输入手机号"
          clearable
        ></el-input>
        <span class="register-btn" @click="account">已有账户？</span>
      </el-form-item>
      <el-form-item label="验证码" v-if="codeShow">
        <el-input v-model="form.username" placeholder="请输入验证码" clearable
          ><template #append>
            <el-button v-if="num">{{ num }}S后可重发</el-button>
            <el-button v-else @click="tryAgin">重新发送</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button type="primary" class="form-login" @click="submit">{{
          text
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";

export default {
  setup(props, { emit }) {
    const data = reactive({
      form: {
        mobile: "",
        code: "",
      },
      rules: [],
      num: 60,
      text: "发送验证码",
      codeShow: false,
    });
    const account = () => {
      emit("btn", { login: true, register: false, password: false });
    };
    const tryAgin = () => {
      data.num = 60;
      reduceNum();
    };
    const reduceNum = () => {
      data.num--;
      if (data.num) {
        setTimeout(() => {
          reduceNum();
        }, 1000);
      }
    };
    const submit = () => {
      if (data.text === "注 册") {
        emit("btn", { login: true, register: false, password: false });
      } else {
        data.codeShow = true;
        reduceNum();
        data.text = "注 册";
      }
    };
    return {
      ...toRefs(data),
      account,
      tryAgin,
      submit,
      reduceNum,
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
</style>
