/**
*	toast提示框
*   先创建DOM元素, 然后再加类名
*   才能获取到他的宽和高
*/
export function toast(msg = '', time = 1500) {
	var toast = document.createElement('div');
	document.body.appendChild(toast);
	toast.className = 'common-toast common-toast-show';
	toast.innerHTML = msg;
	toast.style.display = 'block';
	//往左、往上移多少
	toast.style.margin = `-${toast.offsetHeight / 2}px 0 0 -${toast.offsetWidth / 2}px`;
	var timer = setTimeout(() => {
		toast.className = 'common-toast common-toast-hide';
		clearInterval(timer)
		var timer2 = setTimeout(() => {
			document.body.removeChild(toast);
			clearInterval(timer2)
		}, 200)
	}, time)
}

