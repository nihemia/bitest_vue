

<template>
  <div>
    <div style="margin-bottom: 15px">
      <el-input v-model="params.name" style="width: 200px;" placeholder="请输入业主姓名"></el-input>
      <el-button type="warning" style="margin-left: 10px" @click="findbySearch()">查询</el-button>
      <el-button type="warning" style="margin-left: 10px" @click="reset()">清空</el-button>


    </div>
    <div class="about">
      <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
      >
        <el-table-column prop="ownerName" label="业主"></el-table-column>
        <el-table-column prop="adminName" label="处理人"></el-table-column>
        <el-table-column prop="description" label="说明"></el-table-column>
        <el-table-column prop="requestTime" label="报修时间"></el-table-column>
        <el-table-column prop="complateTime" label="处理时间"></el-table-column>
        <el-table-column prop="roomNumber" label="房屋号"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--            edit(scope.row)将一行数据输入进行编辑-->
            <el-button size="mini" type="primary" @click="complete(scope.row.id)" v-if="scope.row.status === '未处理'" style="margin-right:3px" >处理</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.id)">
              <el-button size="mini" slot="reference" type="danger" style="margin-top:5px">删除</el-button>
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
      form:{
      },
      ownerObjs:[],
      user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
    }
  },
  //页面加载时，触发create的代码
  created() {
    this.findName() ,
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
    findName(){
      console.log("进来了")
      request.get("/user/names").then(res => {
        if (res.code === '0') {
          // 假设后端返回的每个对象包含业主信息，提取id和name属性
          this.ownerObjs = res.data
          console.log("weixiu业主的信息"+res.data);
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      });
    },

    findbySearch() {
      request.get("/maintenance/search", {
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
    complete(id) {
      request.put('/maintenance/update/admin/'+id,this.user)
          .then(response => {
            console.log('/maintenance/update/admin/'+this.user.id)
            console.log(response)
            if (response.code === '0') {
              this.$message.success('处理成功');
              this.findbySearch();
            } else {
              this.$message.error('处理失败');
            }
          })
          .catch(error => {
            this.$message.error('请求出错：' + error.message);
          });
    },
    del(id){
      //注意路径是/admin/id，注意第二个/
      request.delete("/maintenance/delete"+'/'+id).then(res=>{
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
      request.post('/payments', this.form)
          .then(response => {
            console.log(this.form)
            if (response.code === '0') {
              this.$message.success('操作成功');
            } else {
              this.$message.error('操作失败');
            }
          })
          .catch(error => {
            this.$message.error('请求出错：' + error.message);
          });
      this.dialogFormVisible=false;
    }

  }
}
</script>