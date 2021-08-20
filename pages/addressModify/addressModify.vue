<template>
	<view class="page">
		<view class="navi" ref="navi">
			<u-icon class="navi-icon" name="arrow-left" size="60" @tap="goBack"></u-icon>
			编辑收货地址
		</view>
		
		<scroll-view scroll-y="true" class="edit">
			<u-form :model="form" class="form">
				<u-form-item label="收件人" prop="name">
					<u-input v-model="form.name" placeholder="请输入收件人姓名"></u-input>
				</u-form-item>
				<u-form-item label="手机号码" prop="cellphone">
					<u-input v-model="form.cellphone" placeholder="请输入收件人手机号"></u-input>
				</u-form-item>
				<u-form-item label="所在地区" prop="area">
					<u-input v-model="form.area" placeholder="省市区县、乡镇等"></u-input>
				</u-form-item>
				<u-form-item label="详细地址" prop="address">
					<u-input class="address" type="textarea" v-model="form.address" placeholder="街道、楼牌号等"></u-input>
				</u-form-item>
			</u-form>
			
			<view class="default">
				<view class="left">
					<view class="up">设置为默认地址</view>
					<view class="down">提醒：每次下单会默认推荐使用该地址</view>
				</view>
				<view class="right">
					<u-switch v-model="isDefault" active-color="red"></u-switch>
				</view>
			</view>
		</scroll-view>
		
		
		<view class="add-new">
			<view class="add-btn" @tap="saveAddr">
				<u-icon name="plus" size="30"></u-icon>
				保存
			</view>
		</view>
		
		<yd-pick-region></yd-pick-region>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isDefault: false,
				form: {
					name: 'memememe',
					cellphone: '11121123434',
					area: '江苏省苏州市金枫路',
					address: '东创科技园8888号',
					default: false,
				}
			}
		},
		mounted() {
		},
		methods: {
			goBack() {
				uni.navigateBack({})
			},
			saveAddr() {
				console.log('地址已保存');
				uni.navigateTo({
					url: '/pages/addressList/addressList',
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
/deep/.u-form-item--left{
	flex-shrink: 0 !important;
	flex-grow: 0.2 !important;
}

.page{
	background-color: $page-bgc;
	height: 100vh;
	width: 100vw;
	// padding: 0 30rpx;
}
.navi{
	height: 88rpx;
	line-height: 88rpx;
	text-align: center;
	font-size: 40rpx;
	
	.navi-icon{
		position: fixed;
		top: 20rpx;
		left: 30rpx;
	}
}
.edit{
	height: calc(100vh - 208rpx);
		
	.form{
		margin-top: 30rpx;
		background-color: white;
		padding: 0 30rpx;
		border-radius: 20rpx;
	}
	
	.default{
		display: flex;
		align-items: center;
		height: 150rpx;
		margin-top: 30rpx;
		border-radius: 20rpx;
		background-color: white;
		padding: 30rpx;
		
		.left{
			width: 80%;
		}
		.right{
			width: 20%;
		}
	}
}
.add-new{
	display: flex;
	align-items: center;
	justify-content: center;
	height: 120rpx;
	
	.add-btn{
		width: 400rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		text-align: center;
		background-color: $basic-color;
		color: white;
		border-radius: 40rpx;
	}
}
</style>
