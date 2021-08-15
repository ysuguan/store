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
		
	</view>
</template>

<script>
	export default {
		name: 'boutique',
		data() {
			return {
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
					"price": 225,
				},
			}
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
			
		},
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

</style>