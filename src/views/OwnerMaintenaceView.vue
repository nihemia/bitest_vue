<!--<template>-->
<!--  <div>-->
<!--    <h2>业主缴费</h2>-->
<!--    <el-button @click="getPayments">查询缴费信息</el-button>-->
<!--    <el-table :data="payments" stripe>-->
<!--      <el-table-column prop="amount" label="金额"></el-table-column>-->
<!--      <el-table-column prop="paymentMethod" label="支付方式"></el-table-column>-->
<!--      <el-table-column prop="paymentTime" label="支付时间"></el-table-column>-->
<!--    </el-table>-->
<!--    <h3>缴费</h3>-->
<!--    <el-form :model="paymentForm" label-width="80px">-->
<!--      <el-form-item label="金额">-->
<!--        <el-input v-model="paymentForm.amount"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="支付方式">-->
<!--        <el-radio-group v-model="paymentForm.paymentMethod">-->
<!--          <el-radio label="wechat">微信支付</el-radio>-->
<!--          <el-radio label="alipay">支付宝支付</el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button @click="pay">缴费</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from 'axios';-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      ownerId: 1, // 假设业主 ID 为 1-->
<!--      payments: [],-->
<!--      paymentForm: {-->
<!--        amount: 0,-->
<!--        paymentMethod: 'wechat'-->
<!--      }-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    async getPayments() {-->
<!--      try {-->
<!--        const response = await axios.get(`/api/payments/owner/${this.ownerId}`);-->
<!--        this.payments = response.data;-->
<!--      } catch (error) {-->
<!--        console.error(error);-->
<!--      }-->
<!--    },-->
<!--    async pay() {-->
<!--      try {-->
<!--        const response = await axios.post(`/api/payments/owner/${this.ownerId}`, {-->
<!--          amount: this.paymentForm.amount,-->
<!--          paymentMethod: this.paymentForm.paymentMethod-->
<!--        });-->
<!--        this.$message.success('缴费成功');-->
<!--        this.getPayments();-->
<!--      } catch (error) {-->
<!--        console.error(error);-->
<!--        this.$message.error('缴费失败');-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<template>
  <div style="margin-bottom: 15px">


      <el-form :model="form">

        <el-form-item label="房间" label-width="15%">
          <el-input v-model="form.roomNumber" autocomplete="off" style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item label="报修说明" label-width="15%">
          <el-input v-model="form.description" autocomplete="off" style="width: 90%"></el-input>
        </el-form-item>


      </el-form>
        <el-button type="primary" @click="submit()">确 定</el-button>

    <el-table :data="tableData" stripe>
      <el-table-column prop="ownerName" label="业主"></el-table-column>
      <el-table-column prop="adminName" label="处理人"></el-table-column>
      <el-table-column prop="description" label="说明"></el-table-column>
      <el-table-column prop="requestTime" label="报修时间"></el-table-column>
      <el-table-column prop="complateTime" label="处理时间"></el-table-column>
      <el-table-column prop="roomNumber" label="房屋号"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
<!--      <el-table-column label="操作">-->
<!--        <template #default="scope">-->
<!--&lt;!&ndash;          <el-button v-if="scope.row.status === '未缴费'" type="primary" @click="payPayment(scope.row.id)">缴费</el-button>&ndash;&gt;-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

  </div>
</template>

<script>


import request from "@/utils/request";

export default {
  data() {
    return {
      tableData: [],
      user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
      params: {
        name: '',
        pageNum: 1,
        pageSize: 5,
      },
      total:0,
      ownerObjs:[],
      form:{
      }
    };
  },
  created() {
    this.getAllMaintenace()
  },
  methods: {
    submit(){
      // request.post('/maintenance/submit', this.form)
      request.post('/maintenance/submit/'+this.user.id, this.form)
          .then(response => {
            console.log(this.form)
            if (response.code === '0') {
              this.$message.success('操作成功');
              this.getAllMaintenace()
            } else {
              this.$message.error('操作失败');
            }
          })
          .catch(error => {
            this.$message.error('请求出错：' + error.message);
          });
    },
    getAllMaintenace() {
      request.get('/maintenance/owner/'+this.user.id).then(response => {
        this.tableData = response.data;
        console.log('/maintenance/owner/'+response.data)
      });
    }

  }
};
</script>