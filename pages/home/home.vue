<template>
	<yd-page-model ref="pageModel">
		<template v-slot:pageContent='pageContent'>
			<yd-stack-scroll-swiper :primaryH='pageContent.contentHeight' :secondH="secondScrollHeight" :swiperCount="5" :customSwiperItem="currentTabIndex"
			@changeSwiper="changeSwiper">
				<template v-slot:head="primary">
					<view ref="pageHead">
						<view class="search-wrap">
							<yd-naviSearch :opacityAlive="primary.primaryScrollY" :customWidth="pageContent.contentWidth" :top="searchOffsetTop"></yd-naviSearch>
						</view>
						<u-tabs ref="tabList" class="tabList" :list="tabList" :is-scroll="false" :current="currentTabIndex" 
						@change="changeTab" bg-color="transparent" inactive-color="white" active-color="white" key='mainTabs'>
						</u-tabs>
					</view>
				</template>
				<template v-slot:content1="props">
					<boutique :scrollInfo="props" :redundancy="pageHeadH"></boutique>
				</template>
				<template v-slot:content2>
					<commodity></commodity>
				</template>
				<template v-slot:content3>
					<seckill></seckill>
				</template>
				<template v-slot:content4>
					<promotion></promotion>
				</template>
				<template v-slot:content5>
					<collocation></collocation>
				</template>
			</yd-stack-scroll-swiper>
		</template>
	</yd-page-model>
</template>

<script>
	import seckill from "./components/seckill"
	import commodity from "./components/commodity"
	import promotion from "./components/promotion"
	import collocation from "./components/collocation"
	import boutique from "./components/boutique"
	
	export default {
		components:{
			seckill,
			commodity,
			promotion,
			collocation,
			boutique,
		},
		data() {
			return {
				pageHeadH:0,
				secondScrollHeight: 375,
				
				currentTabIndex: 0,
				// currentCommodityTab: 0,
				searchOffsetTop: 10,
				
				tabList: [
					{"name": "精选"},
					{"name": "商品"},
					{"name": "秒杀"},
					{"name": "活动"},
					{"name": "搭配购"},
				],
				secondAllow: true,
			}
		},
		mounted() {
			this.secondScrollHeight  = this.$refs.pageModel.contentHeight - this.$refs.tabList.$el.offsetHeight;
			this.pageHeadH = this.$refs.pageHead.$el.offsetHeight;
		},
		computed:{
		},
		methods: {
			changeTab(e){
				this.currentTabIndex = e;
			},
			changeSwiper(args){
				this.currentTabIndex = args.currentSwiperItem;
			},
			scrollPrimary(e){
				this.primaryScrollY = e.detail.scrollTop;
			},
			goCommodity() {
				console.log('去详情页啦！！！');
			},
		}
	}
</script>

<style lang="scss" scoped></style>
