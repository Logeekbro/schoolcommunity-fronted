<template>
  <span
    v-if="!tooltip"
    v-html="title ? title : '[文章不存在或已被删除]'"
  ></span>

  <el-tooltip
    v-else
    :open-delay="700"
    class="item"
    effect="dark"
    :content="title"
    placement="top"
  >
    <span v-html="title ? title : '[文章不存在或已被删除]'"></span>
  </el-tooltip>
</template>

<script>
import { getTitleByArticleId } from "@/api/post";

export default {
  name: "ArticleTitle",
  props: {
    articleId: {
      default: null,
    },
    tooltip: {
      type: Boolean,
      default: false,
    },
    myTitle: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      title: "-",
    };
  },
  watch: {
    articleId: function (n, o) {
      this.getTitle(n);
    },
    myTitle: function (n, o) {
      this.title = n;
    },
  },
  computed: {},
  methods: {
    getTitle(articleId) {
      if (this.myTitle == null) {
        getTitleByArticleId(articleId).then((rep) => {
          this.title = rep.data.value;
        });
      } else {
        this.title = this.myTitle
      }
    },
  },
  created() {},
  mounted() {
    if (this.articleId) {
      this.getTitle(this.articleId);
    }
  },
};
</script>
<style scoped>
</style>