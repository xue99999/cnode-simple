<template>
	<div>
		<div class="loading-box">
			<div :class="!complete ? 'loading-start' : 'msg'">
				{{ complete ? '没有了' : ''}}
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		props: {
			complete: { //是否加载完成
				type: Boolean,
				default: false
			},
			loading: { //是否在请求中
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				state: this.loading
			}
		},
		mounted() {
			this.timer = setInterval(() => {
				if (!this.state) {
					this.state = true
				}
			}, 300)
		},
		beforeDestory() {
			clearInterval(this.timer)
		},
		watch: {
			loading(to) {
				this.state = to
			}
		}
	}
</script>

<style lang="less">
	.loading-box {
		.msg {
			line-height: 70px;
			text-align: center;
			font-size: 14px;
		}
	}

	.loading-start {
		position: relative;
		margin: 20px auto;
		animation: rotate-forever 1s infinite linear;
		height: 30px;
		width: 30px;
		border: 4px solid #80bd01;
		border-right-color: transparent;
		border-radius: 50%;
		.msg {
			display: none;
		}
	}

	@keyframes rotate-forever {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>