<template>
<div class="order ab_full">
  <BScroll class="box_wrapper">
    <div>
        <div class="orders-box">
      <!-- <div class="orders">我的订单</div> -->
          <div class="orders-list">
              <div class="orders-number">
                订单编号：123123123<br>
                订单时间：2018-12-12 22:22:44 <br>
                </div>
                <div class="orders-number">
                    姓名：张三<br>
                    电话：13421233333<br>
                    地址：东莞市南城区鸿禧商业大厦<br>
                </div>
              <div class="orders-detail">
                  <img src="./orderMain.png">
                  <div class="">商品名称：拉卡拉小型POS</div>
                  <div class="">价格：2333</div>
                  <text class="orders-status">已经发货</text>
              </div>

              <div class="orders-detail">
                  <img src="./orderMain.png">
                  <div class="">商品名称：拉卡拉小型POS</div>
                  <div class="">价格：2333</div>
                  <text class="orders-status">已经发货</text>
              </div>
              <div class="orders-footer">
                  <text>实付：￥2333</text>
              </div>
          </div>

      </div>
    </div>
  </BScroll>

</div>
</template>

<script>
import BScroll from '../base/scroll/scroll'

export default {
  data() {
    return {
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
