<template>
	<yd-page-model ref="pageModel">
		<template v-slot:pageContent='pageContent'>
			<yd-stack-scroll-swiper :primaryH='pageContent.contentHeight' :secondH="secondScrollHeight">
				<template v-slot:head="primary">
					<view ref='searchWrap' class="search-wrap">
						<yd-naviSearch :opacityAlive="primary.primaryScrollY" :customWidth="pageContent.contentWidth" :top="searchOffsetTop"></yd-naviSearch>
					</view>
				</template>
				<template v-slot:content1>
					<view class="content-box">
						<view class="cate-wrap">
							<view class="cate-item" v-for="(item, index) in categories" :key='item.name+index' @tap="cateClick(item.name)">
								<view class="cate-item-text">
									<view class="color-block"></view>
									<view class="text">{{item.name}}</view>
								</view>
								<u-icon name="arrow-right" size="25"></u-icon>
							</view>
						</view>
						<view class="recommand">
							<view class="title">店内还有这些商品，来逛逛吧~</view>
							<view class="commodity-wrap">
								<view class="commodity" v-for="item in 4">
									<yd-commodity-mini :commodity="commodity" :height="300"></yd-commodity-mini>
								</view>
							</view>
							<button class="see-more" type="default" @tap="seeMore">查看更多商品</button>
							<view class="no-more">没有更多了，去看看别的</view>
						</view>
					</view>
				</template>
			</yd-stack-scroll-swiper>
		</template>
	</yd-page-model>
</template>

<script>
	import {titleReset} from "../../common/mixin.js"
	
	export default {
		mixins: [titleReset],
		data() {
			return {
				secondScrollHeight: 375,
				searchOffsetTop: 10,
				
				categories: [
					{name: '补肾壮阳'},
					{name: '心脑血管用药'},
					{name: '感冒咳嗽'},
					{name: '维矿物质'},
					{name: '神经系统用药'},
					{name: '肠胃消化'},
					{name: '皮肤用药'},
					{name: '糖尿病用药'},
					{name: '妇科用药'},
					{name: '风湿骨外'},
					{name: '耳鼻喉用药'},
					{name: '口腔用药'},
					{name: '眼科用药'},
					{name: '补肾壮阳'},
					{name: '心脑血管用药'},
					{name: '感冒咳嗽'},
					{name: '维矿物质'},
					{name: '神经系统用药'},
					{name: '肠胃消化'},
					{name: '皮肤用药'},
					{name: '糖尿病用药'},
					{name: '妇科用药'},
					{name: '风湿骨外'},
					{name: '耳鼻喉用药'},
					{name: '口腔用药'},
					{name: '眼科用药'},
				],
				
				commodity:{
					"url": "nothing",
					"img": '../../static/image/commodity.png',
					"text": "香雪抗病毒口服液18支风热感冒药流感咳嗽发热口液流鼻涕清热去痰",
					"price": 225,
				},
			}
		},
		mounted() {		
			this.secondScrollHeight  = this.$refs.pageModel.contentHeight;
		},
		computed:{
			
		},
		methods: {
			scrollPrimary(e) {
				this.primaryScrollY = e.detail.scrollTop;
			},
			cateClick(text) {
				uni.navigateTo({
					url: '/pages/search/search?text='+text,
				})
			},
			seeMore() {
				uni.navigateTo({
					url: '/pages/search/search',
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
.cate-wrap{
	background-color: transparent;
	.cate-item{
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		padding: 0 10rpx 0 20rpx;
		height: 70rpx;
		margin-bottom: 20rpx;
		background-color: white;
		border-radius: 10rpx;
		
		.cate-item-text{
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			
			.color-block{
				height: 25rpx;
				width: 5rpx;
				margin-right: 15rpx;
				background-color: red;
			}
		}
	}
}

.recommand{
	background-color: #fbfbfb;
	border-radius: 10rpx;
	.title{
		padding: 10rpx 0;
		text-align: center;
	}
	
	.commodity-wrap{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: space-between;

		.commodity{
			margin-top: 20rpx;
			width: 49%;
			background-color: white;
		}
	}
	
	.see-more{
		margin: 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		border-radius: 10rpx;
		background-color: white;
	}
	/deep/.see-more::after{
		border: 0 !important;
	}
	
	.no-more{
		color: #808080;
		text-align: center;
	}
}

</style>
