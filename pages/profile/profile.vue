<template>
	<view class="page">
		<view class="navi">
			<image class="navi-logo" src="../../static/image/profile.png" mode="aspectFit"></image>
			<view class="navi-text">我的</view>
		</view>
		<view class="content">
			<view class="head">
				<image class="head-logo" src="../../static/image/profile.png" mode="aspectFit"></image>
				<view class="head-desc">
					我的名字
				</view>
			</view>
			
			<view class="order">
				<view class="order-to-pay">
					<u-icon name="red-packet" size="50" color="black"></u-icon>
					<view class="order-text">待付款</view>
				</view>
				
				<view class="order-to-receive">
					<u-icon name="car" size="50" color="#333333"></u-icon>
					<view class="order-text">待收货</view>
				</view>
				
				<view class="order-refund">
					<u-icon name="rmb" size="50" color="black"></u-icon>
					<view class="order-text">退款/售后</view>
				</view>
				
				<view class="order-done">
					<u-icon name="gift" size="50" color="black"></u-icon>
					<view class="order-text">已签收</view>
				</view>
				
				<view class="order-all">
					<u-icon name="order" size="50" color="red"></u-icon>
					<view class="order-text">我的订单</view>
				</view>
			</view>
			
			<view class="address">
				<u-icon class="left" name="map" color="red" size="40"></u-icon>
				<view class="right">
					<view>江苏省苏州市</view>
					<view class="detail">
						<text>{{$store.state.userInfo.address.all[$store.state.userInfo.address.chose]}}</text>
					</view>
					<view>
						<text>收件人</text>
						<text>132131313123</text>
					</view>
				</view>
			</view>
			
			<view class="recommand"></view>
		</view>
	</view>
</template>

<script>
	import {titleReset} from "../../common/mixin.js"
	
	export default {
		mixins:[titleReset],
		data() {
			return {
				
			}
		},
		mounted() {
			document.title = '大药房';
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.page{
	background-color: $page-bgc;
	
	&::before{
		content: '';
		display: block;
		height: 100rpx;
		width: 100%;
	}
	
	.navi{
		visibility: hidden;
		position: fixed;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100rpx;
		width: 100%;
		background-color: white;
		font-size: 35rpx;
		.navi-logo{
			position: absolute;
			left: 20rpx;
			top: 20rpx;
			height: 60rpx;
			width: 60rpx;
			border-radius: 30rpx;
			background-color: red;
		}
	}
}

.content{
	padding: 0 20rpx;
	.head{
		display: flex;
		height: 100rpx;
		.head-logo{
			height: 100rpx;
			width: 100rpx;
			background-color: red;
			border-radius: 50rpx;
		}
		.head-desc{
			font-size: 30rpx;
			font-weight: bold;
			margin-left: 20rpx;
			margin-top: 10rpx;
		}
	}

	.order{
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 200rpx;
		margin-top: 0rpx;
		background-color: white;
		border-radius: 20rpx;
		.order-to-pay, .order-to-receive, .order-done, .order-refund, .order-all{
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			height: 150rpx;
			
			.order-text{
				font-size: 28rpx;
				height: 30rpx;
				line-height: 30rpx;
			}
		}
	}
}
</style>
