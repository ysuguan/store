<template>
	<view class="tabs-wrap">
		<u-grid :col="4" :border="false">
			<u-grid-item :bgColor="bgColor">推荐</u-grid-item>
			<u-grid-item :bgColor="bgColor">销量</u-grid-item>
			<u-grid-item :bgColor="bgColor">
				<view class="price-wrap">
					<view class="price">价格</view>
					<view class="icon-wrap">
						<u-icon size="5" name="arrow-up-fill" color="black"></u-icon>
						<u-icon size="5" name="arrow-down-fill" color="red"></u-icon>
					</view>
				</view>
				
			</u-grid-item>
			<u-grid-item :bgColor="bgColor">
				<view class="stock-only">仅看有货</view>
			</u-grid-item>
		</u-grid>
		<image class="performance" :src="modeImage[showMode]" @click="changeMode"></image>
	</view>
</template>

<script>
	export default {
		name:"yd-commodity-tabs",
		props:{
			bgColor: {
				type: String,
				default: 'transparent'
			},
		},
		data() {
			return {
				showMode: 0,
				modeImage: [
					"../../static/image/flow-list.svg",
					"../../static/image/flow-block.svg",
				]
			};
		},
		computed:{
			tabImage() {
				return 
			}
		},
		methods: {
			changeMode(){
				if(this.showMode==0){
					this.showMode=1;
				}else{
					this.showMode=0;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.tabs-wrap{
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
}
	
.price-wrap{
	display: flex;
	align-items: center;
	.price{
		margin-right: 10rpx;
	}
	.icon-wrap{
		display: flex;
		flex-wrap: wrap;
		width: 10rpx;
		align-content: space-between;
		
	}
}

.performance{
	margin-left: 20rpx;
	width: 50rpx;
	height: 50rpx;
}

.stock-only{
	box-sizing: border-box;
	padding-right: 10rpx;
	border-right: 3rpx solid #303133;
}

</style>
