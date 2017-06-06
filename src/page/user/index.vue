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
                    <span class="avatar" :style="{'background-image': 'url(' + user.avatar_url + ')'}"></span>
                </div>
                <h2 class="nickname">{{user.loginname}}</h2>
                <div class="user_info">
                    <span>积分: {{user.score}}</span>
                    <span>注册于: {{user.create_at | formatDate}}</span>
                </div>
            </div>
            <ul class="user_ul">
                <li :class="{on: tabIndex == 0}" @click="tabIndex = 0">回复</li>
                <li :class="{on: tabIndex == 1}" @click="tabIndex = 1">主题</li>
            </ul>
            <list v-if="tabIndex == 0" :list="user.recent_replies"></list>
            <list v-else :list="user.recent_topics"></list>    
        </v-content>
    </div>
</template>

<script>
    import list from './list'
    export default {
        data() {
            return {
                tabIndex: 0,
                user: {}
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                let username = this.$route.params.username
                this.$http.get('https://cnodejs.org/api/v1/user/' + username)
                    .then(d => {
                        this.user = d.data.data
                    })
            }
        },
        watch: {
            $route() {
                this.getData()
            }
        },
        components: {list}
    }
</script>

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
            font-size: 22px;
            margin: 10px 0;
        }
        .user_info {
            display: flex;
            padding: 10px 15px;
            span {
                flex: 1;
                font-size: 14px;
                line-height: 16px;
                &:nth-child(2) {
                    text-align: right;
                }
            }
        }
    }
    .user_ul {
        display: flex;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        margin-top: 10px;
        li {
            flex: 1;
            line-height: 38px;
            text-align: center;
            border-right: 1px solid #ddd;
            &.on {
                color: #80bd01;
            }
            &:nth-child(2) {
                border: none;
            }
        }
    }
    
</style>