<template>
<div class="team ab_full">
  <BScroll class="box_wrapper" >
  <div>
    <div class="team_box">
        <mu-list>
          <mu-sub-header><i class="iconfont icon-friend"></i>&nbsp;总人数：{{num}}人</mu-sub-header>
    
          <mu-list-item :title="item.nickName" v-for="(item, index) in lists" :key='index'>
            <mu-avatar :src="item.logo" slot="leftAvatar"/>
            <span slot="describe">
              <span style="color: rgba(0, 0, 0, .87)">团队人数：{{item.childrenNum}}</span><br> 
              注册时间：{{item.registerDate | time}}<br>
            </span>
          </mu-list-item>
          
        </mu-list>
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
      loading_title:'正在加载',
      loading: false,
      num: '', // 总人数
      lists:[]
    }
  },
  created() {
    this._getData()
  },
  methods: {
    _getData() {
      this.axios.get(api.team,{
        params: {
          sessionID: mystorage.get('session_id')
        }
      })
      .then(res=> {
        if (res.data.state == 401){
          this.$alert('请先登录')
          this.$router.push({
            path:'/login'
          })
          return
        }
        this.num    = res.data.result.childrenNum
        this.lists  = res.data.result.usersList
      })
    }
  },
  filters: {
        time: function (input) {
          var d = new Date(input)
          var year = d.getFullYear()
          var month = d.getMonth() + 1
          var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
          var hour = d.getHours()
          var minutes = d.getMinutes()
          var seconds = d.getSeconds()
           return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
           }
      },
  components:{
    BScroll
  }
}
</script>

<style lang="less">
@import url('../../assets/less/config.less');
.team_box{
  background: #fff;
}
</style>
