<template>
	<view class="page">
		<view class="content">
			<view class="head">
				<u-icon name="close" color="gray" size="40"></u-icon>
			</view>
			<view class="logo">
				<u-image class="logo-img" src="../../static/image/panda.svg" mode="aspectFill" height="280" width="280" shape="circle"></u-image>
			</view>
			<view class="form" v-if="loadByCellPhone">
				<view class="input brick" @tap="choseArea">
					<input placeholder="国家/地区" disabled="disabled" key='area'/>
					<view class="area-code">
						<text>{{area.name_zh}}+{{area.code}}</text>
						<u-icon name="arrow-right" size="28" color="black"></u-icon>
					</view>
				</view>
				<view class="input brick">
					<u-input v-model="phoneNumber" maxlength="11" type="number" :clearable="true" placeholder="请输入手机号" key='cell'></u-input>
				</view>
				<view class="agree brick">
					<u-checkbox class="check-box" v-model="agreed" shape="circle" active-color="red" size="28" icon-size="28" ></u-checkbox>
					<text>未注册的手机号验证后将自动创建新账号，同意此项方可获取验证码。</text>
				</view>
				<view class="submit brick">
					<u-button class="button" :class="{'button-disabled': !btnAbled}" type="error" shape="circle" :disabled="!btnAbled">获取验证码</u-button>
				</view>
				<view class="switch brick">
					<view>新用户注册</view>
					<view @tap="loadByCellPhone=false">账号密码登录</view>
				</view>
			</view>
			<view class="form" v-else>
				<view class="input brick" @tap="choseArea">
					<u-input v-model="accountNumber" type="text" :clearable="true" placeholder="用户名/邮箱/手机号" key='account'></u-input>
				</view>
				<view class="input brick">
					<u-input v-model="password" type="password" placeholder="请输入密码" :password-icon="true" :clearable="false" key='password'></u-input>
				</view>
				<view class="submit brick">
					<u-button class="button" :class="{'button-disabled': !btnAbled}" type="error" shape="circle" :disabled="!btnAbled">登录</u-button>
				</view>
				<view class="switch brick">
					<view>新用户注册</view>
					<view @tap="loadByCellPhone=true">短信验证码登录</view>
					<view>忘记密码</view>
				</view>
			</view>
		</view>
		<area-code-pop :comShow="areaPopShow" @areaPopClose="areaPopClose" @selectArea='selectArea'></area-code-pop>
	</view>
</template>

<script>
	import areaCodePop from "./components/areaCodePop/areaCodePop.vue"
	
	export default {
		components: {
			'area-code-pop': areaCodePop,
		},
		data() {
			return {
				area: {
					code: "86",
					name: "China",
					name_short: "CN",
					name_zh: "中国",
					pinyin: "zhongguo",
					py: "zg",
					pyStart: "Z",
					time_zone: "0",
				},
				loadByCellPhone: true,
				phoneNumber: null,
				agreed: false,
				accountNumber: 19876543298,
				password: null,
				areaPopShow: false,
			}
		},
		computed: {
			//按钮是否可点击
			btnAbled() {
				if(this.loadByCellPhone){
					return this.agreed&&this.phoneNumber&&this.phoneNumber.length==11;
				}else{
					return this.accountNumber&&this.password&&this.accountNumber.toLocaleString().length>1&&this.password.length>1;
				}
			}
		},
		methods: {
			choseArea() {
				this.areaPopShow = true;
			},
			areaPopClose() {
				this.areaPopShow = false;
			},
			selectArea(area) {
				this.area = Object.assign({}, area);
			}
		}
	}
</script>

<style lang="scss" scoped>
.page{
	height: 100vh;
	width: 100vw;
	font-size: 28rpx;
	background-color: white;
		
	&::before{
		content: '';
		display: block;
		height: 20vh;
		width: 100vw;
		background: linear-gradient(to right, $page-bgc, transparent 15%, transparent 100%),
			linear-gradient(to left, $page-bgc, transparent 15%, transparent 100%),	
			linear-gradient(to bottom, rgba($color: $basic-color, $alpha: .2), transparent 80%, transparent 100%);
	}
}

.content{
	position: fixed;
	top: 0;
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	padding: 30rpx;
	background-color: transparent;
	
	.head{
		width: 100%;
	}
	.logo{
		width: 100%;
		margin-top: 100rpx;
		.logo-img{
			margin: 0 auto;
			box-shadow: 0 5rpx 0 0 #cccccc;
		}
	}
	.form{
		display: flex;
		flex-wrap: wrap;
		margin-top: 50rpx;
		width: 100%;
		
		.brick{
			width: 100%;
			margin-top: 35rpx;
			height: 80rpx;
		}
		.input{
			display: flex;
			align-items: center;
			justify-content: space-between;
			line-height: 80rpx;
			font-size: 30rpx;
			padding: 0 30rpx;
			border-radius: 40rpx;
			color: gray;
			background-color: $page-bgc;
		}
		.agree{
			display: flex;
			align-items: start;
			font-size: 28rpx;
			color: gray;
			
			.check-box{
				margin-top: 10rpx;
			}
		}
		.submit{
			.button{
				background: linear-gradient(to right, $basic-color, red);
			}
			.button-disabled{
				position: relative;
				&::before{
					content: '';
					display: block;
					position: absolute;
					width: 100%;
					height: 100%;
					background-color: rgba($color: white, $alpha: 0.5);
				}
			}
		}
		.switch{
			// display: grid;
			// grid-template-columns: repeat(2, 50%);
			// grid-template-rows: 80rpx;
			// justify-items: center;
			// align-items: start;
			display: flex;
			justify-content: space-around;
			color: gray;
			
		}
		
	}
}

</style>
