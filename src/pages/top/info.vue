<template>
  <div>
    <div class="top">
      <h1 class="title">{{article.title}}</h1>
      <div class="sub">
        <div class="item site">
            <i class="iconfont el-icon-wangzhan"></i>
            采集网站：
            {{article.site}}</div>
          <div class="item autor">
            <i class="el-icon-user"></i>
            作者：
            <span>{{article.author}}</span>
            </div>
          <!-- <div class="item autor">转发次数：
            <i class="iconfont el-icon-web-icon-"></i>
            {{item.author}}</div> -->
          <div class="item time">
            <i class="el-icon-time"></i>
            采集时间：
            {{getTime(article.createDate)}}</div>
      </div>
    </div>
    <div class="content" ref="content" v-html="article.articleBody"></div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      article: {
        articleBody: ''
      },
    }
  },
  methods:{
    getTime(time){
      return this.$moment(time).format('YYYY-MM-DD HH:mm')
    },
  },
  mounted(){
    // this.$nextTick(() => {
    //   this.$refs.content.innerHTML = this.article.articleBody
    // })
  },
  created(){
    if (!this.$route.params.id){
      this.$router.push('top')
      return
    }
    this.article = this.$route.params;
    if (this.article.articleBody){
      this.article.articleBody = this.article.articleBody.replace(/\\"/g, '"');
      this.article.articleBody = this.article.articleBody.replace(/\\r/g, '');
      this.article.articleBody = this.article.articleBody.replace(/\\n/g, '');
    }
  }
}
</script>
<style lang="scss" scoped>
.top{
  .title{
    text-align: center;
    font-size: 23px;
    // font-weight: 500;
  }
  .sub{
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #918686;
    display: flex;
    font-size: 13px;
    flex-wrap: wrap;

    .item{
      margin-right: 22px;
      display: flex;
      align-items: center;
      i{
        margin-right: 5px;
      }
    }
  }
}
.content{
  padding: 20px 15px;
  
  
}
.content >>> p{
  font-size: 20px;
  line-height: 40px;
}
</style>