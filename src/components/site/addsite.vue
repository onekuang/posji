<template>
<div class="addsite ab_full">
<BScroll class="box_wrapper">
<div>
	<div class="site">
		<mu-select-field label="选择您所居住的省" :maxHeight="300" @input='get_sheng' fullWidth>
		    <mu-menu-item v-for="item, index in citydata" :key="index" 
		    :title="item.name" :value="item" />
		</mu-select-field>

		<mu-select-field label="选择您所居住的市" :maxHeight="300" @input='get_shi' fullWidth>
		    <mu-menu-item v-for="item, index in citylist" :key="index" 
		    :title="item.name" :value="item" />
		</mu-select-field>

		<mu-select-field label="选择您所居住的区" :maxHeight="300" @input='get_qu' fullWidth>
		    <mu-menu-item v-for="item, index in districtList" :key="index" 
		    :title="item.name" :value="item" />
		</mu-select-field>
		
		<mu-text-field label="详细地址" hintText="请输入详细地址" fullWidth /><br/>
		<mu-text-field label="收件人姓名" hintText="请输入姓名" fullWidth  /><br/>
		<mu-text-field label="收件人手机号" hintText="请输入手机号" fullWidth /><br/>
		
		<div class="btn_box">
			<mu-raised-button label="确认提交" class="demo-raised-button" secondary fullWidth />
		</div>
	</div>
</div>
</BScroll>
</div>
</template>

<script>
import BScroll from '../base/scroll/scroll'
import sitedata from '../../common/js/city.js'
export default {
	data() {
		return {
			citydata: sitedata.cityData, 	// 所有城市数据
			citylist: [],									// 城市
			districtList: [],							// 区
			dataSource:[],
		}
	},
	created() {
		console.log(sitedata)
	},
	methods: {
		// 获取省市区
		get_sheng(val) {
			this.citylist = val.cityList;
			console.log(val.name)
		},
		get_shi(val) {
			this.districtList = val.districtList;
			console.log(val.name)
		},
		get_qu(val) {
			console.log(val.name)
		},
		//  获取用户名
		handleInput(val) {
			console.log(val)
		},
	},
	components:{
	  BScroll
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
	}
}
</style>
