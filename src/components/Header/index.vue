<template>
  <div class="header">
    <div class="head-l">
      <div class="head-img">
        <img src="@/assets/images/head.png" alt="" />
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
</template>
<script>
import { watch, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import routes from "@/router/routes.js";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const data = reactive({
      routeList: routes.filter((item) => item.meta.head),
      activeIndex: route.path,
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
    return {
      ...toRefs(data),
      headClick,
      exit,
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
    padding: 2px 4px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    img {
      width: 26px;
      height: 26px;
      border-radius: 2px;
    }
  }
  ul {
    display: flex;
    width: calc(100vw - 182px);
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
