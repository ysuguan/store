<template>
	<view class="page">
		<view class="head">
			<view class="navi-bar">
				<u-icon class="go-back" name="arrow-left" color="black" size="40" @tap="goBack"></u-icon>
				<view class="search" >
					<u-search :focus="searchFocus" placeholder="搜索我的订单" v-model="searchWord" :showAction="true" bg-color="white" 
					@focus="focusSearch" @blur="blurSearch"></u-search>
				</view>
			</view>
		</view>
		
		<scroll-view scroll-y="true" class="body">
			<!-- 焦点不在搜索框，且有搜索内容时展示下列内容 -->
			<view class="on-blur" v-if="!searchFocus&&searchWord.length>0">
				<view class="order-list" v-if="orderListShow.length>0">
					<view class="order-item"  v-for="(item, index) in orderListShow">
						<yd-order-overview :comList="item.comList"></yd-order-overview>
						<u-tag class="buy-again" text="再次购买" color="red" bg-color="rgba(253,88,47, .1)" 
						border-color="#FD582F" mode="light" shape="circle" @tap="buyAgain"></u-tag>
					</view>
				</view>
				<view class="no-order" v-else>
					<image  class="no-order-img" src="../../static/image/search-order.png" mode="aspectFit"></image>
					<view class="no-order-text">您还没有相关订单</view>
				</view>
			</view>
			<!-- 焦点在搜索框，且搜索内容为空展示下列内容-->
			<view class="on-focus" v-else>
				<view class="title">
					我买过的
				</view>
				<u-waterfall class="com-list" v-model="orderList[0].comList">
					<template v-slot:left="{leftList}">
						<view class="com-item" v-for="(item, index) in leftList" :key="index">
							<image src="../../static/image/commodity.png" mode="aspectFit"></image>
							<view class="text">
								<text>{{item.brand}}</text>
								<text>{{item.name}}</text>
								<text>{{item.specifications}}</text>
								<text>{{item.desc}}</text>
							</view>
						</view>
					</template>
					<template v-slot:right="{rightList}">
						<view class="com-item" v-for="(item, index) in rightList" :key="index">
							<image src="../../static/image/commodity.png" mode="aspectFit"></image>
							<view class="text">
								<text>{{item.brand}}</text>
								<text>{{item.name}}</text>
								<text>{{item.specifications}}</text>
								<text>{{item.desc}}</text>
							</view>
						</view>
					</template>
				</u-waterfall>
			</view>
			
		</scroll-view>
		
	</view>
</template>

<script>
	import {titleReset} from "../../common/mixin.js"
	
	export default {
		mixins:[titleReset],
		data() {
			return {
				searchFocus: false,
				searchWord: '',
				orderList: [],
			}
		},
		created() {
			this.orderList = this.$store.state.orderList.slice(0, 100);
		},
		mounted() {
			document.title = '大药房';
			this.searchFocus = true;
			console.log(this.orderList);
		},
		computed: {
			orderListShow() {
				return this.orderList;
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({});
			},
			buyAgain() {
				uni.showToast({
					title: '商品已在购物车等你啦'
				})
			},
			focusSearch() {
				this.searchFocus = true;
			},
			blurSearch() {
				this.searchFocus = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
.page{
	background-color: $page-bgc;
	height: 100vh;
	width: 100vw;
	
	.head{
		padding: 20rpx 20rpx;
		.navi-bar{
			height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.search{
				width: 780rpx ;
			}
			
		}
}

	.body{
		height: calc(100vh - 216rpx);
		.order-list{
			.order-item{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: flex-end;
				height: 300rpx;
				border-radius: 20rpx;
				margin-top: 20rpx;
				padding: 0 20rpx;
				background-color: white;
			}
		}
		.no-order{
			display: flex;
			flex-wrap: wrap;
			// align-items: center;
			justify-content: center;
			height: 400rpx;
			padding: 40rpx 0rpx;
			.no-order-img{
				width: 180rpx;
				height: 180rpx;
			}
			.no-order-text{
				width: 100%;
				height: 50rpx;
				text-align: center;
				font-size: 30rpx;
				color: gray;
			}
		}
	}
}

.on-focus{
	padding: 0 30rpx;
	.title{
		height: 88rpx;
		line-height: 88rpx;
		font-size: 35rpx;
		font-weight: bold;
	}
	.com-list{
		.com-item{
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			margin: 10rpx;
			background-color: white;
			border-radius: 20rpx;
			
			image{
				width: 300rpx;
				height: 300rpx;
				margin-bottom: 20rpx;
				border-radius: 20rpx;
			}
			.text{
				margin: 10rpx;
				font-size: 28rpx;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp:2;
				overflow: hidden;
				white-space:pre-wrap;
				
				text{
					margin-right: 15rpx;
				}
			}
		}
	}
}
</style>
