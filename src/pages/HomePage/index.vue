<template>
  <el-container class="app-container">
    <el-aside class="app-aside">
      <div class="logo">LOGO</div>
      <cm-menu></cm-menu>
    </el-aside>
    <el-container>
      <el-header class="app-header">
      </el-header>
      <el-main class="main">
        <cm-breadcrumb class="breadcrumb"></cm-breadcrumb>
        <router-view class="content"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import cmMenu from '../../components/cm-menu'
import cmBreadcrumb from '../../components/cm-breadcrumb'

export default {
  name: 'App',
  data(){
    return {

    }
  },
  components:{
    cmMenu,
    cmBreadcrumb
  }
}
</script>
<style lang="scss" scoped>
.app-container{
  width: 100%;
  height: 100%;
}
.app-aside{
  background-color: #37424f;
  width: 200px!important;
  color: white;

  .logo{
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
  }
}
.app-header{
  background-color: #409EFF;
}
.main{
  display: flex;
  flex-direction: column;
  .content{
    flex: 1;
    margin-top: 28px;
    overflow: auto;
  }
}
</style>
