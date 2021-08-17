<template>
	<u-popup v-model="isShow" mode="bottom" :closeable="true" @close="popClose">
		<view class="content">
			<view class="head">
				药品说明书
			</view>
			
			<view class="body">
				<scroll-view class="scroll" scroll-y="true">
					<view>
						<view class="tr">
							<view class="left">功能主治</view>
							<view class="right">补气养血。用于气血两虚，头晕目眩，心悸失眠，食欲不振及贫血</view>
						</view>
						<view class="tr" v-for="item in 8">
							<view class="left">用法用量</view>
							<view class="right">口服，1次20ml(1支),1日3次</view>
						</view>
						<view class="tr">
							<view class="left">不良反应</view>
							<view class="right">尚不明确</view>
						</view>
					</view>
				</scroll-view>
			</view>
			
			<view class="foot">
				<u-button type="error" shape="circle" :customStyle="btnConfirmStyle" @tap="popClose">确定</u-button>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: "intructionPop",
		props: {
			comShow: {
				type: Boolean,
				default: false,
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
				font-size: 28rpx;
				.left{
					padding: 20rpx;
					width: 30%;
					
					color: #808080;
				}
				.right{
					padding: 20rpx;
					width: 70%;
					color: black;
				}
			}
		}
	}
	.foot{
		height: 100rpx;
	}
}
</style>
