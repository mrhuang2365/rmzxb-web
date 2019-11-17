<template>
<div>
  <el-menu :default-active="defaultActive" 
    background-color="#37424f"
    class="el-menu-vertical-demo"
    text-color="#fff"
    active-text-color="#409EFF"
    @open="handleOpen" 
    @close="handleClose" 
    :collapse="isCollapse">
    <el-menu-item @click="onMenuClick(menu)" v-for="(menu, index) in menuList" :key="index" :index="menu.id">
      <i :class="menu.icon || 'el-icon-menu'"></i>
      <span slot="title">{{menu.name}}</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
import menuList from './menu'
export default {
  data(){
    return {
      menuList,
      isCollapse: false,
      defaultActive: null,
    }
  },
  watch:{
    '$route':function(){
      this.initDefaultActive();
    }
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    onMenuClick(menu){
      this.$router.push(menu.route);
    },
    initDefaultActive(){
      const item = this.menuList.find((menu) => {
        // console.log('---item', menu, this.$route.path)
        return menu.route === this.$route.path;
      })
      if (item && item.id) this.defaultActive = item && item.id
    }
  },
  created(){
    this.initDefaultActive();
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo >>> .is-active{
  background-color: #4c5661!important;
}
</style>