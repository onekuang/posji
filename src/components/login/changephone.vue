<template>
	 <div class="changephone ab_full">
     <BScroll class="box_wrapper">
      <div>
        <div class="changephone_box">

          <mu-text-field 
            label="新手机号" hintText="请输入您新的手机号" fullWidth 
            :errorText="err_mobile"
            v-model='mobile'
          /><br/>

          <mu-text-field label="验证码" hintText="请输入收到的验证码" fullWidth 
            :errorText="err_code" 
            v-model='code' 
          /><br/>

          <mu-sub-header>
            <mu-flat-button :label="code_text" class="demo-flat-button" :disabled='code_btn'
              @click='get_code'/>
          </mu-sub-header>


          <div class="btn_box">
            <span class="state" v-show='state'>{{state}}</span>
          <mu-raised-button backgroundColor="#FF5252" label="确认修改" @click="changephone" class="demo-raised-button" fullWidth />

        </div>
        </div>



      </div>
      </BScroll>
   </div>
</template>

<script>
import BScroll from '../base/scroll/scroll'
import api from '../../assets/api/api.js'


export default {
  data() {
    return {
      code_time:60,
      // 表单字段
      mobile: '13421936693',
      password: '',
      repetition_pass: '',
      yaoqing: '',
      code:'',
      // 错误提示
      err_mobile:'',
      err_password:'',
      err_repetition_pass:'',
      err_yaoqing:'',
      err_code:'',
      code_btn:false,
       // 一些错误信息的显示
      state:'注意!此操作将不可恢复.请谨慎操作'
    }
  },
  computed: {
    code_text() {
      return `获取验证码(${this.code_time})`
    }
  },
  methods: {
    changephone() {
      // 手机
      if (this.mobile == '') {this.err_mobile = '手机号不能为空';return}
      else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile)){
        this.err_mobile = '请输入正确的手机号码';return}
      else{this.err_mobile = ''}

      // 密码
      if (this.password == ''){this.err_password ='密码不能为空';return}
      else{this.err_password =''}

      // 验证码
      if (this.code == ''){this.err_code = '验证码不能为空';return}
      else{ this.err_code =''}

      return 
      // ==================
      this.axios.post(api.sign,{
        mobile    : this.mobile,
        pwd       : this.password,
        returnMsg : this.yaoqing
      })
      .then(res => {
        console.log(res)
        if(res.data.result.state == 200 ){
          this.$toast(res.data.result.msg)
          this.$router.push('/login')
        }else{
          this.state = res.data.result.msg
        }
      })
    },
    // 获取验证码
    get_code() {
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
      return
      // ====================
      this.axios.post(api.getcode,{
        mobile: this.mobile
      })
      .then(res => {
        if(res.data.result.state !== 200){
          this.err_code = res.data.result.msg
          this.code_btn=false
          this.code_time = 60
          return
        }else{
          this.$toast(res.data.result.msg)
        }
      })
    }
  },
  components: {
		BScroll
	}
}
</script>

<style scoped lang="less">
@import url('../../assets/less/config.less');
.changephone{
  background: #fff;
}
.changephone_box{
  padding: 8px;
  background: #fff;
    min-height: 500px;
    padding-top: 30px;
}
.btn_box{
    text-align: center;
    margin: 20px 0;
    .mu-raised-button{
      height: 50px;
      border-radius: 8px;
    }
  
}
.mu-sub-header{
  padding-left: 0;
}
.span1{
  strong{
    color: #FF5252;
  }
}
.clear{
  clear: both;
}

.state{
  display: inline-block;
  font-size: 14px;
  color: #f00;
  margin-bottom: 12px;
}


</style>
