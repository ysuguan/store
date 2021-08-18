//uniapp配置的浏览器title日常抽风，混入onshow手动修改
const titleReset = {
	onShow() {
		document.title = '大药房';
	
	},
}

export {titleReset}