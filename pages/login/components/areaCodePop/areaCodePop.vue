<template>
	<u-popup v-model="popShow" mode="right" width="100%" height="100%" @close="popClose">
		<view class="content">
			<u-icon class="close" name="arrow-left" color="gray" size="60" @tap="close"></u-icon>
			<view class="head">
				<view class="title">
					选择国家或地区
				</view>
				<view class="search" v-if="!isSearch"  @tap="isSearch=true">
					<u-icon name="search" size="50" color="gray"></u-icon>
				</view>
				<view class="search" v-else>
					<view class="search-box">
						<u-icon name="search" size="50" color="gray"></u-icon>
						<u-input class="search-input" v-model="searchWord" :focus="isSearch" type="text" placeholder="" height="80"></u-input>
					</view>
				</view>
			</view>
			<view class="body">
				<scroll-view class="areas" scroll-y="true" :scroll-top="scrollY" @scroll='scroll'>
					<view class="hot-areas">
						<view class="area-item" v-if="areasShow.length>0">
							<text class="area-name">常用国家或地区</text>
							<text class="area-code"></text>
						</view>
						<view class="area-item"  v-for="(item, index) in areasHot" @tap="chose(item)">
							<text class="area-name">{{item.name_zh}}</text>
							<text class="area-code">+{{item.code}}</text>
						</view>
					</view>
					<view class="area-brick" v-for="(letter, key) in letters" :ref='letter'>
						<view class="area-item">
							<text class="area-name">{{letter}}</text>
							<text class="area-code"></text>
						</view>
						<view class="area-item" v-for="(item, index) in areasShow" v-if="item.pyStart==letter"  @tap="chose(item)">
							<text class="area-name">{{item.name_zh}}</text>
							<text class="area-code">+{{item.code}}</text>
						</view>
					</view>
				</scroll-view>
				<view class="side-bar" @tap='jump'>
					<view class="letter" :class="{'letter-a': letter==letterActive}" v-for="(letter, index) in letters" :data-letter='letter'>
						<text :data-letter='letter'>{{letter}}</text>
					</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import {debounce} from "@/common/utils/index.js"
	const areas = require('./phone_area_code_sort.json');
	
	export default {
		props: {
			comShow: {
				type: Boolean,
				required: true,
			}
		},
		data() {
			return {
				areas,
				scrollY: 0,
				popShow: false,
				//是否处于搜索状态
				isSearch: false,
				searchWord: '',
				matchWord: '',
				letterActive: null,
				letterPos: [],
				hotAreas: ['中国', '香港', '澳门', '台湾省', '新加坡', '马来西亚', '美国', '澳大利亚', '加拿大', '新西兰', '日本', '韩国'],
			}
		},
		updated() {
			
		},
		computed: {
			//通过这里筛选显示地区，letters也来源于此项
			areasShow() {
				if(this.matchWord.length>0){
					let regE = new RegExp(this.matchWord)
					return this.areas.filter((item, index) => item.name_zh.match(regE));
				}
				return this.areas;
			},
			areasHot() {
				let tmpArr = this.hotAreas.map((item, index, arr) => {
					return this.areas.filter(val => val.name_zh==item)[0]
				})
				if(this.matchWord.length>0){
					let regE = new RegExp(this.matchWord)
					return tmpArr.filter((item, index) => item.name_zh.match(regE))
				}
				return tmpArr;
			},
			letters() {
				return Array.from(new Set(this.areasShow.map(item => item.pyStart)));
			}
		},
		methods: {
			//使用节流函数绑定赋值方法
			matchSearch: debounce(function(args){
				this.matchWord = this.searchWord.trim();
			}, 600),
			//初始化索引列表
			initIndexList() {
				this.letterPos = [];
				this.letters.map(item=> {
					this.letterPos.push({
						letter: item,
						top: this.$refs[item][0].$el.offsetTop, 
						bottom: this.$refs[item][0].$el.offsetTop+this.$refs[item][0].$el.offsetHeight
					});
				})
			},
			close() {
				this.popClose();
			},
			popClose() {
				this.popShow = false;
				this.$emit('areaPopClose');
			},
			scroll(e) {
				this.scrollY = e.detail.scrollTop;
				let pos = this.letterPos.filter(item => {
					return (this.scrollY>=item.top)&&(this.scrollY<item.bottom)
				});
				if(pos.length>0){
					this.letterActive = pos[0].letter;
				}else{
					this.letterActive = null;
				}
			},
			jump(e) {
				let pos = this.letterPos.filter(item => item.letter==e.target.dataset.letter);
				this.scrollY = pos[0].top;
			},
			chose(area) {
				this.$emit('selectArea', area);
				this.popClose();
			}
		},
		watch: {
			comShow(val) {
				this.popShow = val;
				this.$forceUpdate();
			},
			searchWord(val, valOld) {
				this.matchSearch(this, val);
			},
			matchWord(val, valOld) {
				this.$nextTick(function(){
				/* 不能在mounted中执行初始化操作，因为vue的dom是动态渲染的，mounted完成之后实际上由于组件并未显示，所以不可能获得Dom ;
				也必须在nexttick中执行索引位置的初始化操作，如果在matchWord的数据渲染到页面之前就初始化，拿到的坐标是过时的*/
					this.initIndexList();
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
	padding: 0 20rpx;
	
	.close{
		position: fixed;
		top: 20rpx;
	}
	.head{
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: space-around;
		height: 220rpx;
		.title{
			height: 60rpx;
			line-height: 60rpx;
			font-size: 40rpx;
			text-align: center;
		}
		.search{
			display: flex;
			justify-content: center;
			// width: 100%;
			height: 100rpx;
			
			.search-box{
				display: flex;
				align-items: center;
				width: 100%;
				
				.search-input{
					margin-left: 20rpx;
				}
			}
		}
	}
	.body{
		display: flex;
		
		.areas{
			height: calc(100vh - 220rpx);
			width: 90%;
			
			.area-item{
				display: flex;
				justify-content: space-between;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 28rpx;
				border-bottom: 1px solid #eeeeee;
				color: black;
				
				.area-code{
					font-weight: bold;
				}
			}
		}
		.side-bar{
			display: flex;
			flex-wrap: wrap;
			width: 10%;
			.letter{
				width: 100%;
				height: 45rpx;
				line-height: 45rpx;
				font-size: 28rpx;
				text-align: right;
				color: gray;
			}
			.letter-a{
				display: flex;
				align-items: center;
				padding-left: 20rpx;
				color: red;
			}
		}
	}
}
	
</style>
