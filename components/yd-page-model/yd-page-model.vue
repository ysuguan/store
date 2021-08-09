<template>
	<view class="page-wrap">
		<view class="app-bg">
			<view class="app-bg-cover"></view>
		</view>
		<view class="page-content" ref="pageContent">
			<slot name="pageContent" :contentWidth="contentWidth"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"yd-page-model",
		data() {
			return {
				contentWidth: 0,
			};
		},
		mounted() {
			this.contentWidth = this.$refs.pageContent.$el.offsetWidth;
		}
	}
</script>

<style lang="scss" scoped>
.page-content {
	z-index: 10;
	margin: 0 20rpx;
	height: calc(100vh - 50px);
}
	
.app-bg{
	position: fixed;
	z-index: -1;
	height: 33vh;
	width: 100vw;
	background-image: url(../../static/image/app-bg.jpeg);
	background-size: cover;
	
	.app-bg-cover{
		height: 33vh;
		width: 100vw;
		background: linear-gradient(rgba(14, 123, 254, .3), rgba(256,256,256,1));
	}
}
</style>
