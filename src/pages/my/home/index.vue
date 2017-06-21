<template>
	<div class="my">
		<v-header title="个人中心">
			<div v-if="user.id" slot="right" class="item" @click="loginout">
				<i class="iconfont icon-signout"></i>
			</div>
		</v-header>
        <v-content>
        	<router-link v-if="!user.loginname" to="/login" style="display: block">
	        	<div class="user">
	                <div class="header_bg"></div>
	                <div class="avatar_wrap">
	                    <span class="avatar"></span>
	                </div>
	                <h2 class="nickname">你还未登录,请先登录!</h2>
	            </div>
            </router-link>
            <router-link v-if="user.loginname" :to="'/user/' + user.loginname" style="display: block">
	        	<div class="user">
	                <div class="header_bg"></div>
	                <div class="avatar_wrap">
	                    <span class="avatar" :style="{'background-image': 'url(' + user.avatar_url + ')'}"></span>
	                </div>
	                <h2 class="nickname">{{user.loginname}}</h2>
	            </div>
            </router-link>
			<ul class="my_nav">
				<router-link to="/topic/publish">
				<li class="nav_li border">
					<div class="nav_li_hd">
						<i class="iconfont icon-edit"></i>
					</div>
					<div class="nav_li_bd">
						发表主题
					</div>
					<div class="nav_li_ft">
						<i class="iconfont icon-arrow-right"></i>
					</div>
				</li>
				</router-link>
				<router-link to="/my/messages">
				<li class="nav_li">
					<div class="nav_li_hd">
						<i class="iconfont icon-msg" style="color: #e41e1e"></i>
					</div>
					<div class="nav_li_bd">
						我的消息
					</div>
					<div class="nav_li_ft">
						<i class="iconfont icon-arrow-right"></i>
					</div>
				</li>
				</router-link>
			</ul>
			<ul class="my_nav">
				<router-link to="/about">
				<li class="nav_li">
					<div class="nav_li_hd">
						<i class="iconfont icon-about" style="color: #aaa"></i>
					</div>
					<div class="nav_li_bd">
						关于
					</div>
					<div class="nav_li_ft">
						<i class="iconfont icon-arrow-right"></i>
					</div>
				</li>
				</router-link>
			</ul>
        </v-content>
		<v-footer></v-footer>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					id: '',
					avatar_url: '',
					loginname: '',
				}
			}
		},
		created() {
			let user = window.localStorage.getItem('user')
			if (user) {
				this.user = Object.assign(this.user, JSON.parse(user))
			}
		},
		methods: {
			loginout() {
				this.user = {}
				window.localStorage.removeItem('user')
				window.localStorage.removeItem('accesstoken')
			}
		}
	}
</script>

<style lang="less">
	
	.my {
		.header {
			.item {
				&:active {
					background-color: #eee;
				}
				.icon-signout {
					font-size: 22px;
				}
			}	
		}
		
		.content {
			background-color: #f7f7f7;
		}
		.user {
	        width: 100%;
	        &:active {
	    		background-color: #eee;
	    	}
	        .header_bg {
	            display: block;
	            width: 100%;
	            height: 160px;
	            background-color: #5FC3E4;
	            background-image: linear-gradient(120deg, #E55D87, #5FC3E4);
	        }
	        .avatar_wrap {
	            text-align: center;
	            margin-top: -40px;
	            .avatar {
	                display: inline-block;
	                width: 80px;
	                height: 80px;
	                background-color: #eee;
	                background-repeat: no-repeat;
	                background-size: cover;
	                border-radius: 50%;
	                border: 3px solid #f7f7f7;
	            }
	        }
	        .nickname {
	            text-align: center;
			    font-size: 16px;
	            color: #80bd01;
	            padding: 20px 0 30px 0;
	        }
	    }
	    .my_nav {
	    	background-color: #fff;
	    	margin-bottom: 50px;
	    	&:last-child {
	    		margin: 0;
	    	}
	    	.nav_li {
		    	padding: 10px 15px;
		    	display: flex;
		    	align-items: center;
		    	&:active {
		    		background-color: #eee;
		    	}
		    	&.border {
			    	border-bottom: 1px solid #eee;
		    	}
		    	.nav_li_hd {
		    		margin-right: 10px;
		    		.iconfont {
						color: #80bd01;
						font-size: 22px;
		    		}
		    	}
		    	.nav_li_bd {
					flex: 1;
					color: #000;
		    		font-size: 14px;
					text-align: left;
		    	}
		    	.nav_li_ft {
		    		text-align: right;
		    	}
	    	}
	    }
	}
</style>