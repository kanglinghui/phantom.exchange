<template>
  <div class="portfolio">
    <el-dialog
      title="投资组合设置"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="950px"
      top="8vh"
    >
      <div class="box">
        <div class="left">
          <p class="title">组合名称</p>
          <div class="l-main">
            <p v-for="(item, i) in portfolioNameList" :key="i" class="p">
              {{ item.label }}
            </p>
          </div>
          <div class="footer">
            <div></div>
            <div>
              <span> <i class="el-icon-minus"></i></span>
              <span> <i class="el-icon-plus"></i></span>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="tabs">
            <div class="tabs-head">
              <h3
                v-for="item in tabs"
                :key="item"
                @click="tabsClick(item)"
                :class="{ active: tabsName === item }"
              >
                资金管理
              </h3>
            </div>
            <transition name="el-fade-in-linear">
              <div class="money" v-show="tabsName === '资金管理'">
                <div class="head">
                  <div class="head-l">
                    <i class="el-icon-minus"></i>
                    <el-input-number
                      class="red-num"
                      :controls="false"
                      v-model="num"
                      :precision="2"
                      :min="0"
                    ></el-input-number>
                    <el-button type="primary" class="red"
                      >红冲可用资金</el-button
                    >
                  </div>
                  <div class="head-r">
                    <i class="el-icon-plus"></i>
                    <el-input-number
                      class="blue-num"
                      :controls="false"
                      v-model="num"
                      :precision="2"
                      :min="0"
                    ></el-input-number>
                    <el-button type="primary" class="blue"
                      >蓝补可用资金</el-button
                    >
                  </div>
                </div>
                <div class="form">
                  <div class="form-box">
                    <div class="spea">
                      <span class="label">可用资金:</span>
                      <el-input-number
                        :controls="false"
                        v-model="num"
                        :precision="2"
                        :min="0"
                      ></el-input-number>
                    </div>
                    <div class="spea">
                      <span class="label">下单冻结资金:</span>
                      <el-input-number
                        :controls="false"
                        v-model="num"
                        :precision="2"
                        :min="0"
                      ></el-input-number>
                    </div>
                    <div class="“spea">
                      <span class="label">浮动盈亏:</span>
                      <el-input-number
                        :controls="false"
                        v-model="num"
                        :precision="2"
                        :min="0"
                      ></el-input-number>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="el-fade-in-linear">
              <div class="position" v-show="tabsName === '持仓管理'">
                <div class="p-head">
                  <div class="p-h-l">
                    <el-button
                      type="primary"
                      icon="el-icon-plus"
                      @click="addPosition"
                      >新增持仓</el-button
                    >
                    <el-button type="danger" icon="el-icon-delete"
                      >批量删除</el-button
                    >
                  </div>
                  <div class="p-h-r">
                    <el-input-number
                      :controls="false"
                      v-model="num"
                      :precision="0"
                      :min="0"
                    ></el-input-number>
                    <el-button type="primary" plain icon="el-icon-set-up"
                      >批量调整数量</el-button
                    >
                  </div>
                </div>
                <div class="filter">
                  <span>输入代码合约进行过滤</span>
                  <el-input
                    v-model="input"
                    clearable
                    placeholder="请输入合约代码"
                  ></el-input>
                </div>
                <div class="table">
                  <el-table
                    empty-text="暂无数据"
                    :data="tableData"
                    ref="table"
                    border
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange"
                    stripe
                    style="width: 100%"
                    height="450px"
                  >
                    <el-table-column type="selection" width="55" align="center">
                    </el-table-column>

                    <el-table-column
                      prop="exchange"
                      label="交易所"
                      align="center"
                      show-overflow-tooltip
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
                      prop="positionfx"
                      align="center"
                      label="持仓方向"
                      width="80"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="positionPrice"
                      align="center"
                      label="持仓均价"
                      width="120"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="positionNum"
                      align="center"
                      label="持仓数量"
                    >
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="175">
                      <template v-slot:default="scope">
                        <el-button
                          type="primary"
                          icon="el-icon-set-up"
                          plain
                          @click="rowdDel(scope.row)"
                          >调整数量</el-button
                        >
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          plain
                          @click="rowdDel(scope.row)"
                          >删除持仓</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="新增持仓"
      v-model="addPositionShow"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="350px"
      top="15vh"
    >
      <AddPosition v-if="addPositionShow" @add="addSub($event)" />
    </el-dialog>
  </div>
</template>
<script>
import { reactive, toRefs, computed } from "vue";

import AddPosition from "./components/AddPosition.vue";

export default {
  components: {
    AddPosition,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const data = reactive({
      portfolioNameList: [{ label: "模拟组合1" }, { label: "模拟组合2" }],
      tabsName: "资金管理",
      num: undefined,
      tabs: ["资金管理", "持仓管理"],
      addPositionShow: false,
      tableData: [
        {
          exchange: "SH",
          contract: "600570",
          positionfx: "多",
          positionPrice: "6122.23",
          positionNum: "50000",
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
    const tabsClick = (val) => {
      data.tabsName = val;
    };
    const handleSelectionChange = (row) => {
      // 表格选中
      console.log(row);
    };
    const rowdDel = (row) => {
      // 表格删除
      console.log(row);
    };
    const addPosition = () => {
      // 新增持仓
      data.addPositionShow = true;
    };
    const addSub = (val) => {
      // 新增持仓确认
      console.log(val);
      data.addPositionShow = false;
    };
    return {
      ...toRefs(data),
      dialogVisible,
      tabsClick,
      handleSelectionChange,
      rowdDel,
      addPosition,
      addSub,
    };
  },
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  font-size: 13px;
  .left {
    .title {
      text-align: center;
      background-color: #dcdfe6;
      color: #303133;
      padding: 2px 10px;
    }
    .p {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: 0.5s;
      &:hover {
        background-color: #f7f7f7;
        color: #dc2828;
      }
    }
    p {
      line-height: 20px;
      padding: 0 10px;
    }
    p {
      width: 200px;
    }
    .l-main {
      height: 458px;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      width: 220px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      span {
        display: inline-block;
        padding: 0 5px;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  }
  .right {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    width: calc(100% - 220px);
    height: 501px;
    overflow: hidden;
    .tabs {
      .tabs-head {
        display: flex;
        h3 {
          width: 50%;
          margin: 0;
          line-height: 34px;
          text-align: center;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          transition: 0.5s;
          cursor: pointer;
          &:hover {
            background-color: #ecf5ff;
          }
          &:last-child {
            border-left: 1px solid rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
          }
          &.active {
            background-color: #fdf5e6;
            color: #303133;
            // color: #fff;
          }
        }
      }
      .money {
        .head {
          display: flex;
          justify-content: space-between;
          height: 34px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding: 0 10px;
          .head-l,
          .head-r {
            margin-top: 3px;
            i {
              margin-right: 5px;
              color: #409eff;
            }
            .red,
            .blue {
              margin-left: 5px;
            }
            .red-num {
              :deep(.el-input__inner) {
                color: #dc2828 !important;
              }
              :deep(.el-input__inner:focus) {
                border-color: #dc2828 !important;
              }
            }
            .blue-num {
              :deep(.el-input__inner) {
                color: #409eff !important;
              }
            }
            .red {
              background-color: #dc2828;
              border-color: #dc2828;
              &:hover {
                opacity: 0.8;
              }
            }
          }
          .head-l {
            i {
              color: #dc2828;
            }
          }
        }
        .form {
          height: 430px;
          display: flex;
          justify-content: center;
          align-items: center;
          .form-box {
            height: 200px;
            width: 300px;
            .spea {
              margin-bottom: 10px;
            }
            .label {
              display: inline-block;
              width: 120px;
            }
          }
        }
      }
      .position {
        .p-head {
          display: flex;
          justify-content: space-between;
          height: 34px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding: 0 10px;
          .p-h-l,
          .p-h-r {
            margin-top: 3px;
            .el-input-number {
              margin-right: 10px;
            }
          }
        }
        .filter {
          padding: 5px 10px;
          display: flex;
          span {
            line-height: 28px;
            margin-right: 15px;
          }
          &:deep(.el-input) {
            width: 150px;
          }
        }
      }
    }
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
.el-icon-question {
  color: #999;
  cursor: pointer;
}
</style>
