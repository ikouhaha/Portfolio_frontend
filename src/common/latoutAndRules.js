export const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }

  export const formItem2Layout = {
    labelCol: {
      xs: { span: 16 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }


export const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };


export const emailRules = [
    { type: 'email', message: 'The input is not valid e-mail' },
    { required: true, message: 'Please input your e-mail' }
]

export const passwordRules = [
    { required: true, message: 'Please input your password!' }
];

export const confirmRules = [
    { required: true, message: 'Please confirm your password!' },
    ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('The passwords that you entered do not match!');
        }
    })
];

export const companyCodeRules = [
    { required: false, message: 'Please confirm your code!' },
    ({ getFieldValue }) => ({
        validator(rule, value) {
            if (getFieldValue('role') === "staff") {
                if (!value) {
                    return Promise.reject('Please input the code');
                }

            }



            return Promise.resolve();
        }
    })
];


export const usernameRules = [
    {
        required: true, message: 'Please input your username!', whitespace:
            true
    }
]

export const requireTextFieldRules = [
    {
        required: true, message: 'Please input the field!', whitespace:
            true
    }
]

export const requireUploadFieldRules = [
  { required: true, message: 'Please upload the file!' },
  ({ getFieldValue }) => ({
      validator(rule, value) {
        console.log(value)
          if (value) {
              if(value.length==0){                
                return Promise.reject();
              }
              return Promise.resolve();
          }
          return Promise.reject();
      }
  })
]

export const requireSelectFieldRules = [
  { required: true, message: 'Please select the field value!' },
  ({ getFieldValue }) => ({
      validator(rule, value) {
          
          if (value) {
              return Promise.resolve();
          }
          return Promise.reject();
      }
  })
]
export const requireRadioFieldRules = [
    {
        required: true, message: 'Please choose the field!', whitespace:
            true
    }
]


