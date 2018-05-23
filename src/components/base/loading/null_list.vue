<template>
   <div class="null_list">
    <p class="desc">{{title}}</p>
   </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>

<style scoped lang="less">

.null_list{
  width: 100%;
  text-align: center;
  .desc{
    display: inline-block;
    width: 100px;
    height: 20px;
    line-height: 20px;
    font-size: 15px;
    color: #666;
    position: relative;
    &::before{
      content:'';
      display: inline-block;
      width: 50px;
      height: 1px; 
      background: #888;
      position: absolute;
      left:-50px;
      top: 10px;
    };
    &::after{
      content: '';
      width: 50px;
      display: inline-block;
      height: 1px;
      background: #888;
      position: absolute;
      left:100px;
      top: 10px;
    };
  }
}
    
    
</style>
