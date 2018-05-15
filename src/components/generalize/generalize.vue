<template>
<div class="generalize ab_full" >
  <BScroll class="box_wrapper">
  <div>
    <div class="yaoqingma_box">
      <h4>邀请码</h4>
      <div class="yaoqingma">
        <p>12312487982365196</p>
      </div>
      <p>*使用邀请码注册将增加您的收益</p>
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

<style lang="less">
@import url('../../assets/less/config.less');

.yaoqingma_box{
  text-align: center;
  h4{
    color: #f00;
    margin-top: 30%;
  }
  .yaoqingma{
    display: inline-block;
    width: 90%;
    height: 50px;
    line-height: 50px;
    padding: 0 30px;
    background: #fff;
    font-size: 18px;
    margin: 30px 0;
  }
  p{
    font-size: 14px;
    color: #888;
  }
}


</style>
