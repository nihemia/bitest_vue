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
            <el-dropdown-item ><div @click="ownerCenter()">个人中心</div></el-dropdown-item>
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
          <el-menu-item index="/frontView">
            <i class="el-icon-s-home"></i>
            <span slot="title">系统首页</span>
          </el-menu-item>
          <!--            通过 v-if="user.role=='ROLE_ADMIN'"实现用户权限控制-->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>生活管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/frontView/ownerMaintenace">维修信息</el-menu-item>
              <el-menu-item index="/frontView/ownerParkingSpace">业主车位信息</el-menu-item>
              <el-menu-item index="/frontView/ownerHouse">业主房屋信息</el-menu-item>

            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>其他管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/frontView/notice">公告信息</el-menu-item>
              <el-menu-item index="/frontView/ownerPayment">缴费信息</el-menu-item>

            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
<!--         <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">-->
<!--           <el-menu-item index="1">处理中心</el-menu-item>-->
<!--           <el-submenu index="2">-->
<!--             <template slot="title">我的工作台</template>-->
<!--             <el-menu-item index="">主页</el-menu-item>-->
<!--             <el-menu-item index="ownerParkingSpace">业主停车位</el-menu-item>-->
<!--             <el-menu-item index="2-3">选项3</el-menu-item>-->
<!--           </el-submenu>-->

<!--         </el-menu>-->


<!--        <div class="carousel-container" style="margin-top: 20px">-->
<!--          <el-carousel-->
<!--              :interval="5000"-->
<!--              height="400px"-->
<!--              indicator-position="outside"-->
<!--              @change="handleSlideChange"-->
<!--          >-->
<!--            <el-carousel-item v-for="(item, index) in carouselItems" :key="index">-->
<!--              <img-->
<!--                  :src="item.image"-->
<!--                  :class="zoomClass"-->
<!--                  alt="轮播图"-->
<!--                  style="width: 100%; height: 100%; object-fit: cover;"-->
<!--              />-->
<!--              <div v-if="item.title" class="carousel-caption">-->
<!--                {{ item.title }}-->
<!--              </div>-->
<!--            </el-carousel-item>-->
<!--          </el-carousel>-->
<!--        </div>-->



    </el-container>
  </div>
</template>

<script>
export default{
  name:"Front",
  data() {
    return{
      // activeIndex: '1',
      // activeIndex2: '1',
      user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
      // carouselItems: [
      //   { image: require('@/assets/logo.png'), title: '第一张轮播图' },
      //   { image: require('@/assets/im1.png'), title: '第二张轮播图' },
      //   { image: require('@/assets/im2.png'),title: '第三张轮播图'  }
      // ],
      // zoomClass: 'zoom-in'
    }
  },
  methods:{
    handleSlideChange() {
      this.zoomClass = 'zoom-out'
      setTimeout(() => {
        this.zoomClass = 'zoom-in'
      }, 100)

  },
    logout(){
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
    ownerCenter(){
      this.$router.push("/frontView/person")
    }
    // handleSelect(key, keyPath) {
    //   console.log(key, keyPath);
    //   this.$router.push(key);
    // },
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