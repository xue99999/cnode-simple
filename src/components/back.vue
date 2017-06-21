<template>
	<div class="back_wrap">
		<div class="back">
			<i class="iconfont icon-back"></i>
		</div>
	</div>
</template>

<style lang="less">
	.back_wrap {
		position: relative;
		z-index: 999;
		.back {
			position: fixed;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 99;
			bottom: 50px;
			right: 50px;
			width: 50px;
			height: 50px;
			background-color: #eee;
			border-radius: 50%;
			box-shadow: 0 0 3px 5px #000;
			color: red;
			.iconfont {
				font-size: 24px;
				transform: rotate(90deg);
				color: #000;
			}
		}
	}
</style>