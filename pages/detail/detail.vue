<template>
	<view class="page-wrap">
		<scroll-view :scroll-y="true" :style="scrollH" @scroll="scrollPage" :scroll-top="pageScrollY">
			
			<!-- 导航栏 -->
			<view class="navi-bar" ref="naviBar">
				<view class="navi-init" ref="naviInit" :style="naviInitStyle" @tap="goBack">
					<u-icon name="arrow-left" size="50" color="white" class="navi-init-icon"></u-icon>
				</view>
				<view class="navi-dynamic" ref="naviDynamic" :style="naviDynamicStyle">
					<u-icon name="arrow-left" size="40" color="black" class="navi-dynamic-icon" @tap="goBack"></u-icon>
					<u-tabs class="navi-dynamic-tab" :list="naviTabs" :current='currentNaviTab' :is-scroll="false" @change="changeNavi"
					activeColor="red"></u-tabs>
				</view>
			</view>
			
			<!-- 商品 -->
			<view class="commodity" ref="commodity">
				<view class="swiper">
					<u-swiper :list="swiperList" height='600' :autoplay="false" mode="number" indicatorPos="bottomRight"></u-swiper>
				</view>
				<view class="intro">
					<view class="price">
						<u-icon name="rmb" size="10" color="red"></u-icon>
						<text>{{commodity.price}}</text>
					</view>
					<view class="title">
						<text>{{commodity.brand}}</text>
						<text>{{commodity.name}}</text>
						<text>{{commodity.type}}</text>
						<text>{{commodity.specificans}}</text>
						<text>{{commodity.desc}}</text>
					</view>
					<view class="func" v-if="commodity.func&&commodity.func.length>0">
						<text v-for="item in commodity.func">{{item}}</text>
					</view>
				</view>
				<view class="desc" v-if="commodity.intructions" @tap="showIntructions(true)">
					<view class="desc1">药品说明</view>
					<view class="desc2">
						<view class="up">功能主治</view>
						<view class="down">{{commodity.intructions.func}}</view>
					</view>
					<view class="desc3">
						<view class="up">用法用量</view>
						<view class="down">{{commodity.intructions.usage}}</view>
					</view>
					<view class="desc4">
						<image src="../../static/image/more-dot-fill.svg" mode="aspectFit"></image>
					</view>
				</view>
				<view class="order">
					<view class="type" @tap="showSelect">
						<view class="left">已选</view>
						<view class="middle">
							<text>{{commodity.brand}}</text>
							<text>{{commodity.name}}</text>
							<text>{{commodity.specificans}},</text>
							<text>{{commodity.weight}},</text>
							<text>{{commodity.number}}件</text>
						</view>
						<view class="right">
							<image src="../../static/image/more-dot-fill.svg" mode="aspectFit"></image>
						</view>
					</view>
					<view class="location" @tap="showLocationPop(true)">
						<view class="left">送至</view>
						<view class="middle">
							<u-icon name="map" color="red" size="20"></u-icon>
							<text v-if="$store.state.userInfo.address">{{$store.state.userInfo.address.all[$store.state.userInfo.address.chose]}}</text>
						</view>
						<view class="right">
							<image src="../../static/image/more-dot-fill.svg" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 评价 -->
			<!-- <view class="comments">
			</view> -->
			
			<!-- 详情 -->
			<view class="detail" ref="detail">
				<view class="title">
					<view class="tag"></view>
					<text class="title-text">详情</text>
				</view>
				<view class="params">
					<view class="mention">
						<u-icon name="file-text" size="20" color="black"></u-icon>
						<text class="title-text">规格参数</text>
					</view>
					<view class="params-table">
						<view class="tr">
							<view class="td-left"><text>商品编号</text></view>
							<view class="td-right"><text></text>23123189379279</view>
						</view>
						<view class="tr">
							<view class="td-main"><text>主体</text></view>
						</view>
						<view class="tr">
							<view class="td-left" width="28%"><text>生产企业</text></view>
							<view class="td-right"><text>东北制药集团沈阳第一制药有限公司</text></view>
						</view>
						<view class="tr">
							<view class="td-left" width="28%"><text>不良反应</text></view>
							<view class="td-right"><text>{{commodity.intructions.ADRs}}{{commodity.intructions.ADRs}}{{commodity.intructions.ADRs}}</text></view>
						</view>
						<view class="tr">
							<view class="td-main"><text>参数</text></view>
						</view>
						<view class="tr" v-for="item in 5">
							<view class="td-left" width="28%"><text>适用类型</text></view>
							<view class="td-right"><text>维生素缺乏症</text></view>
						</view>
						
					</view>
				</view>
				<view class="images">
					<view class="mention">
						<u-icon name="tags" size="20" color="black"></u-icon>
						<text class="title-text">商品介绍</text>
					</view>
					<view class="image-list">
						<image src="../../static/image/commodity-detail1.png" mode="widthFix" @load="resize"></image>
						<image src="../../static/image/commodity-detail2.png" mode="widthFix" @load="resize"></image>
					</view>
				</view>
			</view>
			
			<!-- 推荐 -->
			<view class="recommand" ref="recommand"  @tap='goDetail'>
				<view class="title">
					<view class="tag"></view>
					<text class="title-text">好物推荐</text>
				</view>
				<u-waterfall v-model="recommandList" class="recommand-list">
					<template v-slot:left="{leftList}">
						<view v-for="(item, index) in leftList" :key="index" class="recommand-item">
							<image class="recom-item-img"  src="../../static/image/commodity.png" mode="aspectFit" :data-index='item.id'></image>
							<view class="recom-item-desc">
								<text :data-index='item.id'>{{item.brand}}</text>
								<text :data-index='item.id'>{{item.type}}</text>
								<text :data-index='item.id'>{{item.desc}}</text>
							</view>
							<view class="recom-item-price" :data-index='item.id'>
								<u-icon name="rmb" size="12" :data-index='item.id'></u-icon>
								<text :data-index='item.id'>{{item.price}}</text>
							</view>
						</view>
					</template>
					<template v-slot:right="{rightList}">
						<view v-for="(item, index) in rightList" :key="index" class="recommand-item">
							<image class="recom-item-img"  src="../../static/image/commodity.png" mode="aspectFit" :data-index='item.id'></image>
							<view class="recom-item-desc">
								<text :data-index='item.id'>{{item.brand}}</text>
								<text :data-index='item.id'>{{item.type}}</text>
								<text :data-index='item.id'>{{item.desc}}</text>
							</view>
							<view class="recom-item-price" :data-index='item.id'>
								<u-icon name="rmb" size="12" :data-index='item.id'></u-icon>
								<text :data-index='item.id'>{{item.price}}</text>
							</view>
						</view>
					</template>
				</u-waterfall>
			</view>
		</scroll-view>
		<view class="tabbar">
			<view class="cart-info" @tap="goCart">
				<view class="cart-icon">
					<u-badge count="7" size="mini" type="error" :absolute="true" :offset="[-5, -10]" bgColor="white" color="red"></u-badge>
				</view>
				<view class="cart-text">购物车</view>
			</view>
			<view class="tabbar-btn">
				<view class="add-to-cart" @tap="showSelect">加入购物车</view>
				<view class="buy-now" @tap="buyNow">立即购买</view>
			</view>
		</view>
		<yd-select-popup :comShow="selectPopShow"  @addCart="changeType"></yd-select-popup>
		<intruction-pop :comShow="intructionPopShow" @popClose="showIntructions(false)"></intruction-pop>
		<yd-location-pop :comShow="locationPopShow" :address="$store.state.userInfo.address" 
		@popClose="showLocationPop(false)" @changeLocation="changeLocation"></yd-location-pop>
		<buy-now-pop :comShow="buyNowPopShow" @popClose='buyNowClose'></buy-now-pop>
	</view>
</template>

<script>
	import intructionPop from "./components/intructionPop.vue"
	// import locationPop from "./components/locationPop.vue"
	import buyNowPop from "./components/buyNowPop.vue"
	import {titleReset} from "../../common/mixin.js"
	
	export default {
		mixins:[titleReset],
		components:{
			'intruction-pop': intructionPop,
			// 'location-pop': locationPop,
			'buy-now-pop': buyNowPop,
		},
		data() {
			return {
				// scrollH: 667,
				scrollTop: 0,
				currentNaviTab: 0,
				naviOpacityMax: 100,
				pageScrollY:0,
				selectPopShow: false,
				intructionPopShow: false,
				locationPopShow: false,
				buyNowPopShow: false,
				recommandList: [],
				elementsRange: {
					navi: {top: 0, bottom: 0},
					commodity: {top: 0, bottom: 0},
					detail: {top: 0, bottom: 0},
					recommand: {top: 0, bottom: 0},
				},
				naviTabs: [
					{name: '商品'},
					// {name: '评价'},
					{name: '详情'},
					{name: '推荐'},
				],
				swiperList: [
					{"image": '../../static/image/swiper1.png'},
					{"image": '../../static/image/swiper2.png'},
				],
				commodity:{
					"id": 33333,
					"url": "nothing",
					"img": '../../../static/image/commodity.png',
					'brand':'007牌',
					"type": '甲乙丙',
					"name": '抗病毒口服液',
					"specificans": '18支',
					"desc": '风热感冒药流感咳嗽发热口液流鼻涕清热去痰',
					"func": ['清热解毒','增强免疫力','预防感冒'],
					"price": 225,
					"number": 1,
					"numMin": 1,
					"numMax": 10,
					"weight": '0.123',
					"intructions": {
						func: '用于感冒引起的头痛，发热，鼻塞，流涕，咽痛等',
						dateLimit: '2022年2月2日',
						usage: '开水冲服，一次1袋，一日3次。小儿减量或遵医嘱。',
						ADRs: '偶见皮疹、荨麻疹、药热及粒细胞减少；可见困倦、嗜睡、口渴、虚弱感；长期大量用药会导致肝肾功能异常。'
					},
				},
			}
		},
		created() {
			this.initTestData();
		},
		mounted() {
			document.title = '大药房';
			
			this.initElementsHeight();
		},
		computed:{
			scrollH() {
				return {height: window.innerHeight+'px'};
			},
			naviInitStyle() {
				return {
					opacity: (this.naviOpacityMax-this.pageScrollY+10)/this.naviOpacityMax,
					visibility: (this.naviOpacityMax-this.pageScrollY+10)/this.naviOpacityMax>0?'visible':'hidden',
				}
			},
			naviDynamicStyle() {
				return {
					opacity: (this.pageScrollY-10)/this.naviOpacityMax,
					visibility: (this.pageScrollY-10)/this.naviOpacityMax<0?'hidden': 'visible',
				}
			}
		},
		methods: {
			buyNowClose() {
				this.buyNowPopShow = false;
			},
			buyNow() {
				this.buyNowPopShow = true;
			},
			goCart() {
				uni.switchTab({
					url: '/pages/cart/cart',
				})
			},
			goDetail(e){
				if(e.target.dataset.index){
					uni.navigateTo({
						url: '/pages/detail/detail?comId='+e.target.dataset.index,
					})
				}
			},
			resize(e) {
				this.initElementsHeight();
			},
			//初始化页面各模块首尾位置，方便navibar点击跳转
			initElementsHeight(){
				this.elementsRange.navi.bottom = this.$refs.naviDynamic.$el.getBoundingClientRect().bottom;
				this.elementsRange.commodity.bottom = this.$refs.commodity.$el.getBoundingClientRect().bottom;
				
				this.elementsRange.detail.top = this.$refs.detail.$el.getBoundingClientRect().top - this.elementsRange.navi.bottom;
				this.elementsRange.detail.bottom = this.$refs.detail.$el.getBoundingClientRect().bottom - this.elementsRange.navi.bottom;
				
				this.elementsRange.recommand.top = this.$refs.recommand.$el.getBoundingClientRect().top - this.elementsRange.navi.bottom;
				this.elementsRange.recommand.bottom = this.$refs.recommand.$el.getBoundingClientRect().bottom - this.elementsRange.navi.bottom;
			},
			goBack() {
				uni.navigateBack({});
			},
			showIntructions(status) {
				this.intructionPopShow = status;
			},
			showSelect() {
				this.selectPopShow = true;
			},
			showLocationPop(status) {
				this.locationPopShow = status;
			},
			changeType(args) {
				this.selectPopShow = false;
				console.log(args);
			},
			changeLocation(args) {
				this.$store.commit('choseAddress', args.chose);
				this.locationPopShow = false;
			},
			scrollPage(e) {
				this.pageScrollY = e.detail.scrollTop;
				if(this.pageScrollY<this.elementsRange.detail.top){
					this.currentNaviTab = 0;
				}else if(this.pageScrollY>=this.elementsRange.detail.top&&this.pageScrollY<this.elementsRange.detail.bottom){
					this.currentNaviTab = 1;
				}else if(this.pageScrollY>=this.elementsRange.detail.bottom){
					this.currentNaviTab = 2;
				}
			},
			initTestData() {
				for(let i=0; i<21; i++){
					this.recommandList.push(this.commodity);
				}
			},
			changeNavi(e) {
				this.currentNaviTab = e;
				if(e==0){
					this.pageScrollY = this.elementsRange.commodity.top;
				}else if(e==1){
					this.pageScrollY = this.elementsRange.detail.top;
				}else{
					this.pageScrollY = this.elementsRange.recommand.top;
				}
				console.log(this.pageScrollY);
			}
		}
	}
</script>

<style lang="scss" scoped>
$table-bgc: #E4E7ED;
.page-wrap{
	background-color: $page-bgc;
	height: 100vh;
	overflow: hidden;
}

.tag{
	height: 40rpx;
	width: 8rpx;
	background: linear-gradient(to bottom, red, #EFC8D5 70%, #EFC8D5);
}
.title-text{
	margin-left: 20rpx;
}

.tabbar{
	position: fixed;
	bottom: 0;
	display: flex;
	justify-content: space-between;
	background-color: white;
	height: $tabbarHeight;
	width: 100%;
	.cart-info{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 20rpx;
		flex-wrap: wrap;
		width: 80rpx;
		height: $tabbarHeight;
		.cart-icon{
			position: relative;
			height: 50rpx;
			width: 50rpx;
			background-image: url(../../static/image/cart-detail.svg);
			background-size: cover;
			margin-bottom: 5rpx;
			/deep/.u-badge{
				border: 1rpx solid red;
			}
		}
		.cart-text{
			font-size: 20rpx;
		}
	}
	.tabbar-btn{
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 450rpx;
		height: $tabbarHeight;
		font-size: 28rpx;
		font-weight: bold;
		color: white;
		
		.add-to-cart{
			width: 220rpx;
			height: 80rpx;
			border-radius: 40rpx;
			text-align: center;
			line-height: 80rpx;
			background: linear-gradient(to right, red, red 30%, $linear-color-end);
		}
		.buy-now{
			width: 200rpx;
			height: 80rpx;
			border-radius: 40rpx;
			text-align: center;
			line-height: 80rpx;
			background: linear-gradient(to right, orange, orange 30%, #FFCC6B);
		}
	}
}

.navi-bar{
	.navi-init{
		position: fixed;
		top: 10rpx;
		left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60rpx;
		width: 60rpx;
		z-index: 999;
		background-color: #C8C9CC;
		border-radius: 30rpx;
		.navi-init-icon{
			flex-grow: 1;
		}
	}
	.navi-dynamic{
		position: fixed;
		top: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 80rpx;
		z-index: 999;
		background-color: white;
		.navi-dynamic-icon{
			width: 10%;
			margin-left: 20rpx;
		}
		.navi-dynamic-tab{
			width: 80%;
		}
	}
}

.commodity{
	.intro{
		padding: 20rpx 20rpx 10rpx 20rpx;
		background-color: white;
		border-radius: 20rpx;
		.price{
			color: $basic-color;
			font-size: 40rpx;
		}
		.title{
			padding: 10rpx 0;
			font-size: 30rpx;
			font-weight: bold;
			text{
				margin-right: 20rpx;
			}
		}
		.func{
			font-size: 20rpx;
			padding: 10rpx 0;
			text{
				padding-left: 15rpx;
			}
		}
	}
	
	.desc{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
		padding: 30rpx;
		background-color: white;
		border-radius: 20rpx;
		
		.desc1{
			flex-basis: 80rpx;
			flex-grow: 0;
			flex-shrink: 0;
			font-size: 30rpx;
			font-weight: bold;
		}
		.desc2, .desc3{
			width:260rpx;
			
			.up{
				font-size: 25rpx;
				font-weight: bold;
				text-align: center;
				margin-bottom: 10rpx;
			}
			.down{
				padding: 0 15rpx;
				font-size: 15rpx;
				color: gray;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp:2;
				overflow: hidden;
				white-space:pre-wrap;
			}
		}
		.desc2{
			.down{
				border-right: 1px solid #C8C9CC;
			}
		}
		
		.desc4{
			height: 40rpx;
			width: 50rpx;
			image{
				height: 100%;
				width: 100%;
			}
		}
	}

	.order{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 20rpx;
		background-color: white;
		border-radius: 20rpx;
		.type, .location{
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			.left{
				width: 80rpx;
				font-size: 25rpx;
				font-weight: bold;
				margin-left: 30rpx;
			}
			.middle{
				padding: 30rpx 10rpx;
				width: 550rpx;
				height: 100rpx;
				
				overflow:hidden;
				text-overflow:ellipsis; 
				white-space: nowrap;
			}
			.right{
				height: 100rpx;
				width: 40rpx;
				
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.type{
			.middle, .right{
				border-bottom: 1px solid #ECF5FF;
			}
		}
	}
}

.detail{
	padding: 30rpx 20rpx;
	margin-top: 20rpx;
	background-color: white;
	.title{
		display: flex;
	}
	.params{
		.mention{
			padding: 20rpx 0;
		}
		.params-table{
			border-top: 1px solid $table-bgc;
			border-left: 1px solid $table-bgc;
			border-right: 1px solid $table-bgc;
			.tr{
				display: flex;
				flex-wrap: nowrap;
				width: 100%;
				font-size: 28rpx;
				border-bottom: 1px solid $table-bgc;
				box-sizing: border-box;
				.td-left{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 30%;
					padding: 15rpx 20rpx;
					color: gray;
					border-right: 1px solid $table-bgc;
					box-sizing: border-box;
				}
				.td-main{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 30%;
					font-weight: bold;
					padding: 15rpx 20rpx;
				}
				.td-right{
					display: flex;
					justify-content: start;
					align-items: center;
					width: 70%;
					padding: 15rpx 20rpx;
					color: gray;
					box-sizing: border-box;
				}
			}
		}
	}
	
	.images{
		.mention{
			padding: 30rpx 0;
		}
		.image-list{
			width: 100%;
			image{
				width: 100%;
			}
		}
	}
}

.recommand{
	margin-top: 20rpx;
	padding: 0 20rpx;
	.title{
		display: flex;
		align-items: center;
		height: 80rpx;
		padding-left: 20rpx;
		font-weight: bold;
		border-radius: 10rpx;
		background-color: white;
	}
	
	.recommand-list{
		.recommand-item{
			background-color: white;
			margin: 10rpx;
			padding: 20rpx;
			border-radius: 20rpx;
			.recom-item-img{
				width: 100%;
				height: 300rpx;
			}
			.recom-item-desc{
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp:2;
				overflow: hidden;
				white-space:pre-wrap;
				
				text{
					margin-right: 10rpx;
				}
			}
			.recom-item-price{
				color: red;
				font-size: 35rpx;
			}
		}
	}
}
</style>
