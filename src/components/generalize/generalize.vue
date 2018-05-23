<template>
<div class="generalize ab_full" >
  <BScroll class="box_wrapper">
  <div>
    <div class="yaoqingma_box">
      <h4>邀请码</h4>
      <div class="yaoqingma">
        <p v-model="yaoqingma">{{yaoqingma}}</p>
      </div>
      
      <div class="container">
            <mu-raised-button 
              backgroundColor="#FF5252"
              label="一键复制" 
              class="demo-raised-button" 
              v-clipboard:copy="yaoqingma"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            />
        </div>

      <p>*使用邀请码注册将增加您的收益</p>
    </div>
  </div>
  </BScroll>
</div>
</template>

<script>
import BScroll from '../base/scroll/scroll'
import api from '../../assets/api/api.js'
import Loading from '../base/loading/loading.vue'
import mystorage from '../../common/js/storage.js'
export default {
  data() {
    return {
      yaoqingma:'',
      message:'test'
    }
  },
  created() {
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
      this.axios.get(api.yaoqingma,{
        params: {
          sessionID: mystorage.get('session_id')
        }
      })
      .then( res=> {
        if (res.data.state == 401) {
          this.$alert('请先登录')
          this.$router.push({
            path:'/login'
          })
          return
        }
        if(res.data.result.state == 200) {
          this.yaoqingma = res.data.result.result.invitationCode
        }else{
          this.$toast("请求失败,请刷新", {
            durtaion: 200
          });
        }
      })
    },
    onCopy: function (e) {
      this.$toast('复制成功')
      // alert('You just copied: ' + e.text)
    },
    onError: function (e) {
      this.$toast('复制失败')
      // alert('Failed to copy texts')
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
  .demo-raised-button{
    border-radius: 6px;
    margin-bottom: 16px;
  }
}


</style>
