/*
body:{
  "email": "blah@gmail.com"
  "password": "123",
  "username": "troll"
}
*/
import React from 'react';
import 'antd/dist/antd.css';
import './SignUpInfo.css';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Tooltip, Icon, Button } from 'antd';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class SignUpInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isLogin: this.props.isLogin,
      location: this.props.location,
      confirmDirty: false,
      autoCompleteResult: [],
      isSignedUp: false,
    };
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleSubmit = e => {
    e.preventDefault();
    // let flag = false;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // flag = true;
        let signUpData = {
          email: values.email,
          password: values.password,
          username: values.username,
        };
        console.log('Received values of form: ', values);
        // this.setState({
        //   isSignedUp: true,
        // });
        /**************axios post 요청***************** */
        axios
          .post('http://27bd42cc.ngrok.io/signup', signUpData, {
            headers: { 'Content-Type': 'application/json' },
          })
          .then(res => {
            console.log(res.data)
            if (res.status === 201) {
              this.setState({
                isSignedUp: true,
              });
            }
            else if (res.status === 409){
              // console.log('error');
              alert('Existing information');
              // this.setState({
              //   isSignedUp: false
              // });
            }
          }).catch(err =>{
            throw err;
          });
        /*********************************************** */
      }
    });

    // if (flag) {
    //   this.setState({
    //     isSignedUp: true,
    //   });
    // }
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  // 입력한 비밀번호들의 일치 여부 확인
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`,
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const { autoCompleteResult, isLogin, location, isSignedUp } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
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
    if (!isSignedUp) {
      return (
        <div>
          <div className="cl_STROLL">STROLL 🍃</div>
          <Form
            {...formItemLayout}
            onSubmit={this.handleSubmit}
            className="cl_SignUpInfo"
          >
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Nickname&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your nickname!',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              {/* <Link to="/"> */}
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                Register
              </Button>
              {/* </Link> */}
            </Form.Item>
          </Form>
        </div>
      );
    } else {
      return <Redirect to="/"> </Redirect>;
    }
  }
}

export default Form.create({ name: 'register' })(SignUpInfo);
