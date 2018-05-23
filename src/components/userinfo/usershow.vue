<template>
<div class="user ab_full">
<BScroll class="box_wrapper">
<div>	
		<div class="top_box">
		  <img class="avatar" :src="logo" 
		  width=80 height=80 > <br>
		  <span style="color: #fff;">{{nickname}}</span>
		</div>
	<div class="form_box">
			<mu-list>
		    <mu-list-item :title="sexs">
		      <mu-icon slot="left" value=":iconfont icon-sponsor"/>
		    </mu-list-item>
		    <mu-list-item title="生日">
		      <mu-icon slot="left" value=":iconfont icon-sponsor"/>
		    </mu-list-item>
		    <mu-list-item :title="weiXin">
		      <mu-icon slot="left" value=":iconfont icon-sponsor"/>
		    </mu-list-item>
		    <mu-list-item :title="weiBo">
		      <mu-icon slot="left" value=":iconfont icon-sponsor"/>
		    </mu-list-item>
		    <mu-list-item :title="qQ">
		      <mu-icon slot="left" value=":iconfont icon-sponsor"/>
		    </mu-list-item>
		  </mu-list>


		<div class="btn_box">
			<mu-raised-button label="编辑" @click="goto('/user')" class="demo-raised-button" secondary fullWidth />
		</div>
		
		<!-- <div class="loading" v-show='loading'>
        <Loading :title='loading_title'/>
      </div> -->
	</div>

</div></BScroll>
</div>
</template>

<script>
import BScroll from '../base/scroll/scroll'
import api from '../../assets/api/api.js'
import mystorage from '../../common/js/storage.js'
import Exif from 'exif-js'  

export default {
	data() {
		return {
			loading_title:'正在更新个人信息',
			loading: false,
			sex: '',
			logo:'',
			sex:'1',
			nickname: '',
			birthday:'',
			weiXin:'',
			weiBo:'',
			qQ:'',
		}
	},
	created() {
		this.logo = mystorage.get('logo')
		this._getData()
	},
	computed: {
		sexs: function() {
			if (this.sex == 0) {return '男'}
			if (this.sex == 1) {return '女'}
		}
	},
	methods:{
		_getData() {
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
				let _data = res.data.result.result
				this.sex = _data.sex
				this.logo = _data.logo
				this.nickname = _data.nickName
				this.weiXin = _data.weiXin
				this.weiBo = _data.weiBo
				this.qQ = _data.qQ
			})
		},
		goto(path) {
			this.$router.push(path)
		}
	},
	components:{
    BScroll,
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
