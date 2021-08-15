import Vue from "vue"
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
});

router.beforeEach(function(to, from, next){
	document.title = '123';
	next();
})

export default router;