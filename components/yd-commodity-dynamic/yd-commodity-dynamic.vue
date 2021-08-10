<template>
	<view class="com-wrap" :class="dynamicClass[mode]" :style="dynamicStyle">
		<view class="com-image">
			<image :src="imgSrc" mode="scaleToFill"></image>
		</view>
		<view class="com-desc">
			<view class="top">
				<view class="title">
					<u-tag class="tag" text="热销" shape="circle" :show="true" color="white" bgColor="red"></u-tag>
					<text class="brand">品牌</text>
					<text class="name">名字</text>
					<text class="specs">规格</text>
					<text class="effect">功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效功效</text>
				</view>
			</view>
			<view class="middle">
				
				
				<view class="left">
					<view class="rank">
						<u-tag class="remarks" text="感冒药排名第1" :show="true" mode="light" type="error">
						</u-tag>
					</view>
					<view class="price">
						<view class="price-now">¥ <text>229.00</text></view>
						<view class="price-add">
							<slot name="priceAdd"></slot>
						</view>
					</view>
				</view>
				<view class="right">
					<slot name="customButton"></slot>
				</view>
			</view>
			<view class="bottom">					
				<view class="comments">
					<text class="number">10万+条评价</text>
					<text class="good-rate">好评98%</text>
				</view>
			</view>
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
			//允许动态设置组件宽高---默认占满父元素宽度
			height: null,
			width: null,
			imgSrc: {
				type: String,
				default: '../../static/image/commodity.png',
			}
		},
		data() {
			return {
				dynamicClass: {
					horizontal: 'com-wrap-h',
					vertical: 'com-wrap-v'
				}
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
		}
	}
</script>

<style lang="scss" scoped>
$title-font-size: 15rpx;
$not-title-font-size: 5rpx;	
$price-logo-size: 20rpx;
$price-font-size: 30rpx;
$price-now-color: red;
$comments-font-size: 15rpx;
$comments-color: #606266;
	
.com-wrap-h{
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	height: 200rpx;
	
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
	height:500rpx;
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
		padding: 10rpx;
		.top{
			height: 35%;
			.title{
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp:2;
				overflow: hidden;
				white-space:pre-wrap;
				line-height: $title-font-size*2;
				.tag{
					font-size: $not-title-font-size;
					padding: 6rpx;
				}
			
				
				text{
					margin-left: 10rpx;
				}
			}
		}
		
		.middle{
			height: 45%;
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
					flex-shrink: 0;
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
			}
		}
		
		.bottom{
			height: 20%;
			.comments{
				font-size: $comments-font-size;
				color: $comments-color;
				
				text{
					padding-right: 20rpx;
				}
			}
		}
	}
}
</style>
