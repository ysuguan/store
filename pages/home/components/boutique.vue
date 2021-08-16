<template>
	<view>
		<u-swiper :list="swiperList" height="400"></u-swiper>
		<view class="recommand-box">
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
		
		<view class="more">
			<view class="more-title">
				更多值得买
			</view>
			<view class="more-box">
				<view class="more-tabs"  @tap="clickMoreTab($event, 0)">
					<view class="more-tab-item" v-for="(item, index) in moreCateList[0]" :key='item' :id="index">{{item}}</view>
				</view>
				<view class="more-list">
					
				</view>
			</view>
			<view class="more-box">
				
			</view>
		</view>
		
		<view class="bouti-com-list-wrap" ref="boutiComList" :class="{'bouti-com-list-wrap-a':tabFixed}">
			<u-grid :col="4" class='com-list-tabs' :border="false" >
				<u-grid-item class="com-list-tabs-item" :class="{'com-list-tabs-item-a': currentComTab==0}" @tap='comListTabClick(0)'>推荐</u-grid-item>
				<u-grid-item class="com-list-tabs-item" :class="{'com-list-tabs-item-a': currentComTab==1}" @tap='comListTabClick(1)'>销量</u-grid-item>
				<u-grid-item class="com-list-tabs-item" :class="{'com-list-tabs-item-a': currentComTab==2}" @tap='comListTabClick(2)'>新品</u-grid-item>
				<u-grid-item class=" com-list-tabs-item" :class="{'com-list-tabs-item-a': currentComTab==3}" @tap='comListTabClick(3)'>
					<view class="com-tab-price">
						<text>价格</text>
						<view class="price-icon">
							<u-icon name="arrow-up-fill" size="5" :color="!ascending&&currentComTab==3?'red':'gray'"></u-icon>
							<u-icon name="arrow-down-fill" size="5" :color="ascending&&currentComTab==3?'red':'gray'"></u-icon>
						</view>
					</view>
				</u-grid-item>
			</u-grid>
				
			<view class="bouti-com-list">
				<view class="bouti-com-item" v-for="item in 30">
					<view class="bouti-com-item-image">
						<image src="../../../static/image/commodity.png" mode="aspectFit"></image>
					</view>
					<view class="bouti-com-item-desc">
						<text>{{commodity.brand}}</text>
						<text>{{commodity.type}}</text>
						<text>{{commodity.name}}</text>
						<text>{{commodity.specificans}}</text>
						<text>{{commodity.desc}}</text>
					</view>
					<view class="bouti-com-item-price">
						<u-icon name="rmb" size="3"></u-icon>
						{{commodity.price}}
					</view>
					<view class="bouti-com-item-comment">
						<text>100万+条评价</text>
						<text>好评率98%</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'boutique',
		props:{
			scrollInfo: {
				type: Object,
				default: () => {
					return {}
				}
			},
			//tabbar吸顶高度冗余量，传入的是主页一级滚动框内容高度
			redundancy: {
				type: Number,
				default: 0,
			},
		},
		data() {
			return {
				currentComTab: 0,
				ascending: false,
				tabOffTop:0,
				tabFixed: false,
				currentMoreTab1: 0,
				currentMoreTab2: 0,
				moreCateList: [
					['维钙营养', '补益用药', '过敏克星', '脱发白发',],
					['心脑血管', '神经系统', '肝胆用药', '消化系统',],
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
					"img": '../../../static/image/commodity.png',
					"text": "香雪抗病毒口服液18支风热感冒药流感咳嗽发热口液流鼻涕清热去痰",
					'brand':'007牌',
					"type": '甲乙丙',
					"name": '抗病毒口服液',
					"specificans": '18支',
					"desc": '风热感冒药流感咳嗽发热口液流鼻涕清热去痰',
					"price": 225,
				},
			}
		},
		mounted() {
			let info = this.$refs.boutiComList.$el.getBoundingClientRect()
			this.tabOffTop = info.top;
		},
		computed: {
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
		},
		methods: {
			comListTabClick(index) {
				if(this.currentComTab==3&&index==3){
					this.ascending = !this.ascending;
					return;
				}
				this.currentComTab = index;
			},
			clickMoreTab(e, moreListIndex){
				if(moreListIndex==0){
					console.log(e);
				}
			}
			
		},
		watch: {
			//二级滚动窗的位置
			scrollInfo(val) {
				// console.log(val.secondScrollY, this.tabOffTop, this.redundancy);
				if(val.secondScrollY+this.redundancy>=this.tabOffTop&&!this.tabFixed){
					this.tabFixed = true;
				}else if(val.secondScrollY+this.redundancy<this.tabOffTop&&this.tabFixed){
					this.tabFixed = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
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

.bouti-com-list-wrap{
	margin-top: 15rpx;
	background-color: $page-bgc;

	.com-list-tabs{
		.com-list-tabs-item{
			height: 80rpx;
		}
		
		.com-list-tabs-item-a{
			color: $basic-color;
		}
		
		.com-tab-price{
			display: flex;
			align-items: center;
			.price-icon{
				display: flex;
				margin-left: 10rpx;
				width: 20rpx;
				flex-wrap: wrap;
			}
		}
	}
	
	.bouti-com-list{
		margin-top: 10rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.bouti-com-item{
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			width: 49%;
			margin-bottom: 15rpx;
			padding: 20rpx;
			background-color: white;
			border-radius: 20rpx;
			.bouti-com-item-image{
				height: 280rpx;
				width: 280rpx;
				
				image{
					height: 100%;
					width: 100%;
				}
			}
			.bouti-com-item-desc{
				margin: 15rpx 0;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp:2;
				overflow: hidden;
				white-space:pre-wrap;
			}
			.bouti-com-item-price{
				width: 100%;
				text-align: left;
				color: red;
				font-size: 30rpx;
			}
			.bouti-com-item-comment{
				font-size: 10rpx;
				color: gray;
				
				text{
					margin-right: 10rpx;
				}
			}
		}
	}
}

.bouti-com-list-wrap-a{
	&::before{
		content: '';
		display: block;
		height: 80rpx;
		width: 10rpx;
	}
	.com-list-tabs{
		position: fixed;
		top: 0;
		z-index: 1000;
	}
}

.more{
	background-color: white;
	
	.more-title{
		color: green;
		font-weight: bolder;
		font-size: 40rpx;
		color: #003a6c;
		padding-left: 20rpx;
		margin-bottom: 20rpx;
	}
	.more-box{
		.more-tabs{
			display: flex;
			justify-content: space-between;
			margin:0 20rpx;
			
			.more-tab-item{
				padding: 10rpx 0;
				color: black;
				font-weight: 400;
			}
			
			.more-tab-item-a{
				color: $basic-color;
				font-weight: bolder;
				border-bottom: 2rpx solid $basic-color;
			}
		}
	}
}
</style>