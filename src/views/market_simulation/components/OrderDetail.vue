<template>
  <div class="orderDia">
    <div class="l">
      <p class="p" v-for="(item, i) in infoList" :key="i">
        <span class="label">{{ item.label }}</span>
        <span class="value">{{ info[item.value] }}</span>
      </p>
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
    </div>
    <div class="r">
      <el-table
        empty-text="暂无数据"
        :data="tableData"
        border
        tooltip-effect="dark"
        stripe
        style="width: 100%"
        height="500px"
      >
        <el-table-column
          prop="date"
          align="center"
          label="时间"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="msg"
          align="center"
          label="事件"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";

export default {
  props: {
    info: {
      type: Object,
    },
  },
  setup(props) {
    const data = reactive({
      infoList: [
        { label: "交易所ID:", value: "trade" },
        { label: "合约ID:", value: "contract" },
        { label: "订单方向:", value: "fx" },
        { label: "报单价格:", value: "price" },
        { label: "报单数量:", value: "num" },
      ],
      tableData: [{ date: "14:20:11", msg: "订单成交200" }],
      info: props.info,
      num: undefined,
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>
<style lang="scss" scoped>
.orderDia {
  display: flex;
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
    width: 260px;
    padding: 0 20px;
  }
  .r {
    width: calc(100% - 260px);
    box-sizing: border-box;
  }
}
:deep(.el-progress) {
  width: 120px;
}
:deep(th) {
  color: #303133;
  background-color: rgb(226, 226, 227);
}
:deep(.is-center) {
  line-height: 22px !important;
  font-size: 13px !important;
  padding: 0 8px !important;
  .cell {
    line-height: 22px !important;
    font-size: 13px !important;
    padding: 0px !important;
    width: 100% !important;
    .el-button {
      padding: 0;
      width: 74px;
      min-height: 18px;
      height: 18px;
    }
  }
}
</style>
