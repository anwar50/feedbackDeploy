import React from "react"
import '../css/Layout.css';
import ExamForm from "./ExamForm";
import axios from "axios";
import {Link} from "react-router-dom";
import { Button, Form, Input, Select} from "antd";
const {Option} = Select;
class UpdateTestPopUp extends React.Component { 
  constructor(props)
  {
    super(props);
    this.state = {
      type: 'default',
      module: [],
      module_id: 0,
      showAlert: false,
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleFormSubmit = (e, requestMethod, test, moduleName) => {
    e.preventDefault();
      const title = e.target.elements.name.value;
      const description = e.target.elements.description.value;
      const num_questions = e.target.elements.num.value;
      const type = this.state.type;
      const correct = e.target.elements.correct.value;
      const incorrect = e.target.elements.incorrect.value;
      console.log(test)
      console.log(title, num_questions, description, type);
    let temptests = []
    let tempgrades = []
    let module_id = 0
    axios.get('http://127.0.0.1:8000/api/test')
    .then(res => {
            temptests = res.data
            
            temptests.map(function(item, i){
                if(item.name == test)
                {
                    console.log(item.id)
                    module_id = item.module
                }
            })
            console.log(module_id)
            axios.post(`http://127.0.0.1:8000/api/create/test/`, {
              name: title,
              test_count: num_questions,
              correct_answers: correct,
              incorrect_answers: incorrect,
              description: description,
              created_date: new Date().toLocaleString(),
              questiontype: type,
              module: module_id,
            })
            .then(res => {
              console.log(res) 
                //redirect to home page after creating
                this.setState({
                  showingAlert: true,
                  module_id: module_id
                });
                setTimeout(() => {
                  this.setState({
                    showingAlert: false,
                  });
                }, 5000);
                 // window.location = '/feedbackstage/' + moduleID + '/' + this.props.userID
                // this.props.dispatch(push('/feedbackstage/' + moduleID + '/' + this.props.userID))
            })
            .catch(err => console.log(err))
            
    })
  }
  onKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
     if (/\+|-/.test(keyValue))
       event.preventDefault();
  } 
  handleChange = (e) => {
    const val = e.label
    console.log(val)
    this.setState({
      type: e.label
    })
  }
    render() {  
      return (  
            <div className='popup'>  
                <div className={`alert alert-success ${this.state.showingAlert ? 'alert-shown': 'alert-hidden'}`}>
                    <strong>Your test has been updated!</strong><Link to={'/feedbackstage/' + this.state.module_id + '/' + this.props.userID}><Button type="primary" htmlType="submit" style={{alignItems:'center'}}>Click to check your test and grade!</Button></Link>
                </div>
                <div className='popupbtn' style={{color: 'red'}}>  
                <h2 style={{display: 'flex', justifyContent: 'center'}} >Update the Information for {this.props.moduleName} here!</h2>
                <Form style={{  color: 'aqua'}} onSubmit={(event) => this.handleFormSubmit(event, "post", this.props.testName, this.props.moduleName)}>
                      <Form.Item label="Name" style={{ marginBottom: 1, color: 'red' }}>
                        <Input name="name" placeholder="Name of exam..." />
                      </Form.Item>
                      <Form.Item label="Number of questions" style={{ marginBottom: 1 }}>
                        <Input type="number" name="num" pattern="[0-9]*" onKeyPress={this.onKeyPress.bind(this)} />
                      </Form.Item>
                      <Form.Item label="Number of correct answers" style={{ marginBottom: 1 }}>
                        <Input type="number" name="correct" pattern="[0-9]*" onKeyPress={this.onKeyPress.bind(this)} />
                      </Form.Item>
                      <Form.Item label="Number of incorrect answers" style={{ marginBottom: 1 }}>
                        <Input type="number" name="incorrect" pattern="[0-9]*" onKeyPress={this.onKeyPress.bind(this)} />
                      </Form.Item>
                      <Form.Item label="Description" style={{ marginBottom: 1 }}>
                        <Input name="description" name="description" placeholder="e.g. mid term or revision..." />
                      </Form.Item>
                      <Form.Item label="Type of question" style={{ marginBottom: 1 }}>
                          <Select ref={ref => {
                            this._select = ref }} labelInValue defaultValue={this.state.value} style={{width: 120}} onChange={this.handleChange}>
                              <Option value="MCQ">Multiple choice questions</Option>
                              <Option value="Definition">Short definitions</Option>
                              <Option value="Skeleton Program">Skeleton program questions</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item style={{ marginBottom: 1 }}>
                        <Button type="primary" htmlType="submit">Update</Button>
                        <br />
                        <Button type="primary" onClick={this.props.closePopup}>close me</Button> 
                      </Form.Item>
                  </Form>
                </div>  
            </div>  
      );  
  }  
  }  
  
  export default UpdateTestPopUp;