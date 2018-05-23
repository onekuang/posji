<template>
<div class="earnings ab_full">
  <BScroll class="box_wrapper">
  <div>
    <div class="earnings_box">
        <mu-timeline>
          <mu-timeline-item iconColor='#5db130'>
          <span slot="time" style="font-size:20px;">流水帐记录</span>
        </mu-timeline-item>

        <mu-timeline-item iconColor='#FF6B01' 
          v-for="(item,index) in lists" 
          :key='index'>
          <span slot="time">{{item.registerDate | time}}</span>
          <span slot="des">刷了{{item.expence}}元</span>
        </mu-timeline-item>

          <mu-timeline-item iconColor='#FF5252'>
          <span slot="time"  style="font-size:16px;color: #ccc;">没有更多数据</span>
        </mu-timeline-item>

      </mu-timeline>

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
import Loading from '../base/loading/loading.vue'
import api from '../../assets/api/api.js'
import mystorage from '../../common/js/storage.js'

export default {
  data() {
    return {
      loading_title:'正在加载',
      loading: true,

      lists:[]
    }
  },
  created() {
    if(!mystorage.get('session_id')) {
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
      this.loading = true
      this.axios.post(api.liushui,{
        sessionID: mystorage.get('session_id')
      })
      .then(res => {
        if (res.data.state == 401) {
          this.$alert('请先登录')
          this.$router.push({
            path:'/login'
          })
          return
        }
        if(res.data.result.state == 200) {
          this.lists = res.data.result.result
          this.loading = false;
        }else{
          this.loading = false;
        }
      })
      .catch(res => {
        this.loading = false;
        this.$toast("请求失败,请刷新", {
          durtaion: 200
        });
      })
    }
  },
  filters: {
        time: function (input) {
          var d = new Date(input)
          var year = d.getFullYear()
          var month = d.getMonth() + 1
          var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
          var hour = d.getHours()
          var minutes = d.getMinutes()
          var seconds = d.getSeconds()
           return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
           }
      },
  components:{
    BScroll,
    Loading
  }
}
</script>

<style scoped lang="less">
@import url('../../assets/less/config.less');

.earnings_box{
  background: #fff;
  min-height: 600px;
  padding: 8px;
  .mu-timeline-item{
    background: #fff;
  }
}
</style>
