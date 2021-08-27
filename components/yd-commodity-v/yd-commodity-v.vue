<template>
	<view class="box" :style="boxStyle">
		<!-- 绑定事件代理索引 -->
		<view class="mask" data-index='1'></view>
		<view class="img-area" :style="{width: width+'rpx', height: width+'rpx',}">
			<image src="../../static/image/commodity.png" mode="aspectFill"></image>
		</view>
		<view class="info-area">
			<view class="up">
				<view class="desc" :style="{'-webkit-line-clamp': descLine, 'font-size': descFZ+'rpx'}">
					<slot name="desc-tag"></slot>
					<text>品牌</text>
					<text>名称</text>
					<text>规格</text>
					<text>功效功效功效功效功效功效功效功效功效功效功效功效功效</text>
				</view>
				<slot name="rank"></slot>
			</view>
			<view class="down">
				<view class="left">
					<view class="price">
						<view class="now">
							<u-icon name="rmb" color="red" :size="rmbSize"></u-icon>
							<text :style="{'font-size': priceFZ+'rpx'}">{{priceInt}}</text>
							<text :style="{'font-size': rmbSize+'rpx'}">.{{priceFloat}}</text>
						</view>
						<view class="old">
							<slot name="priceTips"></slot>
						</view>
					</view>
					<view class="remarks">
						<slot name="remarks"></slot>
					</view>
				</view>
				<view class="right">
					<slot name="activeBtn"></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"yd-commodity-v",
		props: {
			//组件宽度，同样是图片宽度
			width: {
				type: Number,
				default: 280,
			},
			bgc: {
				type: String,
				default: 'white',
			},
			descFZ: {
				type: Number,
				default: 28,
			},
			descLine: {
				type: Number,
				default: 2,
			},
			priceFZ: {
				type: Number,
				default: 40,
			},
			//宽高比
			sizeRatio: {
				type: Number,
				default: 0.6,
			},
		},
		data() {
			return {
				price: 16.88
			};
		},
		computed: {
			boxStyle() {
				return {
					width: this.width+'rpx',
					height: this.width/this.sizeRatio+'rpx',
					background: this.bgc,
				}
			},
			rmbSize() {
				return this.priceFZ*0.7;
			},
			priceInt() {
				return this.price.toFixed(2).toString().split('.')[0];
			},
			priceFloat() {
				return this.price.toFixed(2).toString().split('.')[1];
			},
		}
	}
</script>

<style lang="scss" scoped>
@mixin text-lines-limit {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	// -webkit-line-clamp: 2;
	overflow: hidden;
}

.box{
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 10rpx;
	
	.mask{
		position: absolute;
		height: 100%;
		width: 100%;
		background: transparent;
		z-index: 1;
	}
}


.img-area{
	flex-shrink: 0;
	image{
		height: 100%;
		width: 100%;
		border-radius: 15rpx;
	}
}

.info-area{
	flex-grow: 1;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	padding: 10rpx;
	.up{
		.desc{
			@include text-lines-limit;
			line-height: 1.4;
			text{
				margin-right: 10rpx;
			}
		}
	}
	
	.down{
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		.left{
			.price{
				display: flex;
				align-items: center;
				.now{
					color: red;
				}
				.old{
					font-size: 25rpx;
					color: gray;
				}
				/deep/.old > * {
					margin-left: 10rpx;
				}
			}
			.remarks{
				font-size: 25rpx;
				color: gray;
			}
		}
	}
}


</style>
