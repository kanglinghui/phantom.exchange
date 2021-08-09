<template>
  <div class="market_simulation">
    <div class="t-box">
      <div class="config public">
        <div class="config-btn">
          <span @click="matching"><i class="el-icon-setting"></i>撮合配置</span>
        </div>
        <div class="config-btn">
          <span><i class="el-icon-setting"></i>投资组合配置</span>
        </div>
        <div class="config-btn">
          <span><i class="el-icon-setting"></i>API接入信息</span>
        </div>
        <div class="des">
          <span>参数配置 & API接入信息</span>
        </div>
      </div>
      <div class="trad-mode-filter public">
        <el-checkbox-group v-model="checkList">
          <div class="checkBox">
            <el-checkbox label="自由交易模式"></el-checkbox>
          </div>
          <div class="checkBox">
            <el-checkbox label="投资组合模式"></el-checkbox>
          </div>
          <div class="checkBox">
            <el-checkbox label="市场仿真模式"></el-checkbox>
          </div>
        </el-checkbox-group>
        <div class="des">
          <span>交易模式过滤</span>
          <el-popover
            placement="top-start"
            title=""
            :width="100"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          >
            <template #reference>
              <i class="el-icon-question"></i>
            </template>
          </el-popover>
        </div>
      </div>
      <div class="direction-filter public">
        <el-checkbox-group v-model="checkList">
          <div class="checkBox"><el-checkbox label="买"></el-checkbox></div>
          <div class="checkBox"><el-checkbox label="卖"></el-checkbox></div>
        </el-checkbox-group>
        <div class="des">
          <span>方向过滤</span>
        </div>
      </div>
      <div class="special-mark-filter public">
        <el-checkbox-group v-model="checkList">
          <div class="checkBox"><el-checkbox label="开仓"></el-checkbox></div>
          <div class="checkBox"><el-checkbox label="平仓"></el-checkbox></div>
          <div class="checkBox"><el-checkbox label="投机"></el-checkbox></div>
          <div class="checkBox"><el-checkbox label="套保"></el-checkbox></div>
        </el-checkbox-group>
        <div class="des">
          <span>特殊标志过滤</span>
        </div>
      </div>
      <div class="order-status-filter public">
        <el-checkbox-group v-model="checkList">
          <div class="check">
            <el-checkbox label="全部成交"
              >全部成交<br /><i class="EN">(Filled)</i></el-checkbox
            >
          </div>
          <div class="check" style="margin-right: 25px">
            <el-checkbox label="已报"
              >已报<br /><i class="EN">(New)</i></el-checkbox
            >
          </div>
          <div class="check">
            >
            <el-checkbox label="部分成交部分撤单"
              >部分成交部分撤单<br /><i class="EN"
                >(PartialFilledCanceled)</i
              ></el-checkbox
            >
          </div>
          <div class="check" style="margin-right: -3px">
            <el-checkbox label="已撤单"
              >已撤单<br /><i class="EN">(Canceled)</i></el-checkbox
            >
          </div>
          <div class="check">
            >
            <el-checkbox label="部分成交"
              >部分成交<br /><i class="EN">(Partial Filled)</i></el-checkbox
            >
          </div>
          <div class="check" style="margin-right: -1px">
            <el-checkbox label="已拒绝"
              >已拒绝<br /><i class="EN">(Rejected)</i></el-checkbox
            >
          </div>
        </el-checkbox-group>
        <div class="des">
          <span>订单状态过滤</span>
          <el-popover
            placement="top-start"
            title=""
            :width="100"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          >
            <template #reference>
              <i class="el-icon-question"></i>
            </template>
          </el-popover>
        </div>
      </div>
      <div class="exchange-contract-filter public">
        <div class="flex">
          <span>交易所ID<br /><i>(|分隔)</i></span>
          <el-input
            placeholder="SH|SZ|CFFEX"
            v-model="input"
            clearable
          ></el-input>
        </div>
        <div class="flex">
          <span>合约ID<br /><i>(|分隔)</i></span>
          <el-input
            placeholder="600570|002156"
            v-model="input"
            clearable
          ></el-input>
        </div>
        <div class="des">
          <span>交易所及合约过滤</span>
          <el-popover
            placement="top-start"
            title=""
            :width="100"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          >
            <template #reference>
              <i class="el-icon-question"></i>
            </template>
          </el-popover>
        </div>
      </div>
      <div class="amount-filter public">
        <p class="p">成交金额</p>
        <div class="flex">
          <el-input-number
            v-model="num"
            :min="-1"
            :max="999999999999"
            :controls="false"
          ></el-input-number>
          <span>-</span>
          <el-input-number
            v-model="num"
            :min="-1"
            :max="999999999999"
            :controls="false"
          ></el-input-number>
        </div>
        <p class="p">成交数量</p>
        <div class="flex">
          <el-input-number
            v-model="num"
            :precision="0"
            :min="-1"
            :max="999999999999"
            :controls="false"
          ></el-input-number>
          <span>-</span>
          <el-input-number
            v-model="num"
            :precision="0"
            :min="-1"
            :max="999999999999"
            :controls="false"
          ></el-input-number>
        </div>
        <div class="des">
          <span>交易金额及数量过滤</span>
        </div>
      </div>
    </div>
    <div class="c-box">
      <div class="table-box">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
          :cell-class-name="cellName"
          empty-text="暂无数据"
          ref="table"
          :header-cell-class-name="'heade-cell'"
          border
          :height="height.table"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="mode"
            align="center"
            label="交易模式"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="date"
            align="center"
            label="报单时间"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="trade"
            align="center"
            label="交易所"
            width="70"
          >
          </el-table-column>
          <el-table-column
            prop="contract"
            align="center"
            label="合约代码"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="order_type"
            align="center"
            label="订单类型"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="order_num"
            align="center"
            label="订单数量"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="order_price"
            align="center"
            label="订单价格"
            width="100"
          >
          </el-table-column>
          <el-table-column prop="order_amount" align="center" label="订单金额">
          </el-table-column>
          <el-table-column
            prop="direction"
            align="center"
            label="买卖方向"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="kaiping"
            align="center"
            label="开平模式"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="order_status"
            align="center"
            show-overflow-tooltip
            label="订单状态"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="progress"
            align="center"
            label="成交进度"
            width="120"
          >
            <template v-slot:default="scope">
              <el-progress
                :text-inside="true"
                :stroke-width="10"
                :color="[
                  scope.row.direction === '买'
                    ? 'rgba(218, 43, 48, 0.8)'
                    : 'rgba(27,180,39,0.8)',
                ]"
                :percentage="
                  parseInt((scope.row.progress / scope.row.sumProgress) * 100)
                "
                status="exception"
              >
                <span>{{
                  `${scope.row.progress}/${scope.row.sumProgress}`
                }}</span>
              </el-progress>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="150"
            header-align="center"
          >
            <template v-slot:default="scope">
              <span class="table_btn cj" @click="clinch(scope.row)">成交</span>
              <span class="table_btn cd">撤单</span>
              <span class="table_btn detail">详情</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tabs-box">
        <el-tabs type="border-card">
          <el-tab-pane label="自由交易">
            <el-scrollbar
              ><FreeTradeUI
                @sub="declaration($event)"
                :height="height.tabs"
              /> </el-scrollbar
          ></el-tab-pane>
          <el-tab-pane label="投资组合交易" v-if="false">
            <el-scrollbar><PortfolioUI :height="height.tabs" /> </el-scrollbar
          ></el-tab-pane>
          <el-tab-pane label="市场仿真交易" v-if="false">
            <el-scrollbar><SimulationUI :height="height.tabs" /> </el-scrollbar
          ></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <DialogMatching v-if="matchingShow" v-model:dialog="matchingShow" />
  </div>
</template>
<script>
import {
  reactive,
  toRefs,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { useStore } from "vuex";
import FreeTradeUI from "./components/FreeTrade.vue";
import PortfolioUI from "./components/Portfolio.vue";
import SimulationUI from "./components/Simulation.vue";

import DialogMatching from "@/components/dialog/Matching.vue";

import { ElNotification } from "element-plus";

export default {
  components: {
    FreeTradeUI,
    PortfolioUI,
    SimulationUI,
    DialogMatching,
  },
  setup() {
    const store = useStore();
    let timer = null;
    const data = reactive({
      checkList: [],
      input: "",
      num: -1,
      tableData: [],
      tableLoading: false,
      matchingShow: false,
    });
    onMounted(() => {
      timer = setTimeout(() => {
        data.tableData = [
          {
            date: "0801",
            order_status: "部分成交部分撤单",
            direction: "买",
            sumProgress: "100",
            progress: 80,
          },
          {
            date: "0802",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0803",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0804",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0805",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0806",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0807",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0808",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0809",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0810",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0801",
            order_status: "部分成交部分撤单",
            direction: "买",
            sumProgress: "100",
            progress: 80,
          },
          {
            date: "0802",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0803",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0804",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0805",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0806",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0807",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0808",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0809",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0810",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0801",
            order_status: "部分成交部分撤单",
            direction: "买",
            sumProgress: "100",
            progress: 80,
          },
          {
            date: "0802",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0803",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0804",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0805",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0806",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0807",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0808",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0809",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
          {
            date: "0810",
            order_status: "部分成交部分撤单",
            direction: "卖",
            sumProgress: "120",
            progress: 99,
          },
        ];
        nextTick(() => {
          let dom = document.querySelector(
            ".table-box .el-table .el-table__body-wrapper"
          );
          console.log(dom, 1);
          const offsetHeight = dom.offsetHeight;
          dom.onscroll = () => {
            const scrollTop = dom.scrollTop;
            const scrollHeight = dom.scrollHeight;
            console.log(scrollTop, scrollHeight, offsetHeight);
            if (offsetHeight + scrollTop - scrollHeight >= 4) {
              data.tableLoading = true;
              setTimeout(() => {
                data.tableData.push(
                  ...[
                    {
                      date: "0805",
                      order_status: "部分成交部分撤单",
                      direction: "卖",
                      sumProgress: "120",
                      progress: 99,
                    },
                    {
                      date: "0805",
                      order_status: "部分成交部分撤单",
                      direction: "卖",
                      sumProgress: "120",
                      progress: 99,
                    },
                    {
                      date: "0805",
                      order_status: "部分成交部分撤单",
                      direction: "卖",
                      sumProgress: "120",
                      progress: 99,
                    },
                    {
                      date: "0805",
                      order_status: "部分成交部分撤单",
                      direction: "卖",
                      sumProgress: "120",
                      progress: 99,
                    },

                    {
                      date: "0805",
                      order_status: "部分成交部分撤单",
                      direction: "卖",
                      sumProgress: "120",
                      progress: 99,
                    },
                    {
                      date: "0805",
                      order_status: "部分成交部分撤单",
                      direction: "卖",
                      sumProgress: "120",
                      progress: 99,
                    },
                  ]
                );
                data.tableLoading = false;
              }, 1000);
            }
          };
        });
      }, 500);
    });
    onBeforeUnmount(() => {
      timer && clearTimeout(timer);
    });
    const height = computed(() => {
      const logStatus = store.state.logShowStatus;
      const loginStatus = store.state.loginShow;
      const msgStatus = store.state.msgShow;
      if (logStatus && loginStatus && msgStatus) {
        return { table: "calc(100vh - 430px)", tabs: "calc(100vh - 460px)" };
      } else if (logStatus && msgStatus && !loginStatus) {
        return { table: "calc(100vh - 395px)", tabs: "calc(100vh - 425px)" };
      } else if (loginStatus && msgStatus && !logStatus) {
        return { table: "calc(100vh - 305px)", tabs: "calc(100vh - 335px)" };
      } else if (msgStatus && !loginStatus && !logStatus) {
        return { table: "calc(100vh - 270px)", tabs: "calc(100vh - 300px)" };
      } else if (!msgStatus && logStatus && !loginStatus) {
        return { table: "calc(100vh - 375px)", tabs: "calc(100vh - 405px)" };
      } else if (!msgStatus && !logStatus && loginStatus) {
        return { table: "calc(100vh - 285px)", tabs: "calc(100vh - 315px)" };
      } else if (!msgStatus && logStatus && loginStatus) {
        return { table: "calc(100vh - 415px)", tabs: "calc(100vh - 445px)" };
      } else {
        return { table: "calc(100vh - 250px)", tabs: "calc(100vh - 280px)" };
      }
    });
    const clinch = (row) => {
      console.log(row);
      ElNotification.error({
        title: "错误",
        customClass: "err__info",
        message: "我是消息通知",
      });
    };
    const cellName = (row) => {
      if (row.column.label === "买卖方向" && row.row.direction === "买") {
        return "red-class row-cell";
      } else if (
        row.column.label === "买卖方向" &&
        row.row.direction === "卖"
      ) {
        return "green-class row-cell";
      } else {
        return "row-cell";
      }
    };
    const declaration = (form) => {
      console.log(form, "form");
    };
    const matching = () => {
      // 撮合配置
      console.log(data.matchingShow, 1111);
      data.matchingShow = true;
      console.log(data.matchingShow, 2);
    };
    return {
      ...toRefs(data),
      clinch,
      cellName,
      declaration,
      height,
      matching,
    };
  },
};
</script>
<style lang="scss" scoped>
.market_simulation {
  color: #272829;
  height: 100%;
  .t-box {
    display: flex;
    // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .config {
      width: 130px;
      .config-btn {
        padding: 0 10px;
        span {
          display: inline-block;
          width: 100px;
          padding: 2px 5px;
          transition: 0.5s;
          i {
            margin-right: 8px;
          }
          &:hover {
            background-color: #66b1ff;
            border-radius: 1px;
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
  }
  .trad-mode-filter {
    padding: 5px 10px 0 10px;
  }
  .direction-filter {
    width: 50px;
  }
  .special-mark-filter {
    width: 60px;
  }
  .order-status-filter {
    width: 235px;
    .check {
      //   margin-bottom: 5px;
    }
    .el-checkbox-group {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      :deep(.el-checkbox) {
        display: flex;
        align-items: center;
        i {
          font-size: 10px;
          color: #606266;
        }
      }
      .is-checked i.EN {
        color: #409eff;
      }
    }
  }
  .exchange-contract-filter {
    font-size: 13px;
    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
      :deep(.el-input__inner) {
        line-height: 22px;
        height: 22px;
      }
      span {
        margin-right: 5px;
        i {
          font-size: 12px;
          color: #909399;
        }
      }
      .el-input {
        width: 130px;
      }
    }
  }
  .amount-filter {
    .p {
      font-size: 12px;
    }
    .flex {
      .el-input-number {
        width: 100px;
      }
      span {
        margin: 0 5px;
      }
      :deep(.el-input__inner) {
        line-height: 22px;
        height: 22px;
      }
    }
  }
}
.c-box {
  width: 100vw;
  display: flex;
  .table-box {
    width: calc(100vw - 250px);
  }
  .tabs-box {
    width: 250px;
  }
}
.el-icon-question {
  cursor: pointer;
}
.des {
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
  padding: 5px 0;
}
.public {
  position: relative;
  padding: 5px 10px 18px 10px;
  font-size: 13px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.checkBox {
  //   margin-top: 10px;
}
:deep(.el-checkbox__label) {
  font-weight: 400;
  color: #272829;
  font-size: 12px;
  line-height: 14px;
}
.table_btn {
  display: inline-block;
  height: 20px;
  padding: 0 8px;
  font-size: 13px;
  color: #409eff;
  line-height: 20px;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 1px;
  &:hover {
    color: #fff;
    background-color: #66b1ff;
  }
}
.cj {
  color: #67c23a;
  &:hover {
    background-color: #67c23a;
    color: #fff;
  }
}
.cd {
  color: #f56c6c;
  &:hover {
    background-color: #f56c6c;
  }
}

:deep(td.red-class) {
  background-color: rgba(218, 43, 48, 0.8) !important;
  color: #fff;
}
:deep(td.green-class) {
  background-color: rgba(27, 180, 39, 0.8) !important;
  color: #fff;
}
:deep(.el-progress-bar__outer) {
  background-color: rgba(0, 0, 0, 0.1);
  text-align: center;
}
:deep(.el-progress-bar__innerText) {
  width: 99px;
  text-align: center;
  span {
    display: block;
    transform: translateY(-1.5px);
  }
}
:deep(.el-tabs--border-card) {
  border-left: 0;
  box-shadow: 0;
}
:deep(.heade-cell) {
  font-size: 12px !important;
  background-color: rgb(226, 226, 227);
  color: #303133;
  .cell {
    line-height: 14px !important;
    font-size: 12px !important;
  }
}
:deep(.row-cell) {
  line-height: 14px !important;
  font-size: 12px !important;
  padding: 0 5px !important;
  .cell {
    line-height: 14px !important;
    font-size: 12px !important;
    padding: 0 5px !important;
  }
}
:deep(#tab-0) {
  &:hover {
    color: rgba(27, 180, 39, 0.8);
  }
  &.is-active {
    color: #fff;
    background-color: rgba(27, 180, 39, 0.8);
  }
}
:deep(#tab-1) {
  &:hover {
    color: rgba(232, 86, 30, 1);
  }
  &.is-active {
    color: #fff;
    background-color: rgba(232, 86, 30, 1);
  }
}
:deep(#tab-2) {
  &:hover {
    color: rgba(218, 43, 48, 0.9);
  }
  &.is-active {
    color: #fff;
    background-color: rgba(218, 43, 48, 0.9);
  }
}
</style>
