<template>
	<view ref="pageWrap" class="page-wrap">
		<yd-stack-scroll-swiper :primaryH="scrollHeight" :secondH="secondScrollH" :swiperCount='3' :customSwiperItem="currentTab" 
		@changeSwiper="changeSwiper">
			<template v-slot:head>
				<view class="head-wrap">
					<view class="search-wrap">
						<u-icon name="arrow-left" size="40" @click="goBack"></u-icon>
						<u-search class="search" v-model="keyWord" :placeholder="hotWord[0].name" :show-action="simpleMode||searchOnFocus" 
						@search="goSearch" @change="changeMode" @custom="goSearch" @focus="searchFocus" @blur="searchBlur"></u-search>
					</view>
					<view v-if="simpleMode" class="hot-word">
						<view class="title">热搜</view>
						<view class="tags">
							<view class="tag" v-for="(item, index) in hotWord" :key="item.name+index" @click="goSearch(item.name)">
								<u-tag :show="item.pop" text="爆" color="white" bg-color="#F0AD4E" border-color="transparent" size="10"></u-tag>
								<text>{{item.name}}</text>
							</view>
						</view>
					</view>
					<view v-else class="tab-list">
						<yd-commodity-tabs :mainMode="false" @commodityTabsClick="changeTab" :customCurrentTab="currentTab"></yd-commodity-tabs>
					</view>
				</view>
			</template>
			<template v-slot:content1 v-if="!simpleMode">
				<yd-commodity-list :list="dataList[0]" :mode="listMode"></yd-commodity-list>
			</template>
			<template v-slot:content2 v-if="!simpleMode">
				<yd-commodity-list :list="dataList[1]" :mode="listMode"></yd-commodity-list>
			</template>
			<template v-slot:content3 v-if="!simpleMode">
				<yd-commodity-list :list="dataList[2]" :mode="listMode"></yd-commodity-list>
			</template>
		</yd-stack-scroll-swiper>
	</view>
</template>

<script>
	import {trim} from "../../common/utils/index.js";
	
	export default {
		name:'search',
		data() {
			return {
				scrollHeight: 375,
				simpleMode: true,
				currentSwiperItem: 0,
				currentTab: 0,
				listMode: 'list',
				searchOnFocus: false,
				dataList: [
					[12],
					[13],
					[8],
				],
				hotWord: [
					{name: '降压药', pop: true},
					{name: '胰岛素', pop: true},
					{name: '创可贴', pop: false},
					{name: '维生素', pop: true},
					{name: '伟哥', pop: false},
					{name: '板蓝根', pop: true},
					{name: '乳果糖', pop: false},{name: '板蓝根', pop: true},
					{name: '乳果糖', pop: false},{name: '板蓝根', pop: true},
					{name: '乳果糖', pop: false},{name: '板蓝根', pop: true},
					{name: '乳果糖', pop: false},{name: '板蓝根', pop: true},
					{name: '乳果糖', pop: false},
				],
				keyWord: '',
			}
		},
		created() {
			uni.getSystemInfo({
				success: (res) => {
					this.changeScrollHeight(res.windowHeight);
				} 
			})
		},
		onLoad(params) {
			if(Object.keys(params).indexOf('text')!==-1){
				this.keyWord = params.text;
				this.simpleMode = false;
			}
		},
		mounted(){
			//必须将页面高度设置为与滚动窗口一致，避免出现原生滚动
			this.$refs.pageWrap.$el.style.height = this.scrollHeight+'px';
		},
		computed:{
			secondScrollH() {
				let res = this.simpleMode?375:this.scrollHeight
				return res;
			}
		},
		methods: {
			//因为页面设置了padding，
			changeScrollHeight(height) {
				this.scrollHeight = height;
			},
			changeSwiper(args) {
				this.currentTab = args.currentSwiperItem;
			},
			changeTab(args) {
				this.listMode = args.showMode==0?'block':'list';
				this.currentTab = args.currentTab;
			},
			changeMode() {
				this.keyWord = trim(this.keyWord);
				if(this.keyWord.length<=0){
					this.simpleMode = true;
				}
			},
			//搜索框获得焦点，展示搜索按键
			searchFocus() {
				this.searchOnFocus = true;
			},
			searchBlur() {
				this.searchOnFocus = false;
			},
			goBack() {
				let routeStack = getCurrentPages();
				if(routeStack.length<=1){
					uni.switchTab({
						url: '/pages/home/home',
					})
				}else{
					uni.navigateBack({});
				}
			},
			goSearch(text=null) {
				if(text){
					this.keyWord = text;
				}
				this.keyWord = trim(this.keyWord);
				if(this.keyWord.length<=0){
					this.keyWord = this.hotWord[0].name;
				}
				uni.navigateTo({
					url: "/pages/search/search?text="+this.keyWord,
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
.page-wrap{
	padding: 20rpx;
	overflow: hidden;
}

.search-wrap{
	display: flex;
	flex-wrap: wrap;
	
	.search{
		margin-left: 10rpx !important;
	}
}

.hot-word{
	margin-top: 40rpx;
	.title{
		margin-bottom: 30rpx;
		font-size: 30rpx;
		text-align: left;
		font-weight: bolder;
	}
	.tags{
		display: flex;
		flex-wrap: wrap;
		.tag{
			height: 50rpx;
			line-height: 30rpx;
			margin: 10rpx;
			padding: 10rpx 20rpx;
			background-color: #F2F2F2;
			border-radius: 25rpx;
			
			text{
				margin-left: 10rpx;
			}
		}
	}
}

.tab-list{
	padding: 20rpx 0;
	box-shadow: 0rpx 5rpx 5rpx #F4F4F5;
}
</style>
