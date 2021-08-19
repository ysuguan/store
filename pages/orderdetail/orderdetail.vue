<template>
	<view class="page">
		<view class="navi-bar">
			<u-icon class="icon" name="arrow-left" size="50" color="black" @tap="goBack"></u-icon>
			<view class="text" :style="naviTextStyle">订单详情</view>
		</view>
		<scroll-view class="content" scroll-y="true" @scroll="scrollPage">
			<view class="head" ref="head">
				<view class="icon">
					<u-icon name="checkbox-mark" size="30" color="black"></u-icon>
				</view>
				<view class="text">已完成</view>
			</view>
			<view class="status">
				<u-icon class="left" name="car" size="40" color="black"></u-icon>
				<view class="middle">
					<view class="up">已签收</view>
					<view class="down">您的订单已由顺丰快递送达。如您未收到商品，可联系快递员：王二，电话：11111111111111</view>
				</view>
				<view class="right"></view>
			</view>
			<view class="address">
				<u-icon class="left" name="map" size="40" color="black"></u-icon>
				<view class="middle">
					<view class="up">
						<text>用户名</text>
						<text>123789773432</text>
					</view>
					<view class="down">江苏省苏州市金枫路东创科技园9999座8888室</view>
				</view>
				<view class="right"></view>
			</view>
			<view class="com-list">
				<view class="com-item" v-for="item in 5">
					<view class="com-info">
						<image class="com-item-img" src="../../static/image/commodity.png" mode="aspectFit"></image>
						<view class="com-item-text">
							<view class="desc">
								<view class="desc-big">
									<text>999</text>
									<text>感冒灵</text>
									<text>18g/袋</text>
									<text>止咳退烧专治各种感冒引起的不适症状</text>
								</view>
								<view class="desc-mini">
									<text>数量：3</text>
									<text>类别：精装版</text>
								</view>
							</view>
							<view class="price">
								￥9.9
							</view>
						</view>
					</view>
					<view class="com-action">
						<view class="buy-again" >加入购物车</view>
					</view>
				</view>
			</view>
			
			<view class="order-info">
				<view class="tr">
					<view class="td-left">订单编号</view>
					<view class="td-right">13123213123123213</view>
				</view>
				<view class="tr">
					<view class="td-left">下单时间</view>
					<view class="td-right">2021-01-01 00:36:22</view>
				</view>
				<view class="tr">
					<view class="td-left">支付方式</view>
					<view class="td-right">货到付款</view>
				</view>
				<view class="tr">
					<view class="td-left">支付时间</view>
					<view class="td-right">2021-01-01 00:36:22</view>
				</view>
				<view class="tr">
					<view class="td-left">期望配送日期</view>
					<view class="td-right">2021-01-01 00:36:22</view>
				</view>
			</view>
			
			<view class="pay-info">
				<view class="tr">
					<view class="td-left">商品总额</view>
					<view class="td-right">￥1888</view>
				</view>
				<view class="tr">
					<view class="td-left">运费</view>
					<view class="td-right">+ ￥0</view>
				</view>
				<view class="tr">
					<view class="td-left">优惠</view>
					<view class="td-right">-￥200</view>
				</view>
				<view class="tr">
					<view class="td-left"></view>
					<view class="td-right">
						实付款:
						<u-icon name="rmb" size="10" color="red"></u-icon>
						<text class="price">1699</text>
					</view>
				</view>
			</view>
			
			<view class="recommand">
				<yd-recommand-for-you :comList="$store.state.orderList[0].comList"></yd-recommand-for-you>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {titleReset} from "../../common/mixin.js"
	
	export default {
		mixins:[titleReset],
		data() {
			return {
				scrollY: 0,
				headH: 0
			}
		},
		mounted() {
			document.title = '大药房';
			this.headH = this.$refs.head.$el.offsetHeight;
		},
		computed: {
			naviTextStyle() {
				return {
					visibility: this.scrollY>this.headH+10?'visible':'hidden',
				}
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({})
			},
			scrollPage(e) {
				this.scrollY = e.detail.scrollTop;
			}
		}
	}
</script>

<style lang="scss" scoped>
$navi-heigh: 100rpx;

.page{
	background-color: $page-bgc;
	height: 100vh;
	width: 100vw;
	
	.navi-bar{
		position: fixed;
		height: $navi-heigh;
		width: 100vw;
		line-height: $navi-heigh;
		text-align: center;
		background-color: transparent;
		z-index: 999;
		.icon{
			position: absolute;
			top: 20rpx;
			left: 20rpx;
		}
		.text{
			color: black;
			font-size: 35rpx;
			background-color: white;
		}
	}
	.content{
		height: 100vh;
		
		.head{
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			&::before{
				content: '';
				display: block;
				height: $navi-heigh;
				width:100%;
			}
			.icon{
				display: flex;
				align-items: center;
				justify-content: center;
				height: 36rpx;
				width: 36rpx;
				margin-right: 10rpx;
				border-radius: 18rpx;
				border: 5rpx solid black;
			}
			.text{
				font-size: 40rpx;
				font-weight: bold;
			}
		}
		.status, .address{
			display: flex;
			align-items: flex-start;
			height: 260rpx;
			margin-top: 30rpx;
			padding: 30rpx;
			background-color: white;
			border-radius: 20rpx;
			.left, .right{
				width: 10%;
			}
			.middle{
				width: 80%;
				
				.down{
					margin-top: 20rpx;
					font-size: 25rpx;
					color: gray;
				}
			}
		}
		.status{
			.middle{
				.up{
					height: 50rpx;
					line-height: 50rpx;
					font-size: 35rpx;
				}
			}
		}
		
	}
}

.com-list{
	padding: 30rpx;
	background-color: white;
	margin-top: 30rpx;
	border-radius: 20rpx;
	.com-item{
		padding: 20rpx 0;
		border-bottom: 1rpx solid $page-bgc;
		.com-info{
			display: flex;
			justify-content: space-between;
			height: 180rpx;
			.com-item-img{
				height: 180rpx;
				width: 180rpx;
				border-radius: 20rpx;
			}
			.com-item-text{
				display: flex;
				flex-wrap: wrap;
				flex-direction: column;
				justify-content: space-between;
				height: 180rpx;
				width: 480rpx;
				font-size: 28rpx;
				.desc{
					width: 100%;
					.desc-big{
						width: 100%;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
					.desc-mini{
						font-size: 20rpx;
						color: gray;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
				}
				.price{
					font-weight: bold;
					font-size: 28rpx;
				}
				
			}
		}
		.com-action{
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: center;
			height: 60rpx;
			width: 100%;
			.buy-again{
				height: 60rpx;
				line-height: 60rpx;
				padding: 0 30rpx;
				color: black;
				border: 1rpx solid #CCCCCC;
				border-radius: 30rpx;
			}
		}
	}
}

.order-info{
	margin-top: 30rpx;
	padding: 30rpx;
	background-color: white;
	border-radius: 20rpx;
	.tr{
		display: flex;
		margin-bottom: 20rpx;
		.td-left{
			font-size: 28rpx;
			flex-shrink: 0;
		}
		.td-right{
			margin-left: 50rpx;
			font-size: 26rpx;
			font-weight: bold;
			flex-shrink: 1;
		}
	}
}

.pay-info{
	margin-top: 30rpx;
	padding: 30rpx;
	background-color: white;
	border-radius: 20rpx;
	
	.tr{
		display: flex;
		justify-content: space-between;
		padding: 10rpx 0;
		color: black;
		.td-left{
			font-size: 28rpx;
		}
		.td-right{
			font-size: 26rpx;
			
			.price{
				color: red;
				font-size: 30rpx;
				font-weight: bold;
			}
		}
	}
}
</style>
