<template>
  <div class="common-layout">
    <!-- <el-container> -->
      <Header/>
    <!-- </el-container> -->
    </div>
      <el-container>
       <Aside/>
      <!-- <Main/> -->
      <RouterView></RouterView>
      </el-container>

 


</template>
<script setup>
import Header from "@/components/Header.vue"
import Aside from "@/components/Aside.vue"
import Main from "@/components/Main.vue"
</script>
<style>
.common-layout{
  display: flex;
  flex-wrap: row wrap;
  width: 100vw;
}
.el-container{
  flex-wrap: row wrap;
}
</style>