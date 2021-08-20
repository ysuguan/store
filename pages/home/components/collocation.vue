<template>
	<view class="collocation">
			<view class="collocation-item" v-for="collocation in 10">
				<view class="collocation-img" :style="collocationImgStyle"  @tap="goCollocation">
					<view class="collocation-img-text" style="color: white; font-size: 35rpx;">
						营养补钙补充维生素
						<u-icon name="arrow-right" color="white"></u-icon>
					</view>
				</view>
				<view class="collocation-detail">
					<view class="collocation-commodity">
						<view v-for="item in 3" @click="goCommodity">
							<image src="../../../static/image/commodity.png" mode="scaleToFill"></image>
						</view>
					</view>
					<view class="collocation-see-more" @tap="goCollocation">
						去看看
						<u-icon name="play-right-fill" color="gray" size="25"></u-icon>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		name: "collocation",
		data() {
			return {
				
			}
		},
		computed: {
			collocationImgStyle(){
				let fName = "commodity.png"
				
				let item = require("../../../static/image/"+fName);
				return {
					background: `url(${item}) no-repeat center`,backgroundSize: '100% 100%'
				};
			},
		},
		methods: {
			goCollocation() {
				uni.navigateTo({
					url: "/pages/collocation/collocation",
				})
			},
			goCommodity() {
				console.log('去详情页啦！！！');
			},
		},
	}
</script>

<style lang="scss" scoped>
$div-border-radius: 20rpx;

.collocation{
	background-color: $page-bgc;
	border-radius: $div-border-radius;
	.collocation-item{
		display: flex;
		flex-wrap: nowrap;
		margin-bottom: 20rpx;
		background-color: white;
		border-radius: $div-border-radius;
		.collocation-img{
			display: flex;
			align-items: flex-end;
			width: 550rpx;
			height: 550rpx;
			border-radius: $div-border-radius;
			background-color: white;
			padding: 20rpx;
			
			.collocation-img-text{
				background-color: rgba($color: black, $alpha: .3);
				padding: 20rpx;
				border-radius: 20rpx;
			}
		}
		
		.collocation-detail{
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			
			width: 150rpx;
			height: 550rpx;
			.collocation-commodity{
				image{
					height: 120rpx;
					width: 120rpx;
					border-radius: 10rpx;
					margin-top: 10rpx;
				}
			}
			.collocation-see-more{
				align-self: flex-end;
				height: 80rpx;
				width: 120rpx;
				line-height: 80rpx;
				font-size: 25rpx;
				text-align: center;
				color: gray;
			}
		}
	}
}	
</style>