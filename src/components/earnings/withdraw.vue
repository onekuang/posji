<template>
<div class="earnings ab_full">
  <BScroll class="box_wrapper">
  <div>
    <div class="earnings_box">
        <mu-timeline><mu-timeline-item iconColor='#5db130'>
          <span slot="time" style="font-size:20px;">提现详情</span>
        </mu-timeline-item>
        <!-- :class ="{state_success: state==2,state_error: state==1}" -->
         <!-- :class ="{state_success: item.checkFlag== 2 ,state_error: item.checkFlag == 0,state_error: item.checkFlag == 1}" -->
        <mu-timeline-item iconColor="#FF5252" 
          v-for="(item,index) in lists" 
          :key='index'>
          <span slot="time">
            <a class="item_state"
             :class="[{state_error: item.checkFlag== 0},{state_error: item.checkFlag== 1},{state_success: item.checkFlag== 2}]"
            >{{item.checkFlag | num_val}}</a>
            &nbsp;&nbsp;{{item.registerDate | time}} 
          </span>
          <span slot="des">提现{{item.amountOne}}元</span>
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
      loading: false,
      lists:[],
      state: 1,
    }
  },
  created() {
    this._getData()
  },
  computed: {
    states_text: function() {
      let text = ''
      if(this.state == 1 || this.state == 0) {
        text = '申请中'
      }else if ( this.state == 2) {
        text = '已完成'
      }
      return text;
    },
  },
  methods: {
    _getData() {
      this.loading = true
      this.axios.get(api.get_moneys,{
        params: {
          sessionID: mystorage.get('session_id'),
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
        if(res.data.result.state == 200) {
          this.lists = res.data.result.result
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
       },
      num_val: function (val) {
        if(val == 0 || val == 1 ) { return '审核中'}
        if(val == 2 ) { return '已完成'}
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
  padding: 8px;
  background: #fff;
  min-height: 600px;
  .mu-timeline-item{
    background: #fff;
  }
  .item_state{
    display: inline-block;
    padding: 0 6px;
    color: #fff;
    height: 20px;
    font-size: 12px;
    font-weight: 100;
    border-radius: 8px;
    line-height: 20px;
    margin-bottom: 15px;
    &.state_success{
      background: #70BA48;      
    };
    &.state_error{
      background: #FF6B01;
    };
  }
}
</style>
