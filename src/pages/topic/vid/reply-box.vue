<template>
	<div class="reply-box">
		<form @submit.prevent="submit">
			<div class="text">
				<textarea :placeholder="loginname ? '@' + loginname : '发表你的看法...'" v-model="content"></textarea>
			</div>
			<div class="btn_wrap">
				<button class="btn">{{btnname}}</button>
				<!-- form提交必须用button按钮 -->
			</div>
		</form>
	</div>
</template>

<style lang="less">
	.reply-box {
		padding: 50px 15px;
		.text {
			padding: 5px 10px;
			border: 1px solid #ccc;
			border-radius: 5px;
			textarea {
				padding: 0;
				margin: 0;
				width: 100%;
				height: 60px;
				box-sizing: border-box;
				font-size: 13px;
				border: none;
				resize: none;
				outline: none;
			}
		}
		.btn_wrap {
			text-align: right;
			margin-top: 10px;
			.btn {
				display: inline-block;
				padding: 5px 15px;
				background-color: #80bd01;
				color: #fff;
				font-size: 14px;
				border-radius: 5px;
				border: 1px solid darken(#80bd01, 3%);
				&:active {
					background-color: darken(#80bd01, 5%);
				}
			}
		}
	}
</style>

<script>
	import * as util from 'util/toast.js'

	export default {
		props: {
			reply_id: { // 评论的评论id，如果没有则是对主题的评论
				type: String,
				default: ''
			},
			loginname: { // @ Ta(改了placeholder)
				type: String,
				default: ''
			}
		},
		data() {
			return {
				accesstoken: '',
				btnname: '回复',
				content: ''
			}
		},
		methods: {
			submit() {
				if (!this.content) return util.toast('请输入回复内容');
				this.btnname = '回复中...'
				if (window.localStorage.getItem('accesstoken')) {
					this.accesstoken = window.localStorage.getItem('accesstoken')
				}
				let  { vid }  = this.$route.params

				let { reply_id, content, accesstoken, loginname } = this

				if (reply_id) {
					content = `[@${loginname}](user/${loginname}) ${content}`
				}
				content += `

来自 [cnode-vue-simple](https://github.com/xue99999/cnode-simple)
				`

				this.$http.post(`topic/${vid}/replies`, { reply_id, content, accesstoken})
					.then(d => {
						this.btnname = '回复'
						if (d.data.success) {
							util.toast('回复成功!')
				            this.content = ''
							this.$emit('success')
						} else {
							util.toast(d.data.error_msg)
						}
					})
					.catch(err => {
						this.btnname = '回复失败'
						console.error(err)
						util.toast('回复失败!')
					})
			}
		}
	}	
</script>