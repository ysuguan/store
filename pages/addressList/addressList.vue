<template>
	<view class="page">
		<view class="navi" ref="navi">
			<u-icon class="navi-icon" name="arrow-left" size="60" @tap="goBack"></u-icon>
			地址管理
		</view>
		
		<scroll-view scroll-y="true" class="addr-list">
			<view class="addr-item">
				<view class="text">
					<view class="area">
						<u-tag text="默认" type="error" mode="dark" size="28"></u-tag>
						江苏省苏州市xxxx区金枫路
					</view>
					<view class="detail">
						东创科技园99999栋88888号
					</view>
					<view class="info">
						<text class="receiver">收件人</text>
						<text>1231312313231</text>
					</view>
				</view>
				<u-icon class="icon" name="edit-pen" color="black" size="40" @tap="goAddrModify"></u-icon>
			</view>
			<view class="addr-item">
				<view class="text">
					<view class="area">
						<!-- <u-tag text="默认" type="error" mode="dark" size="28"></u-tag> -->
						江苏省苏州市xxxx区金枫路
					</view>
					<view class="detail">
						东创科技园99999栋88888号
					</view>
					<view class="info">
						<text class="receiver">收件人</text>
						<text>1231312313231</text>
					</view>
				</view>
				<u-icon class="icon" name="edit-pen" color="black" size="40" @tap="goAddrModify"></u-icon>
			</view>
			
		</scroll-view>
		
		<view class="add-new">
			<view class="add-btn" @tap="goAddrModify">
				<u-icon name="plus" size="30"></u-icon>
				新增收货地址
			</view>
		</view>
	</view>
</template>

<script>
	import {titleReset} from "../../common/mixin.js"
	
	export default {
		mixins: [titleReset],
		data() {
			return {
				
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({})
			},
			goAddrModify() {
				uni.navigateTo({
					url: '/pages/addressModify/addressModify',
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.page{
	background-color: $page-bgc;
	height: 100vh;
	width: 100vw;
	padding: 0 30rpx;
}

.navi{
	height: 88rpx;
	line-height: 88rpx;
	text-align: center;
	font-size: 40rpx;
	
	.navi-icon{
		position: fixed;
		top: 20rpx;
		left: 30rpx;
	}
}

.addr-list{
	height: calc(100vh - 208rpx);
	
	.addr-item{
		display: flex;
		height: 200rpx;
		width: 100%;
		padding: 10rpx 0;
		border-bottom: 1rpx solid #E5E9F2;
		.text{
			display: flex;
			flex-wrap: wrap;
			width: 90%;
			font-size: 28rpx;
			color: gray;
			
			.detail{
				font-size: 35rpx;
				color: black;
			}
			.receiver{
				margin-right: 40rpx;
			}
		}
		.icon{
			width: 10%;
		}
	}
}

.add-new{
	display: flex;
	align-items: center;
	justify-content: center;
	height: 120rpx;
	
	.add-btn{
		width: 400rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		text-align: center;
		background-color: $basic-color;
		color: white;
		border-radius: 40rpx;
	}
}
</style>
