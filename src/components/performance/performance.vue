<template>
  <div class="performance ab_full">
    <BScroll class="box_wrapper">
      <div>
        <div class="top_box">
          <div class="item">
            <p>积分</p>
            <p class="p2">{{integral}}</p>
            <router-link to='/generalize' tag='span'>获取</router-link>
          </div>
          <div class="item">
            <img class="avatar" :src="avatar" 
      width=80 height=80>
            <p>
              {{nickName}}
            </p>
          </div>
          <div class="item">
            <p>团队总数</p>
            <p class="p2">{{childrenNum}}</p> 
            <router-link to='/tean' tag='span'>详情</router-link>
          </div>
          
        </div>

        <mu-flexbox style="background:#fff;">
          <mu-flexbox-item class="flex-demo shouyi_box">
            <div class="item">
              <p>本月收益</p>
              <p>{{benyueshouyi}}</p>
            </div>  

          </mu-flexbox-item>
          <mu-flexbox-item class="flex-demo shouyi_box">
            <div class="item">
              <p>本日收益</p>
              <p>{{benrishouyi}}</p>
            </div> 
          </mu-flexbox-item>
        </mu-flexbox>

        <div class="performance_list">
          <mu-list>
            <mu-list-item :title="yaoqing" 
              v-model="yaoqingma" 
              v-clipboard:copy="yaoqingma"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >
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
            <mu-list-item title="我的团队" to='/tean'>
              <mu-icon slot="left" value=":iconfont icon-diqiu"/>
              <mu-icon slot="right" value=":iconfont icon-you"/>
            </mu-list-item>
            <mu-divider inset/>
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
      avatar:'',
      nickName:'',
      childrenNum:'',
      loading_title:'正在加载',
      loading: false,
      data_integralVo:'',   // 收益
      data_Detail: '',      // 用户信息
      yaoqingma: '',
      addup: '0.00',
      integral: 0,
      benyueshouyi: 0,
      benrishouyi: 0,
    }
  },
  created() {
    this.childrenNum     = mystorage.get('childrenNum')// 用户信息
    this.avatar =  mystorage.get('logo')
    this.nickName =  mystorage.get('nickName')
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
      this.axios.get(api.yeji,{
        params:{
          sessionID:mystorage.get('session_id'),
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
        this.data_Detail     = res.data.result.Detail // 收益
        this.data_integralVo = res.data.result.integralVo // 用户信息
        this.addup           = res.data.result.integralVo.integralYou
        this.yaoqingma = res.data.result.Detail.invitationCode // 邀请码
        this.integral =res.data.result.Detail.integral
        this.benyueshouyi = res.data.result.integralVo.integralMonth
        this.benrishouyi = res.data.result.integralVo.integralDay
        this.childrenNum = res.data.result.Detail.childrenNum
      })
    },
    onCopy: function (e) {
      this.$toast('复制成功')
    },
    onError: function (e) {
      this.$toast('复制失败')
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
		BScroll,
    Loading
	}
}
</script>

<style lang="less" scoped>
@import url('../../assets/less/config.less');

.top_box{
  top: 100%;
  height: 200px;
  background: @info_bg;
  text-align: center;
  color: #fff;
  display: flex;
  align-items:center;
  .item{
    flex: 1;
    img{
      border-radius: 50%;
    }
    &:nth-of-type(1),&:nth-of-type(3){
      padding-top: 30px;
      font-size: 15px;
      .p2{
        color: #edff00;
      }
    };
    &:nth-of-type(2){
      font-size: 14px;
      i{
        font-size: 16px;
        margin-right: 8px;
        color: #F0E30E;
      }
    }
    span{
      display: inline-block;
      border-radius: 25px;
      border: 1px solid #fff;
      font-size: 12px;
      padding: 1px 16px;
      margin-top: 4px;
    }
  }
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
