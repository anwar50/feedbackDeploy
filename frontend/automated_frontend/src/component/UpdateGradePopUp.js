import React from "react"
import '../css/Layout.css';
import ExamForm from "./ExamForm";
import { Button, Form, Input, Select} from "antd";
import { blue } from '@ant-design/colors';
import axios from "axios"
const {Option} = Select;

class UpdateGradePopUp extends React.Component { 
  constructor(props)
  {
    super(props);
    this.state = {
      type: 'default',
      module: [],
      module_id: 0,
      showAlert: false,
      tests: []
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleFormSubmit = (e, requestMethod, test, moduleName) => {
    e.preventDefault();
    const grade = e.target.elements.grade.value;
    const mark = e.target.elements.num.value;
    const effectiveness = e.target.elements.effectiveness.value;  
    let temptests = []
    let tempgrades = []
    let test_id = 0
    let grade_id = 0
    axios.get('http://127.0.0.1:8000/api/test')
    .then(res => {
            temptests = res.data
            
            temptests.map(function(item, i){
                if(item.name == test)
                {
                    console.log(item.id)
                    test_id = item.id
                }
            })
            console.log(test_id)
            axios.get('http://127.0.0.1:8000/api/grades')
            .then(res => {
                tempgrades = res.data
                tempgrades.map(function(item, i){
                    if(item.test == test_id)
                    {
                        grade_id = item.id
                    }
                })
                console.log(grade_id + " " + test_id)
                axios.put(`http://127.0.0.1:8000/api/grade/${grade_id}/update/`, {
                    grade: grade,
                    grade_mark: mark,
                    effectiveness:effectiveness,
                    test: test_id
                })
            })
            
            .then(res => console.log(res))
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
        var divStyle = {
            color: 'blue',
        };
      return (  
            <div className='popup' style={{color: 'red'}}>  
                <div className='popupbtn' style={{divStyle}}>  
                <h2 style={{display: 'flex', justifyContent: 'center'}} >Enter a grade Information {this.props.moduleName} here!</h2>
                <Form onSubmit={(event) => this.handleFormSubmit(event, "post", this.props.testName, this.props.moduleName)}>
                        <Form.Item label="Grade" style={{ marginBottom: 1 }}>
                            <Input  name="grade" placeholder="A, B, C, D, E or Fail" />
                        </Form.Item>
                        <Form.Item label="Grade Number" style={{ marginBottom: 1 }}>
                            <Input type="number" name="num" pattern="[0-9]*" onKey Press={this.onKeyPress.bind(this)} />
                        </Form.Item>
                        <Form.Item label="Effectiveness" style={{ marginBottom: 1 }}>
                            <Input name="effectiveness" placeholder="Outstanding, Good, Need Improvement, Poor or Fail.." />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 1 }}>
                            <Button type="primary" htmlType="submit">Update Grade</Button>
                            <br />
                            <Button type="primary" onClick={this.props.closePopup}>close me</Button> 
                        </Form.Item>
                </Form>
                </div>  
            </div>  
      );  
  }  
  }  
  
  export default UpdateGradePopUp;