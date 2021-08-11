<template>
	<view class="box">
		<view class="title"><slot name="title" :title='title'><view>{{title}}</view> </slot></view>
		<u-grid col="3" :border="false" bg-color="white">
			<u-grid-item v-for="(commodity,index) in comList" :key='index+title' 
			:custom-style="{padding: '0', margin: '0'}" @click="commodityClick(commodity.url)">
				<!-- <yd-commodity-mini :commodity="commodity"></yd-commodity-mini> -->
				<yd-commodity-dynamic :mini="true" height="300" width="200">
					<template v-slot:bottom>
						<view>123</view>
					</template>
				</yd-commodity-dynamic>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	export default {
		name:"yd-type-recommand",
		props: {
			title: {
				type: String,
				default: '防疫专区',
			},
			comList: {
				type: Array,
				required:true,
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			commodityClick(url){
				console.log(this.title, url);
			}
		}
	}
</script>

<style lang="scss" scoped>
.box{
	background-color: white;
	.title{
		display: flex;
		align-content: center;
		height: 100rpx;
		padding: 10rpx;
		font-size: 40rpx;
		color: #003a6c;
		font-weight: bolder;
	}
}
</style>
