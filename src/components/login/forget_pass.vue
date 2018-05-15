<template>
	 <div class="forget_pass ab_full">
     <BScroll class="box_wrapper">
      <div>
        <div class="forget_pass_box">
          <mu-text-field label="手机号" hintText="请输入您的手机号" fullWidth /><br/>
          <mu-text-field label="设置密码" hintText="请设置您的新密码" fullWidth  type="password"/><br/>
          <mu-text-field label="确认密码" hintText="请输入确认密码" fullWidth  type="password"/><br/>
          <mu-text-field label="验证码" hintText="请输入收到的验证码" fullWidth /><br/>

          <mu-sub-header>
            <mu-flat-button label="获取验证码(30)" class="demo-flat-button"/>
          </mu-sub-header>
          <div class="btn_box">
          <mu-raised-button backgroundColor="#FF9100" label="找回密码" @click="forget_pass" class="demo-raised-button"  />

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
    forget_pass() {}
  },
  components: {
		BScroll
	}
}
</script>

<style scoped lang="less">
@import url('../../assets/less/config.less');
.forget_pass{
  background: #fff;
}
.forget_pass_box{
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
  strong{
    color: #FF5252;
  }
}
.clear{
  clear: both;
}



</style>
