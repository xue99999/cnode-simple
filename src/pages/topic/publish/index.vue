<template>
	<div class="publish_wrap">
		<v-header title="发表">
      <div slot="right" class="item">
		    <i class="iconfont icon-edit"></i>
      </div>
    </v-header>
    <v-content>
    2432143224
    <v-loading></v-loading>
    </v-content>
		<v-footer></v-footer>
	</div>
</template>

<style lang="less">
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
      
  }
</style>