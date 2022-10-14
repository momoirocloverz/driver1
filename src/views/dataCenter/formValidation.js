export const validateUsername = (rule, value, callback) => {
  console.log(value, 'value')
  var reg = /^[\u4e00-\u9fa5a-zA-Z0-9_-]{0,}$/;
  if (!value) {
    callback(new Error('请输入用户名'))
  } else if (value.trim().length > 20) {
    callback(new Error('请输入20位以内的用户名'))
  } else if(!reg.exec(value)) {
    callback(new Error('您输入的账号中含有非法字符，请重新输入'))
  } else {
    callback()
  }
}

export const validatePassword = (rule, value, callback) => {
  if (value.length < 6 || value.length > 18) {
    callback(new Error('请输入长度为6-18位的密码'))
  } else {
    callback()
  }
}

export const validateBindUserName = (rule, value, callback) => {
  if( this.newForm.userName.trim().length > 20) {
  callback(new Error('请输入20位以内的用户名'))
  }else if( !this.newForm.userName.trim().length ){
      callback(new Error('绑定用户名不能为空'))
  }else{
      callback()
  }
}

export const validateBindPassword =  (rule, value, callback) => {
  if ( this.newForm.password.length < 6 || this.newForm.password.length > 18) {
  callback(new Error('请输入长度为6-18位的密码'))
} else {
  callback()
}
}

export const validateCaptcha = (rule, value, callback) => {
  if (this.$refs.captcha.validate()) {
    callback()
  } else {
    callback(new Error('请输入正确的验证码'))
  }
}