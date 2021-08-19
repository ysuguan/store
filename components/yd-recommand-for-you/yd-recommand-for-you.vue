<template>
	<view class="recommand">
		<view class="recommand-title">
			<image src="../../static/image/heart-active.svg"></image>
			为你推荐
			<image src="../../static/image/heart-active.svg"></image>
		</view>
		<u-waterfall v-model="allCom" class="recommand-list">
			<template v-slot:left="{leftList}">
				<view v-for="(item, index) in leftList" :key="index" class="recommand-item" @tap="goDetail">
					<image class="recom-item-img"  src="../../static/image/commodity.png" mode="aspectFit"></image>
					<view class="recom-item-desc">
						<text>{{item.brand}}</text>
						<text>{{item.type}}</text>
						<text>{{item.desc}}</text>
					</view>
					<view class="recom-item-price">
						<u-icon name="rmb" size="12"></u-icon>
						<text>{{item.price}}</text>
					</view>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view v-for="(item, index) in rightList" :key="index" class="recommand-item" @tap="goDetail">
					<image class="recom-item-img"  src="../../static/image/commodity.png" mode="aspectFit"></image>
					<view class="recom-item-desc">
						<text>{{item.brand}}</text>
						<text>{{item.type}}</text>
						<text>{{item.desc}}</text>
					</view>
					<view class="recom-item-price">
						<u-icon name="rmb" size="12"></u-icon>
						<text>{{item.price}}</text>
					</view>
				</view>
			</template>
		</u-waterfall>
	</view>
</template>

<script>
	export default {
		name:"yd-recommand-for-you",
		props: {
			comList: {
				type: Array,
				required: true,
			}
		},
		created() {
			this.allCom = this.comList;
		},
		data() {
			return {
				allCom: [],
			};
		},
		methods: {
			goDetail() {
				uni.navigateTo({
					url: '/pages/detail/detail',
				})
			}
		},
		watch: {
			comList(val, valOld) {
				this.allCom = this.comList;
			}
		}
	}
</script>

<style lang="scss" scoped>
.recommand{
	.recommand-title{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100rpx;
		text-align: center;
		image{
			height: 30rpx;
			width: 30rpx;
		}
	}
	
	.recommand-list{
		// background-color: white;
		border-radius: 20rpx;
		.recommand-item{
			background-color: white;
			margin: 10rpx;
			padding: 20rpx;
			border-radius: 20rpx;
			.recom-item-img{
				width: 100%;
				height: 300rpx;
			}
			.recom-item-desc{
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp:2;
				overflow: hidden;
				white-space:pre-wrap;
				
				text{
					margin-right: 10rpx;
				}
			}
			.recom-item-price{
				color: red;
				font-size: 35rpx;
			}
		}
	}
}
</style>
