<template>
  <div>
    <div style="margin-bottom: 15px">
      <el-input v-model="params.name" style="width: 200px;" placeholder="请输入图书类别名称"></el-input>
      <el-button type="warning" style="margin-left: 10px" @click="findbySearch()">查询</el-button>
      <el-button type="warning" style="margin-left: 10px" @click="reset()">清空</el-button>
      <el-button type="primary" style="margin-left: 10px" @click="add()" v-if="user.role=='ROLE_ADMIN'">新增</el-button>
      <el-popconfirm title="确定删除这些数据吗？" @confirm="delBatch()">
        <el-button size="mini" slot="reference" type="danger" style="margin-left:5px" v-if="user.role=='ROLE_ADMIN'">批量删除</el-button>
      </el-popconfirm>
      <el-button type="success" style="margin-left: 10px;" @click="exp()" v-if="user.role=='ROLE_ADMIN'">导出报表</el-button>
<!--      :show-file-list="false"使得文件上传成功后将文件列表收起来-->
      <el-upload action="http://localhost:8083/api/type/upload" style="display:inline-block;margin-left: 10px" :show-file-list="false" :on-success="successUpload" ><!-- 上传success则调用successUpload()-->
        <el-button size="small" type="primary" v-if="user.role=='ROLE_ADMIN'">批量导入</el-button>
      </el-upload>
    </div>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%"
        ref="table"
      @selection-change="handleSelectionChange" :row-key="getRowKeys">  <!--   选择多选框时触发的方法-->
<!--      实现跨页多选 ref="table" :reserve-selection="true" :row-key="getRowKeys"-->
      <el-table-column type="selection" width="55" :reserve-selection="true">
      </el-table-column>
      <el-table-column prop="name" label="图书类别名称"></el-table-column>
      <el-table-column prop="description" label="图书类别描述"></el-table-column>
      <el-table-column label="操作">
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
          <el-form-item label="图书类别名称" label-width="15%">
            <el-input v-model="form.name" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="图书类别描述" label-width="15%">
            <el-input v-model="form.description" autocomplete="off" style="width: 90%"></el-input>
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
        description: '',
        pageNum: 1,
        pageSize: 5,

      },
      total:0,
      tableData: [],
      dialogFormVisible:false,
      form:{},
      multipleSelection:[],   // 接收多选框的值
      user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{}
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
      request.get("/type/search", {
        params: this.params,
      }).then(res => {
        if (res.code == '0') {
          this.total = res.data.total;
          this.tableData = res.data.list;

        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    reset(){
      this.params={
        name:'',
        phone: '',
        pageNum: 1,
        pageSize: 5,


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
      //注意路径是/admin/id，注意第二个/
      request.delete("/type"+'/'+id).then(res=>{
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
      request.post("/type",this.form).then(res=>{
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
            contype: 'error'
          });
          console.log(this.$message)
        }
      })
    },
    delBatch(){
    //1、删除前先判断
    //   console.log("请勾选要删除的信息")
      if(this.multipleSelection.length==0){
        this.$message.warning("请勾选要删除的信息");
        return
      }
      request.put("/type/delBatch",this.multipleSelection).then(res=>{
        if(res.code=='0'){
          this.$message.success("批量删除成功")
          this.findbySearch();
        }else{
          this.$message.error(res.msg)

        }
      })
    },
    handleSelectionChange(val){
      this.multipleSelection=val;  //记录多选框选中的值
    },
    getRowKeys(row){
      return row.id;
    },
    exp(){
      //拼接token，防止被jwt拦截
      let user=localStorage.getItem("user");
      location.href='http://localhost:8083/api/type/export?token='+JSON.parse(user).token;
    },
    successUpload(res){
      console.log(res);
      if(res.code=='0'){
        this.$message.success("批量导入成功")
        this.findbySearch();
      }else{
        this.$message.error(res.msg)

      }
    }

  }
}
</script>