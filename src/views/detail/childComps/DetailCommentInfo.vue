<template>
  <div class="comment-info">
    <div>
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <div>
      <img :src="imageInfo" alt="">
      <span>{{getUserName}}</span>
    </div>
    <div>
      {{commentInfo.content}}
    </div>
    <div>
      <span>{{commentInfo.created | showDate}}</span>
      <span>{{commentInfo.style}}</span>
    </div>
    
  </div>
</template>

<script>
import { formatDate } from 'common/utils/utils';
export default {
  name:'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate(value) {
      // 将时间戳转成Date对象
      const date = new Date(value * 1000);      
      // 将data进行格式化
      return formatDate(date,"yyyy-MM-dd");
    }
  },
  computed: {
    imageInfo() {
      return this.commentInfo.user && this.commentInfo.user.avatar;
    },
    getUserName() {
      return this.commentInfo.user && this.commentInfo.user.uname;
    }
  }
}
</script>

<style scoped>

</style>