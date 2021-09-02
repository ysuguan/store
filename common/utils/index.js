function debounce(func, delay) {
	let clock = null;
	
	return function(vm, ...args) {
		if(clock){
			clearTimeout(clock);
			clock = null;
		}
		clock = setTimeout(() => {
			func.apply(vm, args)
		}, delay)
	}
}


export {debounce}