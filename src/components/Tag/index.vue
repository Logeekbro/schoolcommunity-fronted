<template>
    <b-taglist>
        <span v-for="(tag, index) in tags" :key="index" class="tag is-hidden-mobile is-success is-light mr-1">
            <router-link :to="{ name: 'tag', params: { name: tag } }">
                {{ "#" + tag }}
            </router-link>
        </span>
    </b-taglist>

</template>

<script>
import { getTagSetById } from '@/api/tag';

export default {
    name: "Tag",
    components: {},
    props: {
        articleId: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            tags: []
        };
    },
    watch: {
        articleId: async function (n, o) {
            const { data } = await getTagSetById(n)
            this.tags = data
        }
    },
    computed: {},
    methods: {},
    created() { },
    async mounted() {
        if (this.articleId != null) {
            const { data } = await getTagSetById(this.articleId)
            this.tags = data
        }

    }
};
</script>
<style scoped>
</style>