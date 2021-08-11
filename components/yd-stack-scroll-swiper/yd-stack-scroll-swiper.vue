<template>
	<scroll-view class="primary-scroll" scroll-y="true" :style="primaryStyle" upper-threshold="0" lower-threshold="0" :scroll-top="primaryTop" 
	@scroll='scrollPrimary' @scrolltoupper="primaryTouchTop" @scrolltolower="primaryTouchBottom">
		<view ref="head" class="head">
			<slot name="head" :primaryScrollY="primaryScrollY"></slot>
		</view>
		
		<view ref="content" class="content">
			<swiper :style="swiperHeight" :indicator-dots="false" :autoplay="false" :current="currentSwiperItem" @change="changeSwiper">
				<swiper-item :height='secondH' v-for="item in swiperCount">
					<scroll-view class="second-scroll" scroll-y="true" :style="secondStyle" @scroll='scrollSecond'>
						<!-- 可能有多个swiper-item，所以具名插槽名称需要变动 -->
						<slot :name="'content'+item" :secondScrollY="secondScrollY"></slot>
					</scroll-view>
				</swiper-item>
			</swiper>
			
		</view>
		
	</scroll-view>
</template>

<script>
	//双层滚动窗嵌套组件，优先滚动外层
	export default {
		name: "yd-stack-scroll-swiper",
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
			},
			
			swiperCount: {
				type: Number,
				default:1,
			},
			customSwiperItem: {
				type: Number,
				default: 0,
			},
		},
		data() {
			return {
				primaryTop: 0,
				secondTop: 0,
				
				primaryRange: 0,
				
				primaryScrollY: 0,
				secondScrollY: 0,
				
				primaryAtTop: true,
				primaryAtBottom: false,
				
				currentSwiperItem: 0,
			}
		},
		mounted(){
			this.primaryRange = this.$refs.head.$el.offsetHeight+this.$refs.content.$el.offsetHeight - this.primaryH;
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
			},
			swiperHeight(){
				return {
					height: this.secondH + 'px',
				}
			},
		},
		methods: {
			primaryTouchTop(){
				this.primaryAtTop = true;
				this.primaryAtBottom = false;
			},
			primaryTouchBottom() {
				this.primaryAtBottom = true;
				this.primaryAtTop = false;
			},
			scrollPrimary(e){
				this.primaryScrollY = e.detail.scrollTop;
			},
			scrollSecond(e){
				this.secondScrollY = e.detail.scrollTop;
				
				if(e.detail.deltaY<0){
					if(!this.primaryAtBottom){
						let scroll = this.primaryTop - e.detail.deltaY;
						if(scroll>=this.primaryRange){
							scroll=this.primaryRange;
						}
						this.primaryTop = scroll;
					}
				}else if(e.detail.deltaY > 0){
					if(!this.primaryAtTop){
						let scroll = this.primaryTop - e.detail.deltaY;
						if(scroll<=0){
							scroll=0;
						}
						this.primaryTop = scroll;
					}
				}
			},
			changeSwiper(e){
				this.currentSwiperItem = e.detail.current;
				this.$emit('changeSwiper', {currentSwiperItem: this.currentSwiperItem});
			}
		},
		watch:{
			customSwiperItem(val, valOld){
				this.currentSwiperItem = val;
			}
		}
	}
</script>

<style>

</style>
