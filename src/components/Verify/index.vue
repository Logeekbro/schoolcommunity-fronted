<template>
  <el-dialog
    @open="initList"
    title="安全验证"
    @closed="handleClose"
    :visible.sync="visible"
    center
  >
    <el-alert
      v-if="hasError"
      :title="errorText + '，请刷新后重试'"
      type="error"
      description=""
      show-icon
    >
    </el-alert>
    <div>
      <strong>现有如下等式：</strong>
      <div style="width: 400px; height: 120px">
        <img :src="imgSrc" alt="验证码加载失败，请刷新后重试" />
      </div>
    </div>
    <el-divider></el-divider>
    <div v-if="showWords" id="components-a-tooltip-demo-placement">
      <div :style="{ marginLeft: `${buttonWidth}px`, whiteSpace: 'nowrap' }">
        <a-button
          @click="handleClick(wordMap.tl)"
          @mouseleave="handleLeave"
          @mouseenter="handleHover"
          id="tl"
        >
          {{ wordMap["tl"] }}
        </a-button>

        <a-button
          @click="handleClick(wordMap.top)"
          @mouseleave="handleLeave"
          @mouseenter="handleHover"
          id="top"
          >{{ wordMap["top"] }}
        </a-button>

        <a-button
          @click="handleClick(wordMap.tr)"
          @mouseleave="handleLeave"
          @mouseenter="handleHover"
          id="tr"
        >
          {{ wordMap["tr"] }}
        </a-button>
      </div>

      <div :style="{ width: `${buttonWidth}px`, float: 'left' }">
        <a-button
          @click="handleClick(wordMap.lt)"
          @mouseleave="handleLeave"
          @mouseenter="handleHover"
          id="lt"
        >
          {{ wordMap["lt"] }}
        </a-button>

        <a-button
          @click="handleClick(wordMap.left)"
          @mouseleave="handleLeave"
          @mouseenter="handleHover"
          id="left"
          >{{ wordMap["left"] }}
        </a-button>

        <a-button
          @click="handleClick(wordMap.lb)"
          @mouseleave="handleLeave"
          @mouseenter="handleHover"
          id="lb"
        >
          {{ wordMap["lb"] }}
        </a-button>
      </div>

      <div
        :style="{
          float: 'left',
          marginLeft: `${buttonWidth}px`,
          marginTop: '35px',
        }"
      >
        <strong
          >{{ clickIndex + 1 + ". " }}请问<span
            style="color: red; font-size: 24px"
            >{{ " " + clickOrder[clickIndex] + " " }}</span
          >=</strong
        >
        <br />
        <el-button @click="initList" type="text" icon="el-icon-refresh"
          >换一个</el-button
        >
      </div>

      <div
        :style="{
          width: `${buttonWidth}px`,
          marginLeft: `${buttonWidth * 4 + 24}px`,
        }"
      >
        <a-button
          @click="handleClick(wordMap.rt)"
          @mouseleave="handleLeave"
          @mouseenter="handleHover"
          id="rt"
        >
          {{ wordMap["rt"] }}
        </a-button>

        <a-button
          @click="handleClick(wordMap.right)"
          @mouseleave="handleLeave"
          @mouseenter="handleHover"
          id="right"
          >{{ wordMap["right"] }}</a-button
        >

        <a-button
          @click="handleClick(wordMap.rb)"
          @mouseleave="handleLeave"
          @mouseenter="handleHover"
          id="rb"
        >
          {{ wordMap["rb"] }}
        </a-button>
      </div>

      <div
        :style="{
          marginLeft: `${buttonWidth}px`,
          clear: 'both',
          whiteSpace: 'nowrap',
        }"
      >
        <a-button
          @click="handleClick(wordMap.bl)"
          @mouseleave="handleLeave"
          @mouseenter="handleHover"
          id="bl"
        >
          {{ wordMap["bl"] }}
        </a-button>

        <a-button
          @click="handleClick(wordMap.bottom)"
          @mouseleave="handleLeave"
          @mouseenter="handleHover"
          id="bottom"
          >{{ wordMap["bottom"] }}</a-button
        >

        <a-button
          @click="handleClick(wordMap.br)"
          @mouseleave="handleLeave"
          @mouseenter="handleHover"
          id="br"
        >
          {{ wordMap["br"] }}
        </a-button>
      </div>
    </div>
    <div class="content" v-else>
      <div v-loading="loading" v-if="loading"></div>

      <div v-else>
        <el-result icon="success" title="验证成功" subTitle=""></el-result>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { startVerify, doVerify } from "@/api/verify";
import { setVerifyToken } from "@/utils/auth";

export default {
  name: "Verify",
  components: {},
  // props: {
  //     verifyVisible: {
  //         type: Boolean,
  //         default: false
  //     }
  // },
  data() {
    return {
      buttonWidth: 70,
      // store.getters.verifyVisible
      visible: false,
      showWords: false,
      wordMap: {
        tl: "-",
        top: "-",
        tr: "-",
        lt: "-",
        left: "-",
        lb: "-",
        bl: "-",
        bottom: "-",
        br: "-",
        rt: "-",
        right: "-",
        rb: "-",
      },
      verifyId: "",
      clickOrder: [],
      imgSrc: "",
      clickIndex: 0,
      verifyWord: "",
      hasError: false,
      errorText: "未知错误",
      loading: true,
    };
  },
  computed: {},
  //   watch: {
  //     visible(val) {
  //         this.visible = val
  //     }
  //   },
  methods: {
    async initList() {
      this.clearStatus();
      const { data } = await startVerify();
      this.verifyId = data.verifyId;
      this.imgSrc = `${process.env.VUE_APP_SERVER_URL}security/verify/img/${this.verifyId}`;
      const words = data.words;

      this.wordMap["tl"] = words[0];
      this.wordMap["top"] = words[1];
      this.wordMap["tr"] = words[2];

      this.wordMap["lt"] = words[3];
      this.wordMap["left"] = words[4];
      this.wordMap["lb"] = words[5];

      this.wordMap["bl"] = words[6];
      this.wordMap["bottom"] = words[7];
      this.wordMap["br"] = words[8];

      this.wordMap["rt"] = words[9];
      this.wordMap["right"] = words[10];
      this.wordMap["rb"] = words[11];

      this.clickOrder = data.order;
      this.loading = false;
      this.showWords = true;
    },
    handleClose() {
      // this.$store.dispatch("user/changeVerifyVisible", false)
      // this.$emit("handleClose")
      this.visible = false;
    },
    handleHover(event) {
      event.target.style.fontSize = "40px";
    },
    handleLeave(event) {
      event.target.style.fontSize = "20px";
    },
    handleClick(word) {
      if (this.clickIndex < this.clickOrder.length - 1) {
        this.verifyWord += word;
        this.clickIndex += 1;
      } else if (!this.hasError) {
        this.verifyWord += word;
        this.loading = true;
        doVerify(this.verifyId, this.verifyWord)
          .then((rep) => {
            setVerifyToken(rep.data.value);
            this.showWords = false;
            this.loading = false;
            setTimeout(() => (this.visible = false), 700);
            // this.$emit("doRealAction", rep.data.value);
          })
          .catch((error) => {
            this.loading = false;
            this.errorText = error.message;
            this.hasError = true;
          });
      } else {
        this.initList();
      }
    },
    clearStatus() {
      this.clickIndex = 0;
      this.verifyWord = "";
      this.hasError = false;
    },
    watchVisible() {
      const that = this;
      window.addEventListener("setItemEvent", function (e) {
        // 监听setitem的 key ，执行对应的业务逻辑
        // console.log(e.key, e.value);
        if (e.key === "verifyVisible") {
          that.visible = e.value;
        }
      });
    },
  },
  created() {},
  mounted() {
    this.watchVisible();
  },
};
</script>
<style scoped>
#components-a-tooltip-demo-placement .ant-btn {
  width: 70px;
  text-align: center;
  padding: 0;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 20px;
}
</style>