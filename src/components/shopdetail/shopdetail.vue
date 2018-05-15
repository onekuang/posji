<template>
<div class="shopdetail ab_full">
<BScroll class="box_wrapper" ref="scroll">
<div>
<div class="goods_img">
	<img src="http://www.muse-ui.org/images/camera.jpg" alt="" width="100%">
</div>

<div class="goods_tab">
	<div class="tab">
		<span class="item" :class='{active: page==0}' @click='toogle(0)'>商品详情</span>
		<span class="item" :class='{active: page==1}' @click='toogle(1)'>商品简介</span>
	</div>
	<div class="content">
		<div class="tab_item" v-show='page==0'>
			this is goodsdetail..id={{id}}
		</div>
		<div class="tab_item" v-show='page==1'>
			this is goods description..id={{id}}<br>
		</div>
	</div>
</div>


</div>
</BScroll>
	<!-- 购物车按钮 -->
	<div class="shop_car">
		<mu-float-button icon=":iconfont icon-gouwuchetianjia" secondary class="demo-float-button" @click="goto('/shopcar')" />
		<br>
		<mu-float-button icon=":iconfont icon-shouyi" secondary class="demo-float-button"/>
	</div>
</div>
</template>

<script>
import BScroll from '../base/scroll/scroll'	
export default {
	data() {
	  return {
	  	page: 0, // 选项卡
	  	id: '',
	  };
	},
	created() {
		this.id = this.$route.params.id
	},
	methods:{
		toogle(index) {
			this.page = index;
		},
		goto(path) {
			this.$router.push({
				path: path
			})
		}
	},
	components: {
		BScroll,
	}
}
</script>

<style scoped lang="less">
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
	.content{
		.tab_item{
			min-height: 400px;
		}
	}
}

</style>
