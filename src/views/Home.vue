<template>
  <div>
    <div class="box">🔔 {{ billboard.content || ' 这里可以看到最新通知' }}</div>
    <div class="columns">
      <div class="column is-three-quarters">
        <TopicList></TopicList>
      </div>
      <div class="column is-one-quarter">
        <CardBar></CardBar>
      </div>
    </div>
  </div>
</template>

<script>
import { getBillboard } from "@/api/billboard";
import CardBar from "@/views/card/CardBar"
import PostList from '@/views/post/Index'

export default {
  name: "Home",
  components: {CardBar, TopicList: PostList},
  data() {
    return {
      billboard: {
        content: "",
      },
    };
  },
  created() {
    window.scrollTo(0, 0);
    // this.fetchBillboard();
  },
  methods: {
    async fetchBillboard() {
      getBillboard().then((value) => {
        const { data } = value;
        this.billboard = data;
      }).catch(err => {
        
      });
    },
  },
};
</script>
