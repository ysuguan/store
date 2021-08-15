<template>
	<view class="promotion">
			<view class="promo-up">
				<view class="promo-tag">
					每日特价
				</view>
				<view class="promo-com">
					<image class="promo-img" src="../../../static/image/commodity.png" mode="aspectFit"></image>
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
						<image class="promo-com-item-img" src="../../../static/image/commodity.png" mode="aspectFit"></image>
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

<script>
	export default {
		name: 'promotion',
		data() {
			return {
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
			}
		},
		computed: {
			
		},
		methods: {
			scrollPromoTabs(e) {
			},
			changePromoTab(index) {
				this.currentPromoTab = index;
			},
		},
	}
</script>

<style lang="scss" scoped>
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