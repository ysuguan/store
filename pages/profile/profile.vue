<template>
	<scroll-view scroll-y="true" class="page" @scroll="pageScroll">
		<view class="navi" ref="navi" :style="naviStyle">
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
			
			<view class="order" @tap="goOrderList">
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
			
			<view class="address" @tap="goAddressList">
				<u-icon class="left" name="map" color="red" size="40"></u-icon>
				<view class="middle">
					<view>江苏省苏州市</view>
					<view class="detail">
						<text>{{$store.state.userInfo.address.all[$store.state.userInfo.address.chose]}}</text>
					</view>
					<view>
						<text>收件人</text>
						<text>132131313123</text>
					</view>
				</view>
				<u-icon name="arrow-right" size="40" color="gray"></u-icon>
			</view>
			
			<yd-recommand-for-you :comList="cartsAll"></yd-recommand-for-you>
		</view>
	</scroll-view>
</template>

<script>
	import {titleReset} from "../../common/mixin.js"
	
	export default {
		mixins:[titleReset],
		data() {
			return {
				//做分母的初始值不能为0
				naviHeight: 1,
				scrollY: 0,
				//navibar显隐的冗余量，避免滑到顶部不隐藏
				scrollRedundancy: 10,
				cartsAll: [
						{
							id:2333,
							name: '感冒灵颗粒',
							brand: '888牌',
							desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
							price: 199,
							number: 3,
							type: '乙型',
							weight: 0.12,
							specifications: '【70g*30袋】国产高端',
						},{
							id:2333,
							name: '感冒灵颗粒',
							brand: '777牌',
							desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
							price: 199,
							number: 3,
							type: '丙型',
							weight: 0.12,
							specifications: '【70g*30袋】国产高端',
						},{
							id:2333,
							name: '感冒灵颗粒',
							brand: '999牌',
							desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
							price: 199,
							number: 3,
							type: '甲型',
							weight: 0.12,
							specifications: '【70g*30袋】国产高端',
						},{
							id:2333,
							name: '感冒灵颗粒',
							brand: '999牌',
							desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
							price: 199,
							number: 3,
							type: '甲型',
							weight: 0.12,
							specifications: '【70g*30袋】国产高端',
						},{
							id:2333,
							name: '感冒灵颗粒',
							brand: '999牌',
							desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
							price: 199,
							number: 3,
							type: '甲型',
							weight: 0.12,
							specifications: '【70g*30袋】国产高端',
						},{
							id:2333,
							name: '感冒灵颗粒',
							brand: '999牌',
							desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
							price: 199,
							number: 3,
							type: '甲型',
							weight: 0.12,
							specifications: '【70g*30袋】国产高端',
						},{
							id:2333,
							name: '感冒灵颗粒',
							brand: '999牌',
							desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
							price: 199,
							number: 3,
							type: '甲型',
							weight: 0.12,
							specifications: '【70g*30袋】国产高端',
						},
					],
				
			}
		},
		mounted() {
			document.title = '大药房';
			this.initElementPosition();
		},
		computed: {
			naviStyle() {
				let scroll = (this.scrollY-this.scrollRedundancy)/this.naviHeight;
				return {
					opacity: scroll>1?1:scroll,
					visibility: scroll>0?'visible':'hidden',
				}
			}
		},
		methods: {
			initElementPosition() {
				this.naviHeight = this.$refs.navi.$el.offsetHeight;
				console.log(this.naviHeight);
			},
			goDetail() {
				uni.navigateTo({
					url: '/pages/detail/detail',
				})
			},
			goAddressList() {
				uni.navigateTo({
					url: '/pages/addressList/addressList',
				})
			},
			pageScroll(e) {
				this.scrollY = e.detail.scrollTop;
			},
			goOrderList(e) {
				uni.navigateTo({
					url: '/pages/orderList/orderList',
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.page{
	background-color: $page-bgc;
	height: calc(100vh - 50px);
	overflow: hidden;
	
	.navi{
		position: fixed;
		top: 0;
		height: 100rpx;
		width: 100vw;
		background-color: white;
		font-size: 35rpx;
		line-height: 100rpx;
		text-align: center;
		z-index: 100;
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
		margin-top: 50rpx;
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
		margin-top: 30rpx;
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

	.address{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 200rpx;
		background-color: white;
		border-radius: 20rpx;
		margin-top: 30rpx;
		padding: 0 20rpx;
		.left{
			margin-right: 20rpx;
		}
		.middle{
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			height: 50rpx;
			line-height: 50rpx;
			font-size: 25rpx;
			.detail{
				font-size: 30rpx;
				font-weight: bold;
			}
		}
	}

}
</style>
