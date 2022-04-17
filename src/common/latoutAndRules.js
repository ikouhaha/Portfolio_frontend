export const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
}

export const formItemRadioLayout = {
    wrapperCol: { xs: { span: 24}, sm: { span: 12 }}
}


export const tailFormItemLayout = {
    wrapperCol: { xs: { span: 16, offset: 8 }, sm: { span: 16, offset: 8 } }
}



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
                if(!value){
                    return Promise.reject('Please contact your manager to get the company code');
                }
                
            }
            


            return Promise.resolve();
        }
    })
];


export const usernameRules = [
    { required: true, message: 'Please input your username!', whitespace:
   true }
]

export const requireTextFieldRules = [
    { required: true, message: 'Please input the field!', whitespace:
   true }
]

export const requireRadioFieldRules = [
    { required: true, message: 'Please choose the field!', whitespace:
   true }
]


