<template>
	<div class="login_wrap">
		<v-header title="登录">
			<div slot="left" class="item" @click="$router.go(-1)">
				<i class="iconfont icon-back"></i>
			</div>
		</v-header>
		<v-content style="bottom: 0">
	    	<form class="form" @submit.prevent="submit">
	    		<div class="item">
		    		<input v-model="form.accesstoken" class="input" type="text" placeholder="Access Token" autofocus>
	    		</div>
	    		<div class="item">
		    		<button class="btn">{{isLogin ? '正在登录中...' : '登录'}}</button>
	    		</div>
	    	</form>
	    </v-content>
	</div>
</template>

<script>
	import * as util from 'util/toast.js'
	
	export default {
		data() {
			return {
				form: {
					accesstoken: ''
				},
				isLogin: false
			}
		},
		methods: {
			submit() {
				if (!this.form.accesstoken) return util.toast('请输入token')
				
				if (this.isLogin) return;
				this.isLogin = true;
				this.$http.post('accesstoken', this.form)
					.then(d => {
						if (d.data.success) {
							util.toast('登录成功')
							window.localStorage.setItem('user', JSON.stringify(d.data))
							window.localStorage.setItem('accesstoken', this.form.accesstoken)
							this.$router.go(-1)
						} else {
							this.isLogin = false
							util.toast(d.data.error_msg)
						}
					})
					.catch(err => {
						this.isLogin = false
						console.error(err)
						util.toast('登录失败')
					})
			}
		}
	}
</script>

<style lang="less">
	.login_wrap {
		.content {
			display: flex;
			align-items: center;
		}
		.form {
			padding: 0 10%;
			width: 80%;
			margin-top: -60px;
			&:focus {
				outline: none;
			}
			.item {
				padding: 20px 0;
				.input {
					width: 100%;
					box-sizing: border-box;
					padding: 5px 15px;
					border: 1px solid #ccc;
					outline: none;
					line-height: 28px;
					font-size: 14px;
					border-radius: 5px;
					&:focus {
						border-color: rgba(0,0,0,.5);
					}
				}
				.btn {
					width: 100%;
					background-color: #80bd01;
					color: #fff;
					border: 1px solid darken(#80bd01, 3%);
					line-height: 38px;
					border-radius: 5px;
					font-size: 14px;
					&:active {
						background-color: darken(#80bd01, 5%);
						box-shadow: inset 0 3px 10px rgba(0,0,0,.3);
					}
					&:focus {
						outline: none;
					}
				}
			}
		}
	}
</style>