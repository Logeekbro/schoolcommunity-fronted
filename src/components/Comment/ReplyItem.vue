<template>
  <article class="media">
    <div class="media-content" style="margin-left: 10px">
      <small class="ml-0">{{
        dayjs(reply.createTime).format("YYYY/MM/DD HH:mm")
      }}</small>
      <div class="content" style="margin-top: 10px">
        <div
          style="white-space: pre-wrap; word-break: break-all"
          v-if="reply.target == null"
        >
          <a-space>
            <el-tag v-if="reply.userId == authorId" size="mini">作者</el-tag>
            <router-link :to="{ path: `/member/${reply.userId}/home` }">
              <strong class="ml 2"><nick-name :userId="reply.userId" /></strong>
            </router-link>
          </a-space>
          <!-- <small class="ml-2">{{ dayjs(reply.createTime).format('YYYY/MM/DD HH:mm') }}</small> -->
          <!-- <br> -->
          <b-message type="is-info" style="margin-top: 10px">
            {{ reply.content }}
          </b-message>
        </div>

        <div style="white-space: pre-wrap; word-break: break-all" v-else>
          <div>
            <a-space>
              <el-tag v-if="reply.userId == authorId" size="mini">作者</el-tag>
              <router-link :to="{ path: `/member/${reply.userId}/home` }">
                <strong><nick-name :userId="reply.userId" /></strong>
              </router-link>
              <span>{{ " 回复 " }}</span>
              <router-link :to="{ path: `/member/${reply.target}/home` }"
                ><strong style="color: blue"
                  >@<nick-name :userId="reply.target" /></strong></router-link
              >:
            </a-space>
            <br />
            <b-message type="is-info" style="margin-top: 10px">
              {{ reply.content }}
            </b-message>
          </div>
        </div>

        <!-- 功能区 -->
        <nav class="level" style="margin: 10px">
          <div class="level-left">
            <a class="level-item">
              <b-button size="is-small" @click="handleReply(reply.userId)">
                回复
              </b-button>
              <!-- <span class="tag" @click="handleReply(reply.user.userId)">回复</span> -->
              <!-- <i class="el-icon-chat-square" style="font-size: 20px"></i> -->
            </a>
          </div>
          <!-- <div v-if="reply.user.userId === myUserId" class="level-right">
                        <a class="level-item">
                            <b-button size="is-small" type="is-danger" @click="handleDelete(reply.reply.replyId)">
                                删除
                            </b-button>
                        </a>
                    </div> -->
        </nav>
      </div>
    </div>
  </article>
</template>

<script>
import { deleteReplyById } from "@/api/reply";
import UserAvatar from "@/components/User/Avatar";
import NickName from "../User/NickName.vue";

export default {
  name: "LvReplyItem",
  components: { UserAvatar, NickName },
  props: {
    reply: {
      type: Object,
      required: true,
    },
    myUserId: {
      type: Number,
      required: true,
    },
    authorId: {
      type: Number,
      default: null,
    },
  },
  methods: {
    handleReply(targetId) {
      this.$emit("doReply", targetId);
    },
    handleDelete(replyId) {
      deleteReplyById(replyId).then((response) => {
        this.$emit("reloadReply");
      });
    },
  },
};
</script>

<style>
</style>