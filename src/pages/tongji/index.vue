<template>
  <div class="content">
    <div class="header">
      <div class="tab" :class="{active: tabName === item.value, borderRightNone: index !== tabs.length -1}"
        @click="onTabClick(item, index)"
        v-for="(item, index) in tabs" :key="index">{{item.name}}</div>
    </div>
    <!-- 搜索条件 -->
    <div class="search-items">
      <div class="times">
        <div class="tab" :class="{active: from.dateType === item.value, borderRightNone: index !== times.length -1}"
          @click="onTabTimeslick(item, index)"
          v-for="(item, index) in times" :key="index">{{item.name}}</div>
      </div>
      <!-- <div class="item">
        开始时间:
        <el-date-picker
          v-model="from.startDate"
          placeholder="选择开始时间">
        </el-date-picker>
      </div>
      <div class="item">
        结束时间:
        <el-date-picker
          v-model="from.endDate"
          placeholder="选择结束时间">
        </el-date-picker>
      </div> -->
      <div class="mm-flex-h">
        <div class="item">
          <el-button type="primary" style="width:100px;" @click="initData">搜索</el-button>
        </div>
        <div class="item">
          <el-button style="width:100px;" :disabled="data.length === 0" @click="exportExcel">导出</el-button>
        </div>
      </div>
    </div>
    <!-- 文章 -->
    <div v-if="tabName == '0'">
      <el-table class="table" id="my-data-table" stripe  v-loading="loading" 
        header-row-class-name="table-header" :data="data" style="width: 100%">
        <el-table-column label="排名" type="index" width="80"></el-table-column>
        <el-table-column label="文章标题" prop="title" width="300">
          <template slot-scope="scope" >
            <div @click="goOut(scope.row)" style="cursor: pointer;">{{scope.row.title}}</div>
          </template>
        </el-table-column>
        <el-table-column label="委员姓名" prop="senatorName"></el-table-column>
        <el-table-column label="公众号" prop="wechatNickName"> </el-table-column>
        <el-table-column label="地域" prop="wechatProvince"> </el-table-column>
        <el-table-column label="阅读数" prop="newsReadCount"  width="120"> </el-table-column>ssss
        <el-table-column label="在看数" prop="newsLikeCount" width="120"> </el-table-column>
        <el-table-column label="发布时间" prop="publishTime"  width="180"></el-table-column>
      </el-table>
    </div>
    <!-- 公众号 -->
    <div v-if="tabName == '1'">
      <el-table class="table" id="my-data-table" stripe 
        v-loading="loading" header-row-class-name="table-header" :data="data" 
        style="width: 100%">
          <el-table-column label="排名" type="index" width="80"></el-table-column>
          <el-table-column label="公众号" prop="wechatNickName">
            <template slot-scope="scope"  align="center">
              <div>{{scope.row.wechatNickName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="发布次数/篇数">
           <template slot-scope="scope" >
              <div>{{scope.row.newsCount}}</div>
            </template>
          </el-table-column>
          <el-table-column label="阅读次数" prop="newsReadCount"> </el-table-column>
          <el-table-column label="平均阅读" prop="averageReadCount"> </el-table-column>
          <el-table-column label="在看数" prop="newsLikeCount"> </el-table-column>
        </el-table>
    </div>
   
    <!-- 分页 -->
    <!-- <div class="bottom-page" v-if="data.length > 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageConfig.page"
        :page-size="pageConfig.size"
        :page-sizes="[10, 20, 50]"
        layout="prev, pager, next, sizes, jumper"
        :total="pageConfig.total">
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
import {exportExcel, getWorkSheet, exportExcelFromArrary} from '@/util/util'

export default {
  data(){
    return{
      tabs:[
        {
          value: '0',
          name: '文章'
        },
        {
          value: '1',
          name: '公众号'
        }
      ],
      tabName: '0',
      times:[
        {
          name: '日',
          value: '0',
        },{
          name: '3日',
          value: '1',
        },{
          name: '周',
          value: '2',
        },{
          name: '月',
          value: '3',
        }
      ],
      from: {
        dateType: '0',
        startDate: this.$moment(),
        endDate: '',
        // city: ''
      },
      loading:false,
      loading:false,
      pageConfig:{
        page: 1,
        size: 10,
        total: 0,
      },
      data:[],
    }
  },
  methods:{
    onTabClick(item, index){
      this.tabName = item.value;
      this.initData()
    },
    onTabTimeslick(item, index){
      this.from.dateType = item.value;
      this.initData();
    },
    tableRowClassName({row, rowIndex}){
      if (rowIndex % 2 !== 1) {
        return 'warning-row';
      }
      return ''
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
    async initData(){
      try {
        this.loading = true;
        const data = {
          type: this.tabName,
          dateType: this.from.dateType,
          // startDate: this.$moment(this.from.startDate).format('YYYY-MM-DD 00:00:00'),
          // endDate: ''
        }
        // if (this.from.endDate) {
        //   data.endDate = this.$moment(this.from.startDate).format('YYYY-MM-DD 23:59:59')
        // }
        const res = await this.$http.post('/api/page/news/getWechatStatistics.json', data);
        this.data = res.data.map((item) => {
          item.publishTime = this.$moment(item.createDate).format('YYYY-MM-DD HH:mm');
          return item
        })
        // this.pageConfig.total = res.count;
      } catch (error) {
        
      }
      this.loading = false;
    },
    onArticleExport(fileName){
      const keys = [
        {
          key: 'index',
          display: '排名',
        },{
          key: 'title',
          display: '文章标题',
        },
        {
          key: 'senatorName',
          display: '委员姓名',
        },{
          key: 'wechatNickName',
          display: '公众号',
        },{
          key: 'wechatProvince',
          display: '地域',
        },{
          key: 'newsReadCount',
          display: '阅读数',
        },{
          key: 'newsLikeCount',
          display: '在看数',
        },{
          key: 'publishTime',
          display: '发布时间',
        },{
          key: 'newsUrl',
          display: 'url',
        },
      ];
      const headerArr = [];
      const contentArr= [];
      keys.forEach((i) => {
        headerArr.push(i.display)
      })
      contentArr[0] = headerArr;
      this.data.forEach((item, index)=>{
        const arr = [];
        keys.forEach((i) => {
          const value = i.key === 'index' ? index + 1 : item[i.key]
          arr.push(value)
        });
        contentArr.push(arr);
      })
      exportExcelFromArrary(contentArr, fileName)
    },
    onWechatExport(fileName){
      const keys = [
        {
          key: 'index',
          display: '排名',
        },{
          key: 'wechatNickName',
          display: '公众号',
        },{
          key: 'newsCount',
          display: '发布次数/篇数',
        },{
          key: 'newsReadCount',
          display: '阅读次数',
        },{
          key: 'averageReadCount',
          display: '平均阅读',
        },{
          key: 'newsLikeCount',
          display: '在看数',
        }
      ];
      const headerArr = [];
      const contentArr= [];
      keys.forEach((i) => {
        headerArr.push(i.display)
      })
      contentArr[0] = headerArr;
      this.data.forEach((item, index)=>{
        const arr = [];
        keys.forEach((i) => {
          const value = i.key === 'index' ? index + 1 : item[i.key]
          arr.push(value)
        });
        contentArr.push(arr);
      })
      exportExcelFromArrary(contentArr, fileName)
    },
    exportExcel(){
      const fileName = this.tabName == '0' ? '文章排行' : '公众号排行';
      if (this.tabName == '0') {
        this.onArticleExport(fileName)
      } else {
        this.onWechatExport(fileName)
      }
      // exportExcelFromArrary([['标题', 'url'], ['1', 'www.bai.com']], fileName)
      // exportExcel([{
      //     sheetName: 'newsheet',
      //     ws: getWorkSheet("my-data-table")
      // }], fileName)
    },
    goOut(item){
      window.open(item.newsUrl);
    }
  },
  created(){
    this.initData()
  }
}
</script>
<style lang="scss" scoped>
.content{
  padding: 0 10px 20px;
}
.el-table .warning-row {
  background: #f0f9eb;
}
.mm-flex-h{
  display: flex;
}
.table{
  margin-top: 25px;
}
// .table >>> .el-table__header{
//   width: 100%!important;
// }
.table >>> .table-header th{
  background-color: #f0eded !important;
}
.tab{
  width: 100px;
  padding: 10px 0;
  font-size: 16px;
  text-align: center;
  font-weight: 500;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
}
.borderRightNone{
  border-right: none;
}
.header{
  display: flex;
  .tab{
    width: 100px;
    padding: 10px 0;
    margin: 10px 0 15px 0;  
    &.active{
      background-color: #409EFF;
      color: white;
    }
  }
}
.times{
  display: flex;
  .tab{
    width: 45px;
    padding: 8px 0;
    &.active{
      border: 1px solid #3a3a98;
    }
  }
}
.search-items{
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content:space-between;
  
  .item{
    margin-left: 18px;
    flex-shrink: 0;
  }
}
.bottom-page{
  text-align: right;
  margin: 20px 30px;
}

</style>