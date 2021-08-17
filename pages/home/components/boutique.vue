<template>
	<view>
		<u-swiper :list="swiperList" height="400"></u-swiper>
		<view class="recommand-box" @tap="clickRecommand" ref="recomBox">
			<view class="recommand-item" v-for="(item, index) in recommandList" :key="item.text" :data-index="index">
				<image class="recommand-img" :src="item.image" mode="aspectFill" :data-index="index"></image>
				<view class="recommand-text" :data-index="index">{{item.text}}</view>
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
			<view class="more-box" ref="moreBox1">
				<view class="more-tabs-wrap" :class="{'more-tabs-wrap-fixed': moreTabFixed[0]}">
					<view class="more-tabs"  @tap="clickMoreTab($event, 0)" ref="moreTabs1">
						<view class="more-tab-item" :class="{'more-tab-item-a': currentMoreTab1==index}" v-for="(item, index) in moreCateList[0]" 
						:key='item' :data-index="index">{{item}}</view>
					</view>
				</view>
				<view class="more-list">
					<view class="more-list-item" v-for="item in moreComMap.get(moreCateList[0][currentMoreTab1])">
						<view class="more-list-item-img">
							<image src="../../../static/image/commodity.png" mode="aspectFit"></image>
						</view>
						<view class="more-list-item-desc">
							<text>{{item.brand}}</text>
							<text>{{item.type}}</text>
							<text>{{item.name}}</text>
							<text>{{item.specificans}}</text>
							<text>{{item.desc}}</text>
						</view>
						<view class="more-list-item-price">
							<u-icon name="rmb" size="12"></u-icon>
							{{item.price}}
						</view>
					</view>
				</view>
			</view>
			<view class="more-box" ref="moreBox2">
				<view class="more-tabs-wrap" :class="{'more-tabs-wrap-fixed': moreTabFixed[1]}">
					<view class="more-tabs"  @tap="clickMoreTab($event, 1)" ref="moreTabs2">
						<view class="more-tab-item" :class="{'more-tab-item-a': currentMoreTab2==index}" v-for="(item, index) in moreCateList[1]" 
						:key='item' :data-index="index">{{item}}</view>
					</view>
				</view>
				<view class="more-list">
					<view class="more-list-item" v-for="item in moreComMap.get(moreCateList[1][currentMoreTab2])">
						<view class="more-list-item-img">
							<image src="../../../static/image/commodity.png" mode="aspectFit"></image>
						</view>
						<view class="more-list-item-desc">
							<text>{{item.brand}}</text>
							<text>{{item.type}}</text>
							<text>{{item.name}}</text>
							<text>{{item.specificans}}</text>
							<text>{{item.desc}}</text>
						</view>
						<view class="more-list-item-price">
							<u-icon name="rmb" size="12"></u-icon>
							{{item.price}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bouti-com-list-wrap" ref="boutiComList" :class="{'bouti-com-list-wrap-a':tabFixed}">
			<u-grid :col="4" class='com-list-tabs' :border="false" hoverClass="none">
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
				moreTabFixed: [false, false],
				moreTabRange: [{top: 0, bottom: 0},{top: 0, bottom: 0}],
				currentMoreTab1: 0,
				currentMoreTab2: 0,
				moreComMap: null,
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
						"text": "维钙营养",
					},
					{
						"image": "../../static/image/recommand-icon.png",
						"text": "补益用药",
					},
					{
						"image": "../../static/image/recommand-icon.png",
						"text": "肠胃消化",
					},
					{
						"image": "../../static/image/recommand-icon.png",
						"text": "皮肤用药",
					},
					{
						"image": "../../static/image/recommand-icon.png",
						"text": "男性健康",
					},
					{
						"image": "../../static/image/recommand-icon.png",
						"text": "五官用药",
					},
					{
						"image": "../../static/image/recommand-icon.png",
						"text": "肝胆用药",
					},
					{
						"image": "../../static/image/recommand-icon.png",
						"text": "呼吸系统",
					},
					{
						"image": "../../static/image/recommand-icon.png",
						"text": "心脑血管",
					},
					{
						"image": "../../static/image/recommand-icon.png",
						"text": "神经用药",
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
		created() {
			this.initTestData();
			
		},
		mounted() {
			//获取商品列表tabbar顶部
			let info = this.$refs.boutiComList.$el.getBoundingClientRect()
			this.tabOffTop = info.top;
			
			//获取更多推荐模块(more)两个子框的顶部和底部
			let moreTabH = this.$refs.moreTabs1.$el.offsetHeight;
			info = this.$refs.moreBox1.$el.getBoundingClientRect();
			this.moreTabRange.splice(0, 1, Object.assign({}, {top: info.top, bottom: info.bottom-moreTabH}));
			info = this.$refs.moreBox2.$el.getBoundingClientRect();
			this.moreTabRange.splice(1, 1, Object.assign({}, {top: info.top, bottom: info.bottom-moreTabH}));
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
			initTestData() {
				//初始化测试数据
				this.moreComMap = new Map();
				for(let item of ['维钙营养', '补益用药', '过敏克星', '脱发白发','心脑血管', '神经系统', '肝胆用药', '消化系统',]){
					let tmp = []
					for(let i=0; i<6; i++){
						let obj = Object.assign({}, this.commodity);
						obj.brand = item;
						tmp.push(obj);
					}
					this.moreComMap.set(item, tmp);
				}
			},
			clickRecommand(e) {
				uni.navigateTo({
					url: '/pages/search/search?text='+this.recommandList[e.target.dataset.index].text,
				});
				
			},
			comListTabClick(index) {
				if(this.currentComTab==3&&index==3){
					this.ascending = !this.ascending;
					return;
				}
				this.currentComTab = index;
			},
			clickMoreTab(e, moreListIndex){
				if(moreListIndex==0){
					this.currentMoreTab1 = e.target.dataset.index;
				}else{
					this.currentMoreTab2 = e.target.dataset.index;
				}
			},
			//商品列表动态吸顶
			isComListTabFixed(val) {
				if(val.secondScrollY+this.redundancy>=this.tabOffTop&&!this.tabFixed){
					this.tabFixed = true;
				}else if(val.secondScrollY+this.redundancy<this.tabOffTop&&this.tabFixed){
					this.tabFixed = false;
				}
			},
			isMoreTabFixed(val) {
				if((val.secondScrollY+this.redundancy>=this.moreTabRange[0].top)&&(val.secondScrollY+this.redundancy<this.moreTabRange[0].bottom)){
					this.moreTabFixed.splice(0, 1, true);
				}else if((val.secondScrollY+this.redundancy<this.moreTabRange[0].top)||(val.secondScrollY+this.redundancy>=this.moreTabRange[0].bottom)){
					this.moreTabFixed.splice(0, 1, false);
				}
				if((val.secondScrollY+this.redundancy>=this.moreTabRange[1].top)&&(val.secondScrollY+this.redundancy<this.moreTabRange[1].bottom)){
					this.moreTabFixed.splice(1, 1, true);
				}else if((val.secondScrollY+this.redundancy<this.moreTabRange[1].top)||(val.secondScrollY+this.redundancy>=this.moreTabRange[1].bottom)){
					this.moreTabFixed.splice(1, 1, false);
				}
			}
		},
		watch: {
			//二级滚动窗的位置
			scrollInfo(val) {
				this.isComListTabFixed(val);
				this.isMoreTabFixed(val);
			}
		}
	}
</script>

<style lang="scss" scoped>
.recommand-box{
	display: flex;
	flex-wrap: wrap;
	height: 300rpx;
	width: 100%;
	justify-content: space-around;
	padding: 10rpx 0;
	border-radius: 1rpx;
	background-color: white;
	.recommand-item{
		width: 18%;
		height: 150rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	
		.recommand-img{
			width: 100rpx;
			height: 100rpx;
			border-radius: 40rpx;
		}
		
		.recommand-text{
			font-size: 12rpx;
		}
	}
}

.bouti-com-list-wrap{
	// margin-top: 15rpx;
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
	margin-bottom: 20rpx;
	.more-title{
		color: green;
		font-weight: bolder;
		font-size: 40rpx;
		color: #003a6c;
		padding-left: 20rpx;
		margin-bottom: 20rpx;
	}
	.more-box{
		.more-tabs-wrap{
			
			.more-tabs{
				display: flex;
				justify-content: space-between;
				height: 60rpx;
				width: 100%;
				padding: 0 20rpx;
				background-color: white;
				
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
		.more-tabs-wrap-fixed{
			&::before{
				content: '';
				display: block;
				height: 60rpx;
				width: 100%;
			}
			.more-tabs{
				position: fixed;
				z-index: 999;
				top: 0;
			}
		}
		
		.more-list{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.more-list-item{
				width: 230rpx;
				height: 340rpx;
				padding-bottom: 10rpx;
				.more-list-item-img{
					width: 220rpx;
					height: 220rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				.more-list-item-desc{
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp:2;
					overflow: hidden;
					white-space:pre-wrap;
				}
				.more-list-item-price{
					color: red;
					font-size: 30rpx;
				}
			}
		}
	}
}
</style>