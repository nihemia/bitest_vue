<template>
  <div>



    <div>
    <el-table :data="carSpaces" stripe>
      <el-table-column prop="id" label="车位 ID"></el-table-column>
      <el-table-column prop="houseNumber" label="房屋编号"></el-table-column>
      <el-table-column prop="status" label="房屋状态"></el-table-column>
      <el-table-column prop="houseBuild" label="房屋楼层"></el-table-column>
      <el-table-column prop="houseDate" label="入住时间"></el-table-column>
      <!--      <el-table-column prop="owner.name" label="业主姓名"></el-table-column>-->
      <el-table-column prop="ownerName" label="业主姓名"></el-table-column>

    </el-table>
    </div>

  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      isAdmin: true, // 这里可以根据实际情况修改为从后端获取用户角色
      carSpaces: [],
      dialogVisible: false,
      houseForm: {
        id: null,
        houseNumber: '',
        houseBuild: '',
        status: 'unoccupied',
        ownerId: '',
        houseDate:''
      },
      user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
      ownerObjs:[]
    };
  },
  created() {
    this.findName()
    this.getMyCarSpaces()
  },
  methods: {
    findName(){
      console.log("进来了")
      request.get("/user/names").then(res => {
        if (res.code === '0') {
          // 假设后端返回的每个对象包含业主信息，提取id和name属性
          this.ownerObjs = res.data
          console.log(res.data);
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      });
    },
    getAllCarSpaces() {
      request.get('/house/admin/all').then(response => {
        this.carSpaces = response.data;
        // console.log(response.data)
      });
    }
  }
};
</script>

<style scoped>

</style>