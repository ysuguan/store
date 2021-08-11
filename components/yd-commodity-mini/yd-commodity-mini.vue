<template>
	<view class="box" :style="customStyle">
		<image class="img" :src="commodity.img" mode="aspectFill"></image>
		<view class="text">
			<text>{{commodity.text}}</text>
			</view>
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
			height: {
				type:Number,
				default: 400,
			}
		},
		computed:{
			customStyle(){
				return {height:this.height+'rpx'};
			}
		}
	}
</script>

<style lang="scss" scoped>
.box{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	height: 100%;
	width: 100%;
	border-radius: 1rpx;
	
	.img{
		width: 100%;
		height: 55%;
	}
	.text{
		width: 100%;
		margin: 0 10rpx;
		font-size: 10rpx;
		
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp:2;
		overflow: hidden;
		white-space:pre-wrap;
	}
	.price {
		height: 25%;
		width: 100%;
		margin: 10rpx 10rpx;
		text-align: left;
		color: red;
	}
}
</style>
