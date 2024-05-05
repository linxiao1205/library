<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router' //导入路由器
import { userOut } from '@/server/db/request' //导入用户信息接口
import { userOnly } from '@/store/user'
import { ArrowDown } from '@element-plus/icons-vue'
import { useTokenStore } from '@/store/mytoken'
const router = useRouter() //返回路由器对象
const dialogVisible = ref(false) //退出按钮的默认状态为false
const stores = userOnly()
const userInfo = window.localStorage.getItem('userInfo') // 右上角用户的登录名字
const user = JSON.parse(userInfo)[0]
//退出事件处理
const handleOut = async () => {
  //1.询问,是否退出
  await ElMessageBox.confirm('是否退出系统吗?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => {
    ElMessage.info('取消退出操作')
    return new Promise(() => {}) //返回一个空的promise对象,防止程序向下执行
  })
  //2.执行退出
  await userOut().catch(() => {})
  ElMessage.success('用户成功退出')
  //3.清空token,跳转回login
  useTokenStore().saveToken('')
  window.localStorage.removeItem('userInfo', '')
  router.push('/login')
}
const handlemima = () => {
  router.push('/psw')
}
const handleOnes = () => {
  router.push('/oneself')
}
</script>

<template>
  <el-header>
    <div class="header-nav">
      <div class="tushulogo">
        <img src="@/assets/school.jpg" alt="图书logo" />
        <span class="title">图书管理系统</span>
      </div>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <span @click="handleOnes">{{
                user.uname
              }}</span></el-dropdown-item
            >
            <el-dropdown-item
              ><span @click="handlemima">修改密码</span></el-dropdown-item
            >
            <el-dropdown-item divided @click="handleOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<style>
.el-header {
  width: 100vw;
  background-color: #99d3df;
  height: 60px;
}
.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 30px;
  .el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-icon {
    margin-top: 7px;
  }
}

.tushulogo {
  display: flex;
  align-items: center;
  .title {
    font-size: large;
  }
  img {
    width: 55px;
    height: 55px;
    border-radius: 30px;
    vertical-align: middle; /* 图片与文字的基线对齐方式，文字在图片中间 */
    margin: 0 10px;
    margin-top: 2.5px;
  }
}
.exit {
  display: inline-block;
  font-weight: bold;
  cursor: pointer;
}
.right {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
