<template>
  <div class="drawing">
    <div class="draw">
      <div class="box">
        已借阅
        <div class="row">
          <img src="../../assets/draw11.png" />
          <h1>{{ lended }}</h1>
        </div>
      </div>
      <div class="box">
        总访问
        <div class="row">
          <img src="../../assets/访问统计.png" />
          <h1>{{ getbBokLend.length }}</h1>
        </div>
      </div>
      <div class="box">
        图书数
        <div class="row">
          <img src="../../assets/draw3.png" />
          <h1>{{ recordData.length }}</h1>
        </div>
      </div>
      <div class="box">
        用户数
        <div class="row">
          <img src="../../assets/用户.png" />
          <h1>{{ getReaderMsg.length }}</h1>
        </div>
      </div>
    </div>
    <h1 style="font-weight: bold; margin: 20px">{{ format }}</h1>
    <div class="char">
      <el-card style="width: 49%; height: 390px" id="left"></el-card>
      <el-card style="width: 49%; height: 390px" id="right"></el-card>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive } from 'vue'
import {
  getTypeBookResource,
  AllgetTypeBookResource,
} from '@/server/saveData/useTypeBook' //图书类型
import { getbBokLend, AllgetbBokLend } from '@/server/saveData/useBookLend' //图书借阅
import { recordData, allBookSoure } from '@/server/saveData/useRecord' //图书数量
import { getReaderMsg, getReaderSourse } from '@/server/saveData/users' //用户数量
import * as echarts from 'echarts' //导入echarts依赖
AllgetTypeBookResource()
AllgetbBokLend()
allBookSoure()
getReaderSourse()
const lended = getbBokLend.value.filter(e => e.state === 1).length //已借阅
// 将echarts进行挂载,先进行创建dom再渲染图表
onMounted(async () => {
  setTimeout(() => {
    zhu()
  }, 1000)
  setTimeout(() => {
    bing()
  }, 1000)
})
// 柱状图
const zhu = async () => {
  // 第一步基于准备好的dom,初始化echarts实例
  const myChart = echarts.init(document.getElementById('left'))
  const res = getbBokLend.value.filter(e => e.state === 1)
  const lended = res.length //已借阅
  const Allnumber = getbBokLend.value.length //总访问
  const AllBook = recordData.value.length //图书数
  const Alluser = getReaderMsg.value.length
  // 第二步指定图表和配置项数据
  let option = reactive({
    // 标题
    title: {
      text: '图书馆访问量',
    },
    tooltip: {},
    legend: {
      data: ['number'], //点击后可以让图表颜色消失
    },
    // X轴数据
    xAxis: {
      data: ['已借阅', '总访问', '图书数', '用户数'],
    },
    // Y轴数据
    yAxis: {},
    series: [
      {
        name: 'number', //naem代表鼠标悬浮是显示的字
        type: 'bar', //bar是柱状得意思
        data: [lended, Allnumber, AllBook, Alluser],
      },
    ],
  })
  // 第三步使用刚刚指定的配置项和数据显示图表
  myChart.setOption(option)
}
// 饼状图
const bing = () => {
  const myChart = echarts.init(document.getElementById('right'))
  let options = reactive({
    title: {
      text: '图书分类', //标题文字
      // subtext: 'Fake Data',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '占比',
        type: 'pie', //类型
        radius: '50%', //圆角
        data: [
          {
            value: getTypeBookResource.value[0].remain,
            name: getTypeBookResource.value[0].types,
          },
          {
            value: getTypeBookResource.value[1].remain,
            name: getTypeBookResource.value[1].types,
          },
          {
            value: getTypeBookResource.value[2].remain,
            name: getTypeBookResource.value[2].types,
          },
          {
            value: getTypeBookResource.value[3].remain,
            name: getTypeBookResource.value[3].types,
          },
          {
            value: getTypeBookResource.value[4].remain,
            name: getTypeBookResource.value[4].types,
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  })
  myChart.setOption(options)
}

// 获取当前年月日信息
const format = computed(() => {
  const oDate = new Date()
  const year = oDate.getFullYear()
  const month = oDate.getMonth() + 1
  const day = oDate.getDay() - 2
  const hour = oDate.getHours()
  const minutes = oDate.getMinutes()
  const seconds = oDate.getSeconds()
  return (
    year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
  )
})
</script>
<style scoped>
.drawing {
  background-color: #f8f8f9;
  .char {
    margin: 20px;
    display: flex;
    align-content: space-around;
    justify-content: space-between;
  }
}
.draw {
  /* width: 100vw; */
  display: flex;
  align-items: start;
  flex-wrap: wrap;
}
.box {
  width: 250px;
  height: 150px;
  margin-right: 80px;
  background-color: #fff;
  text-align: center;
  padding-top: 15px;
}
.row {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin-left: 10px;
    font-weight: bold;
    font-size: 30px;
  }
}
</style>
