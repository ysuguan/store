<template>
	<view class="commodity-list">
		<view class="com-tabs-wrap">
			<yd-commodity-tabs :customCurrentTab="currentCommodityTab" :mainMode="false" 
			@commodityTabsClick="commodityTabsClick"></yd-commodity-tabs>
		</view>
		<yd-commodity-list :list="[10]" mode="list"></yd-commodity-list>
	</view>
</template>

<script>
	export default {
		name: "commodity",
		data() {
			return {
				currentCommodityTab: 0,
			}
		},
		methods:{
			commodityTabsClick(args){
				console.log(123);
			},
		}
	}
</script>

<style lang="scss" scoped>
.commodity-list{
	.com-tabs-wrap{
		position:fixed;
		z-index: 1000;
		top: 0;
		width: 100%;
		height: 70rpx;
		background-color: white;
		border-bottom: 10rpx solid white;
		box-sizing: border-box;
	}
	
	&::before{
		content: '';
		display: block;
		height: 70rpx;
		width: 100%;
	}
}
</style>
