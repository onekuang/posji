<template>
<div class="addbank ab_full">
  <BScroll class="box_wrapper">
  <div>
    <div class="addbank_list">
      <ul>
        <mu-select-field 
          fullWidth
          v-model="bank_id" 
          :labelFocusClass="['label-foucs']" 
          label="选择银行"
        >
          <mu-menu-item 
            v-for="(item,index) in list" 
            :key="index" 
            :value="item.id" 
            :title="item.name" 
          />
        </mu-select-field>
        <li>
          <mu-text-field 
            label="银行卡号:" 
            hintText="请输入银行卡号" 
            :errorText="err_bank_num" 
            v-model = "bank_num"
            fullWidth />
        </li>
        <li>
          <mu-text-field 
            label="您的姓名" 
            hintText="请输入您的姓名" 
            :errorText="err_username" 
            v-model = 'username'
            fullWidth />
        </li>
        <li>
          <mu-text-field 
            label="手机号码" 
            hintText="绑定银行手机号码" 
            :errorText="err_mobile"
            v-model = 'mobile'
            fullWidth />
        </li>
        <li>
          <mu-text-field 
            label="验证码" 
            hintText="请输入验证码" 
            :errorText="err_code"
            v-model = 'code'
            class='w50p'
          />
          <mu-raised-button :label="code_text" class="demo-raised-button1" :disabled='code_btn' labelClass='btn_text'
              @click='get_code'/>
        </li>
        <li class="bank_btn">
        </li>

        <br>
        <li class="bank_btn">
          <mu-raised-button label="确认提交" class="demo-raised-button2" secondary fullWidth @click='add_bank'/>
        </li>
      </ul>
    </div>
  </div>
  </BScroll>
</div>
</template>

<script>
import BScroll from '../base/scroll/scroll'
import api from '../../assets/api/api.js'
import Loading from '../base/loading/loading.vue'
import mystorage from '../../common/js/storage.js'
export default {
  data() {
    return {
      code_time:60,
      code_btn:false,
      bank_id: 0,
      list: [],
      bank_num: '',
      username: '',
      mobile: '',
      code: '',
      true_code: '',
      err_bank_num: '',
      err_username: '',
      err_mobile: '',
      err_code: '',
    }
  },
  computed: {
    code_text() {
      return `获取验证码(${this.code_time})`
    }
  },
  created() {
    this._getData()
  },
  methods: {
    _getData() {
      this.axios.get(api.get_bank,{
        params:{
          sessionID: mystorage.get('session_id')
        }
      })
      .then(res => {
        if (res.data.state == 401){
          this.$alert('请先登录')
          this.$router.push({
            path:'/login'
          })
          return
        }
        if(res.data.result.state == 200) {
          this.list = res.data.result.result
        }
      })
    },
    add_bank() {
      // 姓名
      if (this.bank_num == '') {this.err_bank_num = '卡号不能为空';return}
      else{this.err_bank_num = ''}

      // 姓名
      if (this.username == '') {this.err_username = '姓名不能为空';return}
      else{this.err_username = ''}

      // 手机
      if (this.mobile == '' || this.mobile.length < 6) {
        this.err_mobile = '手机号不能为空,并且大于6位';return}
      else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile)){
        this.err_mobile = '请输入正确的手机号码';return}
      else{this.err_mobile = ''}

      // 验证码

      if (this.code == ''){this.err_code = '验证码不能为空';return}
      else{ this.err_code =''}

      let new_code = this.true_code.toString();
      if (this.code !== new_code){this.err_code = '验证码错误';return}
      else{ this.err_code =''}


      this.axios.get(api.add_bank,{
        params:{
          sessionID: mystorage.get('session_id'),
          bankTypeID  : this.bank_id,
          cardNumber  : this.bank_num,
          usersName   : this.username,
          submitFlag  : 'add',
          code        : this.code
        }
      })
      .then(res => {
        if (res.data.result.state == 200) {
          this.$toast(res.data.result.msg),
          this.$router.push('/bank')          
        }
      })
    },
    get_code() {
      if (this.mobile == '' || this.mobile.length < 6) {
        this.err_mobile = '手机号不能为空,并且大于6位';return}
      else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile)){
        this.err_mobile = '请输入正确的手机号码';return}
      else{this.err_mobile = ''}
        
      let that = this
      this.code_btn = true
      let time = setInterval(()=>{
        that.code_time--
        if(that.code_time <= 0){
          window.clearInterval(time);
          that.code_btn = false
          that.code_time = 60
        }
      },1000)

      this.axios.post(api.bank_get_code,{
        mobile: this.mobile,
        sessionID: mystorage.get('session_id')
      })
      .then(res => {
        if(res.data.state !== 200){         
          this.code_time = 60
          return
        }else{
          this.true_code = res.data.result
          this.$toast('验证码已经发送')
        }

        // console.log(res)
      })
    }
  },
  components:{
    BScroll
  }
}
</script>

<style lang="less">
@import url('../../assets/less/config.less');
.addbank_list{
  padding: 8;
  ul{
    padding: 8px;
    background: #fff;
    li{

    }
  }
}
.mu-popover:nth-of-type(1){
  top: 0px !important;
}
.addbank{
  .btn_box{
        text-align: center;
        margin-top: 50px;
        .mu-raised-button-primary{
          background-color: rgba(255, 107, 1,1);
        }
        .bank_btn{
          width: 30%;
          margin-bottom: 20px;
        }

    
  } 
  .demo-raised-button1{
    margin-left: 15px;
  }
  .btn_text{
    font-size: 14px;
  }
  .demo-raised-button2{
      height: 50px;
      border-radius: 8px;
  }
  .w50p{
    width: 50%;
  }
}


</style>
