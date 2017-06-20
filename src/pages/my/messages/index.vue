<template>
	<div class="my_message_wrap">
		<v-header title="我的消息">
		</v-header>
		<v-content>
			<div v-if="!!list && list.length" class="list">
				<div v-for="item in list" class="item">
					<div class="avatar_wrap">
						<router-link :to="'/user/' + item.author.loginname">
							<img :src="item.author.avatar_url" alt="">
						</router-link>
					</div>
					<div class="content_wrap">
						<div class="top">
                            <router-link :to="'/user/' + item.author.loginname">
    							<span class="nickname">{{item.author.loginname}}</span>
                            </router-link>
							<time class="time">{{item.create_at | formatDate}}</time>
						</div>
						<div class="mid">
							<span>回复了你的话题</span>
							<router-link :to="'/topic/' + item.topic.id">
								<span class="topic_title">{{item.topic.title}}</span>
							</router-link>
						</div>
						<div class="bot">
							<div class="markdown-body" v-html="item.reply.content"></div>
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
            word-break: break-all;
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
				background-color: #f5f5f5;
			}
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				list: [],
                accesstoken: ''
			}
		},
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                if (window.localStorage.getItem('accesstoken')) {
                    this.accesstoken = window.localStorage.getItem('accesstoken')
                }

                this.$http.get('messages?accesstoken=' + this.accesstoken)
                    .then(d => {
                        this.list = d.data.data.hasnot_read_messages
                    })
                    .catch(err => {
                        console.error(err)
                    })
            }
        }
	}
</script>