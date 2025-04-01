<template>
  <div>
    <div style="margin-bottom: 15px">
      <el-input v-model="params.name" style="width: 200px;" placeholder="请输入姓名"></el-input>
      <el-button type="warning" style="margin-left: 10px" @click="findbySearch()">查询</el-button>
      <el-button type="warning" style="margin-left: 10px" @click="reset()">清空</el-button>
      <el-button type="primary" style="margin-left: 10px" @click="addCar" v-if="user.role=='ROLE_ADMIN'">新增</el-button>

    </div>

    <div>
    <el-table :data="carSpaces" stripe>
      <el-table-column prop="id" label="车位 ID"></el-table-column>
      <el-table-column prop="spaceNumber" label="车位编号"></el-table-column>
      <el-table-column prop="status" label="车位状态"></el-table-column>
      <el-table-column prop="licensePlate" label="车牌号"></el-table-column>
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

    <el-dialog :visible.sync="dialogVisible" title="添加/编辑车位信息">
      <el-form :model="carSpaceForm">
        <el-form-item label="车位编号">
          <el-input v-model="carSpaceForm.spaceNumber"></el-input>
        </el-form-item>
        <el-form-item label="车位状态">
          <el-select v-model="carSpaceForm.status">
            <el-option label="占用" value="占用"></el-option>
            <el-option label="未占用" value="未占用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="carSpaceForm.licensePlate"></el-input>
        </el-form-item>
        <!--        <el-form-item label="业主 ID">-->
        <!--          <el-input v-model="carSpaceForm.ownerId"></el-input>-->
        <!--        </el-form-item>-->

        <el-form-item label="业主姓名" label-width="20%">

          <el-select v-model="carSpaceForm.ownerId" placeholder="请选择">
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
      ownerObjs:[],
      total:0
    };
  },
  created() {
    this.findName()
    this.getAllCarSpaces()
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
      request.get("/car-space/search", {
        params: this.params,
      }).then(res => {
        if (res.code == '0') {
          this.total = res.data.total;
          this.carSpaces = res.data.list;

        } else {
          this.$message({
            message: res.msg,
            type: 'success'
          })
        }
      })
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
    saveCarSpace() {
      if (this.carSpaceForm.id) {
        // console.log(this.carSpaceForm.id)
        request.put('/car-space/admin/update', this.carSpaceForm).then(() => {
          this.dialogVisible = false;
          this.getAllCarSpaces();
        });
      } else {
        request.post('/car-space/admin/add', this.carSpaceForm).then(() => {
          this.dialogVisible = false;
          this.getAllCarSpaces();
        });
      }
    }
  }
};
</script>

<style scoped>

</style>