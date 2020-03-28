import React from "react";
import { Form, Icon, Input, 
  Button, Spin}  from 'antd';
import {connect} from "react-redux"
import {NavLink} from "react-router-dom";
import * as actions from "../store/actions/authActions"
import axios from "axios";
const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{fontSize: 24}} spin />;

class NormalLoginForm extends React.Component {
  constructor(props){
    super(props)
    {
      this.state ={
        user_type: ''
      }
    }
  }
  // checkUsername = (rule, value, callback) => {
  //   // const form = this.props.form;
  //   form.setFields({
  //     username: {
  //       value: 'asdas'
  //     }
  //   });
  //   // form.setFieldsValue ('pedro, manada');
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    let user_type = ''
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.userName, values.password)
      }
      axios.get(`http://127.0.0.1:8000/api/users`)
        .then(res => {
            {res.data.map(function(item, i){
              if(item.username == values.userName)
              {
                user_type = item.user_type
              }
            })}
            console.log(res.data) 
            console.log(user_type)
            //redirect you to home page after login
            this.props.history.push(`/savedtests/` + values.userName + '/');
        })
    });
  }

  render() {
    let errorMessage = null;
    if(this.props.error){
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {errorMessage}
        {
          this.props.loading ?

          <Spin indicator={antIcon} />
          
          :

          <Form onSubmit={this.handleSubmit} className="login-form">

            <FormItem>
              {getFieldDecorator('userName', {
                rules: [
                  {required: true, message: 'Please input your username!'},
                  {validator: this.checkUsername}
                ],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} 
                placeholder="Username" />
                )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} 
                type="password" placeholder="Password" />
                )}
            </FormItem>
            
            <FormItem>
                <Button type="primary" htmlType="submit" style={{marginRight: '12px'}}>login</Button>
                or

                <NavLink 
                  style={{marginRight: '11px'}} 
                  to="/registerteacher/"> Sign Up As a teacher
                </NavLink>
            </FormItem>
          </Form>
        }
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


const mapStateToProps = (state) => {
  return{
    loading: state.loading,
    error: state.error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(actions.authLogin(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);

