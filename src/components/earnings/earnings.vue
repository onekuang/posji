<template>
<div class="earnings ab_full">
  <BScroll class="box_wrapper">
  <div>
    <div class="earnings_box">
        <mu-timeline>
          <mu-timeline-item iconColor='#5db130'>
          <span slot="time" style="font-size:20px;">我的收益</span>
        </mu-timeline-item>

        <mu-timeline-item iconColor='#FF6B01' 
          v-for="(item,index) in lists" 
          :key='index'>
          <span slot="time">{{item.registerDate | time}}</span>
          <span slot="des">收益了{{item.integralNumber}}元</span>
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
    this._getData()
  },
  methods: {
    _getData() {
      this.loading = true
      this.axios.post(api.shouyi,{
        sessionID: mystorage.get('session_id'),
        isadd: 0,
      })
      .then(res => {
        if (res.data.state == 401){
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
        console.log(err)
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
