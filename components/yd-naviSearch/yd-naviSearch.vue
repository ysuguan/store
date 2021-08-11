<template>
	<view class="com-wrap">
		<view class="place-holder"></view>
		<view ref="searchWrap" class="search-wrap" @click="goSearch" :style="dynamicStyle">
			<view class="search-box">
				<view class="search-content">
					<u-search placeholder="请输入商品名" @custom="goSearch" :show-action="false"></u-search>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		name:"yd-naviSearch",
		props: {
			opacityAlive: {
				type: Number,
				default: 0,
			},
			//淡入淡出触发弹性量
			bounce: {
				type: Number,
				default: 3
			},
			//自定义的组件宽度,单位px
			customWidth: {
				type: Number,
				default: 0
			},
			//组件固定高度，单位rpx
			top: {
				type: Number,
				default:0
			}
		},
		data() {
			return {
				opacityMax: 0,
				isVisiable: 'visible',
				opacity: 1,
			};
		},
		mounted(){
			this.opacityMax = this.$refs.searchWrap.$el.offsetHeight-this.bounce;
			if(this.opacityMax!=0){
				this.opacityMax -= this.bounce;
			}
		},
		computed:{
			//动态样式
			dynamicStyle(){
				return {opacity: this.opacity, visibility: this.isVisiable, width: this.customWidth+'px', top:this.top+'rpx'}
			}
		},
		methods: {
			//点击跳转搜索页
			goSearch(){
				console.log(13);
				uni.navigateTo({
					url: '/pages/search/search',
				})
			},
			//修改透明度和visibility
			changePerformance() {
				if(this.opacityMax==0){
					return this.opacity = 1;
				}
				if(this.opacityAlive>this.opacityMax){
					if(this.isVisiable!='hidden')
					{
						this.isVisiable='hidden';
					}
					return this.opacity = 0;
				}
				if(this.isVisiable!='visible')
				{
					this.isVisiable='visible';
				}
				return this.opacity = (this.opacityMax-this.opacityAlive)/this.opacityMax;
			},
			
		},
		watch: {
			opacityAlive(val, valOld){
				this.changePerformance()
			},
		}
	}
</script>

<style lang="scss" scoped>
.place-holder{
	height: 80rpx;
	width: 100%;
}
.search-wrap{
	position: fixed;
	height: 80rpx;
	.search-box {
		background-color: rgba($color: #000000, $alpha: 0);
		height: 80rpx;	
		.search-content {
			height: 60rpx;
			border-radius: 30rpx;
			background-color: #F2F2F2;
			padding-right: 10rpx;
			/deep/.u-action{
				height: 50rpx;
				line-height: 50rpx;
				border-radius: 25rpx;
				background-color: #FB3D49;
			}
		}
	}
}
</style>
