<template>
	<div class="my_message_wrap">
		<v-header title="我的消息">
		</v-header>
		<v-content>
			<div class="list">
				<div class="item">
					<div class="avatar_wrap">
						<!-- <router-link to="/user/123"> -->
							<img src="https://avatars0.githubusercontent.com/u/7077490?v=3&s=120" alt="">
						<!-- </router-link> -->
					</div>
					<div class="content_wrap">
						<div class="top">
							<span class="nickname">shiyingang</span>
							<time class="time">13小时</time>
						</div>
						<div class="mid">
							<span>回复了你的话题</span>
							<!-- <router-link to="/"> -->
								<span class="topic_title">测试完了很快删除啊</span>
							<!-- </router-link> -->
						</div>
						<div class="bot">
							<div class="markdown-body">hahha</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <v-data-null v-if="!list.length"></v-data-null> -->
		</v-content>
		<v-footer></v-footer>
	</div>
</template>

<style lang="less">
	.my_message_wrap {
		.list {

		}
		.item {
			display: flex;
			padding: 10px 15px;
			border-bottom: 1px solid #ddd;
		}
		.avatar_wrap {
			width: 40px;
			height: 100%;
			margin-right: 10px;
			img {
				width: 36px;
				height: 36px;
				border: 2px solid #f7f7f7;
				border-radius: 50%;
				background-color: #eee;
			}
		}
		.content_wrap {
			flex: 1;
			text-align: left;
			.top {
				line-height: 2;
				.nickname {
					font-size: 14px;
					font-weight: bold;
				}
				time {
					font-size: 13px;
					color: #888;
				}
			}
			.mid {
				.topic_title {
					color: #80bd01;
				}
			}
			.bot {
				margin-top: 10px;
				padding: 10px;
				border-radius: 5px;
				background-color: #ddd;
			}
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				list: []
			}
		}
	}
</script>