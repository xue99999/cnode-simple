<template>
	<div>
		<footer class="footer">
			<ul>
				<li v-for="list in lists" class="footer_item" :class="{ active: list.path == $route.path}">
					<router-link :to="list.path">
						<i class="iconfont" :class="list.icon"></i>
						<em>{{list.title}}</em>
					</router-link>
				</li>
			</ul>
		</footer>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				lists: [
					{
						path: '/',
						icon: 'icon-index',
						title: '首页'
					},
					{
						path: '/topic/create',
						icon: 'icon-edit',
						title: '发表'
					},
					{
						path: '/my/messages',
						icon: 'icon-msg',
						title: '消息'
					},
					{
						path: '/my/home',
						icon: 'icon-user',
						title: '我的'
					}
				]
			}
		}
	}
</script>

<style lang="less">
	.footer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		border-top: 1px solid #d4d4d4;
		ul {
			display: flex;
			width: 100%;
			padding: 5px 0;
			.footer_item {
				flex: 1;
				text-align: center;
			}
			.active {
				a {
					color: #80bd01;
				}
			}
			a {
				position: relative;
				display: block;
				color: #222;
			}
			i {
				display: block;
				line-height: 24px;
			}
			em {
				font-style: normal;
				font-size: 13px;
				line-height: 16px;
			}

		}
	}
</style>