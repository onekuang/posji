<template>
	 <div class="login ab_full">
     <BScroll class="box_wrapper">
      <div>
        <div class="login_box">
          <mu-text-field label="手机号" hintText="请输入您的手机号" fullWidth /><br/>
          <mu-text-field label="密码" hintText="请输入您的密码" fullWidth  type="password"/><br/>

          <mu-sub-header>
            <span class="span1" @click="goto('/sign')" >没有帐号?<strong>点击注册</strong></span>
            <span class="span2" @click="goto('./forget_pass')"><strong>忘记密码?</strong></span>
            <div class="clear"></div>
          </mu-sub-header>
          <div class="btn_box">
          <mu-raised-button backgroundColor="#FF9100" label="登录" @click="login" class="demo-raised-button"  />

        </div>
        </div>



      </div>
      </BScroll>
   </div>
</template>

<script>
import BScroll from '../base/scroll/scroll'


export default {
  data() {
    return {
       user: '',
       pass:'',
    }
  },
  methods: {
    login() {
      console.log('登录')
    },
    goto(path) {
      this.$router.push({
        path: path
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
.login{
  background: #fff;
}
.login_box{
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
      width: 200px;
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
