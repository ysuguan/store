<template>
	<view class="page">
		<view class="head">
			<view class="navi-bar">
				<u-icon class="go-back" name="arrow-left" color="black" size="40" @tap="goBack"></u-icon>
				<view class="search" @tap="goOrderSearch">
					<u-search placeholder="搜索我的订单" v-model="searchWord" :showAction="false" bg-color="white"></u-search>
				</view>
				<view class="filter" @tap="showFilter">筛选</view>
			</view>
			<view class="tab-bar">
				<view v-for="(item, index) in tabList" class="tab-item" @tap="clickTab(index)">
					<view class="item-box" :class="{'item-box-a': index==currentTab}">
						{{item}}
						<view class="ring"></view>
					</view>
				</view>
			</view>
		</view>
		
		<scroll-view scroll-y="true" class="body">
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
			
			<yd-recommand-for-you :comList="orderList[0].comList"></yd-recommand-for-you>
		</scroll-view>
		
		<filter-pop :comShow="filterPopShow" @timeFilter="filterByTime" @filterPopClose='closeFilter'></filter-pop>
	</view>
</template>

<script>
	import {titleReset} from "../../common/mixin.js"
	import filterPop from "./components/filterPop.vue"
	
	export default {
		mixins:[titleReset],
		components: {
			'filter-pop': filterPop,
		},
		data() {
			return {
				filterPopShow: false,
				searchWord: '',
				currentTab: 0,
				tabList: ['全部', '待付款', '待收货', '已取消', '已完成'],
				orderList: [],
			}
		},
		created() {
			this.orderList = this.$store.state.orderList.slice(0, 100);
		},
		mounted() {
			document.title = '大药房';
		},
		computed: {
			orderListShow() {
				if(this.currentTab==0){
					return this.orderList;
				}
				return this.orderList.filter(item => item.status==this.tabList[this.currentTab]);
			}
		},
		methods: {
			goOrderSearch() {
				uni.navigateTo({
					url: "/pages/orderSearch/orderSearch",
				})
			},
			goBack() {
				uni.navigateBack({});
			},
			closeFilter() {
				this.filterPopShow = false;
			},
			filterByTime(args) {
				console.log(args);
			},
			clickTab(index) {
				this.currentTab = index;
			},
			buyAgain() {
				uni.showToast({
					title: '商品已在购物车等你啦'
				})
			},
			showFilter() {
				this.filterPopShow = true;
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
				width: 500rpx ;
			}
			.filter{
				height: 88rpx;
				line-height: 88rpx;
				font-size: 30rpx;
			}
		}
		.tab-bar{
			display: flex;
			justify-content: space-between;
			height: 88rpx;
			font-size: 30rpx;
			
			.tab-item{
				display: flex;
				justify-content: center;
				align-items: center;
				height: 60rpx;
				line-height: 60rpx;
				width: 20%;
				
				.item-box{
					position: relative;
					font-size: 30rpx;
					color: black;
				}
				
				.item-box-a{
					color: $basic-color;
					font-size: 33rpx;
					font-weight: bold;
					.ring{
						position: absolute;
						bottom: 0rpx;
						right: -15rpx;
						width: 28rpx;
						height: 28rpx;
						border-radius: 15rpx;
						border-bottom: 5rpx solid $basic-color;
						transform: rotate(-45deg);
					}
				}
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
</style>
