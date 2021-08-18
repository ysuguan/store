export default {
	choseAddress(state, index) {
		state.userInfo.address.chose = index;
	},
	//comList必须是数组
	setReadyOrder(state, comList) {
		state.readyOrder = comList;
	}
}