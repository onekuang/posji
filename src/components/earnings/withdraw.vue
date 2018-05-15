<template>
<div class="earnings ab_full">
  <BScroll class="box_wrapper">
  <div>
    <div class="earnings_box">
        <mu-timeline><mu-timeline-item iconColor='#5db130'>
          <span slot="time" style="font-size:20px;">提现详情</span>
        </mu-timeline-item>
        <mu-timeline-item iconColor='#FF6B01' 
          v-for="(item,index) in lists" 
          :key='index'>
          <span slot="time">{{item.time}}</span>
          <span slot="des">{{item.text}}</span>
        </mu-timeline-item>
      </mu-timeline>
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
      lists:[
        {time:'2017年 6月 1日',text:'提现了500w'},
        {time:'2018年 6月 1日',text:'提现了50w'}
      ]
    }
  },
  components:{
    BScroll
  }
}
</script>

<style scoped lang="less">
@import url('../../assets/less/config.less');

.earnings_box{
  padding: 8px;
  background: #fff;
  .mu-timeline-item{
    background: #fff;
  }
}
</style>
