<template>
	<view>
		<u-popup v-model="isShow">
			<view class="content">
				
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:"yd-select-popup",
		props:{
			//商品信息
			com: {
				type: Object,
				default:{
					id:423404375879,
					img: '../../static/image/commodity.png',
					price: 229,
					weight: 0.12,
					types: ['甲乙丙丁', '子丑寅卯', '天地玄黄宇宙洪荒'],
					specifications: ['100片', '50片', '【70g*30片】国产高端', '【35g*100片】进口精品'],
				}
				// required:true,
			}
		},
		data() {
			return {
				isShow: false,
			};
		}
	}
</script>

<style>

</style>
