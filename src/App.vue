<template>
  <div id="app">
    
      <transition :name="transitionName"> 
        <router-view/>
      </transition>

    <footer_tab/>
  </div>
</template>

<script>
import footer_tab from './components/base/footer_tab/footer_tab.vue'
export default {
  name: 'App',
  data() {
    return {
      transitionName: '',
    }
  },
  components: {
    footer_tab
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app{
  font-family: Arial, "Microsoft YaHei",Helvetica, sans-serif;
  font-size: 18px;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.loading{
  position: fixed;
  top: 45%;
  left: 0;
  right: 0;
}
</style>
