<template>
  <div
    v-infinite-scroll="handleDataLoad"
    class="demo-infinite-container"
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="10"
  >
    <a-list :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta :description="item">
          <!-- <a :href="item.href">{{ item.name.last }}</a> -->
          <router-link
            slot="title"
            :to="{ path: `/member/${item}/home` }"
            
          >
            <nick-name :userId="item"></nick-name>
          </router-link>
          <user-avatar
            :size="40"
            :userId="item"
            :clickable="true"
            slot="avatar"
          ></user-avatar>
        </a-list-item-meta>
        <div><follow-button :authorId="item"></follow-button></div>
      </a-list-item>
      <div v-if="loading && !busy" class="demo-loading-container">
        <a-spin />
      </div>
    </a-list>
  </div>
</template>

<script>
import infiniteScroll from "vue-infinite-scroll";
import FollowButton from "../Follow/FollowButton.vue";
import NickName from "./NickName.vue";
import UserAvatar from "@/components/User/Avatar";

export default {
  components: { infiniteScroll, FollowButton, NickName, UserAvatar },
  props: {
    userId: {
      default: null,
    },
    fetchFunc: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      data: [],
      loading: false,
      busy: false,
      page: {
        current: 1,
        size: 10,
        total: 1,
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleDataLoad() {
      if (this.data.length < this.page.total) {
        const data = this.data;
        this.loading = true;
        this.fetchFunc(this.userId, this.page.current, this.page.size).then(
          (rep) => {
            this.loading = false;
            this.data = data.concat(rep.data.records);
            this.page = rep.data;
            this.page.current += 1;
          }
        );
      } else {
        // 没有更多数据
        this.busy = true;
      }
    },
  },
  created() {},
  mounted() {
    this.handleDataLoad();
  },
};
</script>

<style scoped>
.demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 300px;
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>