<template>
	<div>
		<v-header title="主题">
			<div slot="left" class="item" @click="$router.go(-1)">
				<i class="iconfont icon-back"></i>
			</div>
		</v-header>
		<v-content>
			<v-loading></v-loading>
			<v-data-null msg="话题不存在"></v-data-null>
			<div class="author_wrap">
				<div class="avatar_wrap">
					<router-link to="/" :style="{'background-image': 'url(' + 'https://avatars3.githubusercontent.com/u/24876474?v=3&s=120' + ')'}">
					</router-link>
				</div>
				<div class="info_wrap">
					<h2>
						<router-link class="nickname" to="/">薛钧</router-link>
					</h2>
					<span class="time">一天前</span>
				</div>
				<div class="extra_wrap">
					<span>#楼主</span>
				</div>
			</div>
		</v-content>
	</div>
</template>

<style lang="less">
	.header {
		.icon-back {
			font-size: 24px;
		}
	}
	.author_wrap {
		display: flex;
	    align-items: center;
		height: 40px;
		padding: 5px 15px;
		border-bottom: 1px solid #eee;
		.avatar_wrap {
			width: 30px;
			height: 30px;
			border: 2px solid #f7f7f7;
			margin-right: 10px;
			border-radius: 50%;
			a {
				display: inline-block;
				width: 100%;
				height: 100%;
				background-color: #eee;
				background-repeat: no-repeat;
				border-radius: 50%;
			}
		}
		.info_wrap {
			flex: 1;
			text-align: left;
			.nickname {
				color: green;
				font-weight: 500;
				height: 24px;
				line-height: 24px;
				font-size: 16px;
			}
			.time {
				height: 16px;
				line-height: 16px;
				font-size: 12px;
			}
		}
		.extra_wrap {
		}
	}
</style>