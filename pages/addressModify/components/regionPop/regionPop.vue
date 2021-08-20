<template>
	<u-popup v-model="isShow" mode="bottom" @close="close">
		<view class="box">
			<view class="head">
				请选择所在地区
			</view>
			<view class="body">
				<scroll-view class="area" scroll-y="true" >
					<view></view>
				</scroll-view>
				<picker-view class="letters" indicator-class="indicator" mask-class="mask">
					<picker-view-column>
						<view v-for="item in 10" :key="item">{{item}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	const regions = require("./regions-sort.json");
	
	export default {
		name:"yd-pick-region",
		props: {
			comShow: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				isShow: false,
			};
		},
		mounted() {
			console.log(regions);
		},
		methods: {
			close() {
				this.$emit('regionPopClose');
			}
		},
		watch: {
			comShow(val) {
				this.isShow = val;
			}
		}
	}
</script>

<style lang="scss" scoped>
.box{
	height: 1000rpx;
	width: 100vw;
	
	.head{
		
	}
	.body{
		.letters{
			height: 800rpx;
			// width: 80rpx;
		}
		/deep/.mask{
			background-color: transparent;
			color: green;
		}
	}
}
</style>
