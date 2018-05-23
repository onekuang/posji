<template>
<div class="orderlist ab_full">
  <BScroll class="box_wrapper">
      <div class="orderlist_box">
         <ul>
           <li 
            v-for="(item,index) in lists" 
            :key='index'
            @click='goto(item.id)'>
             <div class="left item">
               <div class="items">
                 <p>订单时间：</p>
                 <p>订单号码：</p>
                 <p>商品数量：</p>
               </div>
             </div>
             <div class="center item">
                <p>{{item.registerDate}}</p>
                <p>{{item.orderNum}}</p>
                <p>{{item.commodityNum}}</p>
             </div>
             <div class="right item">
               <i class="iconfont icon-gengduo"></i>
             </div>
            </li>
            
         </ul>
         <div class="list_null" v-if ="!lists.length" v-show='show_null'
          style="margin-top: 20px;">
           <NullList />
         </div>
         <div class="loading" v-show='loading'>
           <Loading :title='loading_title'/>
         </div>
      </div>
  </BScroll>
</div>
</template>

<script>
import BScroll from '../base/scroll/scroll'
import k_slide  from '../base/slider/slider'
import api from '../../assets/api/api.js'
import Loading from '../base/loading/loading.vue'
import NullList from '../base/loading/null_list.vue'
import mystorage from '../../common/js/storage.js'
export default {
  data() {
    return {
      loading_title:'正在加载',
      loading: false,
      show_null:false,
      lists:[]
    }
  },
  created() {
    this._getData()
  },
  methods: {
    _getData() {
      this.loading = true
      this.axios.get(api.order_list,{
        params:{
          sessionID: mystorage.get('session_id')
        }
      })
      .then(res => {
        if (res.data.state == 401){
          this.$alert('请先登录')
          this.$router.push({
            path:'/login'
          })
          return
        }
        if(res.data.result.state == 200){
          this.lists = res.data.result.result
          this.loading = false;
        }else{
          this.loading = false;
        }
          this.show_null = true
      })
      .catch(() => {
        this.loading = false;
        this.show_null = true
        this.$toast("请求失败,请刷新", {
          durtaion: 200
        });
      })
    },
    goto(id) {
      this.$router.push({
        path:`/order/${id}`
      })
    }
  },
  components: {
		BScroll,
    Loading,NullList
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
