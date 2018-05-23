import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'

import Login from '@/components/login/login'
import Sign from '@/components/login/sign_up'
import ForgetPass from '@/components/login/forget_pass'
import ChangePhone from '@/components/login/changephone'

import ShopList from '@/components/shoplist/shoplist'
import ShopDetail from '@/components/shopdetail/shopdetail'
import ShopCar from '@/components/shopcar/shopcar'
import ShopSite from '@/components/shopcar/shopsite'
import Shopping from '@/components/shopcar/shopping'


import UserInfo from '@/components/userinfo/userinfo'
import Usershow from '@/components/userinfo/usershow'
import User from '@/components/userinfo/user'
import Performance from '@/components/performance/performance'
import OrderList from '@/components/orderlist/orderlist'
import Order from '@/components/order/order'
import Generalize from '@/components/generalize/generalize'
import Loans from '@/components/loans/loans'
import Bank from '@/components/bank/bank'
import Addbank from '@/components/bank/addbank'
import Tean from '@/components/tean/tean'
import Poslist from '@/components/tean/pos_list'
import Earnings from '@/components/earnings/earnings'
import Running from '@/components/earnings/liushui' //流水
import Withdraw from '@/components/earnings/withdraw'
import Site from '@/components/site/site'
import AddSite from '@/components/site/addsite'
import About from '@/components/about/about'
import GetMoney from '@/components/getmoney/getmoney'

import Upavatar from '@/components/userinfo/upavatar'


Vue.use(Router)

export default new Router({
  routes: [
    { path: '*', component: Home },
    { path: '/', meta:{index:1},component: Home },
    { path: '/home',meta:{index:1},component: Home },
    { path: '/performance',meta:{index:2}, component: Performance },
    { path: '/userinfo',meta:{index:4}, component: UserInfo },
    { path: '/usershow',meta:{index:6}, component: Usershow },
    { path: '/user',meta:{index:10}, component: User },
    { path: '/upavatar',meta:{index:10}, component: Upavatar },
    // 登录注册更改
    { path: '/login',meta:{index:0}, component: Login },
    { path: '/sign',meta:{index:7}, component: Sign },
    { path: '/forget_pass',meta:{index:7}, component: ForgetPass },
    { path: '/changephone',meta:{index:7}, component: ChangePhone },
    // 购物车
    { path: '/shoplist',meta:{index:6}, component: ShopList },
    { path: '/shoplist/shopdetail/:id',meta:{index:8}, component: ShopDetail },
    { path: '/shopcar',meta:{index:10}, component: ShopCar },
    { path: '/shopsite',name:'shopsite',meta:{index:11}, component: ShopSite },
    { path: '/shopping',name:'shopping',meta:{index:12}, component: Shopping },
    // 订单
    { path: '/orderlist', meta:{index:8},component: OrderList },
    { path: '/order/:id', meta:{index:10},component: Order },

    { path: '/generalize',meta:{index:10}, component: Generalize },
    { path: '/loans', meta:{index:6},component: Loans },
    // 银行卡
    { path: '/bank', meta:{index:6},component: Bank },
    { path: '/addbank',meta:{index:10}, component: Addbank },

    { path: '/tean',meta:{index:10}, component: Tean },
    { path: '/poslist',meta:{index:10}, component: Poslist },
    { path: '/earnings',meta:{index:10}, component: Earnings },
    { path: '/running',meta:{index:10}, component: Running },
    { path: '/withdraw',meta:{index:10}, component: Withdraw },
    { path: '/site', meta:{index:8},component: Site },
    { path: '/addsite', meta:{index:10},component: AddSite },
    { path: '/aboutus',meta:{index:10},component: About },
    { path: '/getmoney',meta:{index:8}, component: GetMoney },
  ]
})
