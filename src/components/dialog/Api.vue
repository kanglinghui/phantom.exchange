<template>
  <div class="api">
    <el-dialog
      title="API接入信息"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="900px"
      top="8vh"
    >
      <el-table
        empty-text="暂无数据"
        :data="tableData"
        ref="table"
        border
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        stripe
        style="width: 100%"
        height="500px"
      >
        <el-table-column
          prop="exchangeName"
          label="交易所名称"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="exchangeType"
          label="交易所类型"
          align="center"
          show-overflow-tooltip
        >
          <template #header>
            <span>交易所类型</span>
            <el-popover
              placement="right-start"
              title="服务器类型对应三种交易模式:"
              :width="400"
              trigger="hover"
            >
              <template #reference>
                <i class="el-icon-question"></i>
              </template>
              <div class="doubt">
                <p>Simulation：自由交易、投资组合、市场仿真模式</p>
                <p>TAM(Tarde Against Marketmaker)：市场仿真模式</p>
                <p>TAT(Tarde Against Tarders)：市场仿真模式</p>
                <p cass="doubt-margin">
                  TAM和TAT的区别在于TAM模式下，用户的报单无法对盘口挂单（用户根本看不到盘口挂单量，只有价格）造成影响，即类似外汇交易中的和Broker对赌模式。用户只能买、卖合约。TAT模式下，用户可以对盘口造成的影响（挂单量和价格），但TAT模式下可能有其他市商AI存在。
                </p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="contract"
          label="永续合约"
          align="center"
          show-overflow-tooltip
        >
          <template #header>
            <span>永续合约</span>
            <el-popover
              placement="right-start"
              title="服务器类型对应三种交易模式:"
              :width="400"
              trigger="hover"
            >
              <template #reference>
                <i class="el-icon-question"></i>
              </template>
              <div class="doubt">
                <p>Simulation：自由交易、投资组合、市场仿真模式</p>
                <p>TAM(Tarde Against Marketmaker)：市场仿真模式</p>
                <p>TAT(Tarde Against Tarders)：市场仿真模式</p>
                <p class="doubt-margin">
                  TAM和TAT的区别在于TAM模式下，用户的报单无法对盘口挂单（用户根本看不到盘口挂单量，只有价格）造成影响，即类似外汇交易中的和Broker对赌模式。用户只能买、卖合约。TAT模式下，用户可以对盘口造成的影响（挂单量和价格），但TAT模式下可能有其他市商AI存在。
                </p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          width="240"
          prop="serverUrl"
          label="服务器地址"
          align="center"
        >
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, toRefs, computed } from "vue";

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const data = reactive({
      tableData: [
        {
          exchangeName: "Pudge",
          exchangeType: "Simulation",
          contract: "-",
          serverUrl: "tcp://47.100.187.214:10000",
        },
      ],
    });
    const dialogVisible = computed({
      get() {
        return props.dialog;
      },
      set(val) {
        emit("update:dialog", val);
      },
    });
    return {
      ...toRefs(data),
      dialogVisible,
    };
  },
};
</script>
<style lang="scss" scoped>
.api {
  width: 0;
  height: 0;
}
.doubt {
  font-size: 13px;
  line-height: 20px;
  .doubt-margin {
    margin-top: 10px;
  }
}
:deep(.el-dialog__body) {
  padding: 0 !important;
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
    padding: 0 8px !important;
    .el-button {
      padding: 0;
      width: 74px;
      min-height: 18px;
      height: 18px;
    }
  }
}
.el-icon-question {
  color: #999;
  cursor: pointer;
}
</style>
