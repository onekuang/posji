<template>
<div class="k_site ab_full">
  <BScroll class="box_wrapper">
  <div>
    <div class="site_wrapper">

      <p>选择您的收货地址:</p>
      <div class="site-list" v-for="(item, index) in site_list" :key='index'>
        <div class="k_check">
          <mu-radio name="group" :nativeValue="('kk'+ item.id)" 
            class="demo-radio" v-model='check_site'/>
        </div>

        <div class="site-number">
            姓名：{{item.receivingName}}<br>
            电话：{{item.receivingMobile}}<br>
            地址：{{item.provincesName}}{{item.cityName}}{{item.cityName}}{{item.zoneName}}{{item.address}}<br>
        </div>
      </div>
      <div class="btn_box" v-if='!site_list.length'>
        <br><br>
        <p>你还没有设置收货地址,请先添加</p><br><br>
        <mu-float-button icon=":iconfont icon-add" secondary class="demo-float-button" to="/addsite?from=shopcar"/>
      </div>
      <div class="btn_box" v-else='site_list.length'>
        <br><br>

        <div class="btn_box">
            <mu-raised-button 
              backgroundColor="#FF5252"
              label="下一步" 
              class="demo-raised-button"  
              fullWidth
              @click='xiadan'
            />
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
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      route_goods_list: '',
      loading_title:'正在加载',
      loading: false,
      check_site:'',
      site_list:[]
    }
  },
  created() {
    this.route_goods_list = this.$route.params.goods
    this._getData()
  },
  methods: {
    _getData() {
      this.axios.get(api.get_site_list,{
        params:{
          sessionID: mystorage.get('session_id')
        }
      })
      .then(res => {
        if (res.data.result.state == 200) {
          // console.log(res.data.result.result)
          this.site_list = res.data.result.result
        }
      })
    },
    _delete(id) {
      let that = this
      this.$confirm({
        title: '确认删除?'
      })
      .then(res=> {
        that._post_delete(id)
      })
      .catch(fail => {
        console.log('取消')
      })
    },
    _post_delete(id) {
      this.axios.get(api.post_site,{
        params: {
          sessionID: mystorage.get('session_id'),
          id: id,
          submitFlag      : 'delete'
        }
      })
      .then(res => {
        if(res.data.result.state == 200) {
          this.$toast('删除成功'),
          this._getData()
        }
      })
    },
    xiadan() {
      let site_id = this.check_site.substring(2)
      this.$router.push({
        name: 'shopping',
        params: {
          goods:this.route_goods_list,
          site_id: site_id
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
  },
  components:{
    BScroll
  }
}
</script>

<style lang="less" scoped>
@import url('../../assets/less/config.less');

.site_wrapper{
    color: #999;
    font-size: 14px;
    padding: 8px;
    border-radius: 4px;
}
.site{
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #e9e9e9;
    text-align: center;
}
.site-list{
  background: #fff;
    padding-left: 15px;
    border-bottom: 10px solid #ededed;
    display: flex;
    >div{
      flex: 1;
    }
    .k_check{
      flex: 0 0 30px;
      padding-top: 30px;
    }
}
.site-list:last-child{
    border-bottom: 0;
}
.site-number{
    // height: 45px;
    padding: 8px 0;
    // line-height: 45px;
    border-bottom: 1px solid #e9e9e9;
    color: #888;
}
.site-detail{
    display: flex;
    height: 40px;
    padding: 0 16px;
    border-bottom: 1px solid #e9e9e9;
    .item{
      flex: 1;
      line-height: 40px;
      span{
        display: inline-block;
        padding: 0 16px;
        height: 100%;
      }
      &.delete{
        text-align: right;        
      }
    }
}
.btn_box{
  // margin-top: 30px;
  text-align: center;
}
// .site-detail img{
//     position: absolute;
//     left: 0;
//     top: 10px;
//     width: 75px;
//     height: 75px;
// }
// .site-detail view{
//     line-height: 30px;
// }
// .site-detail .site-status{
//     position: absolute;
//     right: 10px;
//     top: 18px;
//     height: 60px;
//     line-height: 60px;
//     color: #b42f2d;
// }
// .site-footer{
//     height: 30px;
//     line-height: 30px;
//     color: #2f2f2f;
//     padding:8px 15px 8px 0;
// }
// .site-footer .site-btn{
//     float: right;
//     width: 85px;
//     height: 30px;
//     line-height:30px;
//     border-radius: 3px;
//     background: #b42f2d;
//     color: #fff;
// }



</style>
