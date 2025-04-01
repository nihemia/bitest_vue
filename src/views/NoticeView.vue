<template>
  <div>
    <div style="margin-bottom: 15px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom: 15px">
      <el-input v-model="params.name" style="width: 200px;" placeholder="请输入公告标题"></el-input>
      <el-button type="warning" style="margin-left: 10px" @click="findbySearch()">查询</el-button>
      <el-button type="warning" style="margin-left: 10px" @click="reset()">清空</el-button>
      <el-button type="primary" style="margin-left: 10px" @click="add()" v-if="user.role=='ROLE_ADMIN'">新增</el-button>

    </div>
  <div class="about">
    <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <div>
        <el-table-column prop="name" label="标题"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
      </div>


      <el-table-column label="操作" v-if="user.role=='ROLE_ADMIN'">
          <template slot-scope="scope">
<!--            edit(scope.row)将一行数据输入进行编辑-->
            <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.id)">
              <el-button size="mini" slot="reference" type="danger" style="margin-left:5px">删除</el-button>
            </el-popconfirm>
<!--            <el-button size="mini" type="danger">删除</el-button>-->
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
    <div>
      <el-dialog title="请填写信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form">
          <el-form-item label="标题" label-width="15%">
            <el-input v-model="form.name" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="内容" label-width="15%">
            <el-input type="textarea" v-model="form.content" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>


        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
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
      total:0,
      tableData: [],
      dialogFormVisible:false,
      form:{},
      user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
    }
  },
  //页面加载时，触发create的代码
  created() {
    this.findbySearch()
  },
  //定义一些页面空间触发的事件调用的方法
  methods: {
    // load() {
    //   request.get("/admin").then(res => {
    //     if (res.code == '0') {
    //       this.tableData = res.data;
    //     } else {
    //
    //     }
    //   })
    // },
    findbySearch() {
      request.get("/notice/search", {
        params: this.params,
      }).then(res => {
        if (res.code == '0') {
          this.total = res.data.total;
          this.tableData = res.data.list;

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
      // this.findbysearch();
    },
    add(){
      this.form={}
      this.dialogFormVisible=true

    },
    edit(obj){
      this.form=obj
      this.dialogFormVisible=true
    },
    del(id){
      //注意路径是/notice/id，注意第二个/
      request.delete("/notice"+'/'+id).then(res=>{
        if(res.code=='0'){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.findbySearch();
        }else{
          this.$message({
            message: res.msg,
            type: 'error'
          })

        }
      })
    },
    handleSizeChange(pageSize){
      this.params.pageSize=pageSize
      this.findbySearch()

    },
    handleCurrentChange(pageNum){
      this.params.pageNum=pageNum
      this.findbySearch()
    },

    submit(){
      request.post("/notice",this.form).then(res=>{
        console.log(res)
        if(res.code=='0'){
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.dialogFormVisible=false
          this.findbySearch();
        }else{
          this.$message({
            message:res.msg,
            type: 'error'
          });
          console.log(this.$message)
        }
      })
    },
    successUpload(res){
      console.log(res);
      if(res.code=='0'){
        this.form.img = res.data;
      }
    },
    down(flag){
      location.href='http://localhost:8083/api/files/'+flag
    }

  }
}
</script>