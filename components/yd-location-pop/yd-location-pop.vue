<template>
	<u-popup v-model="isShow" mode="bottom" :closeable="true" @close="popClose">
		<view class="content">
			<view class="head">
				配送至
			</view>
			
			<view class="body">
				<scroll-view class="scroll" scroll-y="true">
					<view @tap="changeLocation">
						<view class="tr">
							<view class="left">
								<u-icon name="checkbox-mark" color="red" size="30" :data-index="address.chose"></u-icon>
							</view>
							<view class="right">
								<view class="title" :data-index="address.chose">江苏省苏州市</view>
								<view class="detail" :data-index="address.chose">
									<text :data-index="address.chose">{{address.all[address.chose]}}</text>
								</view>
							</view>
						</view>
						<view class="tr" v-for="(item, index) in address.all" v-if="index!=address.chose" :data-index="index">
							<view class="left">
								<u-icon name="map" size="30"  :data-index="index"></u-icon>
							</view>
							<view class="right">
								<view class="title"  :data-index="index">江苏省苏州市</view>
								<view class="detail">
									<text  :data-index="index">{{item}}</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			
			<view class="foot">
				<u-button type="error" shape="circle" :customStyle="btnConfirmStyle" @tap="popClose">新增收货地址</u-button>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: "yd-location-pop",
		props: {
			comShow: {
				type: Boolean,
				default: false,
			},
			address: {
				type: Object,
				required: true,
			}
		},
		data() {
			return {
				isShow: false,
			}
		},
		computed: {
			btnConfirmStyle() {
				return {
					height: '70rpx',
					background: 'linear-gradient(to right, #FC3C2D, #FF9933)',
					margin: 0,
				}
			},
		},
		methods: {
			popClose() {
				this.$emit('popClose');
			},
			changeLocation(e) {
				this.$emit('changeLocation', {chose: e.target.dataset.index});
			}
		},
		watch: {
			comShow(val, valOld) {
				this.isShow = val;
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
	height: 900rpx;
	
	.head{
		height: 100rpx;
		text-align: center;
		font-size: 40rpx;
		font-weight: bold;
		padding: 20rpx 0;
	}
	.body{
		height: 600rpx;
		margin: 30rpx 20rpx;
		
		.scroll{
			height: 600rpx;
			
			.tr{
				display: flex;
				align-items: center;
				padding: 20rpx 0;
				border-bottom: 1px solid #E4E7ED;
				.left{
					padding:20rpx
				}
				.right{
					.title{
						font-size: 30rpx;
						font-weight: bold;
					}
					.detail{
						font-size: 25rpx;
					}
				}
			}
		}
	}
	.foot{
		height: 100rpx;
	}
}
</style>
