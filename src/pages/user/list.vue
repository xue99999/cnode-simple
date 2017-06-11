<template>
	<div>
		<ul class="user_list">
	        <li v-for="item in list">
	        	<router-link :to="'/topic/' + item.id">
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
		                    <span class="list_title">{{item.title}}</span>
		                </div>
		                <div class="extra_wrap">
		                    <span>{{item.last_reply_at | formatDate}}</span>
		                </div>
		            </div>
	            </router-link>
	        </li>
	    </ul>
	</div>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			}
		}
	}
</script>

<style lang="less">
	.user_list {
		li {
			border-bottom: 1px solid #eee;
		}
		.author_wrap {
	        display: flex;
	        padding: 10px 15px;
	        .avatar_wrap {
	            width: 30px;
	            height: 30px;
	            border: 1px solid #f7f7f7;
	            margin-right: 10px;
	            border-radius: 50%;
	            .avatar {
	                display: inline-block;
	                width: 100%;
	                height: 100%;
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
	                color: #666;
	                font-weight: 500;
	                height: 16px;
	                line-height: 16px;
	                font-size: 14px;
	            }
	            .list_title {
	            	display: inline-block;
	            	padding: 10px 0;
	                font-size: 16px;
	            }
	        }
	        .extra_wrap {
	            font-size: 14px;
	            color: #888;
	        }
	    }
	}
</style>