<template>
	<div class="home ab_full">
		  <BScroll class="box_wrapper" ref="scroll">
		<div>
<!-- 			<div class="slider-wrapper">
        <k_slide>
					<div v-for="(item,index) in slide_data" :key='item.id'>
            <a :href="item.link">
              <img class="needsclick" 
								@load="loadImage" 
								:src="item.picUrl">
            </a>
					</div>
        </k_slide>
      </div> -->
			<img src="http://www.muse-ui.org/images/morning.jpg" alt="" width="100%" @load="loadImage">
			<div class="notice-title" @click="toNoticeList">
        <a  class="gonggao">
					<i class="iconfont icon-gonggao"></i></a>
        <marquee class="marquee-notice" scrolldelay='30' behavior="" direction="">
          <span style="color: #FF5252">
            test公告
          </span>
        </marquee>
      </div>


			<!-- 宫格 -->
			<div class="demo-grid">
			<mu-row>
				<mu-col width="50" tablet="50" desktop="50" 
					v-for="(item, index) in menu" :key='index'  
					:class="{'check_bg': col_index==index}"
					@click.native="goto(index, item)" 
				>
					<div>
						<img :src="item.image" width=120 height=110 >
					</div>
				</mu-col>
  		</mu-row>
			</div>
		</div>
		  </BScroll>

	</div>
</template>

<script>
import BScroll from '../base/scroll/scroll'
import k_slide	from '../base/slider/slider'
export default {
	data() {
		return {
			is_home: true,
			slide_data:[
				{id:'0',link:'##',picUrl:'http://www.muse-ui.org/images/breakfast.jpg'},
				{id:'1',link:'##',picUrl:'http://www.muse-ui.org/images/breakfast.jpg'},
				{id:'2',link:'##',picUrl:'http://www.muse-ui.org/images/breakfast.jpg'},
				{id:'3',link:'##',picUrl:'http://www.muse-ui.org/images/breakfast.jpg'},
			],
			menu: [
				{
					link: '/shoplist',
					image: '/static/images/posM.png'
				},
				{
					link: '/orderlist',
					image: '/static/images/orderM.png'
				},
				{
					link: '/loans',
					image: '/static/images/debitM.png'
				},	
				{
					link: '/generalize',
					image: '/static/images/shareM.png'
				}			
			],
			col_index: -1
		}
	},
	created() {
		// this.is_home = true
	},
	methods: {
		toNoticeList() {
			console.log('公告点击');
		},
		goto(index, item) {
			this.col_index = index;
      
      var tout = setTimeout(() => {
        this.col_index = -1
        this.$router.push({
        path:item.link,
      })
      }, 200);
		},
		// 让图片加载完,在重新计算scroll的高度
    loadImage() {
      if (!this.checkLoaded) {
        this.checkLoaded = true
        this.$refs.scroll.refresh()
      }
    }
	},
	components: {
		BScroll,
		k_slide
	}
}
</script>

<style lang="less" scoped>
@import url('../../assets/less/config.less');

.demo-grid div[class*="col-"] {
	background: #fff;
	text-align: center;
	color: #000;
	border: 1px solid #ddd;
	padding: 8px;
	transition: all 0.3s;
	
}
.check_bg{
  background: #eee !important;
  box-shadow: 2px 2px 1px  #cacaca inset;
}
  .notice-title{
    display: table;
		margin-left: 8px;
		background: #fffc8f;
		margin-left: 0;
		width: 100%;
		padding: 0 12px;
		.gonggao{
			display: inline-block;
			width: 15%;
			text-align: center;
			font-size: 16px;
		}
  }
  .marquee-notice{
    width: 85%;
    display: table-cell;
    vertical-align: middle;

	}
	.slider-wrapper{
        position: relative;
        width: 100%;
				overflow: hidden;
	}
</style>
