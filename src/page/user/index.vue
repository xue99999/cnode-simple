<template>
    <div class="user_wrap">
        <v-header title="个人中心">
            <div slot="left" class="item" @click="$router.go(-1)">
                <i class="iconfont icon-back"></i>
            </div>
        </v-header>
        <v-content style="bottom:0">
            <div class="user">
                <div class="header_bg"></div>
                <div class="avatar_wrap">
                    <!-- <span class="avatar" :style="{'background-image': 'url(' + item.author.avatar_url + ')'}"></span> -->
                    <span class="avatar" :style="{'background-image': 'url(' + 'https://avatars3.githubusercontent.com/u/1297278?v=3&s=120' + ')'}"></span>
                </div>
                <h2 class="nickname">xuejun询</h2>
                <div class="list">
                    <span>积分: 30</span>
                    <span>注册于: 1年前</span>
                </div>
            </div>
        </v-content>
    </div>
</template>

<style lang="less">
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
            font-size: 18px;
            margin: 10px 0;
        }
    }
    
</style>