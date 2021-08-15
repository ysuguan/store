<template>
	<yd-page-model ref="pageModel">
		<template v-slot:pageContent="pageContent">
			<yd-stack-scroll-swiper :primaryH='pageContent.contentHeight' :secondH="secondScrollHeight" :swiperCount='3' :customSwiperItem="currentTab"
			@changeSwiper='changeSwiper'>
				<template v-slot:head="primary">
					<view>
						<view class="search-wrap">
							<yd-naviSearch :opacityAlive="primary.primaryScrollY" :customWidth="pageContent.contentWidth" :top="searchOffsetTop"></yd-naviSearch>
						</view>
						<view ref='tabList' class="tab-list">
							<yd-commodity-tabs @commodityTabsClick="commodityTabsClick" :customCurrentTab="currentTab"></yd-commodity-tabs>
						</view>
					</view>
				</template>
				<!-- stack-scroll-swiper中swiperitem里的二级滚动窗具名插槽数量是根据swiperCount（表示滑动窗口数）属性确定的，此处应设置对应数量的内容 -->
				<template v-slot:content1>
					<yd-commodity-list :list='dataList[0]' :mode='listMode'></yd-commodity-list>
				</template>
				<template v-slot:content2>
					<yd-commodity-list :list='dataList[1]' :mode='listMode'></yd-commodity-list>
				</template>
				<template v-slot:content3>
					<yd-commodity-list :list='dataList[2]' :mode='listMode'></yd-commodity-list>
				</template>
			</yd-stack-scroll-swiper>
		</template>
	</yd-page-model>
</template>

<script>
	export default {
		name: "commodity",
		data() {
			return {
				currentTab: 0,
				searchOffsetTop: 10,
				secondScrollHeight: 600,
				comKey: 0,
				listMode: 'list',
				dataList: [[20], [31], [43]],
				// currentTabScrollTop:[0, 0, 0],
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
				this.currentTab = args.currentTab;
			},
			changeSwiper(args){
				this.currentTab = args.currentSwiperItem; 
			}
		},
	}
</script>

<style lang="scss" scoped>
.tab-list{
	height: 100rpx;
}
</style>
