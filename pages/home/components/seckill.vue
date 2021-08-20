<template>
	<view class="seckill">
			<view class="seckill-head">
				<view class="seckill-tag"><view class="red-icon"></view> <view >为你推荐</view></view>
				<view class="seckill-commodity-box" >
					<yd-commodity-dynamic mode="horizontal" v-for="item in 2">
						<template v-slot:bottom>
							<view style="height: 30rpx ;font-size: 25rpx;color: #82848A;"> <del>500</del> </view>
						</template>
						<template v-slot:customButton>
							<view class="seckill-btn">
								<view>抢先看</view> 
								<u-count-down :timestamp="countDownSet.timeStamp" :color="countDownSet.color" 
								:bg-color="countDownSet.bgColor" :fontSize="countDownSet.fontSize" :height="countDownSet.height"
								:separatorSize="countDownSet.separatorSize" :separatorColor="countDownSet.separatorColor"></u-count-down>
							</view>
						</template>
					</yd-commodity-dynamic>
				</view>
				<view class="seckill-tag"><view class="red-icon"></view> <view >更多秒杀</view></view>
			</view>
			<view class="seckill-list">
				<view class="seckill-list-item" v-for="item in 12">
					<yd-commodity-dynamic mode="vertical">
						<template v-slot:bottom>
							<view style="height: 30rpx ;font-size: 25rpx;color: #82848A;"> <del>500</del> </view>
						</template>
						<template v-slot:customButton>
							<view class="seckill-btn">
								<view>抢先看</view> 
								<u-count-down :timestamp="countDownSet.timeStamp" :color="countDownSet.color" 
								:bg-color="countDownSet.bgColor" :fontSize="countDownSet.fontSize" :height="countDownSet.height"
								:separatorSize="countDownSet.separatorSize" :separatorColor="countDownSet.separatorColor"></u-count-down>
							</view>
						</template>
					</yd-commodity-dynamic>
					
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		name: 'seckill',
		data() {
			return {
				//秒杀页面倒计时按钮配置
				countDownSet: {
					timeStamp: 86400,
					color: 'white',
					bgColor: 'transparent',
					fontSize: 25,
					showBorder: false,
					height: 15,
					separatorColor: 'white',
					separatorSize: 15,
				},
			}
		},
	}
</script>

<style lang="scss" scoped>
.seckill{
	background-color: #F1F1F1;
	.seckill-head{
		.seckill-tag{
			display: flex;
			flex-wrap: nowrap;
			padding: 20rpx;
			align-items: center;
			.red-icon{
				height: 30rpx;
				width: 5rpx;
				background-color: red;
				margin-right: 20rpx;
			}
		}
		.seckill-commodity-box{
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;
			height: 480rpx;
			background-color: white;
			border-radius: 10rpx;
			
		}
	}
	
	.seckill-list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.seckill-list-item{
			width: 49%;
			height: 530rpx;
			margin-bottom: 5rpx;
		}
	}
	
	//秒杀页公用的按钮
	.seckill-btn{
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		
		height: 80rpx;
		width: 120rpx;
		font-size: 28rpx;
		border-radius: 10rpx;
		
		margin-bottom: 5rpx;
		text-align: center;
		color: white;
		background-color: #4CD964;
		
		//字体小的时候倒计时数字拥挤，调整间距
		/deep/.u-countdown-item{
			margin: 0 5rpx !important;
		}
	}
}
	
</style>