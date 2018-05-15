<template>
<div class="earnings ab_full">
  <BScroll class="box_wrapper">
  <div>
    <div class="earnings_box">
        <mu-timeline><mu-timeline-item iconColor='#5db130'>
          <span slot="time" style="font-size:20px;">我的收益</span>
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
        {time:'2017年 6月 1日',text:'发起第一个pr'},
        {time:'2017年 6月 1日',text:'发起第二个pr'}
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
  background: #fff;
  padding: 8px;
  .mu-timeline-item{
    background: #fff;
  }
}
</style>
