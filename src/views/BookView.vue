<template>
  <div>
    <div style="margin-bottom: 15px">
      <el-input v-model="params.name" style="width: 200px;" placeholder="请输入名称"></el-input>
      <el-input v-model="params.author" style="width: 200px;margin-left: 5px" placeholder="请输入作者"></el-input>
      <el-button type="warning" style="margin-left: 10px" @click="findbySearch()">查询</el-button>
      <el-button type="warning" style="margin-left: 10px" @click="reset()">清空</el-button>
      <el-button type="primary" style="margin-left: 10px" @click="add()">新增</el-button>

    </div>
  <div class="about">
    <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="img" label="图书封面">
        <template v-slot="scope">
          <el-image
              style="width: 80px; height: 80px;border-radius:50%"
              :src="'http://localhost:8083/api/files/'+scope.row.img"
              :preview-src-list="['http://localhost:8083/api/files/'+scope.row.img]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="图书名称"></el-table-column>
      <el-table-column prop="author" label="图书作者"></el-table-column>
      <el-table-column prop="price" label="图书价格"></el-table-column>
      <el-table-column prop="press" label="图书出版社"></el-table-column>
      <!--            typeName是数据库中的值，通Mapper.xml的sql查询得到，v-model实现与数据库字段绑定，前端渲染-->
      <el-table-column prop="typeName" label="图书分类"></el-table-column>


      <el-table-column label="操作">
          <template slot-scope="scope">
<!--            edit(scope.row)将一行数据输入进行编辑-->
            <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="down(scope.row.img)" style="display:inline-block">下载</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.id)">
<!--              将按钮放在同一行：display:inline-block-->
              <el-button size="mini" slot="reference" type="danger" style="margin-top: 5px;">删除</el-button>
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
          <el-form-item label="图书名称" label-width="20%">
            <el-input v-model="form.name" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="图书封面" label-width="20%">
            <el-upload action="http://localhost:8083/api/files/upload" :on-success="successUpload"><!-- 上传success则调用successUpload()-->
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="图书作者" label-width="20%">
            <el-input v-model="form.author" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="图书价格" label-width="20%">
            <el-input v-model="form.price" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="图书出版社" label-width="20%">
            <el-input v-model="form.press" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="图书分类" label-width="20%">

            <el-select v-model="form.typeId" placeholder="请选择">
              <el-option
                  v-for="item in typeObjs"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
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
        author: '',
        pageNum: 1,
        pageSize: 5,
      },
      total:0,
      tableData: [],
      dialogFormVisible:false,
      form:{},  //存储表单信息
      typeObjs:[]  //存储所有图书类型信息
    }
  },
  //页面加载时，触发create的代码
  created() {
    this.findbySearch()
    this.findTypes()
  },
  //定义一些页面空间触发的事件调用的方法
  methods: {

    //在book页面中得到typeId字段的信息，通typeController中的findAll()方法查询
    findTypes(){
      request.get("/type").then(res=>{
        if (res.code == '0') {

          this.typeObjs = res.data  //将信息渲染到前端
          console.log(this.typeObjs)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    findbySearch() {
      request.get("/book/search", {
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
        author: '',
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
      //注意路径是/admin/id，注意第二个/
      request.delete("/book"+'/'+id).then(res=>{
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
      request.post("/book",this.form).then(res=>{
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