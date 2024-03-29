<template>
    <a-list item-layout="vertical" size="large" :data-source="articleList" :loading="listLoading">
        <div v-if="showLoadMore" slot="loadMore"
            :style="{ textAlign: 'center', marginTop: '12px', height: '35px', lineHeight: '35px' }">
            <a-spin v-if="loadingMore" />
            <a-button v-else @click="doLoadMore">
                点击加载更多
            </a-button>
        </div>
        <a-list-item slot="renderItem" key="index" slot-scope="item, index">
            <img slot="extra" style="height: 150px" width="272" alt="封面"
                :src="!item.mainPic ? 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' : item.mainPic" />
            <div style="margin-bottom: 25px">
                <router-link style="font-size: 18px" :to="{ path: `/post/${item.articleId}` }">
                    <strong><article-title :articleId="item.articleId"></article-title></strong>
                </router-link>
                <el-tag style="margin-left: 5px" size="small" v-if="item.top">置顶</el-tag>
                <br>
                <div
                    style="width: 400px;overflow:hidden;margin-top: 10px;white-space: nowrap; text-overflow: ellipsis;">
                    {{ !item.summary ? '-' : item.summary }}
                </div>
            </div>
            <div class="level-left">
                <user-avatar :userId="item.authorId" :size="25" style="margin-right: 8px"></user-avatar>
                <router-link class="level-item" :to="{ path: `/member/${item.authorId}/home` }">
                    <strong><nick-name :userId="item.authorId"/></strong>
                </router-link>
                <el-divider direction="vertical" />
                <span class="mr-1 ml-2">
                    {{ parseTime(item.createTime) }}
                </span>
                <br />
            </div>
            <div style="margin-top: 15px">
                <tag :articleId="item.articleId"></tag>
            </div>
            <div style="margin-top: 15px">
                <score :articleId="item.articleId"></score>
            </div>

            <div v-if="user.roleIdList && user.roleIdList.includes('1', 0)"
                style="background-color: aliceblue; margin-top: 10px;padding: 10px">
                <!-- <el-divider></el-divider> -->
                <div>
                    <strong>管理员操作：</strong><br />
                    <div style="margin-top: 10px;">
                        <a-button v-if="!item.top" @click="handleSetTop(index, item.articleId, false)" type="primary"
                            size="small">
                            置顶
                        </a-button>
                        <a-button v-else @click="handleSetTop(index, item.articleId, true)" type="primary" size="small">
                            取消置顶
                        </a-button>
                        <a-popconfirm title="确定要删除此文章吗?" ok-text="确定" cancel-text="取消"
                            @confirm="handleDelete(index, item.articleId)">
                            <a-button style="margin-left: 10px" type="danger" size="small">
                                删除
                            </a-button>
                        </a-popconfirm>
                    </div>
                </div>


            </div>
        </a-list-item>
    </a-list>
</template>

<script>
import UserAvatar from '@/components/User/Avatar'
import dayjs from 'dayjs'
import Score from '@/components/Article/Score'
import Tag from '@/components/Tag/index'
import { deleteArticleById, changeArticleTopStatus } from '@/api/post'
import { mapGetters } from 'vuex'
import ArticleTitle from './ArticleTitle.vue'
import NickName from '../User/NickName.vue'

export default {
    name: 'ArticlePreview',
    components: { UserAvatar, Score, Tag, ArticleTitle, NickName },
    props: {
        loadData: {
            type: Function,
            default: null
        },
        loadMore: {
            type: Function,
            default: null
        },
        total: {
            type: Number,
            default: 0
        },
        change: {
            type: String,
            default: ''
        }

    },
    data() {
        return {
            listLoading: false,
            loadingMore: false,
            showLoadMore: false,
            articleList: [],
        };
    },
    watch: {
        change: function () {
            this.fetchData()
        }
    },
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        async fetchData() {
            this.listLoading = true
            this.articleList = await this.loadData()
            this.listLoading = false
            this.checkHaveMore()
        },
        async doLoadMore() {
            this.loadingMore = true
            const tmpList = await this.loadMore()
            this.loadingMore = false
            this.articleList = this.articleList.concat(tmpList)
            this.checkHaveMore()
        },
        checkHaveMore() {
            if (!this.articleList || this.articleList.length >= this.total) {
                this.showLoadMore = false
            }
            else {
                this.showLoadMore = true
            }
        },
        async handleSetTop(index, articleId, isTop) {
            const rep = await changeArticleTopStatus(articleId)
            // const del = this.articleList.splice(index, 1)
            this.articleList[index].top = !isTop
            if (isTop) {
                this.msg.success("已取消置顶")
            }
            else {
                this.msg.success("已置顶")
            }
            this.articleList.sort((a, b) => {
                if (b.top != a.top) return b.top - a.top
                else return a.createTime > b.createTime ? -1 : 1
            })
        },
        handleDelete(index, articleId) {
            deleteArticleById(articleId).then(rep => {
                this.articleList.splice(index, 1)
                this.msg.success("删除成功")
            })
        },
        parseTime(publishTime) {
            // 拿到当前时间戳和发布时的时间戳
            var curTime = new Date()
            var postTime = new Date(publishTime)
            //计算差值
            var timeDiff = curTime.getTime() - postTime.getTime()
            // 单位换算
            var min = 60 * 1000
            var hour = min * 60
            var day = hour * 24
            // 计算发布时间距离当前时间的 天、时、分
            var exceedDay = Math.floor(timeDiff / day)
            // 最后判断时间差
            if (exceedDay > 0) {
                if (exceedDay <= 3) {
                    return exceedDay + "天前"
                }
                else if (curTime.getFullYear() == postTime.getFullYear()) {
                    return dayjs(publishTime).format("MM-DD HH:mm")
                }
                return dayjs(publishTime).format("YYYY-MM-DD HH:mm")
            } else {
                var exceedHour = Math.floor(timeDiff / hour)
                var exceedMin = Math.floor(timeDiff / min)
                if (exceedHour < 24 && exceedHour > 0) {
                    return exceedHour + '小时前'
                } else if (exceedMin < 60 && exceedMin > 0) {
                    return exceedMin + '分钟前'
                } else {
                    return '刚刚'
                }
            }
        }
    },
    created() { },
    mounted() {
        this.fetchData()
    }
};
</script>
<style scoped>

</style>