<template>
	<u-popup v-model="isShow" mode="right" @close="popClose">
		<view class="filter">
			<view class="title">按时间</view>
			<view class="selections">
				<view class="option" :class="{'option-a': currentOption==index}" v-for="(item, index) in options" @tap="chose(index)">{{item}}</view>
			</view>
			<view class="button">
				<u-button type="default" shape="circle" size="medium" @tap="reset">重置</u-button>
				<u-button type="error" shape="circle" size="medium" @tap='confirm'>确定</u-button>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		props:{
			comShow: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				currentOption: null,
				isShow: false,
				options: ['一个月内','两个月内','三个月内','半年内','一年内']
			}
		},
		methods: {
			popClose() {
				this.$emit('filterPopClose');
			},
			chose(index) {
				this.currentOption = index;
			},
			reset() {
				this.currentOption = null;
			},
			confirm() {
				this.$emit('timeFilter', this.currentOption);
				this.popClose();
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
.filter{
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: space-between;
	height: 100vh;
	width: 500rpx;
	padding-left: 20rpx;
	.title{
		font-size: 30rpx;
		font-weight: bold;
		height: 88rpx;
		line-height: 88rpx;
	}
	.selections{
		display: flex;
		flex-wrap: wrap;
		.option{
			height: 60rpx;
			line-height: 60rpx;
			margin: 15rpx;
			padding: 0 30rpx;
			border-radius: 30rpx;
			background-color: $page-bgc;
			color: black;
		}
		.option-a{
			background-color: rgba($color: $basic-color, $alpha: .1);
			color: red;
			border: 1rpx solid $basic-color;
		}
	}
	.button{
		bottom: 300rpx;
		display: flex;
		height: 100rpx;
		align-items: center;
	}
}
</style>
