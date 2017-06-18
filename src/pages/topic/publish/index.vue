<template>
	<div class="publish_wrap">
		<v-header title="发表">
      <div slot="right" class="item" @click="submit">
		    <i class="iconfont icon-edit"></i>
      </div>
    </v-header>
    <v-content>
        <form class="form" @submit.prevent="submit">
          <div class="title">
            <input type="text" placeholder="标题十个字以上..." v-model="form.title">
          </div>
          <div class="select">
            <select v-model="form.tab">
              <option value="">请选择</option>
              <option value="share">分享</option>
              <option value="ask">问答</option>
              <option value="job">招聘</option>
              <option value="dev">测试</option>
            </select>
          </div>
          <div class="con">
            <textarea name="" id="" cols="30" rows="10" placeholder="内容..." v-model="form.content"></textarea>
          </div>
        </form>
    </v-content>
		<v-footer></v-footer>
	</div>
</template>

<script>
  import * as util from 'util/toast.js'
  export default {
    data() {
      return {
        form: {
          accesstoken: '',
          topic_id: '',
          title: '',
          tab: '',
          content: ''
        }
      }
    },
    methods: {
      submit() {
        if (window.localStorage.getItem('accesstoken')) {
          this.form.accesstoken = window.localStorage.getItem('accesstoken')
        }

        if (!this.form.accesstoken) return this.$router.push({ path: '/login' })

        let { form } = this

        if (!form.title) {
          return util.toast('标题不能为空')
        } else if (!form.tab) {
          return util.toast('选项不能为空')
        } else if (!form.content) {
          return util.toast('内容不能为空')
        }

        this.$http.post('topics', this.form)
          .then(d => {
            console.log(d.data)
            if (d.data.success) {
              console.log('发布成功')
              let vid = d.data.topic_id
              this.$router.push({ path: `/topic/${vid}` })
            } else {
              console.log('发布失败')
              util.toast(error_msg)
            }
          })
          .catch(err => {
            util.toast('发布失败')
          })
      }
    }
  }
</script>

<style lang="less">
  * {
    outline: none;
  }
	.publish_wrap {
      .item {
        .icon-edit {
          font-size: 24px;
          color: #80bd01;
        }
        &:active {
          background-color: rgba(0, 0, 0, .1);
        }
      }
      .form {
          .title {
            padding: 5px 15px;
            input {
              box-sizing: border-box;
              width: 100%;
              padding: 0 5px;
              font-size: 14px;
              line-height: 30px;
            }
          }
          .select {
            box-sizing: border-box;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            select {
              padding: 10px 5px;
              width: 100%;
            }
          }
          .con {
            padding: 5px 10px;
            textarea {
              border: none;
              width: 100%;
              padding: 0 5px;
              resize: none;
            }
          }
      }
      
  }
</style>