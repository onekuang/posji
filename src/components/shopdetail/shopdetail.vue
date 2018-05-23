<template>
<div class="shopdetail ab_full">
<BScroll class="box_wrapper" ref="scroll">
<div>
<div class="goods_img">
		<div class="slider-wrapper">
      <swipe
      	v-if = slide_data.length
        v-model="index"
        style="text-align: center; line-height: 80px; height: 200px; background: #eee;"
        :autoplayTime = autoplayTime
      >
        <swipe-item style="height: 200px; line-height: 200px" 
        	v-for="(item,index) in slide_data" :key='item.id'>
        	<img :src="'http://www.fushuaxx.com' + item.url">
        </swipe-item>
      </swipe>
    </div>
</div>

<div class="goods_tab">
	<div class="tab">
		<span class="item" :class='{active: page==0}' @click='toogle(0)'>商品简介</span>
		<span class="item" :class='{active: page==1}' @click='toogle(1)'>商品详情</span>
	</div>
	<div class="content">
		<div class="tab_item" v-show='page==1'>
			<div id="max_img" v-html="goods.info"></div>
		</div>
		<div class="tab_item" v-show='page==0'>
			<mu-table :showCheckbox='false' :height='table_h' :fixedHeader='true'>
			    <mu-tbody>
			      <mu-tr>
			        <mu-td class='w80'>商品名称：</mu-td>
			        <mu-td>{{goods.name}}</mu-td>
			      </mu-tr>
			      <mu-tr>
			        <mu-td class='w80'>品牌：</mu-td>
			        <mu-td>{{goods.brandName}}</mu-td>
			      </mu-tr>
			      <mu-tr>
			        <mu-td class='w80'>价格：</mu-td>
			        <mu-td>{{goods.price}}元</mu-td>
			      </mu-tr>
			      <mu-tr>
			        <mu-td class='w80'>剩余库存：</mu-td>
			        <mu-td>{{goods.commodityNum}}</mu-td>
			      </mu-tr>
			    </mu-tbody>
			  </mu-table>
		</div>
	</div>
</div>


</div>
</BScroll>
	<!-- 购物车按钮 -->
<!-- 	<div class="shop_car">
		<mu-float-button icon=":iconfont icon-add1" secondary class="demo-float-button" @click="addcar" />
		<br>
		<mu-float-button icon=":iconfont icon-gouwuchetianjia" secondary class="demo-float-button"
			@click ="goto('/shopcar')"
		/>
	</div> -->
</div>
</template>

<script>
import BScroll from '../base/scroll/scroll'	
import api from '../../assets/api/api.js'
import k_slide	from '../base/slider/slider'
import mystorage from '../../common/js/storage.js'
import { mapGetters , mapMutations ,mapActions } from 'vuex'
var goods_car = []
export default {
	data() {
	  return {
	  	index: 0, // two way
	  	autoplayTime:3000,
	  	id:'',
	  	slide_data:[],
	  	page: 0, // 选项卡
	  	table_h:'300px',
	  	goods:'',
	  	goods_arr: []
	  };
	},
	created() {
		this.id = this.$route.params.id;
		this._getData(this.id);
	},
	methods:{
		_getData(id) {
			this.axios.get(api.goods_detail,{
				params:{
					toKenId:id
				}
			})
			.then(res=>{
				if(res.data.result.state == 200) {
					this.goods = res.data.result.result.commodityDetail
					this.slide_data = res.data.result.result.picenterList
				}
			})
		},
		toogle(index) {
			this.page = index;
		},
		goto(path) {
			this.$router.push(path)
		},
		addcar() {
			this.axios.post(api.add_car,{
				sessionID:mystorage.get('session_id'),
				commodityID:this.goods.id
			})
			.then(res => {
				if(res.data.result.state == 200) {
					this.$toast('加入购物车成功')
				}else{
					this.$toast('加入购物车失败')
				}
			})
			.catch(res => {
				this.$toast('网络错误')
			})
		},
		add_car() {
			let goods = {
				name: this.goods.name, 
				price: this.goods.price,
				brandName: this.goods.brandName,
			}
			if(!goods.name) {
				return;
			}
			goods_car = goods_car.concat(goods)
			this.set_car(goods_car)
		},
		// 让图片加载完,在重新计算scroll的高度
    loadImage() {
      if (!this.checkLoaded) {
        this.checkLoaded = true
        this.$refs.k_slide.init()
        this.$refs.scroll.refresh()
      }
    },
    ...mapMutations({
    	set_car: 'SET_CAR'
    })
	},	
	computed: {
		...mapGetters([
			'car'
		])
	},
	components: {
		BScroll,
		k_slide,

	}
}
</script>

<style lang="less">
@import url('../../assets/less/config.less');
.shopdetail{
	.shop_car{
		position: absolute;
		right: 12px;
		bottom: 60px;
		z-index: 3;
	}
	.demo-float-button{
		margin-bottom: 20px;
	}
	.goods_tab{
		position: relative;
		background: #fff;
		padding-bottom: 50px;
		.tab{
			display: flex;
			height: 40px;
			line-height: 40px;
			.item{
				flex: 1;
				border-bottom: 1px solid #eee;		
				text-align: center;
				&.active{
					border-bottom-color: #f00;
				}
				&:first-of-type{
					border-right: 1px solid #eee;
				};
			}
		}
		.w80{
			width: 100px;
		}
		.content{
			.tab_item{
				min-height: 400px;
				padding: 8px;
				td{
					line-height: 48px;
				}
			}
		}
	}
	#max_img img{
		max-width: 100% !important;
	}
	.slider-wrapper{
	      position: relative;
	      width: 100%;
	      max-height: 250px;
				overflow: hidden;
	}
}

</style>
