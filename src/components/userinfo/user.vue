<template>
<div class="user ab_full">
<BScroll class="box_wrapper">
<div>	
		<div class="top_box">
		  <img class="avatar" src="./user-pic.jpg" 
		  width=80 height=80> <br>
		  <div class="text">上传头像</div>
		</div>
	<div class="form_box">
		<mu-text-field label="昵称" hintText="请输入您的昵称" fullWidth /><br/>
		<mu-radio label="男" name="group" nativeValue="男" v-model="sex" class="demo-radio"/>&nbsp;&nbsp;&nbsp;&nbsp;
		  <mu-radio label="女" name="group" nativeValue="女" v-model="sex"  class="demo-radio"/> <br/>
		<mu-text-field label="生日" hintText="年/月/日" fullWidth /><br/>
		<mu-text-field label="微信" hintText="请输入您的微信号" fullWidth /><br/>
		<mu-text-field label="微博" hintText="请输入您的微博号" fullWidth /><br/>
		<mu-text-field label="QQ" hintText="请输入您的QQ号" fullWidth /><br/>
		<div class="btn_box">
			<mu-raised-button label="保存" class="demo-raised-button" secondary fullWidth />
		</div>
	</div>
</div></BScroll>
</div>
</template>

<script>
import BScroll from '../base/scroll/scroll'
export default {
	data() {
		return {
			sex: '男'
		}
	},
	components:{
    BScroll
  }
}
</script>

<style scoped lang="less">
@import url('../../assets/less/config.less');
.user{
	.top_box{
	  position: relative;
	  height: 200px;
	  background: @info_bg;
	  text-align: center;
	  .avatar{
	    border: 2px solid #ff6b01;
	    margin-top: 32px;
	    border-radius: 50%;
	    margin-bottom: 12px;	    
	  }
	  .text{
	    color: #fff;
	    display: inline-block;
	    height: 30px;
	    width: 100px;
	    font-size: 16px;
	    border: 1px solid #fff;
	    line-height: 30px;
	    border-radius: 8px;
	  }
	 }
	.form_box{
		background: #fff;
		padding: 8px;
	}
	.btn_box{
		text-align: center;
		margin: 20px 0;
		.mu-raised-button.mu-raised-button-inverse{
			border-radius: 6px;
		}
	}
}
</style>
