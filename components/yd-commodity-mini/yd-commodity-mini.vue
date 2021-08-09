<template>
	<view class="box">
		<image class="img" :src="commodity.img" mode="aspectFill"></image>
		<view class="text">{{commodity.text}}</view>
		<view class="price">¥ {{commodity.price}}</view>
	</view>
</template>

<script>
	export default{
		props:{
			commodity: {
				type: Object,
				required:true,
			},
			
		}
	}
</script>

<style lang="scss" scoped>
.box{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	height: 98%;
	width: 98%;
	border-radius: 1rpx;
	.img{
		width: 180rp;
		height: 180rpx;
	}
	.text{
		margin: 10rpx 10rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-size: 10rpx;
	}
	.price {
		width: 100%;
		margin: 10rpx 10rpx;
		text-align: left;
		color: red;
	}
}
</style>
