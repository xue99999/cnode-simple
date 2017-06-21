<template>
	<div>
		<v-header title="主题">
			<div slot="left" class="item" @click="$router.go(-1)">
				<i class="iconfont icon-back"></i>
			</div>
		</v-header>
		<v-content style="bottom: 0">
			<v-loading v-if="!id && exist"></v-loading>
			<v-data-null v-if="!exist" msg="话题不存在"></v-data-null>
			<div v-if="id">
				<ul class="topic-list">
					<div class="icon_wrap">
						<div v-if="topic.good" class="icon">
							<i class="iconfont icon-topic-good green"></i>
						</div>
						<div v-if="topic.top" class="icon">
							<i class="iconfont icon-topic-top red"></i>
						</div>
					</div>

					<!-- author start -->
					<li>
						<div class="author_wrap">
							<div class="avatar_wrap" :uid="topic.author_id">
								<router-link :to="'/user/' + author.loginname">
									<span class="avatar" :style="{'background-image': 'url(' + author.avatar_url + ')'}"></span>
								</router-link>
							</div>
							<div class="info_wrap">
								<h2>
									<router-link :to="'/user/' + author.loginname" class="nickname">{{author.loginname}}</router-link>
								</h2>
								<span class="time">{{topic.create_at | formatDate}}</span>
							</div>
							<div class="extra_wrap">
								<span>#楼主</span>
							</div>
						</div>
					</li>
					<!-- author end -->
					<!-- theme start -->
					<li>
						<div class="datas_header">
							<h3 class="tit">{{topic.title}}</h3>
							<div class="nums_wrap">
								<span>
									<i class="iconfont icon-click"></i>
									<em>{{topic.visit_count}}</em>
								</span>
								<span>
									<i class="iconfont icon-comment"></i>
									<em>{{topic.reply_count}}</em>
								</span>
							</div>
						</div>
						<!-- markdown 语法 -->
						<div class="markdown-body" v-html="topic.content"></div>
					</li>
					<!-- theme end -->
					<li v-if="replies" class="reply-count">
						共(<em>{{ replies.length }}</em>)条回复
					</li>
					<li v-for="(item, idx) in replies">
						<div class="author_wrap">
							<div class="avatar_wrap">
								<router-link :to="'/user/' + item.author.loginname">
									<span class="avatar" :style="{'background-image': 'url(' + item.author.avatar_url + ')'}"></span>
								</router-link>
							</div>
							<div class="info_wrap">
								<h2>
									<router-link :to="'/user/' + item.author.loginname" class="nickname">{{item.author.loginname}}</router-link>
								</h2>
								<span class="time">{{item.create_at | formatDate}}</span>
								<!-- 评论 -->
				                <div class="markdown-body comment" v-html="item.content"></div>
							</div>
							<div class="extra_wrap">
								<span>#{{idx + 1}}</span>
							</div>
						</div>
						<div class="bottom_wrap">
							<span class="comment_zan" @click="fabulousItem(item.id, item.ups)" :class="{actived: isFabulous(item.ups)}">
								<i v-if="user.loginname != item.author.loginname" class="iconfont icon-comment-fabulous"></i>
								<em v-if="item.ups.length">{{item.ups.length}}</em>
							</span>
							<span class="comment_reply" @click="commentShow(item.id)">
								<i class="iconfont icon-comment-topic"></i>
							</span>
						</div>

						<reply-box v-if="item.id == curReplyId" style="padding: 10px 0" :loginname="item.author.loginname" :reply_id="item.id" @success="getData"></reply-box>
					</li>
				</ul>
				<div v-if="user.id">
					<reply-box @success="getData"></reply-box>
				</div>
				<div class="tip-login" v-if="!user.id">
					你还未登录,请先
					<router-link to="/login">登录</router-link>
				</div>
			</div>
		</v-content>
	    <!-- <v-back></v-back> -->
	</div>
</template>

<script>
	import replyBox from './reply-box'
	export default {
		data() {
			return {
				user: '',
				exist: true,
				id: '',
				topic: {},
				author: {},
				replies: [],
				accesstoken: '',
				curReplyId: ''
			}
		},
		mounted() {
			let { vid } = this.$route.params
			let session = window.sessionStorage.getItem(vid)
			if (session) {
				this.topic = JSON.parse(session)
				let { topic } = this
				this.author = topic.author
				this.replies = topic.replies
				this.id = topic.id
				this.$nextTick(() => {
					let con = document.getElementsByClassName('content')[0]
					let top = window.sessionStorage.getItem(vid + 'Top')
					con.scrollTop = top
				})
			} else {
				this.getData()
			}
			let user = window.localStorage.getItem('user')
			if (user) {
				this.user = JSON.parse(user)
				this.accesstoken = window.localStorage.getItem('accesstoken')
			}
		},
		beforeRouteLeave(to, from, next) {
			let { vid } = this.$route.params
			let con = document.getElementsByClassName('content')[0]
			if (con.scrollTop) {
				window.sessionStorage.setItem(vid, JSON.stringify(this.topic))
				window.sessionStorage.setItem(vid + 'Top', con.scrollTop)
			}
			next()
		},
		methods: {
			getData() {
				let { vid } = this.$route.params
				this.$http.get('topic/' + vid)
					.then(d => {
						if (d.data.data && d.data.data.id) {
							this.topic = d.data.data
							this.id = d.data.data.id
							this.author = d.data.data.author
							this.replies = d.data.data.replies
							//评论成功,关掉reply-box组件
							if (this.curReplyId) {
								this.curReplyId = ''
							}
						} else {
							this.exist = false;
						}
					})
					.catch(err => {
						console.error(err)
					})
			},
			isFabulous(ups) {
				return ups.indexOf(this.user.id) > -1
			},
			fabulousItem(id, ups) {
				if (!this.accesstoken) return this.$router.push('/login')

				let index = ups.indexOf(this.user.id)

				if (index > -1) {
					ups.splice(index, 1)
				} else {
					ups.push(this.user.id)
				}
				this.$http.post(`reply/${id}/ups`, {accesstoken: this.accesstoken})
			},
			commentShow(id) {
				if (!this.accesstoken) return this.$router.push('/login')
				this.curReplyId = id
			}
		},
		components: { replyBox }
	}
</script>

<style lang="less">
	.header {
		.icon-back {
			font-size: 24px;
		}
	}
	.icon_wrap {
		position: absolute;
		display: flex;
		right: 0;
		top: 0;
		.icon {
			padding: 20px 5px;
			flex: 1;
			overflow: hidden;
			.red {
				color: red;
			}
			.green {
				color: #80bd01;
			}
			.iconfont {
				display: block;
				font-size: 34px;
				transform: rotate(35deg);
			}
		}
	}
	.author_wrap {
		display: flex;
		.avatar_wrap {
			width: 30px;
			height: 30px;
			border: 1px solid #f7f7f7;
			margin-right: 10px;
			border-radius: 50%;
			.avatar {
				display: inline-block;
				width: 30px;
				height: 30px;
				background-color: #eee;
				background-repeat: no-repeat;
				background-size: cover;
				border-radius: 50%;
			}
		}
		.info_wrap {
			flex: 1;
			text-align: left;
			word-break: break-all;
			overflow: hidden;
			.nickname {
				color: #80bd01;
				font-weight: 500;
				height: 16px;
				line-height: 16px;
				font-size: 14px;
			}
			.time {
				height: 14px;
				line-height: 14px;
				font-size: 12px;
			}
		}
		.extra_wrap {
			font-size: 14px;
		}
	}
	.topic-list {
		overflow: hidden;
		text-align: left;
		&>li {
			padding: 10px 15px;
			border-bottom: 1px solid #ddd;
			&:last-child {
				border: none;
			}
		}
	}
	.datas_header {
		padding: 10px 0;
		border-bottom: 1px solid #ddd;
		.tit {
			font-size: 22px;
			padding: 10px 15px;
			font-weight: 700;
			line-height: 1.2;
			color: #333;
		}
		.nums_wrap {
			display: flex;
			justify-content: center;
			span {
				display: flex;
				align-items: center;
				color: #666;
				margin-right: 8px;
				&:last-child {
					margin-right: 0;
				}
			}
			em {
				font-size: 13px;
				padding-left: 3px;
				font-style: normal;
			}
		}
	}
	.reply-count {
		text-align: left;
		border-left: 4px solid #80bd01;
		em {
			color: #80bd01;
			font-style: normal;
		}

	}
	.markdown-body {
		padding: 10px 0;
	}
	.tip-login {
		text-align: center;
		padding: 100px;
		font-size: 14px;
		a {
			color: #80bd01;
		}
	}
	.bottom_wrap {
		text-align: right;
		.comment_zan, .comment_reply {
			padding: 5px 10px;
			&.actived {
				color: #80bd01;
			}
			em {
				font-style: normal;
				font-size: 13px;
			}
		}
	}
</style>