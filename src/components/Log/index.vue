<template>
  <div class="log">
    <div class="head">
      <ul class="list">
        <li
          v-for="(item, i) in btnList"
          :key="i"
          :class="{ active: activeIndex === i }"
        >
          <span>{{ item.title }}</span>
        </li>
      </ul>
      <div class="head-r" @click="logShow">
        <i :class="headRightClass"></i>
      </div>
    </div>
    <el-collapse-transition>
      <div class="main" v-show="showMain">
        <div class="left">
          <el-checkbox-group v-model="checkList">
            <div class="checkBox">
              <el-checkbox label="系统消息"></el-checkbox>
            </div>
            <div class="checkBox">
              <el-checkbox label="报单"></el-checkbox>
            </div>
            <div class="checkBox">
              <el-checkbox label="撤单"></el-checkbox>
            </div>
            <div class="checkBox">
              <el-checkbox label="订单回报"></el-checkbox>
            </div>
            <div class="checkBox">
              <el-checkbox label="成交回报"></el-checkbox>
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
        <div class="right">
          <div class="table-box">
            <el-table
              :data="tableData"
              :cell-class-name="'row-cell'"
              :header-cell-class-name="'heade-cell'"
              border
              height="126px"
              stripe
              style="width: 100%"
            >
              <el-table-column
                prop="title"
                align="center"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="date"
                align="center"
                width="145"
              ></el-table-column>
              <el-table-column
                prop="msg"
                show-overflow-tooltip
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const data = reactive({
      btnList: [{ title: "日志" }],
      activeIndex: 0,
      headRightClass: "el-icon-caret-top",
      checkList: [],
      showMain: true,
      tableData: [
        {
          title: "系统消息",
          date: "2021-08-31 00:00:00",
          msg: "xxxxxxxxxxxxxx",
        },
      ],
    });
    const logShow = () => {
      if (data.headRightClass === "el-icon-caret-bottom") {
        data.headRightClass = "el-icon-caret-top";
        data.showMain = true;
      } else {
        data.showMain = false;
        data.headRightClass = "el-icon-caret-bottom";
      }
      store.commit("SET_LOG_STATUS", data.showMain);
    };
    return {
      ...toRefs(data),
      logShow,
    };
  },
};
</script>
<style lang="scss" scoped>
.log {
  background-color: #fff;
  .head {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }
  ul.list {
    display: flex;
    width: calc(100vw - 50px);
    overflow-x: auto;
    li {
      line-height: 24px;
      padding: 0 15px;
      cursor: pointer;
      transition: 0.5s;
      position: relative;
      box-sizing: border-box;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      &:hover {
        background-color: rgba(211, 53, 53, 0.8);
        color: #fff;
      }
    }
    li.active {
      background-color: rgb(211, 53, 53);
      color: #fff;
    }
  }
  .head-r {
    width: 45px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    line-height: 24px;
    height: 24px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    color: #409eff;
    transition: 0.5s;
    &:hover {
      background-color: #409eff;
      color: #fff;
    }
  }
  .main {
    display: flex;
    .left {
      width: 100px;
      position: relative;
      padding: 5px 10px 20px 10px;
      font-size: 13px;
      border-bottom: 1px solid #ebeef5;
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
  }
  .right {
    width: calc(100vw - 100px);
  }
}
:deep(.el-checkbox__label) {
  font-weight: 400;
  color: #272829;
  font-size: 12px;
  line-height: 14px;
}
:deep(.heade-cell) {
  font-size: 12px !important;
  .cell {
    line-height: 14px !important;
    font-size: 12px !important;
  }
}
:deep(.el-table__header-wrapper) {
  display: none;
}
:deep(.row-cell) {
  line-height: 18px !important;
  font-size: 13px !important;
  padding: 0 5px !important;
  .cell {
    line-height: 18px !important;
    height: 18px !important;
    font-size: 13px !important;
    padding: 0 5px !important;
  }
}
</style>
