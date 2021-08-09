<template>
	<scroll-view class="primary-scroll" scroll-y="true" :style="primaryStyle" @scroll='scrollPrimary' >
		<view class="head">
			<slot name="head" :primaryScrollY="primaryScrollY"></slot>
		</view>
		
		<view class="content">
			<scroll-view class="second-scroll" scroll-y="true" :style="secondStyle" @scroll='scrollSecond'>
				<slot name="content" :secondScrollY="secondScrollY"></slot>
			</scroll-view>
		</view>
		
	</scroll-view>
</template>

<script>
	export default {
		name: "yd-stack-scroll",
		props:{
			//根滚动窗的高度
			primaryH: {
				type: Number,
				required:true,
			},
			//二级滚动窗的高度
			secondH: {
				type: Number,
				required: true,
			}
		},
		data() {
			return {
				primaryScrollY: 0,
				secondScrollY: 0,
			}
		},
		computed:{
			primaryStyle(){
				return {
					height: this.primaryH + 'px',
				}
			},
			secondStyle(){
				return {
					height: this.secondH + 'px',
				}
			}
		},
		methods: {
			scrollPrimary(e){
				this.primaryScrollY = e.detail.scrollTop;
			},
			scrollSecond(e){
				this.secondScrollY = e.detail.scrollTop;
			}
		},
	}
</script>

<style>

</style>
