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
			<ul v-if="id" class="topic-list">
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
								<i class="iconfont icon-click"></i>{{topic.visit_count}}
							</span>
							<span>
								<i class="iconfont icon-comment"></i>{{topic.reply_count}}
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
				</li>
			</ul>
			
		</v-content>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				exist: true,
				id: '',
				topic: {},
				author: {},
				replies: []
			}
		},
		created() {
			this.getData()	
		},
		methods: {
			getData() {
				let vid = this.$route.params.vid
				this.$http.get('topic/' + vid)
					.then(d => {
						if (d.data.data && d.data.data.id) {
							this.topic = d.data.data
							this.id = d.data.data.id
							this.author = d.data.data.author
							this.replies = d.data.data.replies
						} else {
							this.exist = false;
						}
					})
					.catch(err => {
						console.error(err)
					})
			}
		}
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
	    // align-items: center;
		// height: 40px;
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
		overflow-x: hidden;
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
			text-align: center;
			font-size: 0;
			span {
				font-size: 14px;
				color: #888;
				margin-right: 8px;
				&:last-child {
					margin-right: 0;
				}
			}
			.iconfont {
				font-size: 14px;
				margin-right: 3px;
			}
		}
	}
	.reply-count {
		text-align: left;
		border-left: 4px solid #80bd01;
		em {
			color: red;
			font-style: normal;
		}

	}
	.markdown-body {
		padding: 10px 0;
	}
</style>