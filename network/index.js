import Vue from "vue"
import axios from "axios"

Vue.use(axios)

const baseConfig  = {
	baseURL: 'http://www.baidu.com',
	timeout: 2000,
}

function request(config) {
	const instance = axios.create(baseConfig);
	
	return instance.request(config);
}

export {request}