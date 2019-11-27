<template>
  <div class="home-content">
    <el-form :model="formInline" :inline="true">
      <el-form-item label="新闻标题">
        <el-input v-model="formInline.title" style="width: 180px" placeholder="请输入新闻标题"></el-input>
      </el-form-item>
      <el-form-item label="资讯来源">
        <el-input v-model="formInline.column" style="width: 180px" placeholder="请输入资讯来源"></el-input>
      </el-form-item>
      <el-form-item label="委员姓名">
        <el-input v-model="formInline.senatorName" style="width: 180px" placeholder="请输入委员姓名"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker v-model="formInline.startDate" style="width: 180px"  placeholder="请选择开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker v-model="formInline.endDate" style="width: 180px"  placeholder="请选择结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch()" style="width:120px;">搜索</el-button>
      </el-form-item>
    </el-form>

    <div class="content-list" v-loading="loading">
      <div v-if="data.length === 0" style="text-align:center;padding-top:50px;">
        暂无数据
      </div>
      <el-card v-else class="article-items" shadow="hover" v-for="(item, index) in data" :key="index">
        <div class="title" @click="onArticleClick(item)" v-html="item.title"></div>
        <div class="desc" @click="onArticleClick(item)" v-html="item.summary"></div>
        <div class="bottom">
          <div class="item site" :title="item.site" @click="onSiteSearch(item)">
            <i class="iconfont el-icon-wangzhan"></i>
            采集网站：
            {{item.site}}</div>
          <div class="item autor" :title="item.author" @click="onAuthorSearch(item)">
            <i class="el-icon-user"></i>
            作者：
            <span>{{item.author}}</span>
            </div>
          <!-- <div class="item autor">转发次数：
            <i class="iconfont el-icon-web-icon-"></i>
            {{item.author}}</div> -->
          <div class="item time" @click="onTimeSearch(item)">
            <i class="el-icon-time"></i>
            采集时间：
            {{getTime(item.createDate)}}</div>
            
          <div class="item time" :title="item.senatorNameStr" @click="onSenatorNameSearch(item)">
            <i class="iconfont el-icon-group"></i>
            委员：
            <span class="item-content">{{item.senatorNameStr}}</span>
          </div>
        </div>
      </el-card>
    </div>
    <div class="bottom-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageConfig.page"
        :page-size="pageConfig.size"
        layout="prev, pager, next, sizes, jumper"
        :total="pageConfig.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
/* eslint-disable */

export default {
  name: 'home',
  data () {
    return {
      formInline:{
        title: '',
        type: '热点', // 热点
        column: '', // 专栏
        startDate: '',
        endDate: '',
        senatorName: '',
        site: '',
        author: '',
      },
      
      loading: false,
      data:[],
      pageConfig:{
        page: 1,
        size: 10,
        total: 0,
      }
    }
  },
  watch:{
    '$route.name':function(){
      this.initType();
      this.initData();
    }
  },
  methods:{
    onSearch(){
      this.formInline.site = '';
      this.formInline.author = '';
      this.pageConfig.page = 1;
      this.initData();
    },
    async initData(){
      this.loading = true;
      try {
        const data = {
          number: this.pageConfig.page - 1,
          size: this.pageConfig.size,
          ...this.formInline,
        }
        if (data.startDate) data.startDate = this.$moment(data.startDate).format('YYYY-MM-DD 00:00:00')
        if (data.endDate) data.endDate = this.$moment(data.endDate).format('YYYY-MM-DD 23:59:59')
        const res = await this.$http.post('/api/page/news/getNewsByPage.json', data)
        this.data = res.data.newsList && res.data.newsList.map((item) => {
          item.summary = item.summary.trimLeft();
          return item
        });
        this.pageConfig.total = res.data.totalNews;
      } catch (error) {
        console.log('error', error)
      }
      this.loading = false;
    },
    getTime(time){
      return this.$moment(time).format('YYYY-MM-DD HH:mm')
    },
    handleSizeChange(value) {
      this.pageConfig.size = value;
      this.pageConfig.page = 1;
      this.initData()
    },
    handleCurrentChange(value) {
      this.pageConfig.page = value
      this.initData()
    },
    onArticleClick(item){
      this.$router.push({
        name: 'info',
        params: item,
      })
    },
    initType(){
      this.formInline.type = this.$route.meta.sourceType
    },
    onSiteSearch(item){
      this.formInline.site = item.site;
      this.formInline.author = '';
      this.pageConfig.page = 1;
      this.initData();
    },
    onAuthorSearch(item){
      this.formInline.author = item.author;
      this.formInline.site = '';
      this.pageConfig.page = 1;
      this.initData();
    },
    onTimeSearch(item){
      this.formInline.startDate = item.startDate;
      this.pageConfig.page = 1;
      this.initData();
    },
    onSenatorNameSearch(item){
      this.formInline.senatorName = item.senatorNameStr;
      this.pageConfig.page = 1;
      this.initData();
    }
  },
  created() {
    this.initType();
    this.initData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home-content >>> .el-form-item__label{
  font-size:16px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(37,38,49,1);
}
.search-items{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.article-items{
  margin: 12px;
  padding-left: 20px;
  cursor: pointer;

  .title{
    font-size:16px;
    font-weight:600;
    color:rgba(37,38,49,1);
    line-height:22px;
  }
  .desc{
    margin-top: 6px;
    font-size:14px;
    font-weight:400;
    color:rgba(81,82,94,1);
  }
  .bottom{
    margin-top:10px;
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
        font-size: 12px;
      }

      .item-content{
        width: auto;
        max-width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
        font-size:12px;
        font-weight:400;
        color:rgba(152,169,188,1);
      }
    }
  }
}
.bottom-page{
  text-align: right;
  margin: 20px 30px;
}
</style>
