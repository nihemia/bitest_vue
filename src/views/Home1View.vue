<template>
  <div>
    ome1
<!--    <div style="width:50%">-->
<!--      <div style="margin:10px 0"><h1>系统公告</h1></div>-->
<!--      <el-collapse v-model="activeName" accordion>-->
<!--        <el-collapse-item v-for="item in data" :title="item.name" :name="item.id">-->
<!--          <div>{{item.content}}</div>-->
<!--          <div>{{item.time}}</div>-->
<!--        </el-collapse-item>-->
<!--      </el-collapse>-->
<!--    </div>-->

<!--    <div style="width: 50%">-->
<!--      <div id="btu" style="width: 100%;height: 400px"></div>-->
<!--    </div>-->
<!--    <div style="width: 50%">-->
<!--      <div id="bar" style="width: 100%;height: 400px"></div>-->
<!--    </div>-->
  </div>
</template>

<!--<script>-->


<!--import request from "@/utils/request";-->
<!--import * as echarts from "echarts";-->

<!--export default {-->
<!--  name: 'HomeView',-->

<!--  data(){-->
<!--    return {-->
<!--      activeName:"1",-->
<!--      data:[]-->
<!--    }-->
<!--  },-->
<!--  mounted(){-->
<!--    this.findNotice();-->
<!--    this.initEcharts();  //获得饼图中的数据即获得后端传来的数据-->
<!--    // this.initBar();-->
<!--  },-->
<!--  methods:{-->
<!--    findNotice(){-->
<!--      request.get("/notice").then(res=>{-->
<!--        if(res.code=='0'){-->
<!--          this.data=res.data;-->
<!--          this.activeName=res.data[0].id-->
<!--        }else{-->
<!--          this.$message.error(res.msg)-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    initEcharts(){-->
<!--      request.get("/car-space/echarts/btu").then(res=>{-->
<!--        if(res.code=='0'){-->
<!--          this.initBtu(res.data);-->
<!--        }else{-->
<!--          this.$message.error(res.msg);-->
<!--        }-->
<!--      })-->
<!--      request.get("/house/echarts/bar").then(res=>{-->
<!--        if(res.code=='0'){-->
<!--          let map=res.data;-->
<!--          console.log(res.data.xAxis)-->
<!--          console.log(res.data.yAxis)-->
<!--          this.initBar(map.xAxis,map.yAxis);-->
<!--        }else{-->
<!--          this.$message.error(res.msg);-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    initBtu(data){-->
<!--      let chartDom = document.getElementById('btu');-->
<!--      let myChart = echarts.init(chartDom);-->
<!--      let option;-->

<!--      option = {-->
<!--        title: {-->
<!--          text: '房屋统计图(饼图)',-->
<!--          subtext: '业主所拥有的房屋数量统计',-->
<!--          left: 'center'-->
<!--        },-->
<!--        tooltip: {-->
<!--          trigger: 'item'-->
<!--        },-->
<!--        legend: {-->
<!--          orient: 'vertical',-->
<!--          left: 'left'-->
<!--        },-->
<!--        series: [-->
<!--          {-->
<!--            name: 'Access From',-->
<!--            type: 'pie',-->
<!--            radius: '50%',-->
<!--            data:data,-->
<!--            emphasis: {-->
<!--              itemStyle: {-->
<!--                shadowBlur: 10,-->
<!--                shadowOffsetX: 0,-->
<!--                shadowColor: 'rgba(0, 0, 0, 0.5)'-->
<!--              }-->
<!--            }-->
<!--          }-->
<!--        ]-->
<!--      };-->

<!--      option && myChart.setOption(option);-->

<!--    },-->
<!--    //柱状图-->
<!--    initBar(xAxis,yAxis){-->
<!--      let chartDom = document.getElementById('bar');-->
<!--      let myChart = echarts.init(chartDom);-->
<!--      let option;-->

<!--      option = {-->
<!--        title:{-->
<!--          text: '房屋统计图(饼图)',-->
<!--          subtext: '业主所拥有的房屋数量统计',-->
<!--          left: 'center'-->
<!--        },-->
<!--        xAxis: {-->
<!--          type: 'category',-->
<!--          data: xAxis-->
<!--        },-->
<!--        yAxis: {-->
<!--          type: 'value',-->
<!--        },-->
<!--        series: [-->
<!--          {-->
<!--            data: yAxis,-->
<!--            type: 'bar',-->
<!--          }-->
<!--        ]-->
<!--      };-->

<!--      option && myChart.setOption(option);-->
<!--    }-->

<!--  }-->

<!--}-->
<!--</script>-->
