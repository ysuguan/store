<template>
	<view class="page-wrap">
		<view class="navi" ref="navi">
			<u-icon class="navi-icon" name="arrow-left" size="50" @tap="goBack"></u-icon>
			<view class="navi-text">填写订单</view>
		</view>
		<scroll-view class="scroll-view" :scroll-y="true" :style="scrollStyle">
			<view class="address" @tap="choseAddress">
				<view class="content">
					<view class="text">
						<view>江苏省苏州市</view>
						<view class="main">
							金枫路东创科技园xxx栋xx室
						</view>
						<view>
							<text>你你你</text>
							<text>11111111111</text>
						</view>
					</view>
					<u-icon name="arrow-right" color="gray" size="40"></u-icon>
				</view>
				<view class="zebra-line">
					<view class="zebra-box" v-for="item in 12"></view>
				</view>
			</view>
			
			<view class="order-list">
				<view class="shop-name">
					<view class="shop-img"></view>
					<text>大药房</text>
				</view>
				<view class="com-list" v-if="$store.state.readyOrder.length>1" @tap="showOrderList">
					<view class="list-img">
						<image class="list-item" v-for="item in 5" src="../../static/image/commodity.png" mode="aspectFit"></image>
					</view>
					<view class="number">
						共{{totalNumber}}件
						<u-icon name="arrow-right" color="gray" size="20"></u-icon>
					</view>
				</view>
				<view class="com-overview" v-else>
					<image class="com-overview-left" src="../../static/image/commodity.png" mode="aspectFit"></image>
					<view class="com-overview-right">
						<view class="com-overview-top">
							<view class="com-overview-desc">
								<text>{{$store.state.readyOrder[0].brand}}</text>
								<text>{{$store.state.readyOrder[0].name}}</text>
								<text>{{$store.state.readyOrder[0].type}}</text>
								<text>{{$store.state.readyOrder[0].specifications}}</text>
								<text>{{$store.state.readyOrder[0].desc}}</text>
							</view>
							<view class="com-overview-desc-mini">
								<text>{{$store.state.readyOrder[0].brand}}</text>
								<text>{{$store.state.readyOrder[0].name}}</text>
							</view>
						</view>
						<view class="com-overview-bottom">
							<view class="com-overview-price">
								<u-icon name="rmb" color="red" size="20"></u-icon>
								{{$store.state.readyOrder[0].price}}
							</view>
							<u-number-box v-model="$store.state.readyOrder[0].number" :size="20" :min="1"></u-number-box>
						</view>
					</view>
				</view>
			</view>
			
			<view class="order-count">
				<view class="total-price">
					<view class="left">商品金额</view>
					<view class="right">￥3333</view>
				</view>
				<view class="freight">
					<view class="left">运费（总重:{{totalWeight}}kg）</view>
					<view class="right">￥0</view>
				</view>
				<view class="minus">
					<view class="left">立减</view>
					<view class="right important-number">-￥67.00</view>
				</view>
				<view class="discount">
					<view class="left">首购礼金</view>
					<view class="right important-number">-￥20.00</view>
				</view>
				<view class="settlement">
					<view>
						合计：<text class="important-number">￥{{totalPrice}}</text>
					</view>
				</view>
			</view>
			
			<view class="mode-of-payment" @tap="chosePayMode">
				<view>支付方式</view>
				<view class="chose-mode">
					<view ref="modeOfPayment">货到付款</view>
					<u-icon name="arrow-right" size="30" color="gray"></u-icon>
				</view>
			</view>
		</scroll-view>
		<view class="bottom" ref="bottom">
			<view class="bottom-price">
				<u-icon name="rmb" color="red" size="30"></u-icon>
				{{totalPrice}}
			</view>
			<view class="bottom-btn">
				提交订单
			</view>
		</view>
		<yd-location-pop :comShow="locationPopShow" :address="$store.state.userInfo.address" @changeLocation="changeLocation" @popClose="closeLocationPop"></yd-location-pop>
		<order-list-pop :comShow="orderListPopShow" :orderList="$store.state.readyOrder" @popClose="closeOrderListPop"></order-list-pop>
		<pay-mode-pop :comShow="payModePopShow" @popClose="closePayModePop"></pay-mode-pop>
	</view>
</template>

<script>
	import {titleReset} from "../../common/mixin.js"
	import orderListPop from "./components/orderListPop.vue"
	import payModePop from "./components/payModePop.vue"
	
	export default {
		mixins: [titleReset],
		components: {
			'order-list-pop': orderListPop,
			'pay-mode-pop': payModePop,
		},
		data() {
			return {
				scrollHeight: 667,
				locationPopShow: false,
				orderListPopShow: false,
				payModePopShow: false,
			}
		},
		mounted() {
			this.scrollHeight = window.innerHeight - this.$refs.navi.$el.offsetHeight - this.$refs.bottom.$el.offsetHeight;
			console.log(this.$store.state.readyOrder);
		},
		computed: {
			scrollStyle() {
				return {
					height: this.scrollHeight+'px',
				}
			},
			totalWeight() {
				if(this.$store.state.readyOrder.length<=0){
					return 0;
				}
				return this.$store.state.readyOrder.reduce((res, item) => res + item.weight*item.number, 0);
			},
			totalNumber() {
				if(this.$store.state.readyOrder.length<=0){
					return 0;
				}
				return this.$store.state.readyOrder.reduce((res, item) => res + item.number, 0);
			},
			totalPrice() {
				if(this.$store.state.readyOrder.length<=0){
					return 0;
				}
				return this.$store.state.readyOrder.reduce((res, item) => res + item.price*item.number, 0);
			},
		},
		methods: {
			goBack() {
				uni.navigateBack({});
			},
			chosePayMode() {
				this.payModePopShow = true;
			},
			closePayModePop(args) {
				this.$refs.modeOfPayment.$el.innerHTML = args;
				this.payModePopShow = false;
			},
			choseAddress() {
				this.locationPopShow = true;
			},
			changeLocation(args) {
				console.log(args);
				this.locationPopShow = false;
			},
			closeLocationPop() {
				this.locationPopShow = false;
			},
			showOrderList() {
				this.orderListPopShow = true;
			},
			closeOrderListPop() {
				this.orderListPopShow = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
.page-wrap{
	background-color: $page-bgc;
	&::before{
		content: '';
		display: block;
		height: 80rpx;
	}
	&::after{
		content: '';
		display: block;
		height: 100rpx;
	}
	
	.navi{
		position: fixed;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80rpx;
		width: 100%;
		font-size: 38rpx;
		background-color: white;
		.navi-icon{
			position: absolute;
			top: 20rpx;
			left: 20rpx;
		}
	}
	.scroll-view{
		.address{
			display: flex;
			flex-wrap: wrap;
			height: 200rpx;
			background-color: white;
			border-radius: 20rpx;
			overflow: hidden;
			.content{
				height: 190rpx;
				width: 100%;
				display: flex;
				justify-content: space-between;
				padding: 0 30rpx;
				align-items: center;
				.text{
					font-size: 28rpx;
					line-height: 60rpx;
					.main{
						font-size: 35rpx;
						font-weight: bold;
					}
				}
			}
			.zebra-line{
				align-self: flex-end;
				display: flex;
				justify-content: space-between;
				background-color: white;
				height: 8rpx;
				width: 100%;
				.zebra-box{
					width: 50rpx;
					border-radius: 50% 10% 50% 10%;
				}
				.zebra-box:nth-child(2n+1){
					background-color: #FF4E85;
				}
				.zebra-box:nth-child(2n){
					background-color: #6548E6;
				}
			}
		}
	
		.order-list{
			height: 330rpx;
			width: 100%;
			margin-top: 25rpx;
			border-radius: 20rpx;
			background-color: white;
			padding: 40rpx 20rpx;
			.shop-name{
				display: flex;
				font-size: 20rpx;
				.shop-img{
					height: 40rpx;
					width: 40rpx;
					margin-right: 20rpx;
					background-image: url(../../static/image/favicon.svg);
					background-size: cover;
				}
			}
			.com-list{
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 180rpx;
				margin-top: 30rpx;

				.list-img{
					width: 80%;
					height: 180rpx;
					overflow-x: scroll;
					display: flex;
					flex-wrap: nowrap;
					.list-item{
						flex-shrink: 0;
						height: 180rpx;
						width: 180rpx;
						border-radius: 10rpx;
						margin-right: 20rpx;
					}
				}
				.number{
					font-weight: bold;
				}
			}
			.com-overview{
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 180rpx;
				width: 100%;
				margin-top: 30rpx;
				
				.com-overview-left{
					flex-shrink: 0;
					height: 180rpx;
					width: 180rpx;
				}
				.com-overview-right{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 500rpx;
					
					.com-overview-top{
						.com-overview-desc{
							font-size: 28rpx;
							font-weight: bold;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
						.com-overview-desc-mini{
							font-size: 20rpx;
							color: gray;
						}
						text{
							margin-right: 15rpx;
						}
					}
					.com-overview-bottom{
						display: flex;
						height: 80rpx;
						align-items: flex-end;
						justify-content: space-between;
						
						.com-overview-price{
							font-size: 35rpx;
							color: red;
						}
					}
				}
			}
		}
		
		.order-count{
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			height: 400rpx;
			margin-top: 30rpx;
			padding: 30rpx 20rpx;
			border-radius: 20rpx;
			background-color: white;
			font-size: 28rpx;
			.total-price, .freight, .minus, .discount{
				display: flex;
				justify-content: space-between;
				width: 100%;
				height: 60rpx;
				line-height: 60rpx;
			}
			.settlement{
				display: flex;
				justify-content: flex-end;
				width: 100%;
				height: 60rpx;
				line-height: 60rpx;
				border-top: 1rpx solid #DDDDDD;
			}
			.important-number{
				color: $basic-color;
				font-weight: bold;
			}
			
		}
	
		.mode-of-payment{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 150rpx;
			margin-top: 30rpx;
			padding: 30rpx 20rpx;
			background-color: white;
			border-radius: 20rpx;
			font-size: 28rpx;
			.chose-mode{
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 150rpx;
			}
		}
	}
	.bottom{
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		width: 100%;
		padding: 20rpx 30rpx;
		background-color: white;
		.bottom-price{
			color: red;
			font-size: 50rpx;
		}
		.bottom-btn{
			height: 60rpx;
			width: 200rpx;
			text-align: center;
			line-height: 60rpx;
			border-radius: 30rpx;
			color: white;
			background: linear-gradient(-45deg, red, red 30%, rgba($color: #FF5A4F, $alpha: .8));
		}
		
	}
}
</style>
