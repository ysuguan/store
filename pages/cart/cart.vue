<template>
<view>
	<view class="page-wrap" ref="pageWrap">
		<yd-stack-scroll-swiper :primaryH="primaryScrollH" :secondH="secondScrollH" :backTopBottom="200">
			<template v-slot:head>
				<view class="head" v-if="cartsAll.length>0">
					<view class="title">
						<view>购物车</view>
						<view @tap='edit'>
							<text class="edit">{{statusEdit?'完成':'编辑'}}</text>
							<u-icon name='edit-pen-fill' :color="statusEdit?'red':'black'"></u-icon>
						</view>
					</view>
					<view class="tabs" ref="tabs">
						<view :class="{'tab-a': currentTab==0}" @tap="tabClick(0)">全部{{comCount}}</view>
						<view ref="filter" class="filter" :class="{'tab-a': currentTab==1}" @tap="tabClick(1)">
							<view class="filter-text" ref="filterTitle">筛选</view>
							<view class="filter-icon" :class="{'filter-icon-a': currentTab==1}"></view>
						</view>
					</view>
				</view>
				<view v-else class="cart-empty">
					<view class="cart-empty-title">
						<!-- <u-icon name="arrow-left"></u-icon> -->
						购物车
					</view>
				</view>
			</template>
			<template v-slot:content1>
				<view v-if="cartsAll.length>0" class="com-list">
					<view class="com-item" v-for="(item, index) in cartsAll" v-show="comShow(index)">
						<view class="left">
							<u-checkbox class="check-box" shape='circle' activeColor='#FD582F'
							:name="index" :key="item.id+index" v-model="item.checked"></u-checkbox>
							<view class="image">
								<image src="../../static/image/commodity.png" mode="aspectFit"></image>
							</view>
						</view>
						<view class="right">
							<view class="desc">
								<text>{{item.brand}}</text>
								<text>{{item.name}}</text>
								<text>{{item.desc}}</text>
							</view>
							<view class="reset" @click="clickReset(index)">
								<view class="text">
									{{item.type+'  '+item.specifications}}
								</view>
								<u-icon name="arrow-down"></u-icon>
							</view>
							<view class="count">
								<view class="price">
									¥{{item.price * item.number}}
								</view>
								<view class="number">
									<u-number-box v-model='item.number' :min="item.numMin" :max="item.numMax" 
									@change="changNumber" @plus="isLimit(index)" @minus="isLimit(index)"></u-number-box>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else class="cart-empty-mention">
					<view>购物车是空的</view>
					<view class="mention-btn">
						<u-button class="mention-btn-item" shape="circle">看看首页</u-button>
						<u-button class="mention-btn-item" shape="circle">逛逛秒杀</u-button>
					</view>
				</view>
				<view class="recommand">
					<view class="recommand-title">
						<image src="../../static/image/heart-active.svg"></image>
						为你推荐
						<image src="../../static/image/heart-active.svg"></image>
					</view>
					<u-waterfall v-model="cartsAll" class="recommand-list">
						<template v-slot:left="{leftList}">
							<!-- <view v-for="(item, index) in leftList" :key="index" class="recommand-item">
								<image class="recom-item-img"  src="../../static/image/commodity.png" mode="aspectFit"></image>
								<view class="recom-item-desc">
									<text>{{item.brand}}</text>
									<text>{{item.type}}</text>
									<text>{{item.desc}}</text>
								</view>
								<view class="recom-item-price">
									<u-icon name="rmb" size="12"></u-icon>
									<text>{{item.price}}</text>
								</view>
							</view> -->
							<view class="recommand-item" v-for="(item, index) in leftList" :key="index">
								<yd-commodity-v :width="340" :sizeRatio="0.65"></yd-commodity-v>
							</view>
						</template>
						<template v-slot:right="{rightList}">
							<!-- <view v-for="(item, index) in rightList" :key="index" class="recommand-item">
								<image class="recom-item-img"  src="../../static/image/commodity.png" mode="aspectFit"></image>
								<view class="recom-item-desc">
									<text>{{item.brand}}</text>
									<text>{{item.type}}</text>
									<text>{{item.desc}}</text>
								</view>
								<view class="recom-item-price">
									<u-icon name="rmb" size="12"></u-icon>
									<text>{{item.price}}</text>
								</view>
							</view> -->
							<view class="recommand-item" v-for="(item, index) in rightList" :key="index">
								<yd-commodity-v :width="340" :sizeRatio="0.65"></yd-commodity-v>
							</view>
						</template>
					</u-waterfall>
				</view>
			</template>
		</yd-stack-scroll-swiper>
		<yd-select-popup :comShow="resetShow" @addCart="resetType" @popClose="closeReset"></yd-select-popup>
	</view>
	<view ref="bottom" class="bottom" v-if="cartsAll.length>0">
		<u-checkbox labelSize='30' shape="circle" v-model="allChecked" activeColor='#FD582F' @change="changeAllChecked" name="allChecked">全选</u-checkbox>
		<view class="total-price">合计：¥{{totalPrice}}</view>
		<button v-if="!statusEdit" class="go-order" type="default" @tap='placeOrder'>去结算({{totalNumber}})</button>
		<button v-else class="delete" type="default" @tap="deleteCom">删除</button>
	</view>
	<u-popup v-model="filterPop" mode="top" ref="filterPop">
		<view class="filter-types">
			<view class="filter-item" v-for="typeItem in typesAll" @tap="clickFilter(typeItem)" :class="{'filter-item-a': typeItem==currentFilterType}">{{typeItem}}(0)</view>
		</view>
	</u-popup>
</view>
</template>

<script>
	import Vue from 'vue'
	import {titleReset} from "../../common/mixin.js"
	
	export default {
		mixins:[titleReset],
		data() {
			return {
				primaryScrollH: 375,
				secondScrollH: 375,
				statusEdit: false,
				filterBy: null,
				currentTab: 0,
				filterPop: false,
				currentFilterType: false,
				test: 0,
				comChecked: false,
				allChecked: false,
				resetShow: false,
				recomList: [
					{
						id:2333,
						name: '起飞颗粒',
						brand: '8088牌',
						desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
						price: 199,
						number: 3,
						type: '丁型',
						weight: 0.12,
						specifications: '【70g*30袋】国产高端',
					},{
						id:2333,
						name: '感冒灵颗粒',
						brand: '777牌',
						desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
						price: 199,
						number: 3,
						type: '丙型',
						weight: 0.12,
						specifications: '【70g*30袋】国产高端',
					},{
						id:2333,
						name: '感冒灵颗粒',
						brand: '999牌',
						desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
						price: 199,
						number: 3,
						type: '甲型',
						weight: 0.12,
						specifications: '【70g*30袋】国产高端',
					},{
						id:2333,
						name: '感冒灵颗粒',
						brand: '999牌',
						desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
						price: 199,
						number: 3,
						type: '甲型',
						weight: 0.12,
						specifications: '【70g*30袋】国产高端',
					},{
						id:2333,
						name: '感冒灵颗粒',
						brand: '999牌',
						desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
						price: 199,
						number: 3,
						type: '甲型',
						weight: 0.12,
						specifications: '【70g*30袋】国产高端',
					},{
						id:2333,
						name: '感冒灵颗粒',
						brand: '999牌',
						desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
						price: 199,
						number: 3,
						type: '甲型',
						weight: 0.12,
						specifications: '【70g*30袋】国产高端',
					},{
						id:2333,
						name: '感冒灵颗粒',
						brand: '999牌',
						desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
						price: 199,
						number: 3,
						type: '甲型',
						weight: 0.12,
						specifications: '【70g*30袋】国产高端',
					},
				],
				cartsAll: [
					{
						id:2333,
						name: '感冒灵颗粒',
						brand: '888牌',
						desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
						price: 199,
						number: 3,
						type: '乙型',
						weight: 0.12,
						specifications: '【70g*30袋】国产高端',
					},{
						id:2333,
						name: '感冒灵颗粒',
						brand: '777牌',
						desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
						price: 199,
						number: 3,
						type: '丙型',
						weight: 0.12,
						specifications: '【70g*30袋】国产高端',
					},{
						id:2333,
						name: '感冒灵颗粒',
						brand: '999牌',
						desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
						price: 199,
						number: 3,
						type: '甲型',
						weight: 0.12,
						specifications: '【70g*30袋】国产高端',
					},{
						id:2333,
						name: '感冒灵颗粒',
						brand: '999牌',
						desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
						price: 199,
						number: 3,
						type: '甲型',
						weight: 0.12,
						specifications: '【70g*30袋】国产高端',
					},{
						id:2333,
						name: '感冒灵颗粒',
						brand: '999牌',
						desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
						price: 199,
						number: 3,
						type: '甲型',
						weight: 0.12,
						specifications: '【70g*30袋】国产高端',
					},{
						id:2333,
						name: '感冒灵颗粒',
						brand: '999牌',
						desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
						price: 199,
						number: 3,
						type: '甲型',
						weight: 0.12,
						specifications: '【70g*30袋】国产高端',
					},{
						id:2333,
						name: '感冒灵颗粒',
						brand: '999牌',
						desc: '外治刀伤内愈隐患跌打损伤体虚气弱均可对症实乃居家旅行之必备良药',
						price: 199,
						number: 3,
						type: '甲型',
						weight: 0.12,
						specifications: '【70g*30袋】国产高端',
					},
				],
			}
		},
		beforeMount() {
			//u-checkbox的v-model要求，响应式初始化选择状态为false
			this.cartsAll.forEach(item => {
				Vue.set(item, 'checked', false);
				Vue.set(item, 'numMin', 1);
				Vue.set(item, 'numMax', 5);
			})
		},
		mounted() {
			if(this.cartsAll.length>0){
				this.primaryScrollH = this.$refs.pageWrap.$el.offsetHeight - this.$refs.bottom.$el.offsetHeight;
				this.secondScrollH = this.primaryScrollH - this.$refs.tabs.$el.offsetHeight;
			}else{
				this.secondScrollH = this.primaryScrollH = this.$refs.pageWrap.$el.offsetHeight;
			}
		},
		computed:{
			comCount() {
				if(!this.filterBy){
					return '  '+this.cartsAll.length;
				}
			},
			totalPrice() {
				let res = 0;
				this.cartsAll.forEach(item => res += item.checked?item.price*item.number:0)
				return res;
			},
			totalNumber() {
				let res = 0;
				this.cartsAll.forEach(item => res += item.checked?item.number:0)
				return res;
			},
			comShow() {
				return (index) => {
					if(!this.currentFilterType){
						return true;
					}
					return this.cartsAll[index].type == this.currentFilterType?true: false;
				}
			},
			typesAll() {
				if(this.cartsAll.length==0){
					return []
				}
				let types = this.cartsAll.map(item => item.type);
				types.sort()
				
				let res = [types[0]];
				for(let i=1; i<types.length; i++){
					if(types[i]!=types[i-1]){
						res.push(types[i])
					}
				}
				return res;
			}
		},
		methods: {
			placeOrder() {
				let orderList = this.cartsAll.filter(item => {
					return item.checked;
				})
				this.$store.commit('setReadyOrder', orderList);
				uni.navigateTo({
					url: "/pages/newOrder/newOrder",
				})
			},
			edit() {
				this.statusEdit = !this.statusEdit;
			},
			deleteCom() {
				let res = this.cartsAll.filter((item, index) => {
					return !item.checked
				});
				
				this.cartsAll.splice(0, this.cartsAll.length+1);
				res.forEach(item => this.cartsAll.push(item));
			},
			tabClick(index) {
				this.currentTab = index;
				if(index==1) {
					this.filterPop = true;
				}else if(index==0){
					this.currentFilterType = false;
					this.$refs.filterTitle.$el.innerHTML = '筛选';
				}
			},
			changNumber(e) {
				
			},
			//应当有个全页面可用的防抖函数，每秒之触发一次极值弹窗
			isLimit(index) {
				let info = '';
				if(this.cartsAll[index].number==this.cartsAll[index].numMax){
					info = '最多购买'+this.cartsAll[index].numMax+'件哦';
				}else if(this.cartsAll[index].number==this.cartsAll[index].numMin){
					info = '最少购买'+this.cartsAll[index].numMin+'件哦';
				}else{
					return;
				}
				uni.showToast({
					title: info,
				})
			},
			//每次修改都要和服务器同步
			clickReset(index) {
				this.resetShow = true;
			},
			closeReset() {
				this.resetShow = false;
			},
			resetType(args) {
				this.resetShow = false;
				if(args.res=='success'){
				}
			},
			changeAllChecked(args) {
				this.cartsAll.forEach((item, index) => {
					Vue.set(item, 'checked', args.value);
				});
			},
			clickFilter(type) {
				this.$refs.filterTitle.$el.innerHTML = type;
				this.currentFilterType = type;
				this.filterPop = false;
			}
		},
		watch: {
			//购物车清空需要重新计算滚动窗高度
			cartsAll(val, valOld){
				if(val.length>0){
					return;
				}
				this.secondScrollH = this.primaryScrollH = this.$refs.pageWrap.$el.offsetHeight;
			}
		}
	}
</script>

<style lang="scss" scoped>
.page-wrap{
	padding: 0 20rpx;
	height: calc(100vh - 50px);
	background-color: $page-bgc;
}

.head{
	.title{
		display: flex;
		justify-content: space-between;
		height: 50rpx;
		margin: 20rpx 0;
		
		view:nth-child(1){
			font-size: 40rpx;
			color: black;
		}
		
		.edit{
			margin-right: 10rpx;
		}
	}
	.tabs{
		display: flex;
		justify-content: space-between;
		height: 90rpx;
		padding: 20rpx 0;
		.filter{
			display: flex;
			
			.filter-icon{
				height: 40rpx;
				width: 40rpx;
				margin-left: 10rpx;
				background: url(../../static/image/filter.svg);
				background-size: cover;
			}
			
			.filter-icon-a{
				background: url(../../static/image/filter-a.svg);
				background-size: cover;
			}
		}
		
		.tab-a{
			font-weight: bold;
			color: $basic-color;
		}
	}
}

.com-item{
	display: flex;
	height: 300rpx;
	margin-bottom: 15rpx;
	border-radius: 20rpx;
	background-color: white;
	
	.left{
		display: flex;
		align-self:start;
		align-items: center;
		justify-content: space-around;
		width: 35%;
		padding-top: 20rpx;
		.check-box{
			height: 40rpx;
			width: 40rpx;
			
		}
		.image{
			height: 180rpx;
			width: 180rpx;
			
			image{
				height: 100%;
				width: 100%;
				border-radius: 10rpx;
			}
		}
	}
	.right{
		flex-grow: 1;
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx;
		.desc{
			height: 80rpx;
			// line-height: 40rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			
			text{
				margin-right: 10rpx;
			}
		}
		
		.reset{
			align-self: flex-start;
			display: flex;
			align-items: center;
			height: 50rpx;
			width: 300rpx;
			background-color: #E1E1E1;
			border-radius: 25rpx;
			padding: 5rpx;
			
			.text{
				width: 250rpx;
				font-size: 25rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}
		.count{
			align-self: flex-end;
			flex-grow: 1;
			display: flex;
			justify-content: space-between;
			color: $basic-color;
		}
	}
}

.bottom{
	position: fixed;
	display: flex;
	align-items: center;
	bottom: 50px;
	width: 100vw;
	height: 90rpx;
	color: $basic-color;
	font-size: 30rpx;
	background-color: white;
	border-top: 1px solid #F8F8F8;
	padding-left: 20rpx;
	
	.go-order{
		height: 80rpx;
		line-height: 80rpx;
		margin-right: 20rpx;
		font-size: 30rpx;
		color: white;
		background-color: $basic-color;
	}
	.delete{
		height: 80rpx;
		line-height: 80rpx;
		margin-right: 20rpx;
		font-size: 30rpx;
		background-color: white;
	}
}

.filter-types{
	display: flex;
	flex-wrap: wrap;
	width: 100vw;
	padding: 20rpx 40rpx;
	// color: white;
	
	.filter-item{
		height: 60rpx;
		width: 50%;
		line-height: 60rpx;
		text-align: center;
		font-size: 25rpx;
		font-weight: bold;
		// color: black;
	}
	.filter-item-a{
		color: red;
	}
}
.cart-empty{
	padding: 20rpx 0;
	.cart-empty-title{
		font-size: 40rpx;
		line-height: 40rpx;
		text-align: center;
	}
}
.cart-empty-mention{
		margin-top: 20rpx;
		text-align: center;
		font-size: 30rpx;
		padding: 40rpx;
		color: gray;
		border-radius: 20rpx;
		background-color: white;

		.mention-btn{
			display: flex;
			margin-top: 30rpx;
			.mention-btn-item{
				height: 50rpx;
		}
	}
}

.recommand{
	.recommand-title{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100rpx;
		text-align: center;
		image{
			height: 30rpx;
			width: 30rpx;
		}
	}
	
	.recommand-list{
		border-radius: 20rpx;
		// .recommand-item{
		// 	background-color: white;
		// 	margin: 10rpx;
		// 	padding: 20rpx;
		// 	border-radius: 20rpx;
		// 	.recom-item-img{
		// 		width: 100%;
		// 		height: 300rpx;
		// 	}
		// 	.recom-item-desc{
		// 		text-overflow: ellipsis;
		// 		display: -webkit-box;
		// 		-webkit-box-orient: vertical;
		// 		-webkit-line-clamp:2;
		// 		overflow: hidden;
		// 		white-space:pre-wrap;
				
		// 		text{
		// 			margin-right: 10rpx;
		// 		}
		// 	}
		// 	.recom-item-price{
		// 		color: red;
		// 		font-size: 35rpx;
		// 	}
		// }
		.recommand-item{
			margin-bottom: 10rpx;
		}
	}
}
</style>
