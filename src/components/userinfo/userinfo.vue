<template>
<div class="userinfo ab_full">
  <BScroll class="box_wrapper">
    <div>
    <div class="top_box">
      <img class="avatar" src="./user-pic.jpg" 
      width=80 height=80>
      <div class="userinfo_box">
        <div class="item">
          <p class="p2">王大锤</p>
        </div>
        <div class="item">
          <p class="p2">积分:0</p> 
        </div>
      </div>
    </div>
    
    <div class="userinfo_list">
          <mu-list>
            <mu-list-item title="个人信息" to='/user'>
              <mu-icon slot="left" value=":iconfont icon-people"/>
              <mu-icon slot="right" value=":iconfont icon-you"/>
            </mu-list-item>
            <mu-divider/>

            <mu-list-item title="订单中心" to='/orderlist'>
              <mu-icon slot="left" value=":iconfont icon-wodedingdan"/>
              <mu-icon slot="right" value=":iconfont icon-you"/>
            </mu-list-item>
            <mu-divider/>

            <mu-list-item title="地址管理" to='/site'>
              <mu-icon slot="left" value=":iconfont icon-dizhi"/>
              <mu-icon slot="right" value=":iconfont icon-you"/>
            </mu-list-item>
            <mu-divider/>

            <mu-list-item title="关于我们" to='/aboutus'>
              <mu-icon slot="left" value=":iconfont icon-guanyuwomen2"/>
              <mu-icon slot="right" value=":iconfont icon-you"/>
            </mu-list-item>

          </mu-list>
          
          <mu-list>
            <mu-list-item title="我要提现" to='/getmoney'>
              <mu-icon slot="left" value=":iconfont icon-tixian"/>
              <mu-icon slot="right" value=":iconfont icon-you"/>
            </mu-list-item>
            <mu-divider/>

            <mu-list-item title="银行卡管理" to='/bank'>
              <mu-icon slot="left" value=":iconfont icon-iconset0292"/>
              <mu-icon slot="right" value=":iconfont icon-you"/>
            </mu-list-item>
          </mu-list>
          
          <mu-list>
            <mu-list-item title="注销">
              <mu-icon slot="left" value=":iconfont icon-084tuichu"/>
            </mu-list-item>
          </mu-list>
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

<style scoped lang="less" >
@import url('../../assets/less/config.less');
.userinfo{

.top_box{
  position: relative;
  height: 200px;
  background: @info_bg;
  text-align: center;
  .avatar{
    border: 2px solid #ff6b01;
    margin-top: 32px;
    border-radius: 50%;
  }
  .userinfo_box{
    margin-top: 20px;
    color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    display: flex;
    font-weight: 600;
    background: rgba(0,0,0,.2);
    .item{
      flex:1;
      text-align: center;
      height: 60px;
      line-height: 60px;
        font-size: 15px;
      .p1{
      }
      &:first-of-type{
        border-right: 1px solid rgba(255,255,255,.2);
      }
    }
    
  }
}

.userinfo_list{
  .mu-list{
    background: #fff;
    margin-bottom: 12px;
  }  
}


}


</style>
