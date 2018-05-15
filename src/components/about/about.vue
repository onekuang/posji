<template>
<div class="about ab_full">
<BScroll class="box_wrapper">
<div>
  <div class="about_box">
    <img src="http://www.muse-ui.org/images/honey.jpg" alt="" width="100%">
    <div class="content">
      <h2>公司名字</h2>
      <p>
        description....
      </p>      
    </div>
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

<style scoped lang='less'>
@import url('../../assets/less/config.less');
.about{
  img{
    margin: 0;
    padding: 0;

  }
}
.about_box{
  .content{
    padding: 8px;
    background: #fff;
    min-height: 300px;
    h2{
      margin: 0;
      padding: 0;
      font-size: 18px;
    }
  }
  
}
</style>
