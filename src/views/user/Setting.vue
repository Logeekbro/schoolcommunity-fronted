<template>
  <!-- <section>
    <el-card shadow="never">
      <div slot="header">
        个人设置
      </div>
      <div class="columns">
        <div class="column is-full">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基础信息" name="first">
              <el-form :label-position="labelPosition" label-width="100px" :model="user">
                <el-form-item label="账号">
                  <el-input v-model="user.account" disabled />
                </el-form-item>
                <el-form-item label="昵称">
                  <el-input v-model="user.nickName" />
                </el-form-item>
                <el-form-item label="简介">
                  <el-input v-model="user.introduce" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="头像" name="second">
              <el-upload class="avatar-uploader" action="" :show-file-list="false" :http-request="httpRequest"
                :before-upload="beforeAvatarUpload">
                <img v-if="user.avatar" :src="liveAvatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane label="电子邮箱" name="third">
              <el-form ref="dynamicValidateForm" :model="user" label-width="100px" class="demo-dynamic">
                <el-form-item prop="email" label="邮箱" :rules="[
                  { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                  { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]">
                  <el-input v-model="user.email" />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                  <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="QQ号" name="fourth">
              <el-form ref="dynamicValidateForm" :model="user" label-width="100px" class="demo-dynamic">
                <el-form-item>
                  <el-input v-model="user.qq" />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                  <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="fifth">
              <el-form ref="passwordForm" :model="passwordForm" :rules="rules" label-width="100px" class="demo-dynamic">
                <el-form-item label="原密码" prop="oldPassword">
                  <el-input v-model="passwordForm.oldPassword" />
                </el-form-item>

                <el-form-item label="新密码" prop="newPassword">
                  <el-input v-model="passwordForm.newPassword" type="password" autocomplete="off" />
                </el-form-item>

                <el-form-item label="确认密码" prop="confirmPassword">
                  <el-input v-model="passwordForm.confirmPassword" type="password" autocomplete="off" />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="updatePassword">提交</el-button>
                  <el-button @click="resetForm('passwordForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-card>
  </section> -->

  <div class="columns is-multiline is-mobile">
    <div class="column is-one-quarter">
      <a-menu
        style="width: 256px"
        mode="inline"
        :default-selected-keys="['1']"
        @click="handleMenuChange"
      >
        <a-menu-item key="1"> 基础信息 </a-menu-item>
        <a-menu-item key="2"> 修改头像 </a-menu-item>
        <a-menu-item key="3"> 身份认证 </a-menu-item>
        <a-menu-item key="4"> 修改密码 </a-menu-item>
      </a-menu>
    </div>
    <div class="column">
      <!-- 基本信息 -->
      <a-card v-if="openKey == '1'">
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="user"
          ref="basicInfoForm"
        >
          <el-form-item label="账号">
            <el-input v-model="user.username" disabled />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="user.nickName" />
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="user.introduce" />
          </el-form-item>
          <el-form-item
            prop="email"
            label="邮箱"
            :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              {
                type: 'email',
                message: '请输入正确的邮箱地址',
                trigger: ['blur', 'change'],
              },
            ]"
          >
            <el-input v-model="user.email" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="user.phone" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >修改</el-button
            >
          </el-form-item>
        </el-form>
      </a-card>
      <!-- 头像 -->
      <a-card v-else-if="openKey == '2'">
        <strong>点击上传或修改头像👇</strong><br /><br />
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :http-request="httpRequest"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="user.avatar" :src="liveAvatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </a-card>
      <!-- 修改密码 -->
      <a-card v-else-if="openKey == '4'">
        <a-form-model
          ref="passwordForm"
          :model="passwordForm"
          :rules="prules"
          layout="horizontal"
          v-bind="{
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }"
        >
          <a-form-model-item label="原密码" prop="oldPassword">
            <a-input-password v-model="passwordForm.oldPassword" />
          </a-form-model-item>

          <a-form-model-item label="新密码" prop="newPassword">
            <a-input-password
              v-model="passwordForm.newPassword"
              autocomplete="off"
            />
          </a-form-model-item>

          <a-form-model-item label="确认密码" prop="confirmPassword">
            <a-input-password
              v-model="passwordForm.confirmPassword"
              autocomplete="off"
            />
          </a-form-model-item>

          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <el-button type="primary" @click="updatePassword">修改</el-button>
          </a-form-model-item>
        </a-form-model>
      </a-card>
    </div>
  </div>
</template>

<script>
import { getInfo, update, updatePassword } from "@/api/user";
import { removeToken } from "@/utils/auth";
import { uploadAvatar } from "@/api/upload";
import store from "@/store";

export default {
  name: "Setting",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeName: "first",
      collapsed: false,
      labelPosition: "right",
      openKey: "1",
      user: {
        userId: "",
        username: "",
        nickName: "",
        introduce: "",
        email: "",
        phone: "",
        avatar: "",
      },
      loadingToast: null,
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      liveAvatar: "",
      prules: {
        oldPassword: [
          { required: true, message: "请输入原密码", trigger: "change" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        newPassword: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "change" },
          { validator: validatePass, trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.fetchInfo();
  },
  methods: {
    fetchInfo() {
      getInfo().then((res) => {
        const { data } = res;
        this.liveAvatar = data.avatar + "?" + store.getters.avatarTS;
        this.user = data;
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleMenuChange(i) {
      this.openKey = i.key;
    },
    submitForm(formName) {
      if (this.user.nickName == null || this.user.nickName == "") {
        this.msg.warn("昵称不能为空！");
        return;
      }
      update(this.user).then((res) => {
        this.msg.success("信息修改成功");
        this.fetchInfo();
      });
    },
    updatePassword() {
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword)
        return;
      updatePassword(this.passwordForm).then((response) => {
        this.$alert("密码修改成功，请重新登录", "", {
          confirmButtonText: "确定",
          center: true,
          callback: (action) => {
            removeToken();
            this.$router.push({
              name: "login",
            });
          },
        });
      });
    },
    httpRequest(param) {
      const haveAvatar = this.user.avatar != null;
      this.loadingToast = this.msg.indefiniteInfo(
        "<i class='el-icon-loading'></i>上传中..."
      );
      uploadAvatar(param.file, haveAvatar)
        .then((res) => {
          this.$store.dispatch("user/updateAvatar", Date.now());
          this.loadingToast.close();
          this.msg.success("上传成功", 1500);
          this.fetchInfo();
        })
        .catch((error) => {
          this.loadingToast.close();
        });
    },
    beforeAvatarUpload(file) {
      const accept = ["image/jpg", "image/jpeg", "image/png"];
      const isJPG = accept.includes(file.type);
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.msg.error("上传头像图片只能是 JPG/PNG 格式!", 1500);
      }
      if (!isLt3M) {
        this.msg.error("上传头像图片大小不能超过 3MB!", 1500);
      }
      return isJPG && isLt3M;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
