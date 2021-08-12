<template>
  <div class="orderDia">
    <div class="l">
      <p class="p" v-for="(item, i) in infoList" :key="i">
        <span class="label">{{ item.label }}</span>
        <span class="value">{{ info[item.value] }}</span>
      </p>
    </div>
    <div class="r">
      <p class="p">
        <span class="label">成交进度:</span>
        <el-progress
          :text-inside="true"
          :stroke-width="12"
          :color="[
            info.direction === '买'
              ? 'rgba(218, 43, 48, 0.8)'
              : 'rgba(27,180,39,0.8)',
          ]"
          :percentage="parseInt((info.progress / info.sumProgress) * 100)"
          status="exception"
        >
          <span>{{ `${info.progress}/${info.sumProgress}` }}</span>
        </el-progress>
      </p>
      <div v-if="type === '成交订单'">
        <p class="p">
          <span class="label">剩余可成交:</span>
          <span class="value">{{ info.sy }}</span>
        </p>
        <p class="p">
          <span class="label">成交数量:</span>
          <el-input-number
            :controls="false"
            v-model="num"
            :precision="0"
            :min="0"
          ></el-input-number>
        </p>
      </div>
      <el-button
        style="margin-top: 60px; margin-left: 60px"
        v-if="type === '成交订单'"
        type="success"
        icon="el-icon-check"
        @click="clinch"
        >立即成交</el-button
      >
      <el-button
        v-else
        style="margin-left: 60px; margin-top: 115px"
        type="danger"
        icon="el-icon-close"
        @click="cancellations"
        >立即撤单</el-button
      >
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import noti from "@/utils/noti";
export default {
  props: {
    info: {
      type: Object,
    },
    title: {
      type: String,
    },
    dialog: Boolean,
  },
  setup(props, { emit }) {
    const data = reactive({
      infoList: [
        { label: "交易所ID:", value: "trade" },
        { label: "合约ID:", value: "contract" },
        { label: "订单方向:", value: "fx" },
        { label: "报单价格:", value: "price" },
        { label: "报单数量:", value: "num" },
        { label: "订单状态:", value: "status" },
      ],
      info: props.info,
      type: props.title,
      num: undefined,
    });
    const clinch = () => {
      emit("update:dialog", false);
      noti({
        type: "success",
        msg: "成交成功!",
      });
    };
    const cancellations = () => {
      emit("update:dialog", false);
      noti({
        type: "success",
        msg: "撤单成功!",
      });
    };
    return {
      ...toRefs(data),
      clinch,
      cancellations,
    };
  },
};
</script>
<style lang="scss" scoped>
.orderDia {
  display: flex;
  .l,
  .r {
    padding: 20px;
  }
  .p {
    display: flex;
    .label {
      display: inline-block;
      width: 80px;
      line-height: 30px;
    }
    .value {
      line-height: 30px;
    }
  }
  .l {
    width: 50%;
  }
  .r {
    width: 50%;
    box-sizing: border-box;
    border-left: 1px dashed rgba(0, 0, 0, 0.1);
  }
}
:deep(.el-progress) {
  width: 120px;
}
</style>
