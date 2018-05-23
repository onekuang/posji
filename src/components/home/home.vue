<template>
	<div class="home ab_full">
		  <BScroll class="box_wrapper" ref="scroll">
		<div>
			<div class="sw_box">
				<swipe
					v-if = slide_data.length
				  v-model="index"
				  style="text-align: center; line-height: 80px; height: 200px; background: #42b983;"
				  :autoplayTime = autoplayTime
				>
				  <swipe-item style="height: 200px; line-height: 200px" 
				  	v-for="(item,index) in slide_data" :key='item.id'>
				  	<img :src="'http://www.fushuaxx.com' + item.url" height=200>
				  </swipe-item>
				</swipe>
			</div>
			<!-- 公告 -->
			<div class="notice-title" @click="toNoticeList">
        <a  class="gonggao">
					<i class="iconfont icon-gonggao"></i></a>
        <marquee class="marquee-notice" scrolldelay='30' direction="left" amount=10>
          <span style="color: #FF5252">
            <div v-html=notice></div>
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
import api from '../../assets/api/api.js'
import BScroll from '../base/scroll/scroll'
import k_slide	from '../base/slider/slider'
import mystorage from '../../common/js/storage.js'

export default {
	data() {
		return {
			index: 0, // two way
			autoplayTime:3000,
			notice: '',
			slide_data:[],
			menu: [
				{
					link: '/shoplist',
					image: 'http://www.fushuaxx.com/v1/html/static/images/posM.png'
				},
				{
					link: '/running',
					image: 'http://www.fushuaxx.com/v1/html/static/images/orderM.png'
				},
				{
					link: '/loans',
					image: 'http://www.fushuaxx.com/v1/html/static/images/debitM.png'
				},		
				{
					link: '/generalize',
					image: 'http://www.fushuaxx.com/v1/html/static/images/shareM.png'
				}			
			],
			col_index: -1
		}
	},
	created() {
		this._getData();
	},
	methods: {
		_getData() {
			this.axios.get(api.home,{
				params: {
					sessionID:mystorage.get('session_id')
				}
			}).then((res)=>{
				if(res.data.state == 200) {
					this.slide_data = res.data.result.result.picenterList
					this.notice = res.data.result.result.noticeList[0].content
					if(mystorage.get('login')){
						mystorage.set('integral',res.data.result.result.users.integral)
						mystorage.set('avatar',res.data.result.result.users.logo)	
					}
				}
			})
		},
		toNoticeList() {
			// console.log('公告点击');
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
        this.$refs.k_slide.init()
        this.$refs.scroll.refresh()
      }
    }
	},
	components: {
		BScroll,
	}
}
</script>

<style lang="less">
@import url('../../assets/less/config.less');
.home{
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
			width: 8%;
			text-align: center;
			font-size: 16px;
		}
  }
  .marquee-notice{
    width: 92%;
    display: table-cell;
    vertical-align: middle;

	}
	.slider-wrapper{
        position: relative;
        width: 100%;
        max-height: 250px;
				overflow: hidden;
	}
.sw_box{
	height: 200px;
	img {
	        width: 100%;
	    }
	    .button {
	        margin-top: 30px;
	        position: relative;
	        display: block;
	        margin-left: auto;
	        margin-right: auto;
	        padding-left: 14px;
	        padding-right: 14px;
	        box-sizing: border-box;
	        font-size: 18px;
	        text-align: center;
	        text-decoration: none;
	        color: #ffffff;
	        line-height: 2.33333333;
	        border-radius: 5px;
	        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	        overflow: hidden;
	        border-width: 0;
	        width: 50%;
	        padding: 0 30px 0 30px;
	        outline: 0;
	        -webkit-appearance: none;
	        background-color: #26a2ff;
	    }
	    .button:active {
	        opacity: 0.5;
	        color: #333;
	    }
	    .button2 {
	        margin-top: 100px;
	    }
}
}
</style>
