<template>
	<scroll-view class="primary-scroll" scroll-y="true" :style="primaryStyle" upper-threshold="0" lower-threshold="0" :scroll-top="primaryTop" 
	@scroll='scrollPrimary' @scrolltoupper="primaryTouchTop" @scrolltolower="primaryTouchBottom">
		<view ref="head" class="head">
			<slot name="head" :primaryScrollY="primaryScrollY"></slot>
		</view>
		
		<view ref="content" class="content">
			<scroll-view class="second-scroll" scroll-y="true" :style="secondStyle" @scroll='scrollSecond'>
				<slot name="content" :secondScrollY="secondScrollY"></slot>
			</scroll-view>
		</view>
		
	</scroll-view>
</template>

<script>
	//双层滚动窗嵌套组件，优先滚动外层
	
	
	//子窗口上滑，查看父窗口是否触底，未触底则将父元素上滑同样距离
	//子窗口下滑，查看父窗口是否触顶，未触顶则将父元素下滑同样距离
	
	//父窗口触顶/触底可通过比较primaryScrollY和父窗口可滚动距离（父窗口内容高度-父窗高度）来计算
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
				primaryTop: 0,
				secondTop: 0,
				
				primaryRange: 0,
				
				primaryScrollY: 0,
				secondScrollY: 0,
				
				primaryAtTop: true,
				primaryAtBottom: false,
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
			}
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
			}
		},
	}
</script>

<style>

</style>
