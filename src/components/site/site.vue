<template>
<div class="k_site ab_full">
  <BScroll class="box_wrapper">
  <div>
    <div class="site_wrapper">

      <div class="site-list" v-for="(item, index) in site_list" :key='index'>
        <div class="site-number">
            姓名：{{item.receivingName}}<br>
            电话：{{item.receivingMobile}}<br>
            地址：{{item.provincesName}}{{item.cityName}}{{item.cityName}}{{item.zoneName}}{{item.address}}<br>
        </div>
        <div class="site-detail">
            <div class="uplode item">
              <span></span>
            </div>
            <div class="delete item">
              <span @click='_delete(item.id)'><i class="iconfont icon-deletefill"></i></span>
            </div>
        </div>
      </div>
      <div class="list_null" v-if ="!site_list.length" v-show='show_null'>
        <NullList />
      </div>
      <div class="btn_box">
        <mu-float-button icon=":iconfont icon-add" secondary class="demo-float-button" to='/addsite'/>
      </div>
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

      site_list:[]
    }
  },
  created() {
    this._getData()
  },
  methods: {
    _getData() {
      this.loading =true
      this.axios.get(api.get_site_list,{
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
        if (res.data.result.state == 200) {
          this.loading = false
          this.site_list = res.data.result.result
        }else{
          this.$toast('请求错误')
          this.loading = false
        }
        this.show_null = true
      }).catch(res => {
        this.$toast('网络错误')
        this.loading = false
        this.show_null = true
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
    }
  },
  components:{
    BScroll,
    Loading,
    NullList
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
  margin-top: 30px;
  text-align: center;
}
.loading{
  margin-top: 45%;
}
.list_null{
  margin-top: 45%;
}


</style>
