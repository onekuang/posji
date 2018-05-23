<template>
	 <div class="shoplist ab_full">
     <BScroll class="box_wrapper"  ref="scroll">
       <div>
         <div class="gridlist-demo-container">
          <mu-grid-list class="gridlist-demo">
            <mu-grid-tile 
              class='test_box'
              v-for="(item, index) in list" 
              :key="index" 
              @click.native='goto_detail(item.toKenId)'
            >
              <img :src="'http://www.fushuaxx.com/' + item.logo" @load="loadImage" style="width: 100%;" />
              <span slot="title">{{item.brandName}}</span>
              <span slot="subTitle"><b>{{item.name}}</b></span>
              <mu-icon-button icon=":iconfont icon-gouwuche" slot="action"/>
            </mu-grid-tile>
          </mu-grid-list>
        </div>



       </div>
     </BScroll>
        <div class="loading" v-show='loading'>
          <Loading :title='loading_title'/>
        </div>
   </div>
</template>

<script>
import BScroll from '../base/scroll/scroll'
import api from '../../assets/api/api.js'
import Loading from '../base/loading/loading.vue'
import mystorage from '../../common/js/storage.js'
export default {
  data() {
    return{
      loading_title:'正在加载',
      loading: false,
      list: []
    }
  },
  created() {

    this._getData()
  },
  methods:{
    _getData() {
      this.loading = true
      this.axios.post(api.shoplist,{
        sessionID:mystorage.get('session_id'),
      }).then(res=>{
        if (res.data.state==200) {
          this.list = res.data.result.result
          this.loading = false
        }
      }).catch(res => {
        console.log(res)
        this.loading = false
      })
    },
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
    BScroll,
    Loading
  }
}
</script>

<style lang="less">
@import url('../../assets/less/config.less');

.gridlist-demo-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;  
  background: #fff;
  padding-bottom: 12px;
}

.gridlist-demo{
  // width: 500px;
  width: 100%;
  // height: 450px;
  overflow-y: auto;
}
.test_box{
  width: 100% !important;
  height: 200px !important;
  img{
    // width: 100%;
  }
}

</style>
