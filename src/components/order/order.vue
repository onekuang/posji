<template>
<div class="order ab_full">
  <BScroll class="box_wrapper">
    <div>
        <div class="orders-box">
      <!-- <div class="orders">我的订单</div> -->
          <div class="orders-list">
              <div class="orders-number">
                订单编号：{{data_detail.orderNum}}<br>
                订单时间：{{data_detail.registerDate}}<br>
                </div>
                <div class="orders-number">
                    姓名：{{data_detail.usersName}}<br>
                    电话：{{data_detail.usersMobile}}<br>
                    地址：{{data_detail.provincesName}}{{data_detail.cityName}}{{data_detail.zoneName}}
                    <br>
                </div>
              <div class="orders-detail" v-for='item in data_shoplist'>
                  <img :src="item.logo">
                  <div class="">商品名称：{{item.name}}</div>
                  <div class="">价格：{{item.price}}元</div>
                  <text class="orders-status">已经发货</text>
              </div>
              <div class="orders-footer">
                  <!-- <span>实付：￥2333</span> -->
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
import Loading from '../base/loading/loading.vue'
import mystorage from '../../common/js/storage.js'

export default {
  data() {
    return {
      data_detail:'',
      data_shoplist:[]
    }
  },
  created() {
    let id = this.$route.params.id
    this._getData(id)
  },
  methods: {
    _getData(id) {
      this.axios.get(api.order_detail,{
        params:{
          sessionID: mystorage.get('session_id'),
          id: id
        }
      })
      .then(res => {
        if (res.data.result.state == 200) {
          this.data_detail = res.data.result.result.orderDetail
          this.data_shoplist = res.data.result.result.commodityList
        }
      })
    }
  },
  components:{    
    BScroll
  }
}
</script>

<style lang='less' scoped>
@import url('../../assets/less/config.less');
.orders-box{
    color: #999;
    font-size: 14px;
    padding: 8px;
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
    left: 0;
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
    height: 30px;
    line-height: 30px;
    color: #2f2f2f;
    padding:8px 15px 8px 0;
}
.orders-footer .orders-btn{
    float: right;
    width: 85px;
    height: 30px;
    line-height:30px;
    border-radius: 3px;
    background: #b42f2d;
    color: #fff;
}
</style>
