<template>
	<u-popup v-model="isShow" mode="bottom" :closeable="true" @close="popClose">
		<view class="content">
			<view class="head">
				<view>商品清单</view>
				<view class="count">共{{totalNumber}}件</view>
			</view>
			
			<scroll-view class="body" scroll-y="true">
				<view class="order-item" v-for="(item, index) in orderList">
					<image class="left" src="../../../static/image/commodity.png" mode="aspectFit"></image>
					<view class="right">
						<view class="text">
							<view class="desc">
								<text>{{item.brand}}</text>
								<text>{{item.name}}</text>
								<text>{{item.type}}</text>
								<text>{{item.specifications}}</text>
							</view>
							<view class="desc-mini">
								<text>{{item.name}}</text>
								<text>{{item.specifications}}</text>
							</view>
						</view>
						<view class="params">
							<view class="price">
								<u-icon name="rmb" size="20" color="red"></u-icon>
								{{item.price}}
							</view>
							<view class="weight">{{item.weight}}kg x {{item.number}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: "orderListPop",
		props: {
			comShow: {
				type: Boolean,
				default: false,
			},
			orderList: {
				type: Array,
				required: true,
			}
		},
		data() {
			return {
				isShow: false,
			}
		},
		computed: {
			btnConfirmStyle() {
				return {
					height: '70rpx',
					background: 'linear-gradient(to right, #FC3C2D, #FF9933)',
					margin: 0,
				}
			},
			totalNumber() {
				return this.orderList.reduce((res, item) => res+item.number, 0);
			}
		},
		methods: {
			popClose() {
				this.$emit('popClose');
			}
		},
		watch: {
			comShow(val, valOld) {
				this.isShow = val;
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
	height: 1060rpx;
	padding: 30rpx;
	.head{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		font-size: 35rpx;
		font-weight: bold;
		padding: 20rpx 0;
		
		.count{
			width: 150rpx;
			font-size: 28rpx;
			font-weight: normal;
			color: gray;
		}
	}
	.body{
		height: 900rpx;
		
		.order-item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 250rpx;
			border-bottom: 1rpx solid #E5E9F2;
			
			.left{
				width: 180rpx;
				height: 180rpx;
				border-radius: 10rpx;
			}
			.right{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 180rpx;
				width: 480rpx;
				font-size: 28rpx;
				color: black;
				line-height: 40rpx;
				
				.text{
					text{
						margin-right: 20rpx;
					}
					.desc-mini{
						font-size: 20rpx;
						color: gray;
					}
				}
				.params{
					display: flex;
					justify-content: space-between;
					
					.price{
						color: red;
						font-size: 35rpx;
					}
					.weight{
						font-size: 20rpx;
					}
				}
			}
		}
	}
}
</style>
