<template>
<div class="bank ab_full">
  <BScroll class="box_wrapper">
  <div>
    <div class="bank_box">
         <ul>
           <li 
            v-for="(item,index) in lists" 
            :key='index'
            >
             <div class="left item">
               <div class="items">
                 <p>{{item.usersName}}</p>
                 <p>{{item.cardNumber}}</p>
               </div>
             </div>
             <div class="center item">
                <p>{{item.bankname}}</p>
             </div>
             <div class="right item" @click='delete_bank(item.id)'>
               <i class="iconfont icon-deletefill"></i>
             </div>
            </li>
            <div class="btn_box">
                <mu-float-button 
                  icon=":iconfont icon-add" 
                  class="demo-float-button"
                  to='/addbank'
                  backgroundColor='#FF5252'
                />
            </div>
         </ul>
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
      lists:[]
    }
  },
  created() {
    this._getData()
  },
  methods: {
    _getData() {
      this.axios.get(api.get_bankList,{
        params:{
          sessionID: mystorage.get('session_id')
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
        if(res.data.result.state == 200) {
          this.lists = res.data.result.result
        }
      })
    },
    delete_bank(id) {
      let that = this
      this.$confirm({
        title: '确认删除?'
      })
      .then(res=> {
        that._delete_bank(id)
      })
      .catch(fail => {
        console.log('取消')
      })
    },
    _delete_bank(id) {
      this.axios.get(api.add_bank,{
        params:{
          sessionID: mystorage.get('session_id'),
          submitFlag: 'delete',
          id :  id
        }
      })
      .then(res => {
        if(res.data.result.state == 200) {
          this.$toast('删除成功'),
          this._getData()
        }
      })
    }
  },
  components:{
    BScroll
  }
}
</script>

<style lang="less" scoped>
@import url('../../assets/less/config.less');

.bank_box{
  ul{
    padding: 4px 6px;
    li{
      background: #fff;
      width: 100%;
      margin-bottom: 16px;
      padding: 4px 12px;
      display: flex;
      border-bottom: 1px solid #eee;
      .item{
        flex: 1;
        height: 50px;
        p{
          font-size: 12px;
          color: #666;
          margin: 4px 0;
        }
        i{
          color: #ccc;
        }
      }
      .left{
        flex: 0 0 150px;
        width: 150px;
      }
      .center{
        line-height: 50px;
      }
      .right{
        flex: 0 0 20px;
        width: 20px;
        line-height: 50px;
      }
    }
    .btn_box{
      text-align: center;
      margin-top: 50px;
      .mu-raised-button-primary{
        background-color: rgba(255, 107, 1,.8);
      }
    } 
    
  }
}


</style>
