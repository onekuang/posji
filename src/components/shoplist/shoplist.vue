<template>
	 <div class="shoplist ab_full">
     <BScroll class="box_wrapper"  ref="scroll">
       <div>
         <div class="gridlist-demo-container">
          <mu-grid-list class="gridlist-demo">
            <mu-grid-tile v-for="(item, index) in list" :key="index" @click.native='goto_detail(item.id)'>
              <img :src="item.image" @load="loadImage"/>
              <span slot="title">{{item.title}}</span>
              <span slot="subTitle">by <b>{{item.author}}</b></span>
              <mu-icon-button icon=":iconfont icon-gouwuche" slot="action"/>
            </mu-grid-tile>
          </mu-grid-list>
        </div>
       </div>
     </BScroll>
   </div>
</template>

<script>
import BScroll from '../base/scroll/scroll'

export default {
  data() {
    return{

      list: [{
        id:1,
        image: 'http://www.muse-ui.org/images/breakfast.jpg',
        title: 'Breakfast',
        author: 'Myron'
      }, {
        id:2,
        image: 'http://www.muse-ui.org/images/burger.jpg',
        title: 'Burger',
        author: 'Linyu'
      }, {
        id:3,
        image: 'http://www.muse-ui.org/images/camera.jpg',
        title: 'Camera',
        author: 'ruolin'
      }, {
        id:4,
        image: 'http://www.muse-ui.org/images/hats.jpg',
        title: 'Hats',
        author: 'kakali'
      }, {
        id:5,
        image: 'http://www.muse-ui.org/images/honey.jpg',
        title: 'Honey',
        author: 'yuyang'
      }, {
        id:6,
        image: 'http://www.muse-ui.org/images/morning.jpg',
        title: 'Morning',
        author: 'mokayi'
      }, {
        id:7,
        image: 'http://www.muse-ui.org/images/vegetables.jpg',
        title: 'Vegetables',
        author: 'NUyyyyyyy'
      }, {
        id:8,
        image: 'http://www.muse-ui.org/images/water-plant.jpg',
        title: 'water',
        author: 'TDDyyyyyyy'
      }]

    }
  },
  methods:{
    goto_detail(id) {
      this.$router.push({
        path:`/shoplist/shopdetail/${id}`
      })
    },
    // 让图片加载完,在重新计算scroll的高度
    loadImage() {
      if (!this.checkLoaded) {
        this.checkLoaded = true
        this.$refs.scroll.refresh()
      }
    }
  },
  components:{
    BScroll
  }
}
</script>

<style lang="less">
@import url('../../assets/less/config.less');

.gridlist-demo-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.gridlist-demo{
  // width: 500px;
  // height: 450px;
  overflow-y: auto;
}


</style>
