<template>
	<header class="header">
		<slot name="left">
			<div class="item"></div>
		</slot>
		<h2 class="title">{{ title }}</h2>
		<slot name="right">
			<div class="item"></div>
		</slot>
	</header>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="less">
	.header {
		position: absolute;
		display: flex;
		top: 0;
		left: 0;
		width: 100%;
		height: 49px;
		line-height: 49px;
		z-index: 999;
		border-bottom: 1px solid #ddd;
		.item {
			width: 50px;
		}
		.title {
			flex: 1;
			padding: 0;
			margin: 0;
			font-size: 16px;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}
</style>