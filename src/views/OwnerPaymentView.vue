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

    <el-table :data="payments" stripe>
      <el-table-column prop="ownerName" label="业主姓名"></el-table-column>
      <el-table-column prop="paymentItem" label="缴费项目"></el-table-column>
      <el-table-column prop="amount" label="缴费金额"></el-table-column>
      <el-table-column prop="description" label="缴费说明"></el-table-column>
      <el-table-column prop="status" label="缴费状态"></el-table-column>
      <el-table-column prop="paymentTime" label="缴费时间"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button v-if="scope.row.status === '未缴费'" type="primary" @click="payPayment(scope.row.id)">缴费</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>


import request from "@/utils/request";

export default {
  data() {
    return {
      payments: [],
      user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
      params: {
        name: '',
        pageNum: 1,
        pageSize: 5,
      },
      total:0,
    };
  },
  mounted() {
    this.getPayments();
  },
  methods: {

    getPayments() {
      request.get('/payments/owner/'+this.user.id).then(response => {
        console.log(this.user.id)
        this.payments = response.data;
      })
    },
    payPayment(id) {
      request.put('/payments/'+id+'/pay')
          .then(response => {
            console.log(response)
            if (response.code === '0') {
              this.$message.success('缴费成功');
              this.getPayments();
            } else {
              this.$message.error('余额不足，缴费失败');
            }
          })
          .catch(error => {
            this.$message.error('请求出错：' + error.message);
          });
    },
  }
};
</script>