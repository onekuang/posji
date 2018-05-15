<template>
<div class="orderlist ab_full">
  <BScroll class="box_wrapper">
      <div class="orderlist_box">
         <ul>
           <li 
            v-for="(item,index) in test" 
            :key='index'
            @click='goto(item)'>
             <div class="left item">
               <div class="items">
                 <p>订单时间：</p>
                 <p>订单号码：</p>
                 <p>商品数量：</p>
               </div>
             </div>
             <div class="center item">
                <p>2018-12-22 22:22:33</p>
                <p>POS-12341223123</p>
                <p>233</p>
             </div>
             <div class="right item">
               <i class="iconfont icon-gengduo"></i>
             </div>
            </li>
            
         </ul>
      </div>
  </BScroll>
</div>
</template>

<script>
import BScroll from '../base/scroll/scroll'

export default {
  data() {
    return {
      test:[
        1,2,3,4,4,5,5,6,6
      ]
    }
  },
  methods: {
    goto(item) {
      this.$router.push({
        path:`/order/id=${item}`
      })
    }
  },
  components: {
		BScroll
	}
}
</script>

<style lang="less">
@import url('../../assets/less/config.less');

.orderlist_box{
  ul{
    padding: 4px 6px;
    li{
      background: #fff;
      width: 100%;
      margin-bottom: 16px;
      padding: 4px 12px;
      display: flex;
      border-bottom: 1px solid #eee;
      .item{
        flex: 1;
        height: 80px;
        p{
          font-size: 12px;
          color: #666;
          margin: 4px 0;
        }
        i{
          color: #ccc;
        }
      }
      .left{
        flex: 0 0 100px;
        width: 200px;
      }
      .right{
        flex: 0 0 20px;
        width: 20px;
        line-height: 80px;
      }
    }
  }
}
</style>
