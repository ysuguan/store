<template>
	<view ref="list" class="list-wrap">
		<view class="list-item" v-for="item in list[0]">
			<yd-commodity-dynamic :mode="itemMode" :height="itemHeight" :width="itemWidth"></yd-commodity-dynamic>
		</view>
	</view>
</template>

<script>
	export default {
		name:"yd-commodity-list",
		props:{
			//商品列表
			list: {
				type: Array,
				required: true,
			},
			
			mode: {
				type: String,
				required:true,
				validator: (value) => {
					return ['list', 'block'].indexOf(value) !== -1;
				}
			}
		},
		data() {
			return {
				listWidth: 0,
			};
		},
		mounted() {
			this.getListRpx();
			// this.listWidth = this.$refs.list.$el.offsetWidth
		},
		computed:{
			itemMode() {
				return this.mode=='list'?'horizontal':'vertical';
			},
			itemHeight() {
				return this.mode=='list'?250: 500;
			},
			itemWidth() {
				return this.mode=='list'?this.listWidth: this.listWidth*0.49;
			},
		},
		methods:{
			//获取rpx单位的列表宽度，用于向item传参
			getListRpx() {
				this.listWidth = (this.$refs.list.$el.offsetWidth/document.documentElement.clientWidth)*750;
			}
		},
	}
</script>

<style lang="scss" scoped>
.list-wrap{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	
	background-color: #F1F3F4;
	// padding-top: 15rpx;
	
}

.list-item{
	margin-bottom: 10rpx;
}

</style>
