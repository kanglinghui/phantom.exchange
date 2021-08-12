<template>
  <div class="addPosition">
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="交易所ID" prop="tradeID">
        <el-input v-model="form.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="合约代码" prop="exchangeCode">
        <el-input v-model="form.exchangeCode" clearable></el-input>
      </el-form-item>
      <el-form-item label="持仓方向" prop="positionFX">
        <el-select v-model="form.positionFX" placeholder="持仓方向">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="持仓均价" prop="positionPrice">
        <el-input-number
          :controls="false"
          v-model="form.positionPrice"
          :precision="2"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="持仓数量" prop="positionNum">
        <el-input-number
          :controls="false"
          v-model="form.positionNum"
          :precision="0"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <el-form-item class="flex">
        <el-button type="primary" icon="el-icon-circle-check" @click="add"
          >确认新增</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";

export default {
  setup(props, { emit }) {
    const data = reactive({
      options: [
        {
          label: "多",
          value: "多",
        },
        {
          label: "空",
          value: "空",
        },
      ],
      form: {
        tradeID: "",
        exchangeCode: "",
        positionFX: "",
        positionPrice: undefined,
        positionNum: undefined,
      },
      rules: {},
    });
    const add = () => {
      emit("add", data.form);
    };
    return {
      ...toRefs(data),
      add,
    };
  },
};
</script>
<style lang="scss" scoped>
.addPosition {
  padding: 20px 0;
  .flex {
    .el-button {
      margin-left: 45px;
    }
  }
}
:deep(.el-input__inner) {
  width: 200px;
  &::placeholder {
    color: rgba(0, 0, 0, 0);
  }
}
:deep(.el-input.is-focus .el-input__inner:focus) {
  border-color: #909399 !important;
}
:deep(.el-select .el-input__inner:focus) {
  border-color: #909399;
}
</style>
