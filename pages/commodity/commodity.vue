<template>
	<yd-page-model>
		<template v-slot:pageContent="pageContent">
			<yd-stack-scroll :primaryH='primaryHeight' :secondH="secondHeight" :key='comKey'>
				<template v-slot:head="primary">
					<view class="">
						<view class="search-wrap">
							<yd-naviSearch :opacityAlive="primary.primaryScrollY" :customWidth="pageContent.contentWidth" :top="searchOffsetTop"></yd-naviSearch>
						</view>
						<view ref='tabList' class="tab-list">
							<yd-commodity-tabs></yd-commodity-tabs>
						</view>
					</view>
				</template>
				<template v-slot:content>
					<view class="">test test</view>
				</template>
			</yd-stack-scroll>
		</template>
	</yd-page-model>
</template>

<script>
	export default {
		name: "commodity",
		data() {
			return {
				searchOffsetTop: 10,
				primaryHeight: 375,
				secondHeight: 375,
				
				comKey: 0,
			}
		},
		mounted(){
			uni.getSystemInfo({
				success: this.changePrimaryHeight
			});
			this.secondHeight = this.primaryHeight - this.$refs.tabList.$el.offsetHeight;
		},
		computed: {
			
		},
		methods:{
			changePrimaryHeight(res){
				this.primaryHeight = res.windowHeight;
			}
		},
	}
</script>

<style lang="scss" scoped>
.tab-list{
	height: 100rpx;
}
</style>
