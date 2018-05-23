<template>
<div class="userinfo ab_full">
  <BScroll class="box_wrapper">
    <div>
        <div class="top_box">
          <div class="item">
            <p>积分</p>
            <p class="p2">{{integral}}</p>
            <router-link to='/generalize' tag='span'>获取</router-link>
          </div>
          <div class="item">

            <img class="avatar" :src="logo" 
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
    
    <div class="userinfo_list">
          <mu-list>
            <mu-list-item title="个人信息" to='/user'>
              <mu-icon slot="left" value=":iconfont icon-people"/>
              <mu-icon slot="right" value=":iconfont icon-you"/>
            </mu-list-item>
            <mu-divider/>

            <mu-list-item title="我的POS机" to='/poslist'>
              <mu-icon slot="left" value=":iconfont icon-emoji"/>
              <mu-icon slot="right" value=":iconfont icon-you"/>
            </mu-list-item>
            <mu-divider/>

            <mu-list-item title="流水记录" to='/running'>
              <mu-icon slot="left" value=":iconfont icon-sponsor"/>
              <mu-icon slot="right" value=":iconfont icon-you"/>
            </mu-list-item>
            <mu-divider/>

        <!--     <mu-list-item title="订单中心" to='/orderlist'>
              <mu-icon slot="left" value=":iconfont icon-wodedingdan"/>
              <mu-icon slot="right" value=":iconfont icon-you"/>
            </mu-list-item>
            <mu-divider/> -->

            <mu-list-item title="地址管理" to='/site'>
              <mu-icon slot="left" value=":iconfont icon-dizhi"/>
              <mu-icon slot="right" value=":iconfont icon-you"/>
            </mu-list-item>
            <mu-divider/>

            <!-- <mu-list-item title="关于我们" to='/aboutus'>
              <mu-icon slot="left" value=":iconfont icon-guanyuwomen2"/>
              <mu-icon slot="right" value=":iconfont icon-you"/>
            </mu-list-item> -->

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
            <mu-list-item title="注销" @click="_exit">
              <mu-icon slot="left" value=":iconfont icon-084tuichu"/>
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
     loading_title:'正在加载',
     loading: false,
     integral: '',      // 用户信息
     logo:'',
     childrenNum:'',
     nickName:''
    }
  },
   created() {
    let session_id = mystorage.get('session_id')
    this._getData(session_id)
  },
  methods:{
   _getData(id) {
      this.axios.get(api.user_info,{
        params:{
          sessionID: id
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
      this.integral = res.data.result.result.integral
      // this.integral     = mystorage.get('integral')// 用户信息
      this.logo         = mystorage.get('logo')// 用户信息
      this.childrenNum  = mystorage.get('childrenNum')// 用户信息
      this.nickName     = mystorage.get('res')// 用户信息
      })
    },
    _exit() {
      let that = this
      this.$confirm({
        title: '确认注销?'
      })
      .then(res=> {
        that.exit()
      })
      .catch(fail => {
        console.log('取消')
      })
    },
    exit(){
      this.axios.post(api.exit,{
          sessionID: mystorage.get('session_id')
        })
        .then(res => {
          if(res.data.result.state == 200) {
            console.log(res.data)
            this.$toast(res.data.result.msg)
            console.log(res.data.result)
            mystorage.clear()
           
            this.loading = false;
            
            this.$router.push('/Home')
          }else{
            this.loading = false;
            this.$toast("注销失败,请重新注销", {
            durtaion: 200
            });
          }
        })  
    }
  },
  components:{
    BScroll,
    Loading,
  }
}
</script>

<style scoped lang="less" >
@import url('../../assets/less/config.less');
.userinfo{

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

.userinfo_list{
  .mu-list{
    background: #fff;
    margin-bottom: 12px;
  }  
}


}


</style>
