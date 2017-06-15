<template>
	<div class="publish_wrap">
		<v-header title="发表">
      <div slot="right" class="item">
		    <i class="iconfont icon-edit"></i>
      </div>
    </v-header>
    <v-content>
        <form class="form" @submit.prevent="submit">
          <div class="title">
            <input type="text" placeholder="标题..." v-model="form.title">
          </div>
          <div class="select">
            <select v-model="form.tab">
              <option value="">请选择</option>
              <option value="share">分享</option>
              <option value="ask">问答</option>
              <option value="job">招聘</option>
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
  export default {
    data() {
      return {
        form: {
          title: '',
          tab: '',
          content: ''
        }
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