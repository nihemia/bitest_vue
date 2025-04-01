
<template>
  <div>
<!--    <el-container>-->
<!--      <el-main>-->
<!--        <h1>个人信息</h1>-->
<!--        <el-form :model="userInfo" label-width="80px">-->

<!--          <el-form-item label="姓名">-->
<!--            <el-input v-model="userInfo.name"  ></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="电话">-->
<!--            <el-input v-model="userInfo.phone" ></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="性别">-->
<!--            <el-input v-model="userInfo.sex" ></el-input>-->
<!--          </el-form-item>-->
<!--&lt;!&ndash;          <el-form-item label="旧密码">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-input v-model="userInfo.password" disabled></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--          <el-form-item label="新密码">-->
<!--            <el-input v-model="userInfo.password"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item>-->
<!--            <el-button style="width: 80%;margin-top: 10px" type="primary" @click="submitedit()">提交</el-button>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </el-main>-->

<!--    </el-container>-->
  </div>
</template>

<script>
import request from "@/utils/request";
// export default {
//   name: 'ChangePswd',
//   data() {
//     return {
//       userInfo: {}
//     }
//   },
//   created() {
//     const user = JSON.parse(localStorage.getItem('user'))
//       request.post('/info', user).then(response => {
//         this.userInfo = response
//       })
//     console.log(user)
//
//
//   },
//   methods:{
//     submitedit(){
//       request.post("/changePassword",this.form).then(res=>{
//       console.log(res)
//       // if(res.code=='0'){
//       //   this.$message({
//       //     message: '操作成功',
//       //     type: 'success'
//       //   });
//       //   this.dialogFormVisible=false
//       //   this.findbySearch();
//       // }else{
//       //   this.$message({
//       //     message:res.msg,
//       //     contype: 'error'
//       //   });
//       //   console.log(this.$message)
//       // }
//       })
//     }
//   }
//
// }

</script>