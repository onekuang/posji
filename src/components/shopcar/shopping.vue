<template>
<div class="shopdetail ab_full">
<BScroll class="box_wrapper" ref="scroll">
<div>
	<div class="orders-box">
		<div class="orders-list">		      
        <div class="orders-detail" v-for ="item in list"> 
              <img :src="item.logo">
              <div class="inof_box">
  		        <div class="">品名：{{item.name}}</div>
  		        <div class="">价格：{{item.price}}</div>
  		        <div class="">数量：1</div>
              </div>
        </div>  

		    <div class="orders-number">
		          姓名：{{site_data.receivingName}}<br>
		          电话：{{site_data.receivingMobile}}<br>
		          地址：{{site_data.provincesName}}{{site_data.cityName}}{{site_data.zoneName}}{{site_data.address}}<br>
		    </div>

		    <div class="orders-footer">
		        <span>合计：￥{{sumPrice}}</span>
		        <span class="orders-btn" @click='xiadan'>确认购买</span>
		        <div class="clear"></div>
		    </div>

    </div>
	</div>


</div>
</BScroll>
</div>
</template>

<script>
import BScroll from '../base/scroll/scroll'	
import api from '../../assets/api/api.js'
import mystorage from '../../common/js/storage.js'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
    	site_id : '',
    	goods_id : '',
      list : [],
      sumPrice: '',
      check_goods:[],
      site_data:'',
    }
  },
  created() {
  	// this.site_id = this.$route.query.id
  	console.log(this.$route.params)
  	this.goods_id = this.$route.params.goods
  	this.site_id = this.$route.params.site_id
    this._getData()
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      console.log(to)
    }
  },
  methods: {
    _getData() {
      this.axios.post(api.shopping,{
        sessionID:mystorage.get('session_id'),
        id:this.site_id,
        returnMsg: this.goods_id
      })
      .then(res => {
        console.log(res)
        if(res.data.result.state == 200) {
          console.log(res.data.result.result)
          this.list = res.data.result.result.commodityList
          this.site_data =  res.data.result.result.addressDetail
          this.sumPrice = res.data.result.result.sumPrice
        }
      })
    },
    // 下单
    xiadan() {
     this.axios.post(api.shopp,{
     		sessionID:mystorage.get('session_id'),
     		id:this.site_id,
     		returnMsg: this.goods_id,
     		submitFlag:'shoppingcardown'
     })
     .then(res => {
     		if(res.data.result.state == 200 ) {
     			this.$alert('下单成功')
     			this.$router.push('/shopcar')
     		}
     })
     .catch(res => {
     		this.$alert('请求失败,稍后尝试')
     })
    },
  },  
  computed: {
    ...mapGetters([
      'car'
    ])
  },
  components: {
  	BScroll,
  }
}
</script>

<style scoped lang="less">
@import url('../../assets/less/config.less');
.orders-box{
    color: #999;
    font-size: 14px;
    // padding: 8px;
    border-radius: 4px;
}
.orders{
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #e9e9e9;
    text-align: center;
}
.orders-list{
  background: #fff;
    padding-left: 15px;
    border-bottom: 10px solid #ededed;
}
.orders-list:last-child{
    border-bottom: 0;
}
.orders-number{
    // height: 45px;
    padding: 8px 0;
    // line-height: 45px;
    border-bottom: 1px solid #e9e9e9;
    color: #888;
}
.orders-detail{
    position: relative;
    height: 90px;
    padding: 18px 10px 18px 85px;
    border-bottom: 1px solid #e9e9e9;
}
.orders-detail img{
    position: absolute;
    left: 0px;
    top: 10px;
    width: 75px;
    height: 75px;
}
.orders-detail view{
    line-height: 30px;
}
.orders-detail .orders-status{
    position: absolute;
    right: 10px;
    top: 18px;
    height: 60px;
    line-height: 60px;
    color: #b42f2d;
}
.orders-footer{
    height: 50px;
    line-height: 50px;
    color: #2f2f2f;
    // padding:8px 15px 8px 0;
}
.orders-footer .orders-btn{
    float: right;
    width: 85px;
    height: 30px;
    line-height:30px;
    margin-top: 10px;
    border-radius: 3px;
    background: #ff5252;
    color: #fff;
    text-align: center;
    margin-right: 8px;
}
.clear{
	clear: both;
}
.inof_box{
  margin-left: 0px;
}
.demo-checkbox{
  position: absolute;
  left: 0px;
  top: 32px;
  width: 16px;
  height: 75px;
}
.null_car{
  margin-top: 30%;
  text-align: center;
  p{
    span{
      color: #FF5252;
      margin-left: 8px;
      font-weight: 600;
    }
  }
  i{
    font-size: 60px;
  }
}
</style>
