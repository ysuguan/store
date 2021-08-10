<template>
	<view class="tabs-wrap">
		<u-grid :col="3" :border="false" @click="tabClick" class="main-tab" hover-class='false'>
			<u-grid-item index="0" :bgColor="bgColor">
				<view class="tab-box" :class="{'tab-box-a': currentTab==0}">推荐</view>
			</u-grid-item>
			<u-grid-item index="1" :bgColor="bgColor">
				<view class="tab-box" :class="{'tab-box-a': currentTab==1}">销量</view>
			</u-grid-item>
			<u-grid-item index="2" :bgColor="bgColor">
				<view class="price-wrap tab-box" :class="{'tab-box-a': currentTab==2}">
					<view class="price">价格</view>
					<view class="icon-wrap">
						<view class="arrow-up" :class="{'arrow-up-select': currentTab==2, 'arrow-up-select-a': (!priceSortDown)&&currentTab==2}"></view>
						<view class="arrow-down" :class="{'arrow-down-select': currentTab==2, 'arrow-down-select-a': priceSortDown&&currentTab==2}"></view>
					</view>
				</view>
			</u-grid-item>
		</u-grid>
		<u-grid :col="2" class="condition" :border="false" @click="filterClick" hover-class='false'>
			<u-grid-item :bgColor="bgColor" index="0">
				<view class="stack-only">
					<u-icon name="checkbox-mark" size="10" :color="this.stackOnly?'white':'transparent'"></u-icon> <view>仅看有货</view>
				</view>
			</u-grid-item>
			<u-grid-item :bgColor="bgColor" index="1">
				<view class="image-wrap">
					<image class="performance" :src="modeImage[showMode]"></image>
				</view>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	export default {
		name:"yd-commodity-tabs",
		props:{
			bgColor: {
				type: String,
				default: 'transparent'
			},
		},
		data() {
			return {
				stackOnly: false,
				currentTab: 0,
				priceSortDown: true,
				
				showMode: 1,
				modeImage: [
					"../../static/image/flow-list.svg",
					"../../static/image/flow-block.svg",
				]
			};
		},
		computed:{
			tabImage() {
				return 
			}
		},
		methods: {
			emit(){
				this.$emit('commodityTabsClick', {currentTab: this.currentTab, priceSortDown: this.priceSortDown, stackOnly: this.stackOnly, showMode: this.showMode});
			},
			tabClick(index){
				//先对价格标签特殊处理
				if(index==2&&this.currentTab==2){
					this.priceSortDown = !this.priceSortDown;
				}
				this.currentTab = index;
				this.emit();
			},
			filterClick(index){
				if(index==0){
					this.stackOnly = !this.stackOnly;
				}else{
					this.showMode = this.showMode==0?1:0;
				}
				this.emit();
			}
			
		}
	}
</script>

<style lang="scss" scoped>

$tab-wrap-height: 100%;
//uniapp提供的原生icon最小尺寸太大，自己画一个
$arrow-size: 16rpx;
$tab-box-height: 40rpx;
$tab-box-width: 100rpx;
	
.tabs-wrap{
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	height: $tab-wrap-height;
	color: white;
	.main-tab{
		width: 60%;
		height: 100%;
		.price-wrap{
			display: flex;
			align-items: center;
			.price{
				margin-right: 10rpx;
			}
			.icon-wrap{
				display: flex;
				flex-wrap: wrap;
				width: 20rpx;
				height: 100%;
				align-content: space-between;
				
				.arrow-up{
					height: $arrow-size;
					width: $arrow-size;
					border-top: $arrow-size/2 solid transparent;
					border-left: $arrow-size/2 solid transparent;
					border-right: $arrow-size/2 solid transparent;
					border-bottom: $arrow-size/2 solid white;
					margin-bottom: 5rpx;
				}
				.arrow-up-select{
					border-bottom: $arrow-size/2 solid black;
				}
				
				.arrow-up-select-a{
					border-bottom: $arrow-size/2 solid red;
				}
				.arrow-down{
					height: $arrow-size;
					width: $arrow-size;
					border-top: $arrow-size/2 solid white;
					border-left: $arrow-size/2 solid transparent;
					border-right: $arrow-size/2 solid transparent;
					border-bottom: $arrow-size/2 solid transparent;
				}
				.arrow-down-select{
					border-top: $arrow-size/2 solid black;
				}
				
				.arrow-down-select-a{
					border-top: $arrow-size/2 solid red;
				}
			}
		}
	}
	
	.condition {
		width: 40%;
		height: 100%;
		
		.stack-only{
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			height: 100%;
		}
		.image-wrap{
			height: 100%;
			
			border-left: 1px solid white;
			.performance{
				margin-left: 20rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
}







.tab-box{
	text-align: center;
	// height: $tab-box-height;
	width: $tab-box-width;
}

.tab-box-a{
	background-color: white;
	color: red;
	border-radius: $tab-box-height/2;
}


/deep/.u-grid-item-box{
	padding:0 !important;
}
</style>
