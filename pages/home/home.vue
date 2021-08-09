<template>
	<view class="page-wrap">
		<view class="app-bg">
			<view class="app-bg-cover"></view>
		</view>
		<view class="content-wrap" ref="contentWrap">
			<scroll-view class="primary-scroll" scroll-y="true" @scroll='scrollPrimary'>
				<view class="search-wrap">
					<yd-naviSearch :opacityAlive="primaryScrollY" :customWidth="contentWidth" :top="searchOffsetTop"></yd-naviSearch>
				</view>
				<u-sticky ref="tabList" class="box-common" bg-color="transparent" offset-top="0" h5-nav-height="0">
					<u-tabs class="tabList" :list="tabList" :is-scroll="false" :current="currentTabIndex" 
					@change="tabChange" bg-color="transparent" inactive-color="white" active-color="white">
					</u-tabs>
				</u-sticky>
				
				<scroll-view class="second-scroll" :scroll-y="secondAllow" >
					<view class="content-box">
						<u-swiper class="box-common" :list="swiperList" height="400"></u-swiper>
						
						<view class="recommand-box box-common">
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
					</view>
				</scroll-view>
			</scroll-view>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				primaryScrollY: 0,
				currentTabIndex: 0,
				contentWidth: 0,
				searchOffsetTop: 20,
				tabList: [
					{"name": "精选"},
					{"name": "商品"},
					{"name": "活动"},
					{"name": "新品"},
					{"name": "搭配购"},
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
					"img": '../../static/image/commodity.png',
					"text": "香雪抗病毒口服液18支风热感冒药流感咳嗽发热口液流鼻涕清热去痰",
					"price": 225,
				},
				
				
				secondAllow: true,
			}
		},
		mounted() {
			this.contentWidth = this.$refs.tabList.$el.offsetWidth;
		},
		computed:{
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
			tabChange(e){
				this.currentTabIndex = e;
			},
			scrollPrimary(e){
				this.primaryScrollY = e.detail.scrollTop;
			},
			
		}
	}
</script>

<style lang="scss" scoped>
.primary-scroll{
	height: calc(100vh - 50px);
}

.second-scroll{
	height: calc(100vh - 90px);
}

.app-bg{
	position: fixed;
	z-index: -1;
	height: 33vh;
	width: 100vw;
	background-image: url(../../static/image/app-bg.jpeg);
	background-size: cover;
	
	.app-bg-cover{
		height: 33vh;
		width: 100vw;
		background: linear-gradient(rgba(14, 123, 254, .3), rgba(256,256,256,1));
	}
}

/deep/ u-sticky{
	width:100%;
	
}
.content-wrap {
	z-index: 10;
	padding: 0 20rpx;
	.content-box {
		width: 100%;
		background-color: #f0f0f0;
		border-radius: 10rpx;
	}
}

//各个区块共有的布局
.box-common{
	margin-top: 20rpx;
}

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

</style>
