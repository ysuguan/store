<template>
	<yd-page-model ref="pageModel">
		<template v-slot:pageContent="pageContent">
			<yd-stack-scroll :primaryH='pageContent.contentHeight' :secondH="secondScrollHeight">
				<template v-slot:head="primary">
					<view>
						<view class="search-wrap">
							<yd-naviSearch :opacityAlive="primary.primaryScrollY" :customWidth="pageContent.contentWidth" :top="searchOffsetTop"></yd-naviSearch>
						</view>
						<view ref='tabList' class="tab-list">
							<yd-commodity-tabs @commodityTabsClick="commodityTabsClick"></yd-commodity-tabs>
						</view>
					</view>
				</template>
				<template v-slot:content>
					<yd-commodity-list :list='[20]' :mode='listMode'></yd-commodity-list>
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
				secondScrollHeight: 600,
				comKey: 0,
				listMode: 'list',
			}
		},
		mounted(){
			this.secondScrollHeight = this.$refs.pageModel.contentHeight - this.$refs.tabList.$el.offsetHeight;
		},
		computed: {
			
		},
		methods:{
			commodityTabsClick(args){
				this.listMode = args.showMode==0?'block':'list';
			},
		},
	}
</script>

<style lang="scss" scoped>
.tab-list{
	height: 100rpx;
}
</style>
