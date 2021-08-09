<template>
  <div class="changePass">
    <el-form
      :model="passwordForm"
      :rules="ruleRules"
      status-icon
      ref="passwordRules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原密码" prop="oldPass">
        <el-input
          type="password"
          placeholder="请输入原密码"
          v-model="passwordForm.oldPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input
          type="password"
          placeholder="请输入新密码"
          v-model="passwordForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          placeholder="请再次输入新密码"
          v-model="passwordForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button type="primary" class="form-login" @click="submit"
          >提 交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reactive, toRefs, ref } from "vue";
import { useStore } from "vuex";
import noti from "@/utils/noti.js";

export default {
  props: {
    show: Boolean,
  },
  setup(props, { emit }) {
    const store = useStore();
    const passwordRules = ref(null);
    let validatePass = (rule, value, callback) => {
      console.log(rule, value, callback);
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (data.passwordForm.checkPass !== "") {
          passwordRules.value.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== data.passwordForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const data = reactive({
      passwordForm: {
        oldPass: "",
        pass: "",
        checkPass: "",
      },
      ruleRules: {
        oldPass: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    });
    const submit = () => {
      noti({
        type: "success",
        msg: "密码重置成功，请重新登录!",
      });
      emit("update:pass", false);
      store.commit("SET_LOGIN_SHOW", true);
    };
    return {
      ...toRefs(data),
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
</style>
