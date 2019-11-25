<template>
  <!-- <el-container class="app-container">
    <el-aside class="app-aside">
      <div class="logo">LOGO</div>
      <cm-menu></cm-menu>
    </el-aside>
    <el-container>
      <el-header class="app-header">
        <div class="user">
          <el-avatar class="image" src="/static/img/avatar.png"></el-avatar>
          <i class="iconfont el-icon-tuichu" @click="onLoginout()"></i>
        </div>
      </el-header>
      <el-main class="main">
        <cm-breadcrumb class="breadcrumb"></cm-breadcrumb>
        <router-view class="content"/>
      </el-main>
    </el-container>
  </el-container> -->
  <div class="app-container">
    <div class="app-aside">
      <div class="logo">LOGO</div>
      <cm-menu></cm-menu>
    </div>
    <div class="app-content">
      <el-header class="app-header">
        <div class="user">
          <el-avatar class="image" src="/static/img/avatar.png"></el-avatar>
          <i class="iconfont el-icon-tuichu" @click="onLoginout()"></i>
        </div>
      </el-header>
      <el-main class="main">
        <cm-breadcrumb class="breadcrumb"></cm-breadcrumb>
        <router-view class="content"/>
      </el-main>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'

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
  },
  methods:{
    ...mapActions('login', ['logout']),
    onLoginout(){
      this.logout({
        vm: this,
        confirm: true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container{
  width: 100%;
  height: 100%;
  display: flex;
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
.app-content{
  flex: 1;
  display: flex;
  flex-direction: column;
}
.app-header{
  background-color: #409EFF;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .user{
    width: 100px;
    height: auto;
    display: flex;
    align-items: center;

    .image{
      width: 36px;
      height: 36px;
    }

    i{
      margin-left: 16px;
      font-size: 20px;
      color: white;
      cursor: pointer;
    }
  }
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
