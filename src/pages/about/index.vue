<template>
	<div class="about_wrap">
		<v-header title="关于">
			<div slot="left" class="item" @click="$router.go(-1)">
				<i class="iconfont icon-back"></i>
			</div>
		</v-header>
		<v-content style="bottom: 0">
			<dl>
				<dt>技术栈:</dt>
				<dd>项目用vue-cli构建(未使用vuex)</dd>
				<dt>项目的注意点:</dt>
				<dd>
					列表页和详情页用sessionStorage做的, 用户信息和accesstoken用localStorage长期保存
				</dd>
				<dt>源码地址:</dt>
				<dd><a href="https://github.com/xue99999/cnode-simple">https://github.com/xue99999/cnode-simple</a></dd>
				<dt>感谢:</dt>
				<dd>
					参考<a href="https://github.com/lzxb/vue-cnode">@lzxb</a>的项目, 感谢cnode社区提供的API
				</dd>
				<dt>更新:</dt>
				<dd>
					2017/06/21: 基本功能完成
				</dd>
			</dl>
		</v-content>
	</div>
</template>

<style lang="less">
	.about_wrap {
		dl {
			padding: 10px;
			line-height: 22px;
			dt {
				text-align: left;
				font-size: 14px;
			}
			dd {
				margin: 10px 0;
				text-align: left;
				padding-left: 20px;
			}
			a {
				color: #80bd01;
				&:active {
					color: darken(#80bd01, 10%);
				}
			}
		}
	}
</style>