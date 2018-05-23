<template>
   <div class="login ab_full">
     <BScroll class="box_wrapper">
      <div>
      <form>
        <div class="login_box">
          <!-- 2个表单 -->
          <mu-text-field 
            label="手机号" 
            hintText="请输入您的手机号" 
            fullWidth 
            :errorText="err_mobile"
            errorColor="orange"
            v-model='mobile'
          /><br/>
          <mu-text-field 
            label="密码" 
            hintText="请输入您的密码" 
            fullWidth  
            type="password" 
            errorColor="orange"
            :errorText="err_password"
            v-model='password'
          /><br/>
          
          <!-- 注册和忘记密码入口 -->
          <mu-sub-header>
            <span class="span1" @click="goto('/sign')" >没有帐号?<strong>点击注册</strong></span>
            <span class="span2" @click="goto('./forget_pass')"><strong>忘记密码?</strong></span>
            <div class="clear"></div>
          </mu-sub-header>

          <!-- 登录按钮 -->
          <div class="btn_box">
            <mu-raised-button 
              backgroundColor="#FF5252"
              label="登录" 
              @click="login" 
              class="demo-raised-button"  
              fullWidth
            />
          </div>
        </div>


      </form>
      <div class="loading" v-show='loading'>
        <Loading :title='loading_title'/>
      </div>
      </div>
      </BScroll>
   </div>
</template>

<script>
import BScroll from '../base/scroll/scroll'
import Loading from '../base/loading/loading.vue'
import api from '../../assets/api/api.js'
import mystorage from '../../common/js/storage.js'

export default {
  data() {
    return {
      loading_title:'正在请求登录',
      loading: false,

      mobile: '',
      password:'',
      err_mobile:'',
      err_password:''
    }
  },
  created() {
  },
  methods: {
    login() {
      let mobile  = this.mobile
      let pass    = this.password

      if (mobile == '') {
        this.err_mobile = '手机号不能为空'
        return
      }else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(mobile)){
        this.err_mobile = '请输入正确的手机号码'
        return
      }else{
        this.err_mobile = ''
      }


      if (pass == ''){
        this.err_password ='密码不能为空'
        return
      }else{
        this.err_password =''
      }

      this.loading = true;
      this.axios.post(api.login,{
        mobile  :this.mobile,
        pwd     :this.password
      })
      .then(res => {
        if(res.data.state == 200) {
          this.$toast(res.data.result.msg)
          mystorage.set('login','true')
          mystorage.set('session_id',res.data.result.result.sessionID)
          mystorage.set('mobile',res.data.result.result.mobile)
          mystorage.set('qQ',res.data.result.result.qQ)
          mystorage.set('sex',res.data.result.result.sex)
          mystorage.set('res',res.data.result.result.nickName)
          mystorage.set('logo',res.data.result.result.logo)
          mystorage.set('integral',res.data.result.result.integral)
          mystorage.set('childrenNum',res.data.result.result.childrenNum)
          this.loading = false;
          
          this.$router.push('/home')
        }else{
          this.loading = false;
          this.$toast("登录失败,请重新登录", {
            durtaion: 200
          });
        }
      })
      .catch((err) => {
        this.loading = false;
        this.$toast("登录失败,请重新登录", {
          durtaion: 200
        });
        console.log(err)
      });
    },
    goto(path) {
      this.$router.push({
        path: path
      })
    }
  },
  components: {
    BScroll,
    Loading
  }
}
</script>

<style scoped lang="less">
@import url('../../assets/less/config.less');
.login{
  background: #fff;
}
.login_box{
  padding: 8px;
  background: #fff;
    min-height: 600px;
    padding-top: 30px;
}
.btn_box{
    text-align: center;
    margin: 50px 0;
    .mu-raised-button{
      height: 50px;
      border-radius: 8px;
    }
  
}
.mu-sub-header{
  padding-left: 0;
}
.span1{
  float: left;
  strong{
    color: #FF5252;
  }
}
.span2{
  float: right;
  color: #FF5252;
}
.clear{
  clear: both;
}


</style>
