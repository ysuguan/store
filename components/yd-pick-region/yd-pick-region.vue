<template>
	<view class="box">
		<view class="head" v-if="chosen">
			
		</view>
		<view class="list"></view>
	</view>
</template>

<script>
	const regions = require("./regions.json");
	
	export default {
		name:"yd-pick-region",
		data() {
			return {
				chosen: null,
			};
		},
		mounted() {
			console.log(regions);
		}
	}
</script>

<style>

</style>
