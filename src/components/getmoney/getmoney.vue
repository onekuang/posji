<template>
<div class="getmoney ab_full">
  <BScroll class="box_wrapper">
  <div>

    <div class="top_box">
      <img class="avatar" :src="avatar" 
      width=80 height=80>
      <div class="userinfo_box">
        <div class="item">
          <p class="p2">当前积分<br>	
						<span>{{jifen}}</span>
          </p>
        </div>
        <div class="item">
          <p class="p2">可提现积分<br>
						<span>{{can_jifen}}</span>
          </p> 
        </div>
      </div>
    </div>
		
		<div class="list">

			<mu-list>
		    <mu-sub-header>
		    	<span class="span1">注意:积分小于10时不可提现</span>
		    </mu-sub-header>
		    <div class="div1">
				<mu-auto-complete hintText="请输入您要提取的金额" v-model='money'/>
				</div>
				<div class="radio_box">
					<mu-select-field 
					  v-model="bank_id" 
					  label="选择到账的银行卡"
					  fullWidth
					>
						<mu-menu-item 
							v-if = 'bank_list.lengt == 0' :key="index" 
							title="你还没有绑定银行卡" 
						/>
					  <mu-menu-item 
					    v-for="(item,index) in bank_list" 
					    :key="index" 
					    :value="item.id" 
					    :title="item.bankname + item.cardNumber" 
					    fullWidth
					  />
					</mu-select-field>
					<mu-sub-header>没有银行卡? 点击<span class="span1" @click='goto_bank'>添加银行卡</span></mu-sub-header> 
				</div>

		    <!-- <mu-sub-header>提现会收取相关费用</mu-sub-header>    -->
		    <div class="btn_box">
		    	<mu-raised-button backgroundColor="#FF5252" label="申请提现" @click="getmoney" class="demo-raised-button"  fullWidth/><br>
		    	<span class="state" v-show='state'>{{state}}</span>
		    </div>
		    <mu-sub-header>提示：提现会收取一定的相关费用!</mu-sub-header> 
		  </mu-list>
		</div>
  </div>
  </BScroll>
</div>
</template>

<script>
import BScroll from '../base/scroll/scroll'
import api from '../../assets/api/api.js'
import mystorage from '../../common/js/storage.js'


export default {
	data() {
		return {
			avatar:'',
			bank_list:[],
			money:'',
			bank_id: '',
			state:'',
			jifen: ''
		}
	},
	created() {
		this._getData()
		// this.jifen =  mystorage.get('integral')
		this.avatar =  mystorage.get('avatar')
	},
	computed: {
		can_jifen: function() {
			let can_jf = this.jifen
			if(this.jifen < 10){
				can_jf = 0
			}
			return can_jf
		}
	},
	methods: {
		_getData() {
			this.axios.get(api.get_bankList,{
			  params:{
			    sessionID: mystorage.get('session_id')
			  }
			})
			.then(res => {
				if (res.data.state == 401) {
				  this.$alert('请先登录')
				  this.$router.push({
				    path:'/login'
				  })
				  return
				}
			  if(res.data.result.state == 200) {
			    this.bank_list = res.data.result.result
			  }
			})

			this.axios.get(api.user_info,{
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
				this.jifen = res.data.result.result.integral
			})
		},
		getmoney() {
			if(this.can_jifen < 10) {
				this.$toast('可提现积分少于10,不能提现')
				return
			}
			if(this.money==''||this.bank==''){
				this.state = '提现金额或者银行卡不能为空'
				return
			}else{
				this.state = ''
			}
			this.axios.post(api.get_mobey,{
				sessionID: mystorage.get('session_id'),
				returnMsg: this.bank_id,
				amount: this.money,
			})
			.then(res => {
				if (res.data.result.state == 200) {
					this.$alert('申请提现成功.')
					this.money = ''
					this.$router.push({
						path: '/userinfo'
					})
					this._getData()
				}else{
					this.$alert('申请失败.')
				}
			})
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
.radio_box{
	padding: 8px;
}
.demo-radio{
	display: block;
}
.state{
  display: inline-block;
  font-size: 14px;
  color: #f00;
  margin-bottom: 12px;
}
</style>
