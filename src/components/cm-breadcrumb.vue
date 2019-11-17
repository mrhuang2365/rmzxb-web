<template>
<div>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item class="breadcrumb" @click.native="go({path: '/top'})">
      <i class="el-icon-s-home icon"></i>首页
    </el-breadcrumb-item>
    <el-breadcrumb-item class="breadcrumb" v-for="(item, index) in breadList" :key="index" @click="go(item)">
      <i class="el-icon-folder-opened icon"></i> {{item.name}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</div>
</template>
<script>
export default {
  data(){
    return{
      breadList:[],
    }
  },
  watch:{
    '$route':function(){
      this.init();
    }
  },
  methods:{
    go(item){
      this.$router.push(item.path)
    },
    init(){
      this.breadList = [];
      for (const routeInfo of this.$route.matched) {
        if (routeInfo.path !== '/' && routeInfo.path) {
          this.breadList.push({
            name: routeInfo.meta.title,
            path: routeInfo.path
          });
        }
      }
    }
  },
  created(){
    this.init();
  }
}
</script>
<style lang="scss" scoped>
.breadcrumb{
  cursor: pointer;

  &:hover{
    color: blue;
  }
}
.icon{
  margin-right: 5px
}
</style>