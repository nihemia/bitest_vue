<template>
  <div class="bg">
<!--    <div style="width: 350px;background-color: #fff;border-radius: 5px;box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 40px 20px">-->
<!--      <el-form ref="formRef" :model="data.form">-->
<!--        <div style="mar"></div>-->

<!--      </el-form>-->
<!--    </div>-->



    <div style="width: 400px;height: 350px;margin:150px auto;background-color: rgba(107,149,224,0.5);border-radius: 10px">
      <div style="width: 100%;height: 100px;font-size: 30px;line-height: 100px;text-align: center;color: #4a5ed0">欢迎登录</div>
      <div style="margin-top: 25px;text-align: center;height: 320px">
<!--        <el-form ref="formRef" :model="admin" :rules="data.rules">-->
        <el-form ref="formRef" :model="admin">
          <el-form-item>
            <el-input v-model="admin.name" prefix-icon="el-icon-user" style="width: 80%" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input show-password v-model="admin.password" prefix-icon="el-icon-user" style="width: 80%" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="role">
            <el-select v-model="admin.role" placeholder="请选择" style="width: 80%">
              <el-option label="业主" value="ROLE_USER"></el-option>
              <el-option label="管理员" value="ROLE_ADMIN"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 80%;margin-top: 10px" type="primary" @click="login()">登录</el-button>
          </el-form-item>

          <div style="text-align:center">
            未有账户？<a href="javascript:void(0)" style="text-decoration:none" @click="navRegister">点击注册</a>
          </div>

        </el-form>
      </div>
    </div>
  </div>
</template>

<!--<script setup>-->
<script>


import request from "@/utils/request";
import {reactive,ref} from "vue";


// const formRef=ref()
// const data=reactive({
//   form:{},
//   rules: {
//     name: [
//       {required: true, message: '请输入账号', trigger: 'blur'},
//       {min: 3, message: '账户最少3位', trigger: 'blur'}],
//     password: [
//       {required: true, message: '请输入密码', trigger: 'blur'}
//     ]
//   }
// })

export default {

  name:"Login",
  data() {
    return {
      admin:{},
    }
  },
  //页面加载时，触发create的代码
  created() {
  },
  //定义一些页面空间触发的事件调用的方法
  methods: {
    login(){
        // request.post("/login",this.data.form).then(res=>{
        request.post("/login",this.admin).then(res=>{
          console.log(this.admin)
          if(res.code=='0'){
            if(res.data?.token){
              localStorage.setItem("user",JSON.stringify(res.data));
            }
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            console.log(res.data)
            //前端保存登录用户的信息
            // localStorage.setItem("user",JSON.stringify(res.data));
            console.log("user"+JSON.stringify(res.data))
            // 登录成功跳转到首页
            if(res.data.role=="ROLE_USER"){
              this.$router.push("/frontView")
            }
          else if(res.data.role=="ROLE_ADMIN"){
              this.$router.push("/");
            }

          }else{
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
    },
    navRegister(){
      this.$router.push("/register")
    }
  }

}

</script>