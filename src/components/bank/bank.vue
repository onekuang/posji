<template>
<div class="bank ab_full">
  <BScroll class="box_wrapper">
  <div>
    <div class="bank_box">
         <ul>
           <li 
            v-for="(item,index) in test" 
            :key='index'
            >
             <div class="left item">
               <div class="items">
                 <p>张三</p>
                 <p>2333-4444-1111-5555</p>
               </div>
             </div>
             <div class="center item">
                <p>中国农村商业银行</p>
             </div>
             <div class="right item">
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

export default {
  data() {
    return {
      test:[
        1,2,
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
