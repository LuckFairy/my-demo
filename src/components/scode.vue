<template>
  <div class="box">
    <div class="top">
      <div class="top-left">扫码登录</div>
      <div class="top-right" @click="toggleFilter">
        <img src="../assets/imgs/qutego_11.png">
        <img src="../assets/imgs/qutego_09.png">
      </div>
    </div>
    <div class="content">
      <div :id="el"></div>
    </div>
    <div class="footer">
      <span>请使用婴众趣购营销APP扫码登录</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    el: {
      type: String,
      required: true
    }
  },
  methods: {
    toggleFilter() {
      this.$emit("toggle", "B");
    }
  }
};
</script>
<style lang="stylus" scoped>
.box {
  padding: 40px 32px;

  .top {
    overflow: hidden;

    .top-left {
      color: #424242;
      font-size: 14px;
      float: left;
    }

    .top-right {
      float: right;

      &:hover {
        cursor: pointer;
      }

      img:first-child {
        height: 32px;
        width: 80px;
        margin-right: 12px;
      }

      img:nth-of-type(2) {
        height: 32px;
        width: 32px;
      }
    }
  }

  .content {
    text-align: center;
    margin-top: 40px;

    div {
      width: 200px;
      height: 200px;
      display: inline-block;
    }
  }

  .footer {
    margin-top: 24px;
    font-size: 16px;
    color: #424242;
    text-align: center;
  }
}
</style>

