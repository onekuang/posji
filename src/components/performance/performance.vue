<template>
  <div class="performance ab_full">
    <BScroll class="box_wrapper">
      <div>
        <div class="top_box">
          <div class="jifen_box">
            <h3>我的积分</h3>
            <p>0</p>
            <router-link to="/tean" class="span1">我的团队</router-link>
          </div>
        </div>

        <mu-flexbox style="background:#fff;">
          <mu-flexbox-item class="flex-demo shouyi_box">
            <div class="item">
              <p>本月收益</p>
              <p>0</p>
            </div>  

          </mu-flexbox-item>
          <mu-flexbox-item class="flex-demo shouyi_box">
            <div class="item">
              <p>本日收益</p>
              <p>0</p>
            </div> 
          </mu-flexbox-item>
        </mu-flexbox>

        <div class="performance_list">
          <mu-list>
            <mu-list-item :title="yaoqing">
              <mu-icon slot="left" value=":iconfont icon-yaoqingma"/>
            </mu-list-item>
            <mu-divider/>
            <mu-list-item :title="add_up">
              <mu-icon slot="left" value=":iconfont icon-icon3"/>
            </mu-list-item>
          </mu-list>
        </div>

        <div class="performance_list">
          <mu-list>
            <mu-list-item title="收益详情" to='/earnings'>
              <mu-icon slot="left" value=":iconfont icon-shouyiguize"/>
              <mu-icon slot="right" value=":iconfont icon-you"/>
            </mu-list-item>
            <mu-divider inset/>
            <mu-list-item title="提现详情" to='/withdraw'>
              <mu-icon slot="left" value=":iconfont icon-tixian1"/>
              <mu-icon slot="right" value=":iconfont icon-you"/>
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
      
      yaoqingma: '1234567890123456',
      addup: '8123.00'
    }
  },
  computed:{
    yaoqing() {
      return  '邀请码：' + this.yaoqingma
    },
    add_up() {
      return '累计提现：￥' + this.addup
    }
  },
  components: {
		BScroll
	}
}
</script>

<style lang="less" scoped>
@import url('../../assets/less/config.less');

.top_box{
  height: 200px;
  background: @info_bg;
  text-align: center;
  color: #fff;
}
.jifen_box{
  padding-top: 40px;
  .span1{
    display: inline-block;
    font-size: 18px;
    padding: 4px 16px;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 6px;
    margin-top: 20px;
  }
}
.shouyi_box{
  .item{
    // padding-left: 16px;
    padding-top: 6px;
    padding-bottom: 6px;
    text-align: center;
    &:first-child{
      border-right: 1px solid #ccc;
    }
  }
}
.performance_list{
  padding: 0 6px;
  margin: 12px 8px;
  background: #fff;
  margin-top: 12px;
}
.mu-item.show-left{
  padding-left: 60px;
}
</style>
