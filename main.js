import Vue from 'vue'
import App from './App'
import store from 'store/index.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.filter('formatCount',function(value){
	
	if( value >= 10000 && value < 100000000 ){
		value /= 1000;
		return value.toFixed(1) + '万';
	}
	else if(value >= 100000000){
		value /= 100000000;
		return value.toFixed(1) + '亿';
	}
	else{
		return value;
	}
})

Vue.filter('formatTime', function(value){
	var data = new Date(value);
	
	var yy = data.getFullYear();
	var mm = data.getMonth() + 1 ;
	var dd = data.getDate();
	return yy + "年" + mm + "月" + dd + '日';
})

const app = new Vue({
    ...App,
	store
})
app.$mount()
