<template>
<div class="getmoney ab_full">
  <BScroll class="box_wrapper">
  <div>

    <div class="top_box">
      <img class="avatar" src="/static/images/user-pic.jpg" 
      width=80 height=80>
      <div class="userinfo_box">
        <div class="item">
          <p class="p2">当前积分<br>
						<span>0</span>
          </p>
        </div>
        <div class="item">
          <p class="p2">可提现积分<br>
						<span>0</span>
          </p> 
        </div>
      </div>
    </div>
		
		<div class="list">

			<mu-list>
		    <mu-sub-header>
		    	<span class="span1">注意:积分小于100时不可提现</span>
		    </mu-sub-header>
		    <div class="div1">
				<mu-auto-complete hintText="请输入您要提取的积分"/>
				</div>
		    <!-- <mu-sub-header>提现会收取相关费用</mu-sub-header>    -->
		    <div class="btn_box">
		    	<mu-raised-button backgroundColor="#FF9100" label="提现" @click="getmoney" class="demo-raised-button"  />
		    </div>
		    <mu-sub-header>提现会收取相关费用<br>没有银行卡? 点击<span class="span1" @click='goto_bank'>绑定银行卡</span></mu-sub-header> 
		  </mu-list>
		</div>
  </div>
  </BScroll>
</div>
</template>

<script>
import BScroll from '../base/scroll/scroll'
export default {
	methods: {
		getmoney() {
			console.log('提现按钮点击')
		},
		goto_bank() {
			this.$router.push({
				path: '/addbank'
			})
		}
	},
  components:{
    BScroll
  }
}
</script>

<style scoped lang='less'>
@import url('../../assets/less/config.less');

.getmoney{
	.top_box{
	  position: relative;
	  height: 200px;
	  background: @info_bg;
	  text-align: center;
	  .avatar{
	    border: 2px solid #ff6b01;
	    margin-top: 32px;
	    border-radius: 50%;
	  }
	}
	.userinfo_box{
	  margin-top: 20px;
	  color: #fff;
	  position: absolute;
	  bottom: 0;
	  left: 0;
	  right: 0;
	  height: 60px;
	  display: flex;
	  font-weight: 600;
	  background: rgba(0,0,0,.2);
	  .item{
	    flex:1;
	    padding-top: 8px;
	    text-align: center;
	    font-size: 15px;
	    .p1{
	    }
	    &:first-of-type{
	      border-right: 1px solid rgba(255,255,255,.2);
	    }
	  }
	  
	}
	.list{
		background: #fff;
		.div1{
			padding:0 12px;
		}
		.span1{
			color: #FF5252;
		}
		.btn_box{
			text-align: center;
			margin: 20px 0;
		}
	}
}
.mu-raised-button{
	height: 50px;
	width: 200px;
	border-radius: 8px;
}
</style>
