<template>
	<u-popup v-model="isShow" mode="bottom" :closeable="true">
		<view class="content">
			<view class="head">
				<view>支付方式</view>
			</view>
			
			<view class="body">
				<u-tag class="mode-item" :class="{'mode-item-a': currentMode==index}" v-for="(item, index) in modeList" :text="item" mode="light" shape="circle" bg-color="#F2F2F2" borderColor="#F2F2F2" color="black" @tap="changeMode(index)"></u-tag>
			</view>
			
			<view class="bottom">
				<u-button type="error" shape="circle" :customStyle="btnConfirmStyle" @tap="popClose">确定</u-button>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: "payModePop",
		props: {
			comShow: {
				type: Boolean,
				default: false,
			},
			modeList: {
				type: Array,
				default: () => {
					return ['货到付款','在线支付',]
				}
			}
		},
		data() {
			return {
				isShow: false,
				currentMode: 0,
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
				this.$emit('popClose', this.modeList[this.currentMode]);
			},
			changeMode(index) {
				this.currentMode = index;
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
.content{
	height: 950rpx;
	padding: 30rpx;
	.head{
		display: flex;
		align-items: center;
		height: 100rpx;
		font-size: 35rpx;
		font-weight: bold;
		padding: 20rpx 0;
	}
	.body{
		height: 700rpx;
		.mode-item{
			margin: 20rpx;
		}
		.mode-item-a{
			font-weight: bold;
			color:red !important;
			border: 1rpx solid $basic-color !important;;
			background-color: rgba($color: $basic-color, $alpha: .1) !important;;
		}
	}
	.bottom{
		height: 100rpx;
	}
}
</style>
