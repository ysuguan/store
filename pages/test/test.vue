<template>
	<view class="page">
		<view class="box" @tap="click">
			<yd-commodity-h v-if="mode">
				<template v-slot:remarks>
					<view style="font-size: 22rpx; color: gray;">好评如潮</view>
				</template>
			</yd-commodity-h>
			<yd-commodity-v v-else>
				<template v-slot:remarks>
					<view style="font-size: 22rpx; color: gray;">10万+好评</view>
				</template>
			</yd-commodity-v>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mode: false,
			}
		},
		computed: {
			commodityCom() {
				return this.mode?'yd-commodity-h':'yd-commodity-v';
			}
		},
		methods: {
			click(e) {
				console.log(e);
			}
		}
	}
</script>

<style lang="scss" scoped>

.page{
	display: flex;
	justify-content: center;
}

</style>
