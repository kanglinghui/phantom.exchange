<template>
  <div class="matching">
    <el-dialog
      title="撮合设置"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="900px"
      top="8vh"
    >
      <div class="box">
        <div class="left">
          <p v-for="(item, i) in leftData" :key="i">
            <span class="label">{{ item.label }}</span>
            <i class="num">{{ item.num }}</i>
          </p>
        </div>
        <div class="right">
          <div class="head">
            <div>
              <el-button type="danger" icon="el-icon-delete"
                >批量删除</el-button
              >
            </div>
            <div class="flex">
              <el-input placeholder="交易所ID" v-model="input" clearable>
              </el-input>
              <el-select
                v-model="value"
                filterable
                clearable
                placeholder="合约ID"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-button type="primary" icon="el-icon-plus">增加合约</el-button>
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
                width="180"
              >
              </el-table-column>
              <el-table-column prop="contract" align="center" label="合约ID">
              </el-table-column>
              <el-table-column label="操作" align="center" width="100">
                <template v-slot:default="scope">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="rowdDel(scope.row)"
                    >删 除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
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
      leftData: [
        { label: "立即全部成交", num: 5 },
        { label: "挂单", num: 0 },
        { label: "立即部分成交后挂单", num: 0 },
        { label: "等比例部分成交后撤单", num: 0 },
        { label: "立即部分成交后撤单", num: 0 },
        { label: "立即废单", num: 0 },
        { label: "立即拒单", num: 0 },
      ],
      tableData: [{ exchange: "SH", contract: "600570" }],
      options: [],
      value: "",
      input: "",
    });
    const dialogVisible = computed({
      get() {
        return props.dialog;
      },
      set(val) {
        emit("update:dialog", val);
      },
    });
    const handleSelectionChange = (row) => {
      // 表格选中
      console.log(row);
    };
    const rowdDel = (row) => {
      console.log(row);
    };
    return {
      ...toRefs(data),
      dialogVisible,
      handleSelectionChange,
      rowdDel,
    };
  },
};
</script>
<style lang="scss" scoped>
.matching {
  width: 0;
  height: 0;
}
.box {
  font-size: 13px;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);
  .left {
    p {
      padding: 0 5px;
      line-height: 26px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      font-size: 13px;
      .label {
        display: inline-block;
        width: 150px;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
      }
      .num {
        text-align: center;
        display: inline-block;
        width: 50px;
        color: #dc2828;
      }
    }
  }
  .right {
    width: calc(100% - 212px);
    .head {
      padding: 5px 10px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      .flex {
        display: flex;
        &:deep(.el-input) {
          margin-right: 10px;
          width: 130px;
        }
        // &:deep(.el-input__inner) {
        //   width: 130px;
        // }
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
:deep(.el-dialog__body) {
  padding: 0 !important;
}
:deep(th) {
  color: #303133;
  background-color: #e2e2e3;
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
</style>
