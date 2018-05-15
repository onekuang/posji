<template>
<div class="addbank ab_full">
  <BScroll class="box_wrapper">
  <div>
    <div class="addbank_list">
      <ul>
        <mu-select-field 
          v-model="bank" 
          :labelFocusClass="['label-foucs']" 
          label="选择你的银行卡"
        >
          <mu-menu-item 
            v-for="(text,index) in list" 
            :key="index" 
            :value="index" 
            :title="text" 
          />
        </mu-select-field>
        <li>
          <mu-text-field 
            label="银行卡号:" 
            hintText="请输入银行卡号" 
            errorColor="orange"
            errorText="" 
            fullWidth />
        </li>
        <li>
          <mu-text-field 
            label="您的姓名" 
            hintText="请输入您的姓名" 
            fullWidth />
        </li>
        <li>
          <mu-text-field 
            label="手机号码" 
            hintText="绑定银行手机号码" 
            fullWidth />
        </li>
        <li>
          <mu-text-field 
            label="验证码" 
            hintText="请输入您收到的验证码" 
            fullWidth />
        </li>
        <li class="bank_btn">
          <mu-raised-button label="获取验证码" ref="button" fullWidth/>
        </li>
        <br>
        <li class="bank_btn">
          <mu-raised-button label="确认提交" class="demo-raised-button" secondary fullWidth />
        </li>
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
      bank: 0,
      list: ['中国银行', '农业银行',]
    }
  },
  components:{
    BScroll
  }
}
</script>

<style lang="less">
@import url('../../assets/less/config.less');
.addbank_list{
  padding: 8;
  ul{
    padding: 8px;
    background: #fff;
    li{

    }
  }
}
.mu-popover:nth-of-type(1){
  top: 0px !important;
}
.btn_box{
      text-align: center;
      margin-top: 50px;
      .mu-raised-button-primary{
        background-color: rgba(255, 107, 1,1);
      }
      .bank_btn{
        margin-bottom: 20px;
        .mu-raised-button{
          height: 50px;
          line-height: 50px;
        }
      }
    } 

</style>
