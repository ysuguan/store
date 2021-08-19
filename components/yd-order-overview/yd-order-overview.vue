<template>
	<view class="com-list" @tap="goOrderDetail">
		<view class="list-img">
			<image class="list-item" v-for="item in comList.length" src="../../static/image/commodity.png" mode="aspectFit"></image>
		</view>
		<view class="number" v-if="isNew">
			共{{totalNumber}}件
			<u-icon name="arrow-right" color="gray" size="18"></u-icon>
		</view>
		<view class="statistic" v-else>
			<view class="price">
				<u-icon name="rmb" size="10" color="black"></u-icon>
				{{totalPrice}}
			</view>
			<view class="statistic-num">
				共{{totalNumber}}件
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"yd-order-overview",
		props: {
			isNew: {
				type:Boolean,
				default:false,
			},
			orderId: {
				type: Number,
				required: false,
			},
			comList: {
				type: Array,
				required: true,
			}
		},
		data() {
			return {
				
			};
		},
		computed: {
			totalNumber() {
				return this.comList.reduce((number, item) => number+item.number, 0);
			},
			totalPrice() {
				return this.comList.reduce((price, item) => price+item.number*item.price, 0);
			}
		},
		methods: {
			goOrderDetail() {
				uni.navigateTo({
					url: '/pages/orderDetail/orderDetail',
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.com-list{
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 180rpx;
	width: 100%;
	margin-top: 30rpx;

	.list-img{
		flex-shrink: 1;
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
	.statistic{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		text-align: center;
		.price{
			width: 100%;
			font-size: 35rpx;
		}
		.statistic-num{
			width: 100%;
			font-size: 20rpx;
			color: gray;
		}
	}
}
</style>
