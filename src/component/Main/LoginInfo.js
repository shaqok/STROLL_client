import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import './LoginInfo.css';
import { Link, Redirect } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

class LoginInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="cl_STROLL">STROLL 🍃</div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or
            <Link to="/signup">
              <a href=""> register now!</a>
            </Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'normal_login' })(LoginInfo);
