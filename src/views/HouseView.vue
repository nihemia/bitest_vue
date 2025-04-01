<template>
  <div>
    <div style="margin-bottom: 15px">
      <el-input v-model="params.name" style="width: 200px;" placeholder="请输入姓名"></el-input>
      <el-button type="warning" style="margin-left: 10px" @click="findbySearch()">查询</el-button>
      <el-button type="warning" style="margin-left: 10px" @click="reset()">清空</el-button>
      <el-button type="primary" style="margin-left: 10px" @click="addhouse()">新增</el-button>

    </div>

<!--    <el-button @click="getAllCarSpaces" v-if="user.role=='ROLE_ADMIN'">获取所有房屋信息</el-button>-->
<!--    <el-button  @click="addCar" v-if="user.role=='ROLE_ADMIN'">添加</el-button>-->
<!--    <el-button @click="getMyCarSpaces" v-if="user.role=='ROLE_USER'">获取我的房屋信息</el-button>-->


    <div>
    <el-table :data="carSpaces" stripe>
<!--      <el-table-column prop="id" label="房屋 ID"></el-table-column>-->
      <el-table-column prop="houseNumber" label="房屋编号"></el-table-column>
      <el-table-column prop="status" label="房屋状态"></el-table-column>
      <el-table-column prop="houseBuild" label="房屋楼层"></el-table-column>
      <el-table-column prop="houseDate" label="入住时间"></el-table-column>
      <!--      <el-table-column prop="owner.name" label="业主姓名"></el-table-column>-->
      <el-table-column prop="ownerName" label="业主姓名"></el-table-column>
      <el-table-column v-if="user.role=='ROLE_ADMIN'" label="操作">
        <template slot-scope="scope">
          <el-button @click="editCarSpace(scope.row)" v-if="user.role=='ROLE_ADMIN'">编辑</el-button>
          <el-button @click="deleteCarSpace(scope.row.id)" v-if="user.role=='ROLE_ADMIN'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div style="margin-top:10px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="params.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>


    <el-dialog :visible.sync="dialogVisible" title="添加/编辑房屋信息">
      <el-form :model="houseForm">
        <el-form-item label="房屋编号">
          <el-input v-model="houseForm.houseNumber"></el-input>
        </el-form-item>
        <el-form-item label="房屋状态">
          <el-select v-model="houseForm.status">
            <el-option label="占用" value="occupied"></el-option>
            <el-option label="未占用" value="unoccupied"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层">
          <el-input v-model="houseForm.houseBuild"></el-input>
        </el-form-item>

        <el-form-item label="入住时间">
          <el-date-picker
              v-model="houseForm.houseDate"
              type="datetime"
              placeholder="选择入住时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="业主姓名" label-width="20%">

          <el-select v-model="houseForm.ownerId" placeholder="请选择">
            <el-option
                v-for="item in ownerObjs"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveCarSpace">保存</el-button>
      </div>
    </el-dialog>
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
      params: {
        name: '',
        pageNum: 1,
        pageSize: 5,
      },
      total:0,
      user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
      ownerObjs:[]
    };
  },
  created() {
    this.findbySearch()
    this.findName()
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
    findbySearch() {
      request.get("/house/search", {
        params: this.params,
      }).then(res => {
        if (res.code == '0') {
          this.total = res.data.total;
          this.carSpaces = res.data.list;
          console.log(res.data.list)

        } else {
          this.$message({
            message: res.msg,
            type: 'success'
          })
        }
      })
    },
    reset(){
      this.params={
        name:'',
        phone: '',
        pageNum: 1,
        pageSize: 5

      }
    },
    getAllhouse() {
      request.get('/house/admin/all').then(response => {
        this.carSpaces = response.data;
        // console.log(response.data)
      });
    },
    getMyCarSpaces() {
      // 这里假设业主 ID 为 1，实际应从登录信息中获取
      request.get("/house/owner/"+this.user.id).then(response => {
        this.carSpaces = response.data;
        // this.owner=this.user
        // this.owner.name=this.user.name
        // console.log(response.data)
      });
    },
    addhouse(){
      this.houseForm = {};
      this.dialogVisible=true;
    },
    editCarSpace(carSpace) {
      // this.carSpaceForm = { ...carSpace, ownerId: carSpace.owner ? carSpace.owner.id : null };
      this.houseForm=carSpace;
      this.dialogVisible = true;
    },
    deleteCarSpace(id) {
      request.delete(`/house/admin/delete/${id}`).then(() => {
        this.getAllhouse();
      });
    },
    saveCarSpace() {
      if (this.houseForm.id) {
        console.log(this.houseForm.id)
        request.put('/house/admin/update', this.houseForm).then(() => {
          this.dialogVisible = false;
          this.getAllhouse();
        });
      } else {
        request.post('/house/admin/add', this.houseForm).then(() => {
          console.log('/house/admin/add')
          this.dialogVisible = false;
          this.getAllhouse();
        });
      }
    },
    handleSizeChange(pageSize){
      this.params.pageSize=pageSize
      this.findbySearch()

    },
    handleCurrentChange(pageNum){
      this.params.pageNum=pageNum
      this.findbySearch()
    },
  }
};
</script>

<style scoped>

</style>