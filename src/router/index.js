import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Register"),
    meta: { title: "注册" },
  },
  // 登录
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/auth/Login"),
    meta: { title: "登录" },
  },
  // 发布
  {
    name: "post-create",
    path: "/post/create",
    component: () => import("@/views/post/Create"),
    meta: { title: "文章发布", requireAuth: true },
  },
  // 编辑
  {
    name: 'topic-edit',
    path: '/topic/edit/:id',
    component: () => import('@/views/post/Edit'),
    meta: {
      title: '编辑',
      requireAuth: true
    }
  },
  // 详情
  {
    name: "post-detail",
    path: "/post/:id",
    component: () => import("@/views/post/Detail"),
    meta: { title: "详情" },
  },
  {
    name: 'tag',
    path: '/tag/:name',
    component: () => import('@/views/tag/Tag'),
    meta: { title: '文章列表' }
  },
  // 检索
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/Search'),
    meta: { title: '检索' }
  },
  // 用户主页
  {
    name: 'user',
    path: '/member/:username/home',
    component: () => import('@/views/user/Profile'),
    meta: { title: '用户主页' }
  },
  // 用户设置
  {
    name: 'user-setting',
    path: '/member/setting',
    component: () => import('@/views/user/Setting'),
    meta: { title: '设置', requireAuth: true }
  },
  // 消息中心
  {
    name: 'user-message',
    path: '/message',
    component: () => import('@/views/user/Message'),
    meta: {title: '消息中心', requireAuth: true}
  },
  {
    name: 'user-history',
    path: '/history',
    component: () => import('@/views/user/History'),
    meta: {title: '浏览记录', requireAuth: true}
  },
  {
    name: 'user-custom',
    path: '/custom',
    component: () => import('@/views/user/Custom'),
    meta: {title: '个性化', requireAuth: true}
  },
  {
    name: 'section',
    path: '/section',
    component: () => import('@/views/section/index'),
    meta: {title: '分区', requireAuth: false}
  },
  {
    name: 'sectionInfo',
    path: '/section/:sectionId',
    component: () => import('@/views/section/content'),
    meta: {title: '详情', requireAuth: false}
  },
  {
    name: 'admin',
    path: '/admin',
    component: () => import('@/views/admin/AdminIndex'),
    meta: {title: '文章管理页面', requireAuth: true, requireAdmin:true}
  },
  {
    name: 'permission',
    path: '/admin/permission',
    component: () => import('@/views/admin/Permission'),
    meta: {title: '权限管理页面', requireAuth: true, requireAdmin:false}
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404"),
    meta: { title: "404-NotFound" },
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
