<template>
    <div v-if="clickable">
        <router-link :to="{ name: 'user', params: { username: userId } }">
            <a-avatar :shape="shape" :size="size" :src="avatar" />
        </router-link>
    </div>
    <div v-else>
        <a-avatar :shape="shape" :size="size" :src="avatar" />
    </div>
</template>

<script>
import store from '@/store'
import { getAvatar } from '@/api/user'

export default {
    name: "UserAvatar",
    props: {
        userId: {
            default: 0
        },
        shape: {
            type: String,
            default: "circle"
        },
        size: {
            type: Number,
            default: 42
        },
        clickable: {
            type: Boolean,
            default: true
        },
    },
    data() {
        return {
            avatarTS: store.getters.avatarTS,
            avatar: null,
            user: store.getters.user,
            avatarMap: store.getters.avatarMap
        };
    },
    watch: {
        userId: function (n, o) {
            this.getSrc(n)
        }
    },
    computed: {
    },
    methods: {
        getSrc(userId) {

            if (userId == this.user.userId) {
                this.avatar = this.user.avatar + '?' + this.avatarTS
            }

            else if (this.avatarMap.has(userId) && this.avatarMap.get(userId) != null) {
                this.avatar = this.avatarMap.get(userId)
            }
            else {
                getAvatar(userId).then(rep => {
                    const avatar = rep.data.value
                    if (avatar == null) {
                        this.avatar = null
                    }
                    else {
                        this.avatar = avatar + '?' + this.avatarTS
                    }
                    const obj = {
                        userId: userId,
                        avatar: this.avatar
                    }
                    this.$store.dispatch('user/setAvatar', obj)
                })
            }
        }
    },
    created() {

    },
    mounted() {
        this.getSrc(this.userId)
    }
}
</script>
<style scoped>
</style>