<template>
  <div class="password">
    <el-form
      v-if="text === '验 证'"
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号">
        <el-input
          v-model="form.username"
          placeholder="请输入手机号"
          clearable
        ></el-input>
        <!-- <span class="register-btn" @click="account">已有账户？</span> -->
      </el-form-item>
      <el-form-item label="验证码" v-if="codeShow">
        <el-input v-model="form.username" placeholder="请输入验证码" clearable
          ><template #append>
            <el-button v-if="num">{{ num }}S后可重发</el-button>
            <el-button v-else @click="tryAgin">重新发送</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-form
      v-if="text === '提 交'"
      :model="passwordForm"
      :rules="ruleRules"
      status-icon
      ref="passwordRules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="passwordForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          placeholder="请再次输入密码"
          v-model="passwordForm.checkPass"
          autocomplete="off"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div class="password-btn">
      <el-button type="primary" class="form-login" @click="submit">{{
        text
      }}</el-button>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, ref } from "vue";
import noti from "@/utils/noti.js";
export default {
  setup(props, { emit }) {
    const passwordRules = ref(null);
    let validatePass = (rule, value, callback) => {
      console.log(rule, value, callback);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (data.passwordForm.checkPass !== "") {
          passwordRules.value.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== data.passwordForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    const data = reactive({
      form: {
        mobile: "",
        code: "",
      },
      passwordForm: {
        pass: "",
        checkPass: "",
      },
      ruleRules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      rules: [],
      num: 60,
      text: "验 证",
      codeShow: false,
    });
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
      if (data.text === "验 证") {
        data.text = "提 交";
      } else {
        noti({
          type: "success",
          msg: "密码重置成功!",
        });
        emit("btn", { login: true, register: false, password: false });
      }
    };
    return {
      passwordRules,
      ...toRefs(data),
      tryAgin,
      reduceNum,
      submit,
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
  margin-left: 100px;
}
</style>
