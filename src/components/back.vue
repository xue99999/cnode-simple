<template>
	<transition name="slide-fade">
		<div class="back" v-show="backShow" @click.stop="goTop">
			<i class="iconfont icon-back"></i>
		</div>
	</transition>
</template>

<script>
	export default {
		data() {
			return {
				backShow: false
			}
		},
		methods: {
			goTop() {
				let con = document.getElementsByClassName('content')[0];
				con.scrollTop = 0;
			}
		},
		mounted() {
			let con = document.getElementsByClassName('content')[0];
			let vm = this;
			con.onscroll = function() {
				if (con.scrollTop > 1500) {
					vm.backShow = true
				} else {
					vm.backShow = false
				}
			}
		}
	}
</script>

<style lang="less">
	.back {
		position: fixed;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
		bottom: 70px;
		right: 20px;
		width: 30px;
		height: 30px;
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
	.slide-fade-enter-active {
	  transition: all .3s;
	}
	.slide-fade-leave-active {
	  transition: all .3s;
	}
	.slide-fade-enter, .slide-fade-leave-active {
	  transform: translateX(100%);
	  opacity: 0;
	}
</style>