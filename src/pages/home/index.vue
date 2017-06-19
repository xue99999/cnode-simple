<template>
	<div class="home">
		<nav class="nav">
			<ul>		
				<li class="nav_item" :class="{ active: !this.$route.query.tab }">
					<router-link to="/">全部</router-link>
				</li>
				<li class="nav_item" :class="{ active: this.$route.query.tab == 'good'}">
					<router-link to="/?tab=good">精华</router-link>
				</li>
				<li class="nav_item" :class="{ active: this.$route.query.tab == 'share'}">
					<router-link to="/?tab=share">分享</router-link>
				</li>
				<li class="nav_item" :class="{ active: this.$route.query.tab == 'ask'}">
					<router-link to="/?tab=ask">问答</router-link>
				</li>
				<li class="nav_item" :class="{ active: this.$route.query.tab == 'job'}">
					<router-link to="/?tab=job">招聘</router-link>
				</li>
			</ul>
		</nav>
		<v-content>
			<ul class="list">
				<li class="list_item" v-for="item in lists" :data-id="item.id">
					<router-link :to="'/topic/' + item.id">
					<div class="list_top">
						<div class="avatar" v-lazy:background-image="item.author.avatar_url">
						</div>

						<div class="extra">
							<h2 class="name">{{item.author.loginname}}</h2>
							<div class="desc">
								<time class="time">{{item.create_at | formatDate}}</time><span class="tag">#{{tabs[item.tab]}}#</span>
							</div>
						</div>
					</div>
					<div class="icon_wrap">
						<div v-if="item.good" class="icon">
							<i class="iconfont icon-topic-good green"></i>
						</div>
						<div v-if="item.top" class="icon">
							<i class="iconfont icon-topic-top red"></i>
						</div>
					</div>
					<div class="tit">
						{{item.title}}
					</div>
					<div class="list_bot">
						<div class="item">
							<i class="iconfont icon-click"></i><span class="text">{{item.visit_count}}</span>
						</div>
						<div class="item">
							<i class="iconfont icon-comment"></i><span class="text">{{item.reply_count}}</span>
						</div>
						<div class="item">
							<time class="text">{{item.last_reply_at | formatDate}}</time>
						</div>
					</div>
					</router-link>
				</li>
			</ul>

			<v-loading :loading="loading" :complete="complete" @seeing="seeing"></v-loading>
		</v-content>
		<v-footer></v-footer>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				lists: [],
				tabs: {
					'share': '分享',
					'ask': '问答',
					'good': '精华',
					'job': '招聘'
				},
				searchKey: {
					tab: 'all',
					page: 1,
					limit: 20,
					mdrender: true
				},
				firstLoad: true,
				loading: false,
				complete: false
			}
		},
		mounted() {
			if (this.$route.query.tab) {
				this.searchKey.tab = this.$route.query.tab
			} else {
				this.searchKey.tab = 'all'
			}

			let key = this.searchKey.tab
			if (window.sessionStorage.getItem(key)) {
				this.getStorage(key)
			} else {
				this.getList()
			}
		},
		watch: {
			// 切换页面
			$route() {
				// 如果是当前页面切换分类的情况
				let key = this.searchKey.tab
				this.setStorage()
				let con = document.getElementsByClassName('content')[0]
				window.sessionStorage.setItem(key + 'Top', con.scrollTop)

				if (this.$route.query.tab) {
					this.searchKey.tab = this.$route.query.tab
				} else {
					this.searchKey.tab = 'all'
				}

				key = this.searchKey.tab
				if (window.sessionStorage.getItem(key)) {
					this.getStorage(key)
				} else {
					this.lists = []
					this.searchKey.page = 1
					this.getList()
				}

			}
		},
		beforeRouteEnter (to, from, next) {
			if (from.name != 'topic') {
				window.sessionStorage.clear()
			}
			next()
		},
		beforeRouteLeave(to, from, next) {
			if (to.name == 'topic') {
				this.setStorage()
				let key = this.searchKey.tab
				let con = document.getElementsByClassName('content')[0]
				window.sessionStorage.setItem(key + 'Top', con.scrollTop)
			}
			next()
		},
		methods: {
			seeing() {
				if (this.searchKey.page == 1) return
				this.getList()
			},
			getList() {
				if (this.complete || this.loading) return
				this.loading = true
				let params = this.transfromData(this.searchKey)

				this.$http.get('topics' + params)
					.then(d => {
						if (d.data.data.length > 0) {
							d.data.data.forEach(item => {
								this.lists.push(item)
							})
						} else {
							this.complete = true
						}
						this.searchKey.page++
						this.loading = false
					})
			},
			setStorage() {
				let key = this.searchKey.tab
				let data = {
					page: this.searchKey.page, //当前是第几页
					lists: this.lists,
				}
				window.sessionStorage.setItem(key, JSON.stringify(data))
				
			},
			getStorage(key) {
				
				let data = JSON.parse(window.sessionStorage.getItem(key))
				this.lists = data.lists
				this.searchKey.page = data.page

				this.$nextTick(() => {
					//必须nextTick DOM元素才能获取到
					let con = document.getElementsByClassName('content')[0]

					let top = window.sessionStorage.getItem(key + 'Top')

					con.scrollTop = top
				})
				
			},
			transfromData(obj) {
				let params = '?'
				for (let i in obj) {
					params += i + '=' + obj[i] + '&'
				}
				return params.slice(0, -1)
			}
		}
	}
</script>

<style lang="less">
	.home {
		.nav {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 10;
			border-bottom:  1px solid #ddd;
			ul {
				display: flex;
				width: 100%;
				.nav_item {
					position: relative;
					flex: 1;
					height: 49px;
					line-height: 49px;
					text-align: center;
					&:active {
						background-color: #f5f5f5;
					}
				}
				a {
					display: block;
					font-size: 14px;
					color: #a2a2a2;
				}
				.active {
					a {
						color: #222;
					}
					&:after {
						content: '';
						position: absolute;
						bottom: 1px;
						left: 0;
						right: 0;
						height: 3px;
						background: #80bd01;
					}
				}
			}
		}
		.list {
			background-color: #eee;
			overflow: hidden;
			.list_item {
				position: relative;
				background-color: #fff;
				padding: 15px;
				padding-bottom: 0;
				margin-bottom: 15px;
				box-shadow: 0 0 5px #ccc;
				&:active {
					background-color: #f5f5f5;
				}
			}
			.list_top {
				display: flex;
				.avatar {
					width: 30px;
					height: 30px;
					margin-right: 5px;
					border-radius: 50%;
					background-color: #f7f7f7;
					background-repeat: no-repeat;
					background-position: center center;
					border: 1px solid #ddd;
					background-size: cover;
				}
				.extra {
					flex: 1;
					text-align: left;
					.name {
						font-size: 16px;
						line-height: 24px;
						color: #080808;
					}
					.desc {
						font-size: 12px;
						line-height: 16px;
						.time {
							color: #aaa;
							margin-right: 5px;
						}
						.tag {
							color: #80bd01;
						}
					}
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
						color: green;
					}
					.iconfont {
						display: block;
						font-size: 34px;
						transform: rotate(35deg);
					}
				}
			}
			.tit {
				padding: 10px 0;
				text-align: left;
				font-size: 16px;
				line-height: 22px;
				font-weight: bold;
				color: #222;
			}
			.list_bot {
				display: flex;
				padding: 10px 0;
				border-top: 1px solid #e1e1e1;
				.item {
					flex: 1;
					padding: 0 10px;
					border-right: 1px solid #eee;
					line-height: 20px;
					&:last-child {
						border-right: none;
					}
					.iconfont {
						font-size: 16px;
						margin-right: 5px;
						color: #aaa;
					}
					.text {
						font-size: 12px;
					}
				}
			}
		}

		.more_btn {
			display: block;
			width: 30%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			margin: 20px auto;
			border-radius: 5px;
			background-color: #252e39;
			color: #fff;
			border: none;
			&:active {
				opacity: 0.7;
			}
		}
	}
</style>