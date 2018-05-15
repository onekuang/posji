<template>
<div class="k_site ab_full">
  <BScroll class="box_wrapper">
  <div>
    <div class="site_wrapper">

      <div class="site-list" v-for="(item, index) in site_list" :key='index'>
        <div class="site-number">
            姓名：张三<br>
            电话：13421233333<br>
            地址：东莞市南城区鸿禧商业大厦<br>
        </div>
        <div class="site-detail">
            <div class="uplode item">
              <span>编辑</span>
            </div>
            <div class="delete item">
              <span><i class="iconfont icon-deletefill"></i></span>
            </div>
        </div>
      </div>
      <div class="btn_box">
        <mu-float-button icon=":iconfont icon-add" secondary class="demo-float-button" to='/addsite'/>
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
      site_list:[
        1,2,3
      ]
    }
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
