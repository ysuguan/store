<template>
	<view class="page-wrap">
		<view class="app-bg">
		</view>
		<view class="app-bg-cover"></view>
		<view class="page-content" ref="pageContent">
			<slot name="pageContent" :contentWidth="contentWidth" :contentHeight="contentHeight"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"yd-page-model",
		data() {
			return {
				contentWidth: 100,
				contentHeight: 100,
			};
		},
		mounted() {
			this.contentWidth = this.$refs.pageContent.$el.offsetWidth;
			this.contentHeight = this.$refs.pageContent.$el.offsetHeight;
		}
	}
</script>

<style lang="scss" scoped>
.page-wrap{
	background-color: $page-bgc;
	z-index: -1;
}
.page-content {
	z-index: 10;
	margin: 0 20rpx;
	height: calc(100vh - 50px);
}
	
.app-bg{
	position: fixed;
	z-index: 0;
	height: 33vh;
	width: 100vw;
	background-image: url(../../static/image/app-bg.jpeg);
	background-size: cover;
	filter:brightness(85%);
}
.app-bg::before{
	content: '';
	display: block;
	height: 23vh;
	width: 100%;
		
}
.app-bg-cover{
	position: fixed;
	z-index: 0;
	height: 33vh;
	width: 100vw;
	background: linear-gradient(rgba($color: $page-bgc, $alpha: 0),rgba($color: $page-bgc, $alpha: 1.0));
}

</style>
