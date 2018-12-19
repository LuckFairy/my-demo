<template>
  <div class="box">
    <div class="top">
      <div class="top-left">短信登录</div>
      <div class="top-right" @click="toggleFilter">
        <img src="../assets/imgs/qutego_13.png">
        <img src="../assets/imgs/qutego_07.png">
      </div>
    </div>
    <div v-show="error" class="error">
      <img src="../assets/imgs/error_icon.png">
      <span>{{error}}</span>
    </div>
    <div class="content">
      <input type="tel" class="tel-input" autofocus="autofocus" placeholder="输入手机号" v-model="phone">
      <div class="scode-lable">
        <input type="number" class="scode-input" placeholder="输入验证码" v-model="scode">
        |
        <span @click="checkTelphone" :disabled="disabled" class="timer">{{btntxt}}</span>
      </div>
    </div>
    <div class="footer">
      <button @click="query">登 录</button>
    </div>
  </div>
</template>
<script>
let qs = require("qs");
export default {
  props: ["error"],
  data: function() {
    return {
      disabled: false,
      time: 0,
      btntxt: "获取验证码",
      phone: "",
      scode: ""
    };
  },
  methods: {
    toggleFilter() {
      this.$emit("toggle", "A");
    },
    checkTelphone() {
      if(this.disabled){return;}
      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.phone == "") {
        this.error = "请输入手机号码";
      } else if (!reg.test(this.phone)) {
        this.error = "手机格式不正确";
      } else {
        this.error = null;
        this.time = 60;
        this.disabled = true;
        this.timer();
        this.axios
          .post(
            "index.php?c=index&a=sendsms",
            qs.stringify({ phone: this.phone })
          )
          .then(res => {
            console.log(res);
            let { err_code, err_msg } = res.data;
            console.log(err_code);
            console.log(err_msg);

            if (err_code == 1000) {
              this.error = err_msg.err_log;
              this.time = 0;
              this.btntxt = "获取验证码";
              this.disabled = false;
            }
          });
      }
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      }
    },
    query() {
      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.phone == "") {
        this.error = "请输入手机号码";
        return;
      } else if (!reg.test(this.phone)) {
        this.error = "手机格式不正确";
        return;
      } else if (this.scode == "") {
        this.error = "请输入验证码";
        return;
      }
      this.error = null;
      let params = {
        phone: this.phone,
        code: this.scode
      };
      //将数据传给后台;
      this.axios.post("index.php?c=index&a=login", qs.stringify(params)).then(
        function(res) {
          let { err_code, err_msg } = res.data;
          console.log(err_code);
          console.log(err_msg);

          if (err_code == 1000) {
            return (this.error = err_msg.err_log);
          }

          if (err_code == 1) {
            return (window.location.href = err_msg.err_log);
          }
          this.error = null;
        }.bind(this)
      );
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

  .error {
    border: #ff525c 1px solid;
    border-radius: 6px;
    background: #ffe8e9;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;

    >img {
      width: 20px;
      height: 20px;
      margin: 0 10px;
      display: inline-block;
      vertical-align: middle;
    }

    >span {
      font-size: 16px;
      color: #424242;
    }
  }

  .content {
    font-size: 20px;
    color: #424242;
    margin-top: 16px;

    input:focus {
      outline: none;
    }

    >input {
      line-height: 64px;
      height: 64px;
      border: 1px solid #c0bebe;
      display: block;
      width: 100%;
      margin-bottom: 24px;
      border-radius: 5px;
      text-indent: 20px;
    }

    .scode-lable {
      line-height: 64px;
      height: 64px;
      border: 1px solid #c0bebe;
      border-radius: 5px;
      text-indent: 20px;
      color: #797979;

      input {
        border: none;
        color: #424242;
        height: 90%;
      }

      .timer {
        color: #ffdc00;
        font-size: 18px;
        display: inline-block;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .footer {
    margin-top: 24px;

    button {
      border: none;
      border-radius: 6px;
      background: #ffdc00;
      padding: 20px 144px;
      outline: none;
      margin-left: 20px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>

