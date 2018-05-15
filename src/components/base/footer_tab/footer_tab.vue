<template>
<div class="footer_tab">
  <mu-paper>
    <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
      <mu-bottom-nav-item value="index" to='/' title="首页" icon=":iconfont icon-homefill"/>
      <mu-bottom-nav-item value="apply" to='/performance' title="我的业绩" icon=":iconfont icon-leijishouru"/>
      <mu-bottom-nav-item value="user" to='/userinfo' title="设置中心" icon=":iconfont icon-repairfill"/>
    </mu-bottom-nav>
  </mu-paper>
</div>
</template>

<script>
export default {
  data () {
    return {
      bottomNav: 'index'
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    }
  }
}
</script>
<style lang="less">

.footer_tab{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
}
.mu-bottom-nav-shift{
  background: #000 !important;
}
.mu-bottom-nav-shift .mu-bottom-item-active .mu-bottom-item-icon{
    font-size: 18px
}
</style>