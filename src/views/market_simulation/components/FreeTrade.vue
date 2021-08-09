<template>
  <div class="FreeTrade" :style="{ height: heightStyle }">
    <el-form
      :model="form"
      :rules="rules"
      ref="formBox"
      label-width="70px"
      class="demo-ruleForm"
    >
      <el-form-item label="交易所" prop="trade">
        <el-select v-model="form.trade" clearable placeholder="交易所">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合约代码" prop="contractCode">
        <el-input-number
          v-model="form.contractCode"
          :precision="0"
          :max="999999"
          :controls="false"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="订单类型" prop="orderType">
        <el-select v-model="form.orderType" clearable placeholder="订单类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单数量" prop="orderNum">
        <el-input-number
          v-model="form.orderNum"
          :precision="0"
          :max="999999999999"
          :controls="false"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="订单价格" prop="ordeAmount">
        <el-input-number
          v-model="form.ordePrice"
          :precision="2"
          :max="999999999999"
          :controls="false"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="买卖方向" prop="direction">
        <el-select v-model="form.direction" clearable placeholder="买卖方向">
          <el-option label="买" value="买"></el-option>
          <el-option label="卖" value="卖"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开平模式" prop="kaiping">
        <el-select v-model="form.kaiping" clearable placeholder="开平模式">
          <el-option label="开" value="开"></el-option>
          <el-option label="关" value="关"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button type="primary" plain @click="submit">报 单</el-button>
      <el-button plain @click="rest">重 置</el-button>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, computed } from "vue";
class RestForm {
  constructor() {
    this.form = {
      trade: "",
      contractCode: undefined,
      orderType: "",
      orderNum: undefined,
      ordePrice: undefined,
      direction: "",
      kaiping: "",
    };
  }
}
export default {
  props: {
    height: String,
  },
  setup(props, { emit }) {
    const heightStyle = computed(() => {
      return props.height;
    });
    const data = reactive({
      rules: [],
      //   heightStyle: props.height,
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      form: new RestForm().form,
    });
    const submit = () => {
      emit("sub", data.form);
    };
    const rest = () => {
      data.form = new RestForm().form;
    };
    return {
      ...toRefs(data),
      submit,
      rest,
      heightStyle,
    };
  },
};
</script>
<style lang="scss" scoped>
:deep(.el-input-number) {
  width: 100%;
}
:deep(.el-select) {
  width: 100%;
}
:deep(.el-form-item) {
  margin-bottom: 5px;
  .el-form-item__label {
    font-size: 12px;
    color: #fff;
  }
  .el-input__inner {
    font-size: 12px;
    background-color: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(0, 0, 0, 0.1);
    // border: 0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    color: #fff;
    &::placeholder {
      color: rgba(0, 0, 0, 0);
    }
  }
}
.FreeTrade {
  padding: 5px;
  background-color: rgba(27, 180, 39, 0.8);
  box-sizing: border-box;
  overflow-y: auto;
  //   height: 310px;
}
.btn {
  padding-top: 5px;
  display: flex;
  justify-content: center;
  .el-button {
    width: 80px;
  }
}
.el-form-item {
  line-height: 24px;
  height: 24px;
}
:deep(.el-input__inner) {
  line-height: 24px;
  height: 24px;
}
</style>
