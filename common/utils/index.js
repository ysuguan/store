function trim(str) {
	const regExp = /^\s*|\s*$/;
	return str.replace(regExp, '');
}

export {trim}