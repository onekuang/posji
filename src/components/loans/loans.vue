<template>
<div class="loans ab_full">
  <BScroll class="box_wrapper" ref="scroll">
    <div>
      <div class="demo-vsteper-container">
        <mu-stepper :activeStep="activeStep" orientation="vertical">
          <mu-step>
            <mu-step-label>
              基础信息
            </mu-step-label>
            <mu-step-content>
              <p class="p1">请在您拥有的资产打上勾</p><br/>
              <i class="iconfont icon-house"></i>
              <mu-checkbox label="是否有房产" class="demo-checkbox" nativeValue="房产" v-model='zichan' 
                labelLeft @input='add_val'
              />
              <mu-radio label="分期房产" class="demo-radio" nativeValue="1" v-model="fangchan_child" 
                v-show='fangchan'/>
              <mu-radio label="全额房产" class="demo-radio" nativeValue="2" v-model="fangchan_child" 
                v-show='fangchan'/>

              <br/><br/>

              <i class="iconfont icon-cheliang-"></i>              
              <mu-checkbox label="是否有车产" class="demo-checkbox" nativeValue="车产" v-model='zichan' labelLeft
              /> 
              <mu-radio label="分期车产" class="demo-radio" nativeValue="1" v-model="chechan_child" 
                v-show='chechan'/>
              <mu-radio label="全额车产" class="demo-radio" nativeValue="2" v-model="chechan_child" 
                v-show='chechan'/>
              <br/><br/>

              <i class="iconfont icon-13"></i>  
              <mu-checkbox label="是否有社保" class="demo-checkbox" nativeValue="社保" v-model='zichan'  labelLeft /> 
              <mu-radio label="5年以下" class="demo-radio" nativeValue="1" v-model="shebao_child" 
                v-show='shebao'/>
              <mu-radio label="5年以上" class="demo-radio" nativeValue="2" v-model="shebao_child" 
                v-show='shebao'/>
              <br/><br/>

              <i class="iconfont icon-shebaogongjijin"></i>  
              <mu-checkbox label="是否有公积金" class="demo-checkbox"  nativeValue="公积金" v-model='zichan' labelLeft/> 
              <mu-radio label="5年以下" class="demo-radio" nativeValue="1" v-model="gongjijin_child" 
                v-show='gongjijin'/>
              <mu-radio label="5年以上" class="demo-radio" nativeValue="2" v-model="gongjijin_child" 
                v-show='gongjijin'/>
              <br/><br/>

              <i class="iconfont icon-baiwanbaoxiananxingoumai"></i>  
              <mu-checkbox label="是否有保险" class="demo-checkbox" nativeValue="保险" v-model='zichan'  labelLeft/> 
              <mu-radio label="5年以下" class="demo-radio" nativeValue="1" v-model="baoxian_child" 
                v-show='baoxian'/>
              <mu-radio label="5年以上" class="demo-radio" nativeValue="2" v-model="baoxian_child" 
                v-show='baoxian'/>
              <br/><br/>

              <mu-raised-button label="下一步" class="demo-step-button" @click="handleNext" primary backgroundColor="#FF5252"/>
            </mu-step-content>
          </mu-step>

          <mu-step>
            <mu-step-label>
              个人信息
            </mu-step-label>
            <mu-step-content>
              <p class="p1">请填写您的个人信息</p><br/>
              <mu-text-field label="姓名" hintText="请输入您的姓名" v-model='username' 
                :errorText='err_username' icon=":iconfont icon-people icon_cla"
              /><br/>


              <mu-text-field label="手机" hintText="请输入您的手机" v-model='mobile'
                :errorText='err_mobile' icon=":iconfont icon-shouji icon_cla"
              /><br/>
              <mu-text-field label="职业" hintText="您的目前职业" v-model='job'
                icon=":iconfont icon-navicon-gggl icon_cla"
              /><br/>
              <mu-text-field label="预计贷款金额" hintText="请输入您的预计金额" v-model='yuji'
                :errorText='err_yuji' icon=":iconfont icon-shouyi icon_cla"
              /><br/>
              <mu-raised-button label="确认提交" class="demo-step-button" @click="handleNext" primary backgroundColor="#FF5252"/>
              <mu-flat-button label="上一步" class="demo-step-button" @click="handlePrev"/>
            </mu-step-content>
          </mu-step>
          <mu-step>
            <mu-step-label>评估结果</mu-step-label>
            <mu-step-content>
              <p style="text-align: center;margin: 50px 0 50px;">预计可贷款额度:<br>
                <span style="color: #FF9100;font-size: 36px;font-weight: 600">{{yuji_money}}</span>
              </p>
              <p style="font-size: 15px;">可以提交您信息,我们将派专业人员与您联系.</p>
              <mu-raised-button 
                label="确认" class="demo-step-button" 
                @click="handleNext" 
                primary backgroundColor="#FF5252" fullWidth
              />
              <!-- <mu-flat-button label="上一步" class="demo-step-button" @click="handlePrev"/> -->
            </mu-step-content>
          </mu-step>
        </mu-stepper>
        <p v-if="finished">
          谢谢.我们将最短时间内与您联系.
        </p>
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
import api from '../../assets/api/api.js'
import Loading from '../base/loading/loading'
import { arrHasValue } from '../../common/js/util.js'
import mystorage from '../../common/js/storage.js'
export default {
  data() {
    return {
      activeStep: 0,  // UI

      loading: false,
      loading_title:'正在提交',
      fangchan_child:'1',
      chechan_child:'1',
      shebao_child:'1',
      gongjijin_child:'1',
      baoxian_child:'1',
      // 表单
      fangchan:false,
      chechan: false,
      shebao: false,
      gongjijin: false,
      baoxian: false,
      zichan: [],     // 资产汇总

      // 个人信息
      username:'',
      mobile:'',
      job:'',
      yuji:'',
      // 错误状态
      err_username:'',
      err_mobile:'',
      err_yuji:'',
    }
  },
  computed: {
      finished () {
        return this.activeStep > 2
      },
      yuji_money () {
        let base = 10000
        let a = this.fangchan
        let aa = this.fangchan_child
        let b = this.chechan
        let bb = this.chechan_child
        let c = this.shebao
        let cc = this.shebao_child
        let d = this.gongjijin
        let dd = this.gongjijin_child
        let e = this.baoxian
        let ee = this.baoxian_child


        return base + ( a * base * aa) + ( b * base * bb) + ( c * base * cc) + ( d * base * dd) + ( e * base * ee)
      }
  },
  created() {
  },
  methods: {
    add_val(arr) {
      if ( arrHasValue('房产',arr) ) {this.fangchan = true}else{this.fangchan = false}
      if ( arrHasValue('车产',arr) ) {this.chechan = true}else{this.chechan = false}
      if ( arrHasValue('社保',arr) ) {this.shebao = true}else{this.shebao = false}
      if ( arrHasValue('公积金',arr) ) {this.gongjijin = true}else{this.gongjijin = false}
      if ( arrHasValue('保险',arr) ) {this.baoxian = true}else{this.baoxian = false}
    },
    handleNext (val) {
      if(this.activeStep == 1) {
        if(this.username==''){this.err_username='用户名不能为空';return}
        else{this.err_username=''}
        if(this.mobile==''){this.err_mobile='手机不能为空';return}
        else{this.err_mobile=''}
        if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile)){this.err_mobile='请输入正确手机号';return}
        else{this.err_mobile=''}
        if(this.yuji==''){this.err_yuji='预计贷款不能为空';return}
        else{this.err_yuji=''}
        
        this._postData()
      }else{
        this.activeStep++ 
      }
    },
    handlePrev () {
      this.activeStep--
    },
    _postData() {
      // 过滤成功之后
      var isHouse = 0
      var isCar = 0
      var isSocialSecurity = 0
      var isFund = 0
      var isInsurance = 0
      if(this.fangchan) {isHouse = this.fangchan_child}
      if(this.chechan) {isCar = this.chechan_child}
      if(this.shebao) {isSocialSecurity = this.shebao_child}
      if(this.gongjijin) {isFund = this.gongjijin_child}
      if(this.baoxian) {isInsurance = this.baoxian_child}

      this.axios.post(api.daikuan,{
        submitFlag: 'add',        
        sessionID:mystorage.get('session_id'),
        name:this.username,//姓名
        mobile:this.mobile,//手机号
        occupation:this.job,//职业
        RMB:this.yuji,//借款额
        isHouse:isHouse,//是否有房    0是无，1是分期房产，2是全额房产
        isCar:isCar,//是否有车        0是无，1是分期车产，2是全额车产
        isSocialSecurity:isSocialSecurity,//是否有社保      0是无，1是五年以下，2是五年以上
        isFund:isSocialSecurity,//是否有公积金              0是无，1是五年以下，2是五年以上
        isInsurance:isFund,//是否有保险        0是无，1是五年以下，2是五年以上
      })
      .then(res => {
        this.loading = true
        if(res.data.result.state == 200) {
          setTimeout(()=> {
            this.loading = false
            this.activeStep++       
          },2000)
        }
      })
    },
    reset () {
      this.activeStep = 0
    },
  },
  components:{
    BScroll,
    Loading
  }
}
</script>

<style lang='less'>
@import url('../../assets/less/config.less');
.demo-vsteper-container{
  max-width: 380px;
  // max-height: 400px;
  margin: auto;
  .mu-raised-button-primary{
    background-color: #FF9100;
  }
}
.mu-step-content-inner{
  i{
    font-size: 24px;
    margin-right: 8px;
    color: #FF5252;
  }
}
.demo-step-button {
  margin-top: 12px;
  margin-right: 12px;
}
.loans{
  .box_wrapper{
    background: #fff;
    .p1{
      font-size: 14px;
      color: #FF9100;
    }
  }  
  .demo-checkbox {
    width: 85%;
  }
  .mu-radio{
    margin-left: 12px;
    margin-top: 8px;
  }
  .icon_cla{
    top:0 !important;
    left:6px;
    font-size: 36px;
    // line-height: 72px;
  }
}
.loading{
  position: fixed;
  top: 45%;
  left: 0;
  right: 0;
}
</style>
