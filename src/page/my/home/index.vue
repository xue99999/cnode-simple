<template>
	<div class="my">
		<v-header title="个人中心"></v-header>
        <v-content>
        	<div class="user">
                <div class="header_bg"></div>
                <div class="avatar_wrap">
                    <span class="avatar" :style="{'background-image': 'url(' + '' + ')'}"></span>
                </div>
                <h2 class="nickname">你还未登录,请先登录!</h2>
            </div>
        <v-loading></v-loading>
        </v-content>
		<v-footer></v-footer>
	</div>
</template>

<style lang="less">
	.my {
		.user {
	        width: 100%;
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
	            font-size: 22px;
	            margin: 10px 0;
	        }
	    }
	}
</style>