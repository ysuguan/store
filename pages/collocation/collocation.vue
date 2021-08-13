<template>
	<scroll-view class="page-wrap" :scroll-y="true">
		<view class="content">
			<view class="col-item">
				<view class="img" :style="getItemStyle()">
					<view class="desc">
						<view class="desc-title">营养补钙补充维生素</view>
						<view class="desc-detail">高钙量好吸收补充营养多维守护健康，用于冠心病、高脂血症合并心力衰竭，琥珀酸美托洛尔属于β受体阻滞剂，能改善和改进生活状态</view>
					</view>
				</view>
				<view class="detail">
					<view class="up-side">
						<view class="commodity">
							<view class="com-img" :style="getComStyle()">
							</view>
							<view class="text-box">
								<view class="select" @tap="showOptions">
									<view class="option-text" >钙尔奇碳酸钙100片</view>
									<u-icon name="arrow-down" size="8"></u-icon>
								</view>
								<view class="single-price">
									￥229.00
								</view>
							</view>
						</view>
						<view class="commodity">
							<view class="com-img" :style="getComStyle()">
							</view>
							<view class="text-box">
								<view class="select">
									<view class="option-text" @tap="showOptions">钙尔奇碳酸钙100片</view>
									<u-icon name="arrow-down" size="8"></u-icon>
								</view>
								<view class="single-price">
									￥229.00
								</view>
							</view>
						</view>
					</view>
					<view class="down-side">
						<view class="total-price">
							共1件，合计: 
							<u-icon name="rmb" size="15" color="#FC3C2D"></u-icon>
							<text class="price-num">229.00</text>
						</view>
						<u-button class="add-cart" type="error" shape="circle" :customStyle="btnCartStyle" @tap="showDetail">加入购物车</u-button>
					</view>
				</view>
			</view>
			<view class="title">
				<view class="icon-wrap">
					<u-icon name="bag-fill" color="#EB4F56" size="40"></u-icon>
				</view>
				<view class="text-wrap">更多店铺搭配</view> 
			</view>
			<view class="col-item" v-for="item in 5">
				<view class="img" :style="getItemStyle()">
					<view class="desc">
						<view class="desc-title">营养补钙补充维生素</view>
						<view class="desc-detail">高钙量好吸收补充营养多维守护健康，用于冠心病、高脂血症合并心力衰竭，琥珀酸美托洛尔属于β受体阻滞剂，能改善和改进生活状态</view>
					</view>
				</view>
				<view class="detail">
					<view class="up-side">
						<view class="commodity">
							<view class="com-img" :style="getComStyle()">
							</view>
							<view class="text-box">
								<view class="select" @tap="showOptions">
									<view class="option-text">钙尔奇碳酸钙100片</view>
									<u-icon name="arrow-down" size="8"></u-icon>
								</view>
								<view class="single-price">
									￥229.00
								</view>
							</view>
						</view>
						<view class="commodity">
							<view class="com-img" :style="getComStyle()">
							</view>
							<view class="text-box">
								<view class="select">
									<view class="option-text">钙尔奇碳酸钙100片</view>
									<u-icon name="arrow-down" size="8"></u-icon>
								</view>
								<view class="single-price">
									￥229.00
								</view>
							</view>
						</view>
					</view>
					<view class="down-side">
						<view class="total-price">
							共1件，合计: 
							<u-icon name="rmb" size="15" color="#FC3C2D"></u-icon>
							<text class="price-num">229.00</text>
						</view>
						<u-button class="add-cart" type="error" shape="circle" :customStyle="btnCartStyle" @tap="showDetail">加入购物车</u-button>
					</view>
				</view>
			</view>
		</view>
		<view>
			<u-toast ref="toast" :style="{backgroundColor:'black'}"></u-toast>
		</view>
		<view>
			<!--加入购物车弹出层 -->
			<yd-select-popup v-if="popNew" :comShow="selectPopShow" @popClose="popClose" :commitUrl="'commitUrl23'" @addCart="addCart"></yd-select-popup>
		</view>
		<view class="go-collocation" @tap="goBack">
			<u-icon name="arrow-left" size="50" color="white"></u-icon>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				selectPopShow: false,
				popNew: true,
			}
		},
		mounted() {
			
		},
		computed:{
			btnCartStyle() {
				return {
					height: '70rpx',
					width: '200rpx',
					background: 'linear-gradient(to right, #FC3C2D, #FF9933)',
					margin: 0,
				}
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({});
			},
			showDetail() {
				this.selectPopShow = true;
			},
			addCart(args) {
				this.selectPopShow = false;
				this.popNew = false;
				this.$nextTick(function(){
					this.popNew = true;
				})
				if(args.res=='success'){
					this.$refs.toast.show({
						title: '加入购物车成功',
					})
				}else{
					this.$refs.toast.show({
						title: '添加失败：'+args.res,
					})
				}
			},
			showOptions() {
				console.log(123);
			},
			getItemStyle() {
				let item = require("../../static/image/commodity.png");
				return {
					background: `url(${item}) no-repeat center`, backgroundSize: '100% 100%',
				};
			},
			getComStyle() {
				let item = require("../../static/image/commodity.png");
				return {
					background: `url(${item}) no-repeat center`, backgroundSize: '100% 100%',
				};
			},
			popClose() {
				this.selectPopShow = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
$title-height: 50rpx;
$border-raduis: 20rpx;

.page-wrap {
	background-color: black;
	height: 100vh;
}
.content{
	margin: 0 20rpx;
	
	.col-item{
		border-radius: $border-raduis;
		height: 1300rpx;
		background-color: white;
		margin-bottom: 20rpx;
		.img{
			display: flex;
			align-items: flex-end;
			padding: 10rpx 20rpx;
			height: 800rpx;
			width: 100%;
			border-radius: $border-raduis;
			
			.desc{
				width: 500rpx;
				height: 140rpx;
				padding-left: 20rpx;
				color: white;
				border-radius: $border-raduis;
				background-color: rgba(0, 0, 0, .5);
				
				.desc-title{
					height: 60rpx;
					line-height: 60rpx;
					font-size: 30rpx;
					font-weight: bolder;
				}
				.desc-detail{
					font-size: 20rpx;
					text-align: center;
					
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp:2;
					overflow: hidden;
					white-space:pre-wrap;
				}
			}
		}
		
		.detail{
			height: 500rpx;
			padding: 10rpx 20rpx 0 20rpx;
			.up-side{
				display: flex;
				flex-wrap: nowrap;
				height: 380rpx;
			}
			.down-side{
				display: flex;
				flex-wrap: nowrap;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 100rpx;
				
				.total-price{
					color: gray;
					.price-num{
						font-weight: bolder;
						font-size: 40rpx;
						color: $basic-color;
					}
				}
			}
		}
	}
	
	.title{
		display: flex;
		flex-wrap: nowrap;
		color: white;
		margin-bottom: 20rpx;
		.icon-wrap{
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 20rpx;
			height: $title-height;
			width: $title-height;
			border-radius: $title-height/2;
			background-color: white;
		}
		.text-wrap{
			height: $title-height;
			line-height: $title-height;
		}
	}
}

.commodity{
	height: 360rpx;
	width: 260rpx;
	border:1px solid $basic-color;
	border-radius: $border-raduis;
	margin-right: 10rpx;
	.com-img{
		height: 240rpx;
		border-radius: $border-raduis;
	}
	.text-box{
		padding:10rpx 20rpx;
		height: 120rpx;
		.select{
			display: flex;
			flex-wrap: nowrap;
			height: 40rpx;
			padding: 0 30rpx;
			background-color: #F8F8F8;
			border-radius: 20rpx;
			padding: 2rpx 15rpx;
			.option-text{
				font-size: 9rpx;
				
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp:1;
				overflow: hidden;
				white-space:pre-wrap;
			}
		}
		.single-price{
			margin-top: 20rpx;
			color: $basic-color;
		}
	}
}
.go-collocation{
	position: fixed;
	top: 30rpx;
	left: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 60rpx;
	width: 60rpx;
	border-radius: 30rpx;
	background-color: rgba($color: #000000, $alpha: .3);
}
</style>
