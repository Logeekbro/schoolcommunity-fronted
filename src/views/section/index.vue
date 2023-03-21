<template>
    <el-card shadow="never">
        <a-row :gutter="16">
            <a-col v-for="(item, index) in sectionList" :key="index" class="gutter-row" :span="6">
                <el-card shadow="hover" style="cursor: pointer;">

                    <router-link :to="{ path: `/section/${item.section_id}` }">
                        <div style="text-align: center;">
                            <span style="font-size: 20px">{{ item.section_name }}</span>
                        </div>
                    </router-link>
                </el-card>
            </a-col>
        </a-row>
    </el-card>
</template>

<script>
import { getSectionList } from '@/api/section';


export default {
    name: "Section",
    components: {},
    props: {},
    data() {
        return {
            sectionList: []
        };
    },
    watch: {},
    computed: {},
    methods: {
        fetchSectionList() {
            getSectionList().then(rep => {
                this.sectionList = rep.data
            })
        }
    },
    created() { },
    mounted() {
        this.fetchSectionList()
    }
};
</script>
<style scoped>

</style>