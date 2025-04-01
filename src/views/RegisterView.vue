<template>
  <div>
    <div style="width: 400px;height: 500px;margin:150px auto;background-color: rgba(171,186,214,0.5);border-radius: 10px">
      <div style="width: 100%;height: 100px;font-size: 30px;line-height: 100px;text-align: center;color: #4a5ed0">欢迎注册</div>
      <div style="margin-top: 25px;text-align: center;height: 360px">
        <el-form :model="admin">
          <el-form-item label="用户名" label-width="20%">
            <el-input v-model="admin.name" prefix-icon="el-icon-user" style="width: 80%" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="20%">
            <el-input type="password" v-model="admin.password" prefix-icon="el-icon-user" style="width: 80%" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="年龄" label-width="20%">
            <el-input v-model="admin.age" prefix-icon="el-icon-user" style="width: 80%" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="20%">
            <el-input v-model="admin.phone" prefix-icon="el-icon-user" style="width: 80%" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="性别" label-width="20%">
            <el-radio v-model="admin.sex" label="男">男</el-radio>
            <el-radio v-model="admin.sex" label="女">女</el-radio>
          </el-form-item>

          <el-form-item>
            <el-button style="width: 80%;margin-top: 10px" type="primary" @click="register()">注册</el-button>
          </el-form-item>

          <div style="text-align:center">
            未有账户？<a href="javascript:void(0)" style="text-decoration:none" @click="navLogin">点击登录</a>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>


import request from "@/utils/request";

export default {
  name:"Register",
  data() {
    return {
      admin:{}
    }
  },
  //页面加载时，触发create的代码
  created() {

  },
  //定义一些页面空间触发的事件调用的方法
  methods: {
    register(){
      // if(localStorage.getItem("user")=="ROLE_ADMIN"){
      //   this.admin.role='ROLE_ADMIN'
      // }
      // if(localStorage.getItem("user")=="ROLE_USER"){
      //   this.admin.role='ROLE_USER'
      // }
      // this.admin.role='ROLE_USER'
        request.post("/register",this.admin).then(res=>{
          if(res.code=='0'){
            this.$message({
              message: '注册成功',
              type: 'success'
            });
            // 登录成功跳转到首页
            this.$router.push("/login");
          }else{
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
          console.log(this.$message)
        })
    },
    navLogin(){
      this.$router.push("/login")
    }
  }
}
</script>