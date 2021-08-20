<template>
	<view class="com-wrap" :class="dynamicClass[mode]" :style="dynamicStyle" @tap="goDetail">
		<view class="com-image">
			<image :src="imgSrc" mode="scaleToFill"></image>
		</view>
		<view class="com-desc">
			<view class="up-side">
				<view class="title" :style="setMiniStyle('titleFS')">
					<u-tag v-if="!mini" class="tag" text="热销" shape="circle" :show="true" color="white" bgColor="red"></u-tag>
					<text class="brand">{{commodity.brand}}</text>
					<text class="name">{{commodity.name}}</text>
					<text class="specs">{{commodity.specificans}}</text>
					<text class="effect">{{commodity.desc}}</text>
				</view>
			</view>
			<view class="down-side">
				<view class="left">
					<view v-if="!mini" class="rank">
						<u-tag class="remarks" text="感冒药排名第1" :show="true" mode="light" type="error">
						</u-tag>
					</view>
					<view class="price" :style="setMiniStyle('priceLogoFS')">
						<view class="price-now">¥ <text :style="setMiniStyle('priceFS')">229.00</text></view>
						<view class="price-add">
							<slot name="priceAdd"></slot>
						</view>
					</view>
					<view class="bottom">
						<slot name="bottom">
							<view class="comments">
								<text class="number">10万+条评价</text>
								<text class="good-rate">好评98%</text>
							</view>
						</slot>
					</view>
				</view>
				<view class="right">
					<slot name="customButton"></slot>
				</view>
			</view>
			
			<!-- <view class="bottom">					
				<slot name="bottom">
					<view class="comments">
						<text class="number">10万+条评价</text>
						<text class="good-rate">好评98%</text>
					</view>
				</slot>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name:"yd-commodity-dynamic",
		props: {
			//商品标签展示模式，可选横向和纵向
			mode: {
				type: String,
				default: 'vertical',
				validator: (value) => {
					return ['horizontal', 'vertical'].indexOf(value) !== -1;
				}
			},
			//首页需要mini的块状显示，mini尺寸下缩小字体，去除不必要的模块
			mini: {
				type: Boolean,
				default: false,
			},
			//允许动态设置组件宽高---默认占满父元素宽度
			height: null,
			width: null,
			imgSrc: {
				type: String,
				default: '../../static/image/commodity.png',
			},
			commodity: {
				type: Object,
				default: () => {
					return {
					"url": "nothing",
					"img": '../../../static/image/commodity.png',
					"text": "香雪抗病毒口服液18支风热感冒药流感咳嗽发热口液流鼻涕清热去痰",
					'brand':'007牌',
					"type": '甲乙丙',
					"name": '抗病毒口服液',
					"specificans": '18支',
					"desc": '风热感冒药流感咳嗽发热口液流鼻涕清热去痰',
					"price": 225,
					}
				}
			}
		},
		data() {
			return {
				dynamicClass: {
					horizontal: 'com-wrap-h',
					vertical: 'com-wrap-v'
				},
				miniSize: {
					titleFS: 25,
					priceLogoFS: 20,
					priceFS:30,
				},
			};
		},
		computed: {
			dynamicStyle(){
				let res = {};
				if(this.height){
					res.height = this.height + 'rpx';
				}
				if(this.width){
					res.width = this.width + 'rpx';
				}
				return res;
			}
		},
		methods:{
			goDetail() {
				uni.navigateTo({
					url: '/pages/detail/detail',
				})
			},
			setMiniStyle(tag){
				if(!this.mini){
					return {};
				}
				return {
					'font-size': this.miniSize[tag]+'rpx',
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
$title-font-size: 15rpx;
$not-title-font-size: 20rpx;	
$price-logo-size: 20rpx;
$price-font-size: 30rpx;
$price-now-color: red;
$comments-font-size: 15rpx;
$comments-color: #606266;
	
.com-wrap-h{
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	height: 240rpx;
	
	.com-image{
		width: 35%;
		height: 100%;
	}
	
	.com-desc{
		width: 60%;
	}
	
}

.com-wrap-v{
	display: flex;
	flex-wrap: wrap;
	justify-items: center;
	height:520rpx;
	padding-bottom: 10rpx;
	.com-image{
		width: 100%;
		height: 55%;
	}
	
	.com-desc{
		height: 45%;
	}
}

.com-wrap{
	background-color: white;
	border-radius: 10rpx;
	.com-image{
		padding-bottom: 10rpx;
		image{
			width: 100%;
			height: 100%;
			border-radius: 10rpx;
		}
	}
	
	.com-desc{
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		padding: 10rpx;
		.up-side{
			flex-basis: 200rpx;
			flex-grow: 1;
			.title{
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp:2;
				overflow: hidden;
				white-space:pre-wrap;
				// line-height: $title-font-size*2;
				.tag{
					font-size: $not-title-font-size;
					padding: 6rpx;
				}
			
				text{
					margin-left: 10rpx;
				}
				
			}
		}
		
		.down-side{
			flex-basis:200rpx;
			flex-grow: 1;
			display: flex;
			flex-wrap: nowrap;
			margin-top: 10rpx;
			.left{
				display: flex;
				flex-wrap: wrap;
				flex-grow: 1;
				.rank{
					.remarks {
						font-size: $not-title-font-size;
						padding: 3rpx;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap; ;
					}
				}
				
				.price{
					display: flex;
					flex-wrap: nowrap;
					align-items: stretch;
					// flex-shrink: 0;
					width: 100%;
					font-size: $price-logo-size;
					.price-now{
						color: $price-now-color;
						text{
							font-size: $price-font-size;
							padding-left: 5rpx;
						}
					}
					.price-add{
						display: flex;
						flex-wrap: nowrap;
						align-items: end;
					}
				}
				
				.bottom{
					
					.comments{
						font-size: $comments-font-size;
						color: $comments-color;
						
						text{
							padding-right: 20rpx;
						}
					}
				}
			}
			.right{
				display: flex;
				flex-wrap: nowrap;
				align-items: flex-end;
			}
		}
		
		// .bottom{
		// 	flex-basis: 100rpx;
		// 	flex-shrink: 1;
		// 	.comments{
		// 		font-size: $comments-font-size;
		// 		color: $comments-color;
				
		// 		text{
		// 			padding-right: 20rpx;
		// 		}
		// 	}
		// }
	}
}
</style>
