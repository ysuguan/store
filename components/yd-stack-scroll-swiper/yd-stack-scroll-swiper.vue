<template>
	<scroll-view class="primary-scroll" scroll-y="true" :style="primaryStyle" upper-threshold="0" lower-threshold="0" :scroll-top="primaryTop" 
	@scroll='scrollPrimary' @scrolltoupper="primaryTouchTop" @scrolltolower="primaryTouchBottom">
		<view ref="head" class="head">
			<slot name="head" :primaryScrollY="primaryScrollY"></slot>
		</view>
		
		<view ref="content" class="content">
			<swiper :style="swiperHeight" :indicator-dots="false" :autoplay="false" :current="currentSwiperItem" @change="changeSwiper">
				<swiper-item :height='secondH' v-for="item in swiperCount">
					<!-- 多滚动窗口需要记录各自的滚动距离 -->
					<scroll-view class="second-scroll" scroll-y="true" :style="secondStyle"  :id="item-1" :scroll-top="itemScrollY[item-1]"
					@scroll='scrollSecond'>
						<!-- 可能有多个swiper-item，所以具名插槽名称需要变动 -->
						<slot :name="'content'+item" :secondScrollY="itemScrollY[item-1]"></slot>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view class="back-top" ref="backTop" v-show="backTopShow" @tap='backTop' :style="{bottom: backTopBottom+'rpx'}">
			<image src="../../static/image/back-top.svg" mode="aspectFit"></image>
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
			
			backTopBottom: {
				type: Number,
				default: 140,
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
				// secondScrollY: 0,
				
				primaryAtTop: true,
				primaryAtBottom: false,
				
				currentSwiperItem: 0,
				
				itemScrollY: [],
			}
		},
		mounted(){
			this.primaryRange = this.$refs.head.$el.offsetHeight+this.$refs.content.$el.offsetHeight - this.primaryH;
			//根据swiperitem数目初始化各自滚动距离
			for(let i=0; i<this.swiperCount; i++){
				this.itemScrollY.push(0);
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
			},
			swiperHeight(){
				return {
					height: this.secondH + 'px',
				}
			},
			backTopShow() {
				return this.itemScrollY[this.currentSwiperItem] > window.innerHeight*1.3;
			},
			backTopStyle() {
				return {
					border: '1rpx solid #E1E1E1',
					color: 'black',
					backgroundColor: 'white'
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
				// this.secondScrollY = e.detail.scrollTop;
				// this.itemScrollY[e.target.id] = e.detail.scrollTop;
				this.itemScrollY.splice(e.target.id, 1, e.detail.scrollTop)
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
			},
			backTop() {
				this.itemScrollY.splice(this.currentSwiperItem, 1, 0);
			},
		},
		watch:{
			customSwiperItem(val, valOld){
				this.currentSwiperItem = val;
			}
		}
	}
</script>

<style lang="scss" scoped>
.back-top{
	position: fixed;
	right: 40rpx;
	bottom: 140rpx;
	height: 80rpx;
	width: 80rpx;
	background-color: white;
	border: 1rpx solid #E1E1E1;
	border-radius: 40rpx;
	
	image{
		width: 100%;
		height: 100%;
	}
}
</style>
