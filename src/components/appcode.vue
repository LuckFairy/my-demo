<template>
  <div class="box">
    <div class="title">{{opt.title}}</div>
    <div class="content">
      <div :id="opt.el"></div>
    </div>
    <div class="footer">{{opt.txt}}</div>
  </div>
</template>
<script>
export default {
  props: {
    opt: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="stylus" scoped>
.box {
  color: #424242;
  text-align: center;
  padding: 40px 32px;

  .title {
    font-size: 24px;
  }

  .content {
    margin-top: 40px;

    div {
      width: 200px;
      height: 200px;
      display: inline-block;
    }
  }

  .footer {
    font-size: 16px;
    margin-top: 24px;
  }
}
</style>


