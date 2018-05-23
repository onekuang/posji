<template>
	 <div class="sign ab_full">
     <BScroll class="box_wrapper">
      <div>
        <div class="sign_box">
          <mu-text-field 
            label="昵称" hintText="请输入您的昵称" fullWidth 
            :errornickname="err_nickname"
            v-model='nickname'
          /><br/>

          <mu-text-field 
            label="手机号" hintText="请输入您的手机号" fullWidth 
            :errorText="err_mobile"
            v-model='mobile'
          /><br/>
          <mu-text-field label="设置密码" hintText="请设置您的密码" fullWidth  
            type="password"
            :errorText="err_password"
            v-model='password'
          /><br/>
          <mu-text-field label="确认密码" hintText="请输入确认密码" fullWidth
            type="password"
            :errorText="err_repetition_pass"  
            v-model='repetition_pass'
          /><br/>
          <mu-text-field label="邀请码" hintText="请输入邀请码" fullWidth  
            :errorText="err_yaoqing" 
            v-model='yaoqing'            
          /><br/>
          <mu-text-field label="验证码" hintText="请输入验证码" 
            :errorText="err_code" 
            v-model='code' 
            class='w50p'
          />
            <mu-raised-button 
              :label="code_text" 
              class="demo-raised-button1" 
              :disabled='code_btn'
              labelClass='btn_text'
              @click='get_code'
            />

          <div class="btn_box">
          <span class="state" v-show='state'>{{state}}</span>
          <mu-raised-button backgroundColor="#FF5252" label="注册" @click="sign" class="demo-raised-button" fullWidth />

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
      nickname: '',
      mobile: '',
      password: '',
      repetition_pass: '',
      yaoqing: '',
      code:'',
      true_code: '',
      // 错误提示
      err_nickname:'',
      err_mobile:'',
      err_password:'',
      err_repetition_pass:'',
      err_yaoqing:'',
      err_code:'',
      code_btn:false,
      // 一些错误信息的显示
      state:''
    }
  },
  created() {

  },
  computed: {
    code_text() {
      return `获取验证码(${this.code_time})`
    }
  },
  methods: {
    sign() {
      // 昵称
      if (this.nickname == '') {this.err_nickname = '昵称不能为空';return}
      else{this.err_nickname = ''}

      // 手机
      if (this.mobile == '' || this.mobile.length < 6) {
        this.err_mobile = '手机号不能为空,并且大于6位';return}
      else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile)){
        this.err_mobile = '请输入正确的手机号码';return}
      else{this.err_mobile = ''}

      // 密码
      if (this.password == ''){this.err_password ='密码不能为空';return}
      else{this.err_password =''}

      // 确认密码
      if (this.repetition_pass == ''){this.err_repetition_pass ='确认密码不能为空';return}
      else{this.err_repetition_pass =''}

      // 是否重复
      if (this.repetition_pass !== this.password){this.err_repetition_pass ='两次密码不一致';return}
      else{this.err_repetition_pass =''}

      // 邀请码
      if (this.yaoqing == ''){this.err_yaoqing = '邀请码不能为空';return}
      else{ this.err_yaoqing =''}

      // 验证码
      if (this.code == ''){this.err_code = '验证码不能为空';return}
      else{ this.err_code =''}

      let new_code = this.true_code.toString();
      if (this.code !== new_code){this.err_code = '验证码错误';return}
      else{ this.err_code =''}

      this.axios.post(api.sign,{
        nickName  : this.nickname,
        mobile    : this.mobile,
        pwd       : this.password,
        invitationCode : this.yaoqing
      })
      .then(res => {
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

      this.axios.post(api.getcode,{
        mobile: this.mobile
      })
      .then(res => {
        if(res.data.result.state !== 200){
          let msg = res.data.result.msg
          this.$toast(msg)
          this.code_time = 60
          return
        }else{
          this.true_code = res.data.result.result
          this.$toast('验证码已经发送')
        }
      })
    }
  },
  components: {
		BScroll
	}
}
</script>

<style lang="less">
@import url('../../assets/less/config.less');
.sign{
  background: #fff;
  .btn_text{
    font-size: 14px;
  }
  .w50p{
    width: 50%;
  }
  .demo-raised-button1{
    margin-left: 15px;
  }
  .sign_box{
    padding: 8px;
    background: #fff;
      min-height: 600px;
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
