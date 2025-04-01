<template>
  <div>
    <el-container>
      <el-header style="background-color: #4c535a">
        <img src="@/assets/logo.png" alt="" style="width:40px;position:relative;top:10px">
        <span style="font-size: 20px;margin-left: 15px;color: white">毕业设计</span>
        <el-dropdown style="float: right">

<!--          <span style="margin-right: 10px">-->
<!--          <el-image-->
<!--              style="width: 50px; height: 50px;border-radius:50%"-->
<!--              :src="'http://localhost:8083/api/files/'+this.user.img"-->
<!--              :preview-src-list="['http://localhost:8083/api/files/'+this.user.img]">-->
<!--          </el-image>-->
<!--         </span>-->

          <span class="el-dropdown-link" style="font-size:15px;color:white;line-height: 60px">{{user.name}}
            <i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item ><div @click="logout()">退出登录</div></el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      </el-container>
    <el-container>
        <el-aside style="overflow: hidden;min-height:100vh;background-color:#545c64;width:250px">
          <el-menu
              default-active="$route.path"
              router
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
<!--            <el-menu-item index="/">-->
            <el-menu-item index="/home">
              <i class="el-icon-s-home"></i>
              <span slot="title">系统首页</span>
            </el-menu-item>
<!--            通过 v-if="user.role=='ROLE_ADMIN'"实现用户权限控制-->
            <el-submenu index="2" v-if="user.role=='ROLE_ADMIN'">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin">用户信息</el-menu-item>
                <el-menu-item index="2-2">信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>信息管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/book">图书信息</el-menu-item>
                <el-menu-item index="/type">图书分类</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>生活管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/maintenanceRequest">维修信息</el-menu-item>
                <el-menu-item index="/parkingSpace" >车位信息</el-menu-item>
                <el-menu-item index="/house">房屋信息</el-menu-item>

              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>其他管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/notice">公告信息</el-menu-item>
                <el-menu-item index="/adminPayment">admin缴费信息</el-menu-item>

              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
    </el-container>
  </div>
</template>

<script>
export default{
  name:"Layout",
  data() {
    return{
      user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{}
    }
  },
  methods:{
    logout(){
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
    // personInfo(){
    //   this.$router.push("/person");
    //   // console.log("/login")
    // },
    // changePassword(){
    //   this.$router.push("/changePswd");
    // }
    // handleOpen(){
    //
    // },
    // handleClose(){
    //
    // }
  }
}
</script>
<style>
.el-menu{
  border-right: none !important;
}
</style>