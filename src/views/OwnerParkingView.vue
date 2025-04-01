<template>
  <div>



    <el-table :data="carSpaces" stripe>
      <el-table-column prop="id" label="车位 ID"></el-table-column>
      <el-table-column prop="spaceNumber" label="车位编号"></el-table-column>
      <el-table-column prop="status" label="车位状态"></el-table-column>
      <el-table-column prop="licensePlate" label="车牌号"></el-table-column>
      <!--      <el-table-column prop="owner.name" label="业主姓名"></el-table-column>-->
      <el-table-column prop="ownerName" label="业主姓名"></el-table-column>
    </el-table>

  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      params: {
        name: '',
        pageNum: 1,
        pageSize: 5,
      },
      isAdmin: true, // 这里可以根据实际情况修改为从后端获取用户角色
      carSpaces: [],
      dialogVisible: false,
      carSpaceForm: {
        id: null,
        spaceNumber: '',
        status: 'unoccupied',
        licensePlate: '',
        ownerId: '',
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
      request.get('/car-space/admin/all').then(response => {
        this.carSpaces = response.data;
        // console.log(response.data)
      });
    },
    getMyCarSpaces() {
      // 这里假设业主 ID 为 1，实际应从登录信息中获取
      request.get("/car-space/owner/"+this.user.id).then(response => {
        this.carSpaces = response.data;
        // this.owner=this.user
        // this.owner.name=this.user.name
        // console.log(response.data)
      });
    },
    addCar(){
      this.carSpaceForm = {};
      this.dialogVisible=true;
    },
    editCarSpace(carSpace) {
      // this.carSpaceForm = { ...carSpace, ownerId: carSpace.owner ? carSpace.owner.id : null };
      this.carSpaceForm=carSpace;
      this.dialogVisible = true;
    },
    deleteCarSpace(id) {
      request.delete(`/car-space/admin/delete/${id}`).then(() => {
        this.getAllCarSpaces();
      });
    },

  }
};
</script>

<style scoped>

</style>