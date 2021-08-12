<template>
  <div class="home">
    <h3>Phantom Exchange 模拟交易控制台</h3>
    <h3>功能</h3>
    <div class="box">
      <ul>
        <li v-for="(item, i) in functionList" :key="i">
          <div class="li-box">
            <img :src="item.logo" alt="" />
            <div class="item-center">
              <p>{{ item.title }}</p>
              <span>{{ item.dec }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <h3>帮助</h3>
    <div class="box">
      <ul>
        <li v-for="(item, i) in helpList" :key="i">
          <div class="li-box">
            <img :src="item.logo" alt="" />
            <div class="item-center">
              <p>{{ item.title }}</p>
              <span>{{ item.dec }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";

export default {
  name: "Home",
  setup() {
    const data = reactive({
      functionList: [
        {
          logo: require("@/assets/images/head.png"),
          title: "模拟撮合",
          dec: "使用NGTraderAPI进行保单测试",
        },
        {
          logo: require("@/assets/images/head.png"),
          title: "投资组合管理",
          dec: "管理您的投资组合",
        },
        {
          logo: require("@/assets/images/head.png"),
          title: "报单管理",
          dec: "查看历史报单记录",
        },
      ],
      helpList: [
        {
          logo: require("@/assets/images/head.png"),
          title: "概览",
          dec: "了解Phantom Exchange如何为您的交易带来帮助",
        },
        {
          logo: require("@/assets/images/head.png"),
          title: "API接入信息",
          dec: "查看API接入信息",
        },
        {
          logo: require("@/assets/images/head.png"),
          title: "教程",
          dec: "查看使用教程",
        },
        {
          logo: require("@/assets/images/head.png"),
          title: "联系我们",
          dec: "联系在线客服",
        },
      ],
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>
<style lang="scss" scoped>
.home {
  padding: 20px;
  h3 {
    color: #272829;
    font-size: 16px;
  }
  .box {
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 350px;
        .li-box {
          padding: 10px 20px;
          display: flex;
          align-items: center;
          transition: 0.5s;
          img {
            width: 60px;
            height: 60px;
            border-radius: 4px;
          }
          &:hover {
            border-radius: 4px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            cursor: pointer;
            .item-center span {
              color: #dc2828;
            }
            .item-center p {
              color: #dc2828;
            }
          }
          .item-center {
            margin-left: 15px;
            font-size: 13px;
            p {
              color: #303133;
              line-height: 20px;
            }
            span {
              line-height: 14px;
              font-size: 12px;
              color: #909399;
            }
          }
        }
      }
    }
  }
}
</style>
