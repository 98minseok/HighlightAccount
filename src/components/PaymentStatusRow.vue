  <template>
    <tr>
      <td>
        <NameTag :user_name="user_data.name"></NameTag>
      </td>
      <td v-for = "month in [1,2,3,4,5,6,7,8,9,10,11,12]" :key ="user_data.id + '' + month">
        <div :class ="pay_month.includes(month) ? 'paied' : ''">
        </div>
      </td>
    </tr>
  </template>

  <script>
  import { computed } from 'vue';
  import NameTag from './NameTag.vue';

  export default{
    props: {
      user_data : {
        type : Object,
      },
      payment_data : {
        type : Array,
      }
    },
    setup(props){
      const pay_month = computed(() => {
        return props.payment_data
          .filter(data => data.payment_type.type === "dues")
          .map(data => data.payment_type.month);
      });

      return {pay_month}
    },
    components : {
      NameTag
    }
  }
  </script>

  <style lang="css" scoped>
    td{
      padding : 5px;
      position : relative;
      border: 1px solid black;
      box-sizing: border-box;
      height: 30px;
    }
    div{
      border-radius: 10px;
    }
    .paied{
      width: 100%;
      height: 100%;
      background-color: green;
      box-sizing:border-box;
    }
  </style>
