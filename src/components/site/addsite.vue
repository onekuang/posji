<template>
<div class="addsite ab_full">
<BScroll class="box_wrapper">
<div>
	<div class="site">
		<mu-select-field label="选择您所居住的省" :maxHeight="300" @input='get_sheng' fullWidth>
		    <mu-menu-item v-for="item, index in citydata" :key="index" 
		    :title="item.name" :value="item.id" />
		</mu-select-field>

		<mu-select-field label="选择您所居住的市" :maxHeight="300" @input='get_shi' fullWidth>
		    <mu-menu-item v-for="item, index in citylist" :key="index" 
		    :title="item.name" :value="item.id" />
		</mu-select-field>

		<mu-select-field label="选择您所居住的区" :maxHeight="300" @input='get_qu' fullWidth>
		    <mu-menu-item v-for="item, index in districtList" :key="index" 
		    :title="item.name" :value="item.id" />
		</mu-select-field>
		
		<mu-text-field label="详细地址" hintText="请输入详细地址" fullWidth 
			v-model='site_detail'
			:errorText="err_site_detail"
		/><br/>
		<mu-text-field label="收件人姓名" hintText="请输入姓名" fullWidth  
			:errorText="err_username" v-model='username'
		/><br/>
		<mu-text-field label="收件人手机号" hintText="请输入手机号" fullWidth 
			:errorText="err_mobile" v-model='mobile'
		/><br/>
		
			<div class="loading" v-show='loading'>
		        <Loading :title='loading_title'/>
		     </div>

		<div class="btn_box">
			<mu-raised-button label="确认提交" class="demo-raised-button" secondary fullWidth :disabled="is_dis"
					@click="submit" 
			/>
		</div>
	</div>
</div>
</BScroll>
</div>
</template>

<script>
import BScroll from '../base/scroll/scroll'
import sitedata from '../../common/js/city.js'
import api from '../../assets/api/api.js'
import Loading from '../base/loading/loading.vue'
import mystorage from '../../common/js/storage.js'

export default {
	data() {
		return {
			loading_title:'正在加载',
			loading: false,
			citydata: [], 	// 所有城市数据
			citylist: [],									// 城市
			districtList: [],							// 区
			is_dis: false,
			sheng_id:'',
			shi_id:'',
			qu_id:'',
			site_detail: '',							// 详细地址
			username: '', 								
			mobile:'',
			err_site_detail:'',
			err_username:'',
			err_mobile:'',
		}
	},
	created() {
		this._getData()
	},

	methods: {
		// 获取省
		_getData(){
			this.axios.get(api.get_sheng,{
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
				this.citydata = res.data.result.result
			})
		},
		// 获取市
		_get_shi(sheng_id) {
			this.axios.get(api.get_shi,{
				params: {
					id: sheng_id
				}
			})
			.then(res => {
				this.citylist = res.data.result.result
			})
		},
		_get_qu(shi_id){
			this.axios.get(api.get_qu,{
				params: {
					id: shi_id
				}
			})
			.then(res => {
				this.districtList = res.data.result.result
			})
		},
		submit() {
			if (this.site_detail == '') {this.err_site_detail = '详细地址不能为空';return}
			else{this.err_site_detail = ''}

			if (this.username == '') {this.err_username = '收件人不能为空';return}
			else{this.err_username = ''}

			if (this.mobile == '') {
			  this.err_mobile = '手机号不能为空'
			  return
			}else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile)){
			  this.err_mobile = '请输入正确的手机号码'
			  return
			}else{
			  this.err_mobile = ''
			}
			this.is_dis = true
			this.loading = true
			this.axios.get(api.post_site,{
				params:{
					sessionID 			: mystorage.get('session_id'),
					provincesID			: this.sheng_id,
					cityID					: this.shi_id,
					zoneID					: this.qu_id,
					address					: this.site_detail,
					receivingName 	: this.username,
					receivingMobile	: this.mobile,
					submitFlag			: 'add'
				}
			})
			.then(res=> {
				if (res.data.result.state == 200) {
					this.$toast(res.data.result.msg),
					this.loading = false
					this.is_dis = false	
					if(this.$route.query.from) {
						this.$router.push('/shopcar')	
					}else{
						this.$router.push('/site')	
					}
				}else{
					this.$toast('请求错误')
					this.loading = false
					this.is_dis = false	
				}
			})
			.catch(res => {
				this.$toast('连接错误')
				this.loading = false
				this.is_dis = false	
			})
		},
		// 获取省市区
		get_sheng(id) {
			this._get_shi(id)
			this.sheng_id = id
		},
		get_shi(id) {
			this._get_qu(id)
			this.shi_id = id
		},
		get_qu(id) {
			this.qu_id = id
		},
	},
	components:{
	  BScroll,
	  Loading
	}
}
</script>


<style scoped lang="less">
@import url('../../assets/less/config.less');

.site{
	background: #fff;
	padding: 8px;
	.btn_box{
		text-align: center;
		margin: 20px 0;
		.mu-raised-button{
		  height: 50px;
		  // width: 200px;
		  border-radius: 8px;
		}
	}
}
</style>
