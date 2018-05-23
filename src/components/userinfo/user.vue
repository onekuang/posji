<template>
<div class="user ab_full">
<BScroll class="box_wrapper">
<div>	
		<div class="top_box">
		  <img class="avatar" :src="headerImage" 
		  width=80 height=80 > <br>
		  <div class="text" @click="addPicFront">上传头像</div>
		  <input type="hidden" value="" name="logo"  >
		  <input type="file" @change="upload($event)" style="display: none;" ref="upload" id='upload' accept="image/*">
		</div>
	<div class="form_box">
		<mu-text-field label="昵称" hintText="请输入您的昵称" fullWidth type="name" 
            errorColor="orange"
            :errorText="err_name"
            v-model='name' /><br/>
		<mu-radio label="男" name="sex" nativeValue="0" v-model="sex" class="demo-radio"/>&nbsp;&nbsp;&nbsp;&nbsp;
		  <mu-radio label="女" name="sex" nativeValue="1" v-model="sex"  class="demo-radio"/> <br/>
		<mu-date-picker label="生日" :hintText="birthdays" autoOk fullWidth type="birthday" 
            errorColor="orange"
            :errorText="err_birthday"
            v-model='birthday' /><br/>
		
		<mu-text-field label="微信" hintText="请输入您的微信号" fullWidth type="weiXin" 
            errorColor="orange"
            :errorText="err_weiXin"
            v-model='weiXin'/><br/>
		<mu-text-field label="微博" hintText="请输入您的微博号" fullWidth type="weiBo" 
            errorColor="orange"
            :errorText="err_weiBo"
            v-model='weiBo'/><br/>
		<mu-text-field label="QQ" hintText="请输入您的QQ号" fullWidth type="qQ" 
            errorColor="orange"
            :errorText="err_qQ"
            v-model='qQ'/><br/>
		<div class="btn_box">
			<mu-raised-button label="保存" @click="updateUsers" class="demo-raised-button" secondary fullWidth />
		</div>
		
		<!-- <div class="loading" v-show='loading'>
        <Loading :title='loading_title'/>
      </div> -->
	</div>

</div></BScroll>
</div>
</template>

<script>
import BScroll from '../base/scroll/scroll'
import upavatar from "./upavatar.vue"
import api from '../../assets/api/api.js'
import mystorage from '../../common/js/storage.js'
import Exif from 'exif-js'  

export default {
	data() {
		return {
			loading_title:'正在更新个人信息',
			loading: false,
			logo:'',
			sex:'',
			name: '',
			birthday:'',
			birthdays:'',
			weiXin:'',
			weiBo:'',
			qQ:'',
			err_name: '',
			err_birthday:'',
			err_weiXin:'',
			err_weiBo:'',
			err_qQ:'',
			// shou
			headerImage:'',
			picValue:'' ,
			sta: 0,
		}
	},
	created() {
		this.logo = mystorage.get('logo')
		this.headerImage = mystorage.get('logo')
		this._getData()
	},
	methods:{
		_getData() {
			this.axios.get(api.user_info,{
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
				let _data = res.data.result.result
				this.sex = _data.sex
				this.birthdays = this._timee(_data.birthday)
				this.logo = _data.logo
				this.name = _data.nickName
				this.weiXin = _data.weiXin
				this.weiBo = _data.weiBo
				this.qQ = _data.qQ
			})
		},		
		_timee(input) {
			if(!input) {
				return '年/月/日'
			}
      var d = new Date(input)
      var year = d.getFullYear()
      var month = d.getMonth() + 1
      var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
      var hour = d.getHours()
      var minutes = d.getMinutes()
      var seconds = d.getSeconds()
      this.sta = 1
       return year + '-' + month + '-' + day 

		},
		updateUsers(){
			let logo =this.logo
			let name  = this.name
			let birthday    = this.birthday
			let weiXin  = this.weiXin
			let weiBo    = this.weiBo
			let qQ  = this.qQ
			let sex =this.sex
			// if (name == '') {
			// 	this.err_name = '名称不能为空'
			// 	return
			//   }else{
			// 	this.err_name = ''
			// }
			// if (birthday == '') {
			// 	this.err_birthday = '生日不能为空'
			// 	return
			//   }else{
			// 	this.err_birthday = ''
			// }
			// if (weiXin == '') {
			// 	this.err_weiXin = '微信不能为空'
			// 	return
			//   }else{
			// 	this.err_weiXin = ''
			// }
			// if (weiBo == '') {
			// 	this.err_weiBo = '微博不能为空'
			// 	return
			//   }else{
			// 	this.err_weiBo = ''
			// }
			// if (qQ == '') {
			// 	this.err_qQ = 'QQ不能为空'
			// 	return
			//   }else{
			// 	this.err_qQ = ''
			// }
			

			  this.loading = true;
			  this.axios.post(api.updateUsers,{
				sessionID:mystorage.get('session_id'),
				logo     :this.logo, //logo是上传后返回的图片地址
				sex       :this.sex, //sex用0和1表示  男为 0  女为1 
				nickName     :this.name,
				birthday  :this.birthday,
				weiBo     :this.weiBo,
				qQ  :this.qQ,
				submitFlag:'modify',
				weiXin     :this.weiXin
			  })
			   .then(res => {
				if(res.data.result.state == 200) {
				  // this.$toast(res.data.result.msg)
				  this.$toast('修改成功')
				  mystorage.set('login','true')
				  // mystorage.set('session_id',res.data.result.result.sessionID)
				  // mystorage.set('mobile',res.data.result.result.mobile)
				  mystorage.set('qQ',res.data.result.result.qQ)
				  mystorage.set('sex',res.data.result.result.sex)
				  mystorage.set('res',res.data.result.result.nickName)
				  mystorage.set('logo',res.data.result.result.logo)
				  this.loading = false;				  
				  this.$router.push('/userinfo')
				}else{
				  this.loading = false;
				  this.$toast("更新失败,更新", {
					durtaion: 200
				  });
				}
				})
			   .catch(res => {
				  	this.loading = false;
			   		this.$toast('网络错误')
			   })
		},
		addPicFront(e){
			e.preventDefault();
			this.$refs.upload.click();
			return false;
		},
	  upload (e) {  
	    let files = e.target.files || e.dataTransfer.files;  
	    if (!files.length) return;  
	    this.picValue = files[0];  
	    this.imgPreview(this.picValue);  
	  },  
	  imgPreview (file) {  
	    let self = this;  
	    let Orientation;  
	    //去获取拍照时的信息，解决拍出来的照片旋转问题  
	    Exif.getData(file, function(){  
	        Orientation = Exif.getTag(this, 'Orientation');  
	    });  
	    // 看支持不支持FileReader  
	    if (!file || !window.FileReader) return;  
	
	    if (/^image/.test(file.type)) {  
	        // 创建一个reader  
	        let reader = new FileReader();  
	        // 将图片2将转成 base64 格式  
	        reader.readAsDataURL(file);  
	        // 读取成功后的回调  
	        reader.onloadend = function () {  
	          let result = this.result;  
	          let img = new Image();  
	          img.src = result;  
	          //判断图片是否大于100K,是就直接上传，反之压缩图片  
	          if (this.result.length <= (100 * 1024)) {  
	            self.headerImage = this.result;  
	            self.postImg(self.headerImage);  
	          }else {  
	            img.onload = function () {  
	              let data = self.compress(img,Orientation);  
	              self.headerImage = data;  
	              self.postImg(self.headerImage);  
	            }  
	          }  
	        }   
	      }  
	    },  
	    postImg (img) {  
	      //这里写接口  
	      this.logo = img;
	    },  
	    rotateImg (img, direction,canvas) {  
	      //最小与最大旋转方向，图片旋转4次后回到原方向      
	      const min_step = 0;      
	      const max_step = 3;        
	      if (img == null)return;      
	      //img的高度和宽度不能在img元素隐藏后获取，否则会出错      
	      let height = img.height;      
	      let width = img.width;        
	      let step = 2;      
	      if (step == null) {      
	          step = min_step;      
	      }      
	      if (direction == 'right') {      
	          step++;      
	          //旋转到原位置，即超过最大值      
	          step > max_step && (step = min_step);      
	      } else {      
	          step--;      
	          step < min_step && (step = max_step);      
	      }       
	      //旋转角度以弧度值为参数      
	      let degree = step * 90 * Math.PI / 180;      
	      let ctx = canvas.getContext('2d');      
	      switch (step) {      
	        case 0:      
	            canvas.width = width;      
	            canvas.height = height;      
	            ctx.drawImage(img, 0, 0);      
	            break;      
	        case 1:      
	            canvas.width = height;      
	            canvas.height = width;      
	            ctx.rotate(degree);      
	            ctx.drawImage(img, 0, -height);      
	            break;      
	        case 2:      
	            canvas.width = width;      
	            canvas.height = height;      
	            ctx.rotate(degree);      
	            ctx.drawImage(img, -width, -height);      
	            break;      
	        case 3:      
	            canvas.width = height;      
	            canvas.height = width;      
	            ctx.rotate(degree);      
	            ctx.drawImage(img, -width, 0);      
	            break;  
	      }      
	  },  
	  compress(img,Orientation) {  
	    let canvas = document.createElement("canvas");  
	    let ctx = canvas.getContext('2d');  
	      //瓦片canvas  
	    let tCanvas = document.createElement("canvas");  
	    let tctx = tCanvas.getContext("2d");  
	    let initSize = img.src.length;  
	    let width = img.width;  
	    let height = img.height;  
	    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下  
	    let ratio;  
	    if ((ratio = width * height / 4000000) > 1) {  
	      console.log("大于400万像素")  
	      ratio = Math.sqrt(ratio);  
	      width /= ratio;  
	      height /= ratio;  
	    } else {  
	      ratio = 1;  
	    }  
	    canvas.width = width;  
	    canvas.height = height;  
			// 铺底色  
	    ctx.fillStyle = "#fff";  
	    ctx.fillRect(0, 0, canvas.width, canvas.height);  
	    //如果图片像素大于100万则使用瓦片绘制  
	    let count;  
	    if ((count = width * height / 1000000) > 1) {  
	      console.log("超过100W像素");  
	      count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片  
				// 计算每块瓦片的宽和高  
	      let nw = ~~(width / count);  
	      let nh = ~~(height / count);  
	      tCanvas.width = nw;  
	      tCanvas.height = nh;  
	      for (let i = 0; i < count; i++) {  
	        for (let j = 0; j < count; j++) {  
	          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);  
	          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);  
	        }  
	      }  
	    } else {  
	      ctx.drawImage(img, 0, 0, width, height);  
	    }  
	    //修复ios上传图片的时候 被旋转的问题  
	    if(Orientation != "" && Orientation != 1){  
	      switch(Orientation){  
	        case 6://需要顺时针（向左）90度旋转  
	            this.rotateImg(img,'left',canvas);  
	            break;  
	        case 8://需要逆时针（向右）90度旋转  
	            this.rotateImg(img,'right',canvas);  
	            break;  
	        case 3://需要180度旋转  
	            this.rotateImg(img,'right',canvas);//转两次  
	            this.rotateImg(img,'right',canvas);  
	            break;  
	      }  
	    }  
	    //进行最小压缩  
	    let ndata = canvas.toDataURL('image/jpeg', 0.1);  
	    console.log('压缩前：' + initSize);  
	    console.log('压缩后：' + ndata.length);  
	    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");  
	    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;  
	    return ndata;  
	  }, 
	},
	components:{
    BScroll,
    upavatar
  }
}

</script>

<style scoped lang="less">
@import url('../../assets/less/config.less');
.user{
	.top_box{
	  position: relative;
	  height: 200px;
	  background: @info_bg;
	  text-align: center;
	  .avatar{
	    border: 2px solid #ff6b01;
	    margin-top: 32px;
	    border-radius: 50%;
	    margin-bottom: 12px;	    
	  }
	  .text{
	    color: #fff;
	    display: inline-block;
	    height: 30px;
	    width: 100px;
	    font-size: 16px;
	    border: 1px solid #fff;
	    line-height: 30px;
	    border-radius: 8px;
	  }
	 }
	.form_box{
		background: #fff;
		padding: 8px;
	}
	.btn_box{
		text-align: center;
		margin: 20px 0;
		.mu-raised-button.mu-raised-button-inverse{
			border-radius: 6px;
		}
	}
}
</style>
