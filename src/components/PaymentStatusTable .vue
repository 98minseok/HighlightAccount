<template>
  <table>
    <thead>
      <tr>
        <th>
        이름
      </th>
      <th :key ="'month-'+month" v-for = "month in [1,2,3,4,5,6,7,8,9,10,11,12]">
        {{ month + "월" }}
      </th>
      </tr>
    </thead>
    <tbody>
    <payment-status-row :key = "user.id" v-for = "user in user_temp_data" :payment_data = "user_payment_data(user.id)" :user_data = "user"></payment-status-row>
    </tbody>
  </table>
</template>

<script>
import PaymentStatusRow from './PaymentStatusRow.vue'
  export default{
    setup(){
      const user_temp_data = [
        {
          id : 1,
          name : "김민석",
        },
        {
          id : 2,
          name : "박은효",
        },
        {
          id : 3,
          name : "김민범"
        },
        {
          id : 4,
          name : "김대환",
        }
      ]
      const payment_temp_data = [
        {
          id : 1,
          user_id : 1,
          payment_type : {
            type : "dues",
            month : 1,
          },
          pay_day : '2025-01-01'
        },
        {
          id : 2,
          user_id : 1,
          payment_type : {
            type : "dues",
            month : 2,
          },
          pay_day : '2025-02-01'
        }
      ]

      const user_payment_data = (user) => {
        return payment_temp_data.filter((data) => data.user_id == user)
      }

      return {
        payment_temp_data,user_temp_data,user_payment_data
      }
    },
    components : {
      PaymentStatusRow
    }
  }
</script>

<style scoped>
table{
  margin:auto;
}
 table,tr,td,th{
  border-collapse: collapse;
  border : 1px solid black;
 }
 th{
  width : 7vw;
  padding : 10px;
 }
</style>
