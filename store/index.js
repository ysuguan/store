import Vue from "vue"
import VueX from "vuex"
import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(VueX);

export default new VueX.Store({
	state,
	getters,
	mutations,
	actions
})