<template>
	<u-popup v-model="isShow" mode="bottom" @close="close">
		<view class="box">
			<view class="head">
				<view class="head-title">请选择所在地区</view>
			</view>
			<view :class="{'tab-list': tabList.length>0}">
				<view class="tab-item" :class="{'tab-item-a': currentLevel==index}" v-for="(item, index) in tabList"
				@tap="clickTab(index)">
					{{item.name}}
				</view>
			</view>
			<view class="body" ref="body" :style="scrollStyle">
				<scroll-view class="area" scroll-y="true" ref="area" :style="scrollStyle">
					<view class="hot-city" v-show="this.currentLevel==0">
						<view class="hot-city-title">热门城市</view>
						<u-grid class="hot-city-list" :col="4" :border="false" hover-class="none">
							<u-grid-item v-for="(item,index) in hotCity" @tap="choseArea(item)">
								<view>{{item.short}}</view>
							</u-grid-item>
						</u-grid>
					</view>
					<view class="area-list">
						<view class="area-list-cate" v-for="letter in letters" :ref="letter">
							<view class="area-letter">{{letter}}</view>
							<view class="area-item" v-for="(item, index) in activeList[currentLevel]" v-if="item.pyStart==letter" 
							:key="item.pinyin+index" @tap="choseArea(item)">
								<u-icon name="checkbox-mark" color='red' size='25' v-if="tabList.length>0&&item.code==tabList[currentLevel].code"></u-icon>
								<text>{{item.name}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
				<picker-view class="letters" indicator-class="indicator" mask-class="mask">
					<picker-view-column>
						<view v-for="item in letters" :key="item">{{item}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import Vue from 'vue'
	
	const regions = require("./regions-sort.json");
	
	export default {
		name:"yd-pick-region",
		props: {
			comShow: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				currentLevel: 0,
				isShow: false,
				regions,
				hotCity: [
					{short:'北京', code: 11}, 
					{short:'上海', code: 31}, 
					{short:"广州", code: 4401}, 
					{short:'深圳', code: 4403}, 
					{short:'杭州', code: 3301}, 
					{short:'南京', code: 3201}, 
					{short:'天津', code: 12}, 
					{short:'苏州', code: 3205}, 
					{short:'武汉', code: 4201}, 
					{short:'长沙', code: 4301}, 
					{short:'重庆', code: 50}, 
					{short:'成都', code: 5101},
				],
				activeList:[],
				tabList: [],
			}
		},
		created() {
			this.regions = this.rmMask(regions);
			this.setLevel(this.regions, 0);
			this.activeList.push(this.regions);
		},
		mounted() {
			// console.log(this.regions);
		},
		computed: {
			//根据tablist是否有值动态设置滚动框高度
			scrollStyle() {
				if(this.tabList.length>0){
					return {height: '820rpx'};
				}
				return {};
			},
			letters() {
				return new Set(this.activeList[this.currentLevel].map(item=> item.pyStart));
			},
			//决定是否展示tabbar并压缩滚动框高度
			tabbarShow() {
				return this.tabList.length>0;
			}
		},
		methods: {
			clickTab(index) {
				this.currentLevel = index;
			},
			//移除多余的层级如（市辖区、县）
			rmMask(arr) {
				let res = [];
				for(let i=0; i<arr.length; i++){
					let eName = arr[i].pinyin.reduce((target, item) => target+item[0], '');
					if('childs' in arr[i]){
						//因为个别地区没有次级地区却保留childs属性，此处删除空childs属性
						if(arr[i].childs.length<1){
							Vue.delete(arr[i], 'childs');
						}else{
							arr[i].childs = this.rmMask(arr[i].childs);
						}
					}
					if(eName=='shixiaqu'||eName=='xian'){
						res.push(...arr[i].childs);
					}else{
						res.push(arr[i]);
					}
				}
				return res;
			},
			
			//确定各地区层级，从0开始;顺便为hotCity绑定数据对象
			setLevel(arr, level) {
				for(let i=0; i<arr.length; i++){
					arr[i].level = level;
					if('childs' in arr[i]){
						this.setLevel(arr[i].childs, level+1)
					}
					//为hotCity绑定数据对象
					for(let index in this.hotCity){
						if(this.hotCity[index].code==arr[i].code){
							this.hotCity[index] = Object.assign({short: this.hotCity[index].short}, arr[i]);
						}
					}
				}
			},
			//选定一个地区，从activeList中移除已有子项，并增加选中地区子项;修改tabbar
			choseArea(area) {
				this.checkFather(area);
				
				this.updateAcitveList(area);
				
				this.updateTabList(area);
			},
			updateTabList(area) {
				this.tabList.splice(area.level, 10, {code: area.code, name: area.name});
				if('childs' in area){
					this.tabList.push({code:0, name:'请选择'});
				}
			},
			updateAcitveList(area) {
				if(this.activeList.length>area.level+1){
					this.activeList.splice(area.level+1, 10);
				}
				if('childs' in area){
					this.activeList.push(area.childs);
					this.currentLevel = area.level+1;
				}else{
					console.log('选定区域已无子项', area.name);
				}
			},
			//检查activelist中选中地区的父级地区是否正确，针对热门城市点击事件设置
			checkFather(area) {
				if(area.level<1){
					return;
				}
				let res = this.activeList[area.level-1].filter(item => item.code==area.code);
				if(res.length>0){
					return;
				}
				
			},
			close() {
				this.$emit('regionPopClose');
			}
		},
		watch: {
			comShow(val) {
				this.isShow = val;
			},
		}
	}
</script>

<style lang="scss" scoped>
$box-h: 1000rpx;
$head-h: 100rpx;
$tab-list-h: 80rpx;
$body-h: 900rpx;

.box{
	height: $box-h;
	width: 100vw;
	padding-left: 30rpx;
	
	.head{
		height: $head-h;
		line-height: 100rpx;
		font-size: 40rpx;
		text-align: center;
	}
	.tab-list{
		display: flex;
		justify-content: start;
		height: $tab-list-h;
		width: 200rpx;
		
		.tab-item{
			flex-shrink: 0;
			height: $tab-list-h;
			width: 140rpx;
			font-size: 30rpx;
			color: black;
			text-align: center;
			
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
		.tab-item-a{
			color: red;
		}
	}
	.body{
		display: flex;
		align-items: center;
		height: $body-h;
		.area{
			height: $body-h;
			width: 650rpx;
			
			.hot-city {
				.hot-city-title{
					font-size: 28rpx;
					color: gray;
					margin-bottom: 20rpx;
				}
				.hot-city-list{
					/deep/.u-grid-item{
						height: 100rpx;
					}
				}
			}
			.area-list{
				.area-list-cate{
					margin-top: 20rpx;
					.area-letter{
						height: 60rpx;
						line-height: 60rpx;
						font-size: 28rpx;
						font-weight: bold;
						border-bottom: 1rpx solid #F8F8F8;
					}
					.area-item{
						height: 100rpx;
						line-height: 100rpx;
					}
				}
			}
		}
		.letters{
			height: 800rpx;
			width: 100rpx;
		}
	}
}
</style>
