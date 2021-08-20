<template>
	<view>
		<u-popup v-model="isShow" mode="bottom" :closeable="true" @close="popClose">
			<view  class="content">
				<view class="head">
					<view class="head-img">
						<image :src="comInfo.img" mode="aspectFit"></image>
					</view>
					<view class="head-info">
						<view class="info-price">
							<u-icon name="rmb" color="red" size="15"></u-icon>
							{{comInfo.price}}
						</view>
						<view class="info-else">
							<text>重量:{{comInfo.weight}}kg</text>
							<text>编号:{{comInfo.id}}</text>
						</view>
					</view>
				</view>
				<view class="body">
					<scroll-view class="body-scroll" :scroll-y="true">
						<view class="types" v-if="comInfo.types!==undefined&&comInfo.types.length>0">
							<view class="title">种类</view>
							<view class="item-box">
								<u-tag class="option-item" :class="{'option-item-a': index==typeChosen}" 
								v-for="(item, index) in comInfo.types" :key="item+index" 
								:text="item" shape="circle" @tap='changeType(index)'>
								</u-tag>
							</view>
						</view>
						<view class="specifications" v-if="comInfo.specificationsList!==undefined&&comInfo.specificationsList.length>0">
							<view class="title">规格</view>
							<view class="item-box">
								<u-tag class="option-item" :class="{'option-item-a': index==speciChosen}" 
								v-for="(item, index) in comInfo.specificationsList" :key="item+index" 
								:text="item" shape="circle" @tap='changeSpeci(index)'>
								</u-tag>
							</view>
						</view>
						<view class="number">
							<view class="number-title">
								<text>数量</text>
								<text>(1件起购,最多可购买{{numberMax}}件)</text>
							</view>
							<u-number-box v-model="comInfo.number" @change="changeNumber" :min="1" :max="numberMax" inputHeight="50" inputWidth="80"></u-number-box>
						</view>
					</scroll-view>
				</view>
				<view class="foot">
					<u-button type="error" shape="circle" :customStyle="btnConfirmStyle" @tap="buyNow">确定</u-button>
				</view>
				<u-mask :show="maskShow" :customStyle="maskStyle">
					<view class="loading">
						<u-loading :show="true" mode="circle" size="40" color="red"></u-loading>
						<text>加入购物车中...</text>
					</view>
				</u-mask>
			</view>
		</u-popup>
	</view>
</template>

<script>
	//由于每次弹出都需要重置数据，操作繁琐，但是步进器v-model绑定的数量无法响应式更新，所以在使用此组件的时候每次关闭就销毁，具体操作参考collocation页面的addcart方法
	export default {
		name:"yd-select-popup",
		props: {
			comShow: {
				type: Boolean,
				default: false,
			},
			commitUrl: {
				type: String,
				default: 'url...',
				// required: true,
			},
			//商品信息
			comInfo: {
				type: Object,
				default: () => { 
					return {
						id:423404375879,
						img: '../../static/image/commodity.png',
						price: 229,
						weight: 0.12,
						number: 5,
						brand:'777牌',
						name: '感冒灵',
						types: ['甲乙丙丁', '子丑寅卯', '天地玄黄宇宙洪荒'],
						specifications: '100片',
						specificationsList: ['100片', '50片', '【70g*30片】国产高端', '【35g*100片】进口精品', '【70g*30片】国产高端', '【35g*100片】进口精品', '【70g*30片】国产高端', '【35g*100片】进口精品', '【70g*30片】国产高端', '【35g*100片】进口精品',],
					}
				}
				// required:true,
			}
		},
		data() {
			return {
				isShow: false,
				maskShow: false,
				typeChosen: 0,
				speciChosen: 0,
				number: 1,
				numberMax: 199,
			};
		},
		computed: {
			btnConfirmStyle() {
				return {
					height: '70rpx',
					background: 'linear-gradient(to right, #FC3C2D, #FF9933)',
					margin: 0,
				}
			},
			//mask高度动态获取太麻烦，硬编码了
			maskStyle() {
				return {backgroundColor: 'rgba(0,0,0,0)', height: '1000rpx', top:'100rpx'};
			}
		},
		methods: {
			//关闭弹窗时，重置mask为不可见
			popClose() {
				this.maskShow = false;
				this.$emit('popClose');
			},
			//点击确定购买，向vuex中添加待购订单，跳转至下单页面
			buyNow() {
				this.maskShow = true;
				this.$store.commit('setReadyOrder', [this.comInfo])
				this.popClose();
				uni.navigateTo({
					url: '/pages/newOrder/newOrder',
				})
			},
			changeType(index) {
				this.typeChosen = index;
			},
			changeSpeci(index) {
				this.speciChosen = index;
			},
			changeNumber() {
			},
		},
		watch: {
			comShow(val, valOld) {
				this.isShow = val;
			}
		}
	}
</script>

<style lang="scss" scoped>
$basic-color:#FD582F ;
$linear-color-start: #FC3C2D;
$linear-color-end: #FF9933;

.content{
	position: relative;
	padding: 20rpx;
	height: 1000rpx;
	
	.loading{
		position: absolute;
		top: 30%;
		left:  calc(50% - 110rpx);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		height: 120rpx;
		width: 220rpx;
		padding: 10rpx;
		color: white;
		background-color: rgba(0,0,0,.3);
		border-radius: 20rpx;
	}
	.head{
		display: flex;
		flex-wrap: nowrap;
		align-items: flex-end;
		height: 200rpx;
		
		.head-img{
			height: 200rpx;
			width: 200rpx;
			
			image{
				height: 100%;
				width: 100%;
			}
		}
		.head-info{
			margin-left: 20rpx;
			
			.info-price{
				color: $basic-color;
			}
			.info-else{
				color: gray;
				font-size: 20rpx;
				
				text:nth-child(2){
					margin-left: 20rpx;
				}
			}
		}
	}
	.body{
		height: 700rpx;
		
		.body-scroll{
			height: 880rpx;
			
			.types, .specifications{
				.title{
					margin: 20rpx 0;
					font-weight: bolder;
				}
			}
			.number{
				display: flex;
				flex-wrap: nowrap;
				justify-content: space-between;
				align-items: center;
				margin: 10rpx 0;
				
				.number-title{
					display: flex;
					flex-grow: 1;
					justify-content: space-between;
					margin-right: 10rpx;
					
					text:nth-child(1){
						font-weight:bolder;
					}
					text:nth-child(2){
						color: $basic-color;
					}
				}
			}
		}
	}
}

.option-item{
	margin: 10rpx;
	color: black;
	background-color: #F1F1F1;
	border: 1px solid transparent;
}
.option-item-a{
	color: $basic-color;
	background-color: rgba($color: $basic-color, $alpha: .1);
	border: 1px solid $basic-color;
}
</style>
