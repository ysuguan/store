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
						@change="changeTab" bg-color="transparent" inactive-color="white" active-color="white" key='mainTabs'>
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
					<view class="promotion">
						<view class="promo-up">
							<view class="promo-tag">
								每日特价
							</view>
							<view class="promo-com">
								<image class="promo-img" src="../../static/image/commodity.png" mode="aspectFit"></image>
								<view class="promo-desc">
									<view class="top">
										<view class="top-text">
											<text>同仁堂</text>
											<text>十全大补丸</text>
											<text>1kg/桶</text>
										</view>
										<view class="top-tags">
											<u-tag v-for="item in 3" class="tag" text='一桶吃到饱' mode="light" size="5"></u-tag>
										</view>
									</view>
									<view class="bottom">
									 	<text>清仓特卖</text>
										<view class="price">
											<view class="hole"></view>
											<text class="price-now">￥9.9</text>
											<del class='price-old'>￥33.00</del>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="promo-down">
							<view class="title">逛促销</view>
							<scroll-view class="promo-tabs-scroll" :scroll-x="true" @touchmove.stop="scrollPromoTabs">
								<view class="promo-tabs">
									<view class="promo-tab-item" v-for="(item, index) in promoTabList" :key="'promo-tab'+index" 
									@tap="changePromoTab(index)" :class="{'promo-tab-item-a': currentPromoTab==index}">{{item.name}}</view>
								</view>
							</scroll-view>
							<view class="promo-com-list">
								<view class="promo-com-list-info">
									<view>促销时间：{{promoTabList[currentPromoTab].time}}</view>
									<view>促销规则：{{promoTabList[currentPromoTab].rule}}</view>
								</view>
								<view class="promo-com-item" v-for="com in promoTabList[currentPromoTab].list" :key="currentPromoTab+'-'+com">
									<image class="promo-com-item-img" src="../../static/image/commodity.png" mode="aspectFit"></image>
									<view class="promo-com-item-desc">
										<view class="name">
											<text>品牌</text>
											<text>名称</text>
											<text>规格</text>
											<text>效果效果效果效果效果效果效果效果效果效果效果效果</text>
										</view>
										<view class="price">
											<u-icon name="rmb" size="5"></u-icon>
											4.0
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
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
				
				promoTabList: [
					{name: '打5折', list: 25, time: '2021年3月29日 23:59促销结束', rule: '同标题'},
					{name: '打骨折',list: 2,time: '2022年3月29日 23:59促销结束', rule: '同标题'},
					{name: '打3折',list: 1,time: '2021年6月29日 23:59促销结束', rule: '同标题'},
					{name: '腿打折',list: 35,time: '2021年2月29日 23:59促销结束', rule: '同标题'},
					{name: '一元清仓',list: 2,time: '2021年12月29日 23:59促销结束', rule: '同标题'},
					{name: '倒贴100',list: 1,time: '2021年7月29日 23:59促销结束', rule: '同标题'},
					{name: '打1折',list: 4,time: '2021年3月8日 23:59促销结束', rule: '同标题'},
					{name: '满100减60',list: 3,time: '2021年3月29日 23:59促销结束', rule: '同标题'},
				],
				currentPromoTab: 0,
				
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
			scrollPromoTabs(e) {
			},
			changePromoTab(index) {
				this.currentPromoTab = index;
			},
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

.promotion{
	.promo-up{
		height: 300rpx;
		background: linear-gradient(to right, $linear-color-start, $linear-color-start 30%, $linear-color-end) ;
		border-radius: 20rpx;
		.promo-tag{
			padding: 10rpx 20rpx;
			font-size: 30rpx;
			color: white;
			font-style: italic;
			font-weight: bolder;
		}
		.promo-com{
			display: flex;
			align-items: center;
			border-radius: 20rpx;
			background-color: white;
			padding: 15rpx;
			height: 250rpx;
			
			.promo-img{
				flex-shrink: 0;
				height: 200rpx;
				width: 200rpx;
				border-radius: 10rpx;
			}
			.promo-desc{
				display: flex;
				flex-wrap: wrap;
				align-content: space-between;
				height: 100%;
				padding: 20rpx 40rpx 10rpx 20rpx;

				.top{
					flex-grow: 1;
					
					.top-text>text{
						font-weight: bolder;
						margin-right: 10rpx;
					}
					.top-tags{
						.tag{
							margin-right: 10rpx;
							border: none;
							color: orange;
							background-color: rgba($color: orange, $alpha: .1);
						}
					}
				}
				.bottom{
					flex-grow: 1;
					
					display: flex;
					align-items: center;
					height: 50rpx;
					border-radius: 10rpx;
					background: linear-gradient(to right, $message-bg-color, $message-bg-color 10%, $message-bg-color-dark 40%);
					color: $message-text-color;
					font-weight: bolder;
					
					text:nth-child(1){
						margin: 0 10rpx;
					}
					.price{
						flex-grow: 1;
						align-self: stretch;
						
						display: flex;
						align-items: center;
						padding-left: 20rpx;
						border-radius: 60rpx 20rpx 20rpx 60rpx;
						background: linear-gradient(to right, red, red 40%, $linear-color-end);
						color: white;
						
						.hole{
							height: 15rpx;
							width: 15rpx;
							border-radius: 50%;
							background-color: $message-bg-color-dark;
						}
						
						.price-now{
							margin: 0 10rpx;
							font-size: 40rpx;
						}
						.price-old{
							font-size: 20rpx;
							font-weight: bold;
							margin-right: 30rpx;
							color: #DCDFE6;
						}
					}
				}
			}
		}
	}
	.promo-down{
		margin-top: 30rpx;
		border-radius: 20rpx;
		background-color: white;
		
		.title{
			height: 80rpx;
			line-height: 80rpx;
			font-size: 35rpx;
			font-weight: bolder;
			text-align: center;
		}
		.promo-tabs-scroll{
			width:100%;
			.promo-tabs{
				display: flex;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 15rpx;
				font-weight: 400;
				.promo-tab-item{
					flex-shrink: 0;
					padding: 0 25rpx;
				}
			}
			
		}
		.promo-com-list{
			display: flex;
			flex-wrap: wrap;
			
			.promo-com-list-info{
				flex-grow: 1;
				padding: 20rpx;
				color: $message-text-color;
				font-weight: lighter;
				font-size: 20rpx;
				background-color: rgba($color: $message-bg-color, $alpha: .5);
			}
			.promo-com-item{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				align-items: center;
				width: 50%;
				height: 450rpx;
				box-sizing: border-box;
				border-bottom: 1rpx solid $page-bgc;
				/deep/.up-side{
					.title{
						font-size: 8rpx;
					}
				}
				.promo-com-item-img{
					height: 300rpx;
					width: 300rpx;
					border-radius: 10rpx;
				}
				.promo-com-item-desc{
					font-size: 10rpx;
					margin: 20rpx;
					
					.name{
						line-height: 30rpx;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp:2;
						overflow: hidden;
						white-space:pre-wrap;
						
						text{
							padding-right: 20rpx;
						}
					}
					.price{
						padding: 10rpx 0;
						color: red;
						font-size: 35rpx;
					}
				}
			}
			.promo-com-item:nth-child(even){
				border-right: 1rpx solid $page-bgc;
			}
		}
	}
}

.promo-tab-item-a{
	color: red;
}
</style>
