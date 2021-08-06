<template>
  <div id="app">
    <HeaderUI />
    <MessageUI @status="msgStatus($event)" />
    <div class="appMain" :style="[appMainStyle, appMainHeight]">
      <el-scrollbar>
        <router-view />
      </el-scrollbar>
    </div>
    <LogUI />
    <FooterUI />
  </div>
</template>
<script>
import HeaderUI from "@/components/Header";
import MessageUI from "@/components/Message";
import LogUI from "@/components/Log";
import FooterUI from "@/components/Footer";
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    HeaderUI,
    MessageUI,
    LogUI,
    FooterUI,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      msgShow: false,
      loginShow: false,
    });
    const appMainStyle = computed(() => {
      if (data.msgShow && data.loginShow) {
        return "margin-top:75px;";
      } else if (data.msgShow) {
        return "margin-top: 50px";
      } else if (data.loginShow) {
        return "margin-top:55px";
      } else {
        return "margin-top:30px";
      }
    });
    const appMainHeight = computed(() => {
      const logStatus = store.state.logShowStatus;
      const loginStatus = store.state.loginShow;
      const msgShow = store.state.msgShow;
      if (logStatus && loginStatus && msgShow) {
        return "height:calc(100vh - 306px)";
      } else if (logStatus && msgShow && !loginStatus) {
        return "height:calc(100vh - 281px)";
      } else if (loginStatus && msgShow && !logStatus) {
        return "height:calc(100vh - 181px)";
      } else if (msgShow && !logStatus && !loginStatus) {
        return "height:calc(100vh - 156px)";
      } else if (!msgShow && logStatus && !loginStatus) {
        return "height:calc(100vh - 261px)";
      } else if (!msgShow && !logStatus && loginStatus) {
        return "height:calc(100vh - 161px)";
      } else {
        return "height:calc(100vh - 136px)";
      }
    });
    const msgStatus = (status) => {
      data.msgShow = status;
    };
    return {
      ...toRefs(data),
      msgStatus,
      appMainStyle,
      appMainHeight,
    };
  },
};
</script>
<style lang="scss">
#app {
  //   border-right: 1px solid rgba(0, 0, 0, 0.1);
  width: 100vw;
  .appMain {
    margin-top: 50px;
    height: calc(100vh - 155px);
    overflow: hidden;
  }
}
#nprogress .bar {
  background: rgb(215, 18, 115) !important;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
/*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/
::-webkit-scrollbar-track {
  width: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
/*滚动条的设置*/
::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
/*滚动条移上去的背景*/
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
