export default {
	toast (msg = '', time = 1500) {
		var toast = document.createElement('div');
		toast.className = 'common-toast common-toast-show';
		toast.display = 'block';
		// toast.style.margin = `${toast.offsetHeight} 0 0 ${toast.offsetLeft}`
		toast.innerHTML = msg;
		document.body.appendChild(toast);
		var timer = setTimeout(() => {
			toast.className = 'common-toast common-toast-hide';
			clearInterval(timer)
			var timer2 = setTimeout(() => {
				document.body.removeChild(toast);
				clearInterval(timer2)
			}, 200)
		}, time)
	}
}