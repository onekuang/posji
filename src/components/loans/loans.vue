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
              <mu-checkbox label="房产" class="demo-checkbox" nativeValue="房产" v-model='zichan'  labelLeft/> 
              <br/><br/>
              <mu-checkbox label="车产" class="demo-checkbox" nativeValue="车产" v-model='zichan'  labelLeft/> 
              <br/><br/>
              <mu-checkbox label="企业" class="demo-checkbox" nativeValue="企业" v-model='zichan'  labelLeft/> 
              <br/><br/>
              <mu-checkbox label="社保" class="demo-checkbox" nativeValue="社保" v-model='zichan'  labelLeft/> 
              <br/><br/>
              <mu-checkbox label="公积金" class="demo-checkbox"  nativeValue="公积金" v-model='zichan' labelLeft/> 
              <br/><br/>
              <mu-checkbox label="保险" class="demo-checkbox" nativeValue="保险" v-model='zichan'  labelLeft/> 
              <br/><br/>
              <mu-raised-button label="下一步" class="demo-step-button" @click="handleNext" primary/>
            </mu-step-content>
          </mu-step>
          <mu-step>
            <mu-step-label>
              个人信息
            </mu-step-label>
            <mu-step-content>
              <p class="p1">请填写您的个人信息</p><br/>
              <mu-text-field label="姓名" hintText="提示文字"/><br/>
              <mu-text-field label="手机" hintText="提示文字"/><br/>
              <mu-text-field label="职业" hintText="提示文字"/><br/>
              <mu-raised-button label="下一步" class="demo-step-button" @click="handleNext" primary/>
              <mu-flat-button label="上一步" class="demo-step-button" @click="handlePrev"/>
            </mu-step-content>
          </mu-step>
          <mu-step>
            <mu-step-label>
              评估结果
            </mu-step-label>
            <mu-step-content>
              <p style="text-align: center;margin: 50px 0 50px;">预计评估结果:<br>
                <span style="color: #FF9100;font-size: 36px;font-weight: 600">100,000</span>
              </p>
              <p style="font-size: 15px;">可以提交您信息,我们将派专业人员与您联系.</p>
              <mu-raised-button label="提交" class="demo-step-button" @click="handleNext" primary/>
              <!-- <mu-flat-button label="上一步" class="demo-step-button" @click="handlePrev"/> -->
            </mu-step-content>
          </mu-step>
        </mu-stepper>
        <p v-if="finished">
          谢谢.我们将最短时间内与您联系.
        </p>
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
      activeStep: 0,  // UI
      // 表单
      zichan: [],     // 资产
    }
  },
  computed: {
      finished () {
        return this.activeStep > 2
      }
  },
  methods: {
    handleNext () {
      this.activeStep++
      console.log(this.zichan)
      // this._bs_scroll_refresh()
    },
    handlePrev () {
      this.activeStep--
      // this._bs_scroll_refresh()
    },
    reset () {
      this.activeStep = 0
      // this._bs_scroll_refresh()
    },
    _bs_scroll_refresh() {
      // setTimeout(()=>{this.$refs.scroll.refresh()},20)
    },
  },
  components:{
    BScroll
  }
}
</script>

<style lang='less' scoped>
@import url('../../assets/less/config.less');
.demo-vsteper-container{
  max-width: 380px;
  // max-height: 400px;
  margin: auto;
  .mu-raised-button-primary{
    background-color: #FF9100;
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
    width: 100%;
  }
}
</style>
