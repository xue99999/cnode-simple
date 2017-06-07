<style lang="less">
	.content {
		position: absolute;
		top: 50px;
		left: 0;
		right: 0;
		bottom: 50px;
		z-index: 100;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
</style>
<template>
	<div class="content">
		<slot></slot>
	</div>
</template>