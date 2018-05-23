<template>
<div class="shopdetail ab_full">
<BScroll class="box_wrapper" ref="scroll">
<div>
	<div class="orders-box">
		<div class="orders-list">		      
        <div class="orders-detail" v-for ="item in list"> 
          <mu-checkbox name="group"  class="demo-checkbox" :nativeValue="('kk'+ item.id)" v-model='check_goods'/>
          <div>
              <img :src="item.commodityLogo">
              <div class="inof_box">
  		        <div class="">品名：{{item.commodityName}}</div>
  		        <div class="">价格：{{item.commodityPrice}}</div>
  		        <div class="">数量：1</div>
              </div>
  		        <p class="orders-status">
                <i class="iconfont icon-deletefill" @click='delete_goods(item.id)'></i>
              </p>
          </div>
        </div>  

		<!--     <div class="orders-number">
		          姓名：张三<br>
		          电话：13421233333<br>
		          地址：东莞市南城区鸿禧商业大厦<br>
		    </div>
        <div class="site-detail">
            <div class="uplode item">
              <span><i class="iconfont icon-dizhi"></i>&nbsp;其他</span>
            </div>
            <div class="delete item">
              <span></span>
            </div>
        </div> -->

		    <div class="orders-footer" v-show="list.length">
		        <span>合计：￥{{sumPrice}}</span>
		        <span class="orders-btn" @click='xiadan'>下单</span>
		        <div class="clear"></div>
		    </div>

    </div>
        <div class="null_car" v-show="!list.length">
          <i class="iconfont icon-gouwuche"></i>
          <p>空空如也~<span @click="goto('/shoplist')">去逛逛</span></p>
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
      list : [],
      sumPrice: '',
      check_goods:[],
    }
  },
  created() {
    let session_id = mystorage.get('session_id')
    if(!session_id) {
      this.$alert('请先登录')
      this.$router.push({
        path:'/login'
      })
      return
    }
    this._getData()
  },
  methods: {
    _getData() {
      this.axios.post(api.car_list,{
        sessionID:mystorage.get('session_id')
      })
      .then(res => {
        if(res.data.result.state == 200) {
          this.list = res.data.result.result.shoppingCarVoList
          this.sumPrice = res.data.result.result.sumPrice
        }
      })
    },
    delete_goods (id) {
      let that = this
      this.$confirm({
        title: '确认删除?'
      })
      .then(res=> {
        that._delete_goods(id)
      })
      .catch(fail => {
        console.log('取消')
      })
    },
    _delete_goods(id) {
      this.axios.get(api.delete_car,{
        params:{          
          commodityID: id,
          sessionID:mystorage.get('session_id')
        }
      })
      .then(res => {
        if(res.data.result.state == 200) {
          this._getData()
          this.$toast('删除成功')
        }else{
          this.$toast('删除失败')
        }
      })
      .catch(res => {
        this.$toast('连接服务器失败.')
      })
    },
    // 下单
    xiadan() {
      if (this.check_goods == '') {
        this.$toast('请先选择您要购买的商品')
        return
      }
      let check_arr =this._sub_arr(this.check_goods)
      let a = check_arr.join(',')
      this.setcar(check_arr)
      this.$router.push({
        name: 'shopsite',
        params: {
          goods: a
        }
      })
    },
    _sub_arr(arr) {
      if (!arr) {return}
      let new_arr = []
      for(let i = 0; i < arr.length; i++) {
        new_arr.push(arr[i].substring(2))
      }
      return new_arr
    },
    goto(path){
      this.$router.push(path)
    },
    ...mapMutations({
      setcar: 'SET_CAR'
    })
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
    left: 30px;
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
  margin-left: 30px;
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
