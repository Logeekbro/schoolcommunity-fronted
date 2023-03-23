<template>
  <!-- <el-card> -->
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="权限管理" name="first">
        <a-table :columns="columns" :data-source="data" bordered>
          <template slot="id" slot-scope="text, record">
            <a-checkbox v-if="record.key === 'add' && record.editable" @change="changeUserDefault" :checked="isUserDefault"> 用户默认权限 </a-checkbox>
            <span v-else>{{ text }}</span>
          </template>
          <template
            v-for="col in ['name', 'urlPerm']"
            :slot="col"
            slot-scope="text, record"
          >
            <div :key="col">
              <a-input
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                @change="(e) => handleChange(e.target.value, record.key, col)"
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template slot="operation" slot-scope="text, record">
            <div class="editable-row-operations">
              <span v-if="record.editable">
                <a @click="() => save(record.key)">保存</a>
                <a-popconfirm
                  title="确定要取消变更吗?"
                  @confirm="() => cancel(record.key)"
                >
                  <a>取消</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a :disabled="editingKey !== ''" @click="() => edit(record.key)">
                  编辑
                </a>

                <a :disabled="editingKey !== ''" @click="() => doDelete(record.key)">
                  删除
                </a>
              </span>
            </div>
          </template>
          <template slot="footer" slot-scope="pageData">
            <a-button :disabled="editingKey != ''" class="editable-add-btn" @click="handleAdd">
              添加权限
            </a-button>
            <div> {{ size }}</div>
          </template>
        </a-table>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="second"> 开发中... </el-tab-pane>
    </el-tabs>
  <!-- </el-card> -->
</template>

<script>
import { getAllPermission, addPermission, updatePermission, deletePermissionById } from "@/api/permission";

const columns = [
  {
    title: "权限id",
    dataIndex: "id",
    width: "20%",
    scopedSlots: { customRender: "id" },
  },
  {
    title: "权限名称",
    dataIndex: "name",
    width: "25%",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "权限路径",
    dataIndex: "urlPerm",
    width: "35%",
    scopedSlots: { customRender: "urlPerm" },
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  name: "Permission",
  components: {},
  data() {
    return {
      activeName: "first",
      columns: columns,
      data: [],
      cacheData: [],
      editingKey: "",
      isUserDefault: false
    };
  },
  created() {},
  mounted() {
    this.getPermissions();
  },
  methods: {
    getPermissions() {
      this.editingKey = "";
      getAllPermission().then((rep) => {
        const data = rep.data;
        this.data = data.map((item) => {
          item.key = item.id;
          return item;
        });
        this.cacheData = this.data.map((item) => ({ ...item }));
      });
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.find((item) => key === item.key);
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.find((item) => key === item.key);
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      // const newCacheData = [...this.cacheData];
      const target = newData.find((item) => key === item.key);
      if (key === "add") {
        // 向服务器发送请求添加权限
        const permission = {
            name: target.name,
            urlPerm: target.urlPerm,
            isUserDefault: this.isUserDefault
        }
        addPermission(permission).then(rep => {
            this.msg.success("添加成功")
            this.getPermissions()
        })
      } else {
        const permission = {
            id: target.key,
            name: target.name,
            urlPerm: target.urlPerm,
        }
        updatePermission(permission).then(rep => {
          this.msg.success("修改成功")
          this.getPermissions()
        })
      }
      // const targetCache = newCacheData.find((item) => key === item.key);
      // if (target && targetCache) {
      //   delete target.editable;
      //   this.data = newData;
      //   Object.assign(targetCache, target);
      //   this.cacheData = newCacheData;
      // }
      // this.editingKey = "";
      
    },
    cancel(key) {
      if (key === "add") {
        this.handleDelete(key);
        this.editingKey = "";
        return;
      }
      const newData = [...this.data];
      const target = newData.find((item) => key === item.key);
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.find((item) => key === item.key)
        );
        delete target.editable;
        this.data = newData;
      }
    },
    doDelete(key){
      deletePermissionById(key).then(rep => {
        this.msg.success("删除成功")
        this.getPermissions()
      })
    },
    handleAdd() {
      const { data } = this;
      const newData = {
        key: "add",
        name: "",
        urlPerm: "",
      };
      this.data = [...data, newData];
      this.edit("add");
    },
    handleDelete(key) {
      const dataSource = [...this.data];
      this.data = dataSource.filter((item) => item.key !== key);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    changeUserDefault(e) {
        this.isUserDefault = e.target.checked
        console.log(this.isUserDefault)
    }
  },
};
</script>

<style>
.editable-row-operations a {
  margin-right: 8px;
}
</style>