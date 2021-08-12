<template>
  <div class="header" :style="loginShow ? 'top:35px' : 'top:0px'">
    <div class="head-l">
      <div class="head-img">
        <el-dropdown v-if="!loginShow">
          <img src="@/assets/images/head.png" alt="" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="change_pass"
                ><i class="el-icon-lock"></i>修改密码</el-dropdown-item
              >
              <!-- <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <img v-else src="@/assets/images/head.png" alt="" />
      </div>
      <ul class="list">
        <li
          v-for="(item, i) in routeList"
          :key="i"
          :class="['head-list', { active: activeIndex === item.path }]"
          @click="headClick(item)"
        >
          <span>{{ item.meta.title }}</span>
          <i
            class="el-icon-circle-close"
            @click.stop="exit(i)"
            v-if="item.meta.exit"
          ></i>
        </li>
      </ul>
    </div>
    <div class="title">Phantom Exchange</div>
  </div>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="550px"
    >
      <ChangePassUI v-model:pass="dialogVisible" v-if="dialogVisible" />
    </el-dialog>
  </div>
</template>
<script>
import { watch, reactive, toRefs, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import routes from "@/router/routes.js";
import { useStore } from "vuex";
import ChangePassUI from "./components/ChangePass.vue";
export default {
  components: {
    ChangePassUI,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const data = reactive({
      routeList: routes.filter((item) => item.meta.head),
      activeIndex: route.path,
      dialogTitle: "",
      dialogVisible: false,
    });
    const store = useStore();
    const loginShow = computed(() => {
      return store.state.loginShow;
    });
    watch(
      () => route.path,
      (newValue) => {
        data.activeIndex = newValue;
      }
    );
    const headClick = (route) => {
      //鼠标点击
      router.push(route.path);
    };
    const exit = (idx) => {
      //鼠标点击关闭按钮
      data.routeList.splice(idx, 1);
      router.push("/");
    };
    const change_pass = () => {
      // 修改密码
      data.dialogVisible = true;
      data.dialogTitle = "修改密码";
    };
    return {
      ...toRefs(data),
      headClick,
      exit,
      loginShow,
      change_pass,
    };
  },
};
</script>
<style lang="scss" scoped>
.header {
  width: 100vw;
  height: 30px;
  background-color: #fff;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
  .head-l {
    display: flex;
  }
  .title {
    margin-right: 5px;
  }
  .head-img {
    padding: 2px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    img {
      width: 24px;
      height: 24px;
      border-radius: 2px;
    }
  }
  ul {
    display: flex;
    width: calc(100vw - 170px);
    overflow-x: auto;
    li {
      line-height: 30px;
      padding: 0 15px;
      cursor: pointer;
      transition: 0.5s;
      position: relative;
      box-sizing: border-box;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      &:hover {
        background-color: rgba(215, 18, 115, 0.8);
        color: #fff;
        i {
          opacity: 1;
        }
      }
      i {
        position: absolute;
        right: 2px;
        top: 3px;
        opacity: 0;
        z-index: 2;
        &:hover {
          transform: scale(1.1);
          color: #ffe2aa;
        }
      }
    }
    li.active {
      background-color: rgb(215, 18, 115);
      color: #fff;
    }
  }
}
</style>
