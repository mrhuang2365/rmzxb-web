<template>
  <div class="login-content">
    <div class="box-content">
      <h1>告别繁琐 创造便是快乐</h1>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" 
          label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="userName">
          <el-input type="password" placeholder="请输入账号" style="width:300px;"
            @keyup.enter.native="submitForm"
            v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" placeholder="请输入密码"  style="width:300px;"  
            @keyup.enter.native="submitForm"
            v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" placeholder="请再次密码"  style="width:300px;"  
            @keyup.enter.native="submitForm"
            v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-button class="button" v-loading="loading" type="primary" @click="submitForm()">提交</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'
const crypto = require('crypto-js');

export default {
  data(){
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        // if (this.ruleForm.checkPass !== '') {
        //   this.$refs.ruleForm.validateField('checkPass');
        // }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      ruleForm: {
        userName: '',
        pass: '',
        // checkPass: '',
      },
      rules: {
        userName: [ {validator: checkName, trigger: 'blur'}],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  computed:{
    ...mapGetters({
      userInfo: 'user/userInfo'
    })
  },
  methods:{
    ...mapActions('login', ['accountLogin']),
    goHome(){
      this.$router.push('/top')
    },
    submitForm() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const password = crypto.MD5(this.ruleForm.pass).toString();
          const data = {
            userName: this.ruleForm.userName,
            password
          }
          try {
            const res = await  this.accountLogin({vm:this, data})
            // console.log('res:', res, this.userInfo.userName)
          } catch (error) {
            
          }
          this.loading = false;
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created(){

  }
}
</script>
<style lang="scss" scoped>
.login-content{
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('/static/img/index-bg.jpg');
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
}
.box-content{
  width: 600px;
  height: 400px;
  margin:  0 auto;
  position: absolute;

  animation-name: slideUp;
  animation-duration: 0.8s;
  // animation-delay: 0.3s;
  animation-fill-mode: forwards;
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
  opacity: 0;
  background-color: rgba(54, 54, 54, 0.5);
  border-radius: 5px;

  h1{
    line-height: 1.5;
    font-size: 36px;
    font-family: SourceHanSans;
    text-align: center;
    margin-top: 20px;
    font-weight: 500;
    margin-bottom: 10px;
    color: white;
  }

  .demo-ruleForm{
    margin:50px 0 0;
    padding-left: 60px;

    >>> .el-form-item__label{
      color: white;
    }
  }

  
  .button{
    width: 350px;
    margin-left: 60px;
  }
}
@keyframes slideUp {
  0% {
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  100% {
    top: 50%;
    left: 50%;
    display: block;
    transform: translate(-50%, -50%);
    opacity: 1;
  }
}
</style>