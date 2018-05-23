var domain = 'http://www.fushuaxx.com';
// var domain = 'http://192.168.4.105:8082';

var api = {
	home 					: '/v1/wechat/pub/picenter/index.json',

	// 商品列表
	shoplist			: '/v1/wechat/pub/commodity/getcommodity.json',
	// 商品详情
	goods_detail	: '/v1/wechat/pub/commodity/getcommoditydetail.json',
	// 购物车
	add_car 			: '/v1/wechat/user/shoppingcar/joincar.json',
	delete_car 		: '/v1/wechat/user/shoppingcar/delcarcommodity.json',
	car_list			: '/v1/wechat/user/shoppingcar/carcommodity-list.json',
	shopping 			: '/v1/wechat/user/shoppingcar/addresscar.json',
	shopp 				: '/v1/wechat/user/order/placeorder.json',

	// 登录
	login 				: '/v1/wechat/pub/users/login_m.json',
	getcode				: '/v1/wechat/pub/message/mobilesendcode.json',// 注册获取验证码
	getcodes			: '/v1/wechat/pub/users/forgetpwd.json',// 找回密码获取验证码
	// sign					: '/v1/wechat/pub/users/register_m.json',
	sign					: '/v1/wechat/pub/users/register_mobile.json',
	forget				: '/v1/wechat/pub/users/forgetpassword.json',

	yaoqingma 		: '/v1/wechat/user/users/person-center.json',
	// 订单
	order_list		: '/v1/wechat/user/order/orderlist.json',
	order_detail	: '/v1/wechat/user/order/orderdetail.json',

	// 我的业绩
	yeji					: '/v1/wechat/user/integral/count.json',	
	team					: '/v1/wechat/user/users/team-list.json',// 我的团队	
	shouyi				: '/v1/wechat/user/integral/integral-list.json',// 收益 和 提现
	liushui				: '/v1/wechat/user/currentaccount/currentaccount-list.json',// 流水

	// 地址管理
	get_site_list	: '/v1/wechat/user/address/address.json', // 获取地址列表
	// 获取省市区数据
	get_sheng 		: '/v1/wechat/pub/provinces/getprovinces.json', // 省
	get_shi				: '/v1/wechat/pub/provinces/getcity.json', // 市
	get_qu 				: '/v1/wechat/pub/provinces/getzone.json', // 区	
	post_site 		: '/v1/wechat/user/address/add-address.json', // 地址提交

	// 银行卡管理
	get_bankList 	: '/v1/wechat/user/usersbankcard/usersBankCard-list.json',
	get_bank 			: '/v1/wechat/user/usersbankcard/edit.json',
	bank_get_code : '/v1/wechat/user/usersbankcard/sendcode.json',
	add_bank			: '/v1/wechat/user/usersbankcard/operate.json',
	// 提现
	get_mobey 		: '/v1/wechat/user/cashapply/cashapply.json',

	// 贷款
	daikuan				: '/v1/wechat/pub/loan/operate.json',

	//设置中心
	user_info     : '/v1/wechat/user/users/person-center.json',
	
	// 更新用户信息	
	updateUsers   : '/v1/wechat/user/users/operate_m.json',
	
	 // 注销
	 exit     		: '/v1/wechat/user/users/exit.json',

	 // 更换 取现列表
	 get_moneys		: '/v1/wechat/user/cashapply/cashapply-list.json',
	 // POS机列表
	 pos_list		: '/v1/wechat/user/distribution/getdistribution.json',
}




for(var i in api ) {
	api[i] = domain + api[i]
}

export default api;