<template>
	<yd-page-model ref="pageModel">
		<template v-slot:pageContent='pageContent'>
			<yd-stack-scroll-swiper :primaryH='pageContent.contentHeight' :secondH="secondScrollHeight" :swiperCount="5" :customSwiperItem="currentTabIndex"
			@changeSwiper="changeSwiper">
				<template v-slot:head="primary">
					<view>
						<view class="search-wrap">
							<yd-naviSearch :opacityAlive="primary.primaryScrollY" :customWidth="pageContent.contentWidth" :top="searchOffsetTop"></yd-naviSearch>
						</view>
						<u-tabs ref="tabList" class="tabList" :list="tabList" :is-scroll="false" :current="currentTabIndex" 
						@change="changeTab" bg-color="transparent" inactive-color="white" active-color="white">
						</u-tabs>
					</view>
				</template>
				<template v-slot:content1>
					<view>
						<u-swiper class="box-common" :list="swiperList" height="400"></u-swiper>
						<view class="recommand-box box-common">
							<view class="recommand-item" v-for="item in 10" :key="item+'recommand'">
								<image class="recommand-img" :src="recommandList[0].image" mode="aspectFill"></image>
								<view class="recommand-text">{{recommandList[0].text}}</view>
							</view>
						</view>
						
						<yd-type-recommand title='防疫专区' :comList='comList1'></yd-type-recommand>
						<yd-type-recommand title='热销单品' :comList='comList2'></yd-type-recommand>
						<yd-type-recommand title='9.9专区' :comList='comList3'>
							<template v-slot:title="{title}">
								<u-section :title="title" :right="false" color="red" font-size="30"></u-section>
							</template>
						</yd-type-recommand>
					</view>
				</template>
				<template v-slot:content2>
					<view class="commodity-list">
						<view class="com-tabs-wrap">
							<yd-commodity-tabs :customCurrentTab="currentCommodityTab" :mainMode="false" 
							@commodityTabsClick="commodityTabsClick"></yd-commodity-tabs>
						</view>
						<yd-commodity-list :list="[10]" mode="list"></yd-commodity-list>
					</view>
				</template>
				<template v-slot:content3>
					<view class="seckill">
						<view class="seckill-head">
							<view class="seckill-tag"><view class="red-icon"></view> <view >为你推荐</view></view>
							<view class="seckill-commodity-box" >
								<yd-commodity-dynamic mode="horizontal" v-for="item in 2">
									<template v-slot:bottom>
										<view style="height: 30rpx ;font-size: 15rpx;color: #82848A;"> <del>500</del> </view>
									</template>
									<template v-slot:customButton>
										<view class="seckill-btn">
											<view>抢先看</view> 
											<u-count-down :timestamp="countDownSet.timeStamp" :color="countDownSet.color" 
											:bg-color="countDownSet.bgColor" :fontSize="countDownSet.fontSize" :height="countDownSet.height"
											:separatorSize="countDownSet.separatorSize" :separatorColor="countDownSet.separatorColor"></u-count-down>
										</view>
									</template>
								</yd-commodity-dynamic>
							</view>
							<view class="seckill-tag"><view class="red-icon"></view> <view >更多秒杀</view></view>
						</view>
						<view class="seckill-list">
							<view class="seckill-list-item" v-for="item in 12">
								<yd-commodity-dynamic mode="vertical">
									<template v-slot:bottom>
										<view style="height: 30rpx ;font-size: 15rpx;color: #82848A;"> <del>500</del> </view>
									</template>
									<template v-slot:customButton>
										<view class="seckill-btn">
											<view>抢先看</view> 
											<u-count-down :timestamp="countDownSet.timeStamp" :color="countDownSet.color" 
											:bg-color="countDownSet.bgColor" :fontSize="countDownSet.fontSize" :height="countDownSet.height"
											:separatorSize="countDownSet.separatorSize" :separatorColor="countDownSet.separatorColor"></u-count-down>
										</view>
									</template>
								</yd-commodity-dynamic>
								
							</view>
						</view>
					</view>
				</template>
				<template v-slot:content4>
					<view>123321</view>
				</template>
				<template v-slot:content5>
					<view class="collocation">
						<view class="collocation-item" v-for="collocation in 10">
							<view class="collocation-img" :style="collocationImgStyle"  @tap="goCollocation">
								<view style="color: white; font-size: 30rpx;">
									营养补钙补充维生素
									<u-icon name="arrow-right" color="white"></u-icon>
								</view>
							</view>
							<view class="collocation-detail">
								<view class="collocation-commodity">
									<view v-for="item in 3" @click="goCommodity">
										<image src="../../static/image/commodity.png" mode="scaleToFill"></image>
									</view>
								</view>
								<view class="collocation-see-more" @tap="goCollocation">
									去看看
									<u-icon name="play-right-fill" color="gray" size="10"></u-icon>
								</view>
							</view>
						</view>
					</view>
				</template>
			</yd-stack-scroll-swiper>
		</template>
	</yd-page-model>
</template>

<script>
	export default {
		data() {
			return {
				secondScrollHeight: 375,
				
				currentTabIndex: 0,
				currentCommodityTab: 0,
				searchOffsetTop: 10,
				//秒杀页面倒计时按钮配置
				countDownSet: {
					timeStamp: 86400,
					color: 'white',
					bgColor: 'transparent',
					fontSize: 15,
					showBorder: false,
					height: 15,
					separatorColor: 'white',
					separatorSize: 15,
				},
				tabList: [
					{"name": "精选"},
					{"name": "商品"},
					{"name": "秒杀"},
					{"name": "活动"},
					{"name": "搭配购"},
				],
				swiperList: [
					{"image": '../../static/image/swiper1.png'},
					{"image": '../../static/image/swiper2.png'},
				],
				recommandList:[
					{
						"image": "../../static/image/recommand-icon.png",
						"text": "皮肤用药",
					},
				],
				commodity:{
					"url": "nothing",
					"img": '../../static/image/commodity.png',
					"text": "香雪抗病毒口服液18支风热感冒药流感咳嗽发热口液流鼻涕清热去痰",
					"price": 225,
				},
				
				
				
				secondAllow: true,
			}
		},
		mounted() {
			this.secondScrollHeight  = this.$refs.pageModel.contentHeight - this.$refs.tabList.$el.offsetHeight;
		},
		computed:{
			comList1(){
				let res = [];
				for(let i=0; i<6; i++){
					res.push(this.commodity)
				}
				return res;
			},
			comList2(){
				let res = [];
				for(let i=0; i<6; i++){
					res.push(this.commodity)
				}
				return res;
			},
			comList3(){
				let res = [];
				for(let i=0; i<9; i++){
					res.push(this.commodity)
				}
				return res;
			},
			collocationImgStyle(){
				let fName = "commodity.png"
				
				let item = require("../../static/image/"+fName);
				return {
					background: `url(${item}) no-repeat center`,backgroundSize: '100% 100%'
				};
			}
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
			commodityTabsClick(args){
				console.log(123);
			},
			goCollocation() {
				uni.navigateTo({
					url: "/pages/collocation/collocation",
				})
			},
			goCommodity() {
				console.log('去详情页啦！！！');
			},
		}
	}
</script>

<style lang="scss" scoped>
$page-bgc: #F2F2F2;
$div-border-radius: 20rpx;
//各个区块共有的布局
.box-common{
	margin-top: 20rpx;
}

.recommand-box{
	display: flex;
	flex-wrap: wrap;
	height: 400rpx;
	width: 100%;
	justify-content: space-around;
	padding: 10rpx 0;
	border-radius: 1rpx;
	background-color: white;
	.recommand-item{
		width: 18%;
		height: 120rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	
		.recommand-img{
			width: 100rpx;
			height: 100rpx;
			border-radius: 30rpx;
			margin-bottom: 10rpx;
		}
		
		.recommand-text{
			font-size: 12rpx;
		}
	}
}

.commodity-list{
	.com-tabs-wrap{
		height: 70rpx;
		background-color: white;
		border-bottom: 10rpx solid white;
		box-sizing: border-box;
	}
}

.seckill{
	background-color: #F1F1F1;
	.seckill-head{
		.seckill-tag{
			display: flex;
			flex-wrap: nowrap;
			padding: 20rpx;
			align-items: center;
			.red-icon{
				height: 30rpx;
				width: 5rpx;
				background-color: red;
				margin-right: 20rpx;
			}
		}
		.seckill-commodity-box{
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;
			height: 450rpx;
			background-color: white;
			border-radius: 10rpx;
			
		}
	}
	
	.seckill-list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.seckill-list-item{
			width: 49%;
			height: 500rpx;
			margin-bottom: 5rpx;
		}
	}
	
	//秒杀页公用的按钮
	.seckill-btn{
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		
		height: 80rpx;
		width: 120rpx;
		font-size: 10rpx;
		border-radius: 10rpx;
		
		margin-bottom: 5rpx;
		text-align: center;
		color: white;
		background-color: #4CD964;
		
		//字体小的时候倒计时数字拥挤，调整间距
		/deep/.u-countdown-item{
			margin: 0 5rpx !important;
		}
	}
}

.collocation{
	background-color: $page-bgc;
	border-radius: $div-border-radius;
	.collocation-item{
		display: flex;
		flex-wrap: nowrap;
		margin-bottom: 20rpx;
		background-color: white;
		border-radius: $div-border-radius;
		.collocation-img{
			display: flex;
			align-items: flex-end;
			width: 550rpx;
			height: 550rpx;
			border-radius: $div-border-radius;
			background-color: white;
			padding: 20rpx;
		}
		
		.collocation-detail{
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			
			width: 150rpx;
			height: 550rpx;
			.collocation-commodity{
				image{
					height: 120rpx;
					width: 120rpx;
					border-radius: 10rpx;
					margin-top: 10rpx;
				}
			}
			.collocation-see-more{
				align-self: flex-end;
				height: 80rpx;
				width: 120rpx;
				line-height: 80rpx;
				font-size: 15rpx;
				text-align: center;
				color: gray;
			}
		}
	}
}
</style>
