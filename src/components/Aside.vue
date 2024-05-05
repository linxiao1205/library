<script setup>
const user = JSON.parse(window.localStorage.getItem('userInfo') || '{}') //获取用户登录信息，然后选择用户登录的角色
</script>

<template>
  <!-- <el-aside width="200px"> -->
  <el-row class="tac">
    <el-col :span="12">
      <el-menu default-active="1" class="el-menu-vertical-demo" router>
        <el-menu-item index="/message">
          <el-icon><Management /></el-icon>
          <span>图书馆信息</span>
        </el-menu-item>
        <el-menu-item index="/bookshelf" v-if="user[0].role === '1'">
          <el-icon><Notification /></el-icon>
          <span>书架设置</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Postcard /></el-icon>
            <span>个人信息</span>
          </template>
          <el-menu-item index="/oneself"
            ><el-icon><Edit /></el-icon> 修改个人信息
          </el-menu-item>
          <el-menu-item index="/psw"
            ><el-icon><Lock /></el-icon> 修改密码
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3" v-if="user[0].role === '1'">
          <template #title>
            <el-icon><Reading /></el-icon>
            <span>图书管理</span>
          </template>
          <el-menu-item index="/drawing">统计报表</el-menu-item>
          <el-menu-item index="/type">图书类型</el-menu-item>
          <el-menu-item index="/record">图书档案管理</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/query">
          <el-icon><SetUp /></el-icon>
          <span>图书查询</span></el-menu-item
        >
        <el-menu-item index="/lend">
          <el-icon><Collection /></el-icon>
          <span>借阅信息</span>
        </el-menu-item>
        <el-menu-item index="/reader" v-if="user[0].role === '1'">
          <el-icon><UserFilled /></el-icon>
          <span>读者管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<style>
.el-menu {
  background-color: #88b8d6;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: 669px;
  min-height: auto;
}
.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container)
  .el-menu-item {
  padding-left: 18px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  border-right: none;
}
.el-menu-item {
  font-size: 15px;
}
.el-sub-menu__title {
  font-size: 15px;
}
.el-menu {
  padding-left: 20px;
}
</style>
