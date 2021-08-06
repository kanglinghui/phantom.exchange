<template>
  <div class="footer">
    <div class="f-left">
      <div>
        <p class="for_the_record">ICP备 沪XXXXXXXX</p>
      </div>
      <div class="m-l">
        <p class="title">ngtrade API下载:</p>
        <p><a>C++ win32</a></p>
        <p><a>C++ win64</a></p>
        <p><a>C++ Linux x64</a></p>
      </div>
      <div class="m-l">
        <p class="title">ngticker API下载:</p>
        <p><a>C++ win32</a></p>
        <p><a>C++ win64</a></p>
        <p><a>C++ Linux x64</a></p>
      </div>
    </div>
    <div class="f-right">
      <p>©Copyright 2021 PhantomExchange</p>
      <p>客服微信: xxxxxxx</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.footer {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 5px 8px 5px 8px;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  .f-left {
    display: flex;
    justify-content: space-around;
  }
  p {
    line-height: 16px;
  }
  p.title {
    margin-bottom: 5px;
    font-weight: 600;
    color: rgb(232, 87, 32);
  }
  p a {
    transition: 0.5s;
    color: #606266;
    &:hover {
      color: rgb(232, 87, 32);
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
.m-l {
  margin-left: 50px;
}
</style>
