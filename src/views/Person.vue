
<template>
  <div style="width: 50%">
    <el-container>
      <el-main>
        <el-button type="primary" @click="paybyOwner()" style="float: right">充值</el-button>
        <el-button type="primary"@click="dialogVisiblee = true" style="float: right">修改密码</el-button>
        <h1>个人信息</h1>

        <el-form :model="userInfo" label-width="80px">

          <el-form-item label="姓名">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="userInfo.phone"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="userInfo.sex"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="userInfo.age"></el-input>
          </el-form-item>
          <el-form-item label="余额">
                  {{userInfo.totalMoney}}
          </el-form-item>
        </el-form>
        <div style="text-align: center">

          <el-button type="primary" @click="submit()">提交</el-button>
        </div>
      </el-main>
    </el-container>

    <el-dialog :visible.sync="dialogVisible" title="编辑信息">
      <el-form :model="payForm">

        <el-form-item label="充值金额">
          <el-input v-model="payForm.payMoney" style="width: 50%"></el-input>
          <el-radio v-model="payForm.payWay" label="微信">微信</el-radio>
          <el-radio v-model="payForm.payWay" label="支付宝">支付宝</el-radio>
          <el-button type="primary" @click="savePay()">充值</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisiblee" title="修改密码">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblee = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: 'Person',
  data() {
    return {
      userInfo: {},
      payForm:{},
      pswdForm:{},
      user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
      dialogVisible:false,
      dialogVisiblee:false,
      form: {
        username: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        role:'',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 3, message: '密码长度不能少于3位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: this.validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  created() {

    this.findAll();
  },
  methods:{

    findAll(){
      request.post('/info',this.user).then(response => {
        this.userInfo = response
        console.log('/info'+this.userInfo.totalMoney)
        console.log("userInfo"+this.userInfo)
      })
    },
    submit(){
      let url;
      if (this.user.role == 'ROLE_ADMIN') {
        url='/admin'
      }
      else if(this.user.role == 'ROLE_USER'){
        url='/user/info'
      }
      request.post(url,this.userInfo).then(res=>{
        if(res.code=='0'){
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.findAll();
        }else{
          this.$message({
            message:res.msg,
            type: 'error'
          });
          console.log(this.$message)
        }
      })
    },
    paybyOwner(){
      this.dialogVisible=true
    },
    savePay(){
      this.userInfo.payMoney=this.payForm.payMoney;
      this.userInfo.payWay=this.payForm.payWay;
      request.post('/user/pay',this.userInfo).then(res=>{
        if(res.code=='0'){
          this.$message.success("操作成功")
          this.dialogVisible=false
          this.findAll();
        }else{
          this.$message.error("操作错误")
        }

    })
    },
    validatePassword(rule, value, callback) {
      if (value !== this.form.newPassword) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    },
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // request.post('/web/changePassword', this.form)
          //     console.log("/changePassword"+this.form)
          //     .then(response => {
          //       if(res.code=='0'){
          //         this.$message.success("操作成功")
          //         this.dialogVisiblee = false;
          //         this.findAll();
          //       }else{
          //         this.$message.error("操作错误")
          //       }
          //     })
          this.form.role=this.user.role
          request.post('/changePassword',this.form).then(res=>{

            console.log('/changePassword+role:'+this.form.role)
            console.log(this.form)
            if(res.code=='0'){
              this.$message.success("操作成功")
              this.dialogVisiblee=false
            }else{
              this.$message.error("操作错误")
            }

          })
        } else {
          return false;
        }
      });
    }
    }
    // update() {
    //   // let url
    //   // const users = JSON.parse(localStorage.getItem('user'))
    //   // // console.log(user)
    //   // if (users.role == 'ROLE_ADMIN') {
    //   //   url = '/admin'
    //   //
    //   // } else (users.role == 'ROLE_USER')
    //   // {
    //   //   url = '/user'
    //   //   // console.log(url)
    //   // }
    //   const user = JSON.parse(localStorage.getItem('user'))
    //   let url = '/user/update'
    //   if (user.role === 'ROLE_ADMIN') {
    //     url = '/admin/update'
    //   }
    //   console.log(this.userInfo)
    //   request.post(url,this.userInfo).then(res => {
    //
    //     if(res.code=='0'){
    //       // localStorage.setItem("user",JSON.stringify(res.data))
    //       const newUserData = { ...user, ...this.userInfo };
    //       localStorage.setItem("user", JSON.stringify(newUserData))
    //       this.$message({
    //         message: '操作成功',
    //         type: 'success',
    //       });
    //       // users.name=this.userInfo.name
    //       // users.phone=this.userInfo.phone
    //       // users.sex=this.userInfo.sex
    //
    //       // console.log(users)
    //     }else{
    //       this.$message({
    //         message: res.msg,
    //         type: 'error'
    //       })
    //     }
    //     console.log(res)
    //   })
    //
    // }

}

</script>