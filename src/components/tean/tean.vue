<template>
<div class="team ab_full">
  <BScroll class="box_wrapper" >
  <div>
    <div class="team_box">
        <mu-list>
          <mu-sub-header>总人数：{{lists.length}}人</mu-sub-header>
    
          <mu-list-item :title="item.name" v-for="(item, index) in lists" :key='index'>
            <mu-avatar src="/static/images/user-pic.jpg" slot="leftAvatar"/>
            <span slot="describe">
              <span style="color: rgba(0, 0, 0, .87)">团队人数：{{item.people}}</span><br> 
              注册时间：{{item.time}}<br>
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

export default {
  data() {
    return {
      lists:[
        {name:'王晓翠',time:'2017年 6月 1日',people:'2'},
        {name:'王大锤',time:'2017年 6月 1日',people:'1'}
      ]
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
