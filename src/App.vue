<template>
  <div id="app">
    <div id="logo"></div>
    <div class="items">
      <div class="itembox">
        <scode @toggle="toggle" :el="el" v-if="type === 'A'"></scode>
        <tel @toggle="toggle" :error="error" v-else-if="type === 'B'"></tel>
        <appcode :opt="code[index]" v-else></appcode>
      </div>
      <ul>
        <li
          v-for="(li,index) in lis"
          :key="li.id"
          :class="['li-item',li.active?'active':'']"
          @mouseover="selectStyle(li,index)"
          @mouseout="outStyle(li)"
        ></li>
      </ul>
      <div class="bottom">&copy;2018 婴众趣购版权所有</div>
    </div>
  </div>
</template>
<script>
import appcode from "./components/appcode.vue";
import scode from "./components/scode.vue";
import tel from "./components/tel.vue";
import QRCode from "qrcodejs2";

let qs = require("qs");
export default {
  components: {
    appcode,
    scode,
    tel,
    QRCode
  },
  data() {
    return {
      lis: [
        {
          active: false,
          text: "an"
        },
        {
          active: false,
          text: "iso"
        }
      ],
      type: "B",
      index: 0,
      phone: "", //手机号
      scode: "", //验证码
      el: "qrcode", //扫码登陆的二维码存放的元素名称
      error: null,
      code: [
        {
          title: "婴众趣购营销Android版",
          txt: "扫描二维码下载",
          el: "an",
          qrcode: "index.php?c=index&a=get_url"
        },
        {
          title: "婴众趣购营销iOS版",
          txt: "扫描二维码下载",
          el: "an",
          qrcode: "index.php?c=index&a=get_url&type=2"
        }
      ]
    };
  },

  methods: {
    toggle(state) {
      clearInterval(this.timer);
      if (state === "A") {
        this.axios.get("index.php?c=index&a=get_api_token").then(
          function(res) {
            let { err_code, err_msg } = res.data;
            if (err_code != 0) {
              alert("请刷新页面");
              return;
            }
            let text = JSON.stringify(err_msg.err_log);
            this.qrcode(this.el, text);
            clearInterval(this.timer);
            this.timer = setInterval(this.postInterval, 1000);
          }.bind(this)
        );
      }
      this.type = state;
    },
    qrcode(el, txt) {
      let qrcode = new QRCode(el, {
        width: 200,
        height: 200, // 高度
        correctLevel: QRCode.CorrectLevel.H
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      });
      qrcode.clear(); //清除二维码
      qrcode.makeCode(txt); //生成另一个新的二维码
    },

    postInterval() {
      this.axios
        .get("index.php?c=index&a=confirm_login")
        .then(
          function(res) {
            let { err_code, err_msg } = res.data;
            if (err_code == 2000) {
              clearInterval(this.timer);
              alert(err_msg.err_log);
            }
            if (err_code == 0) {
              clearInterval(this.timer);
              return (window.location.href =
                "./index.php?c=index&a=check_coupon");
            }
          }.bind(this)
        )
        .catch(error => {});
    },
    selectStyle(item, index) {
      let _this = this;
      this.$nextTick(() => {
        this.lis.forEach(li => {
          _this.$set(li, "active", false);
        });
        this.$set(item, "active", true);
        this.axios.get(this.code[index].qrcode).then(
          function(res) {
            let { err_code, err_msg } = res.data;
            if (err_code != 0 && !err_msg.url && err_msg.url == "") {
              console.error("服务器返回路径错误");
              return;
            }
            let url = err_msg.url;
            document.getElementById(this.code[index].el).innerHTML = "";
            this.index = index;
            this.qrcode(this.code[index].el, url);
          }.bind(this)
        );
        this.type = "C";
      });
    },
    outStyle(item) {
      this.type = "B";
      this.$set(item, "active", false);
    },
    changeCode(index) {
      clearInterval(this.timer);
      this.index = index;
      this.lis.forEach((li, i) => {
        if (i === index) {
          li.active = !li.active;
        } else {
          li.active = false;
        }
      });

      let flag = this.lis.filter(li => li.active);
      if (flag.length > 0) {
        console.log(this.code[index].qrcode);
        this.axios.get(this.code[index].qrcode).then(
          function(res) {
            console.log(this.code[index].qrcode, res);
            let { err_code, err_msg } = res.data;
            if (err_code != 0 && !err_msg.url && err_msg.url == "") {
              console.log("服务器返回路径错误");
              return;
            }
            let url = err_msg.url;
            document.getElementById(this.code[index].el).innerHTML = "";
            this.qrcode(this.code[index].el, url);
          }.bind(this)
        );

        this.type = "C";
      } else {
        this.type = "B";
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  width: 100%;
  min-height: 1000px;
  min-width: 800px;
  position: relative;
  background: url('./assets/imgs/back.jpg') left top / cover no-repeat;
}

#logo {
  color: #fff;
  position: relative;
  left: 80px;
  top: 24px;
  background: url('./assets/imgs/qutego_03.png') left center / 100% 100% no-repeat;
  width: 344px;
  height: 48px;
}

.items {
  position: absolute;
  left: 60%;
  top: 20%;

  .itembox {
    background: #ffffff;
    width: 420px;
    height: 420px;
    border-radius: 6px;
  }

  ul {
    margin-top: 64px;

    .li-item {
      display: inline-block;
      width: 200px;
      height: 64px;
      background: url('./assets/imgs/qutego_19.png') left top / 100% 100% no-repeat;

      &:hover {
        cursor: pointer;
      }

      &:nth-child(2) {
        margin-left: 20px;
        background-image: url('./assets/imgs/qutego_25.png');
      }
    }

    li.active {
      background-image: url('./assets/imgs/qutego_21.png');
    }

    li:nth-child(2).active {
      background-image: url('./assets/imgs/qutego_27.png');
    }
  }

  .bottom {
    text-align: center;
    font-size: 16px;
    margin-top: 64px;
  }
}
</style>


