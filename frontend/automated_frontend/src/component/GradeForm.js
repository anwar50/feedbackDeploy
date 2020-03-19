import { Form, Input, Button, Row, Col} from 'antd';
import React from "react"
import axios from "axios";
import {Link} from "react-router-dom";
// const {Option} = Select;

class GradeForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      num: 0,
      module: [],
      showingAlert: false,
      test: [],
      num_subquestions: 0,
      topicsAsked: false,
      counter: 0,
      topics: []
    }
  }
  handleChange = (e) => {
    this.setState({
      num: e,
    })
  }
  componentDidMount()
    {
        // const moduleID = this.props.moduleID;
        // axios.get(`http://127.0.0.1:8000/api/module/${moduleID}`)
        // .then(res => {
        //     this.setState({
        //         module: res.data
        //     })
        //     console.log(res.data)
        // })
        const TESTID = this.props.testID
        axios.get(`http://127.0.0.1:8000/api/test/${TESTID.id}`)
        .then(res => {
          this.setState({
            test: res.data,
            num_subquestions: res.data.num_subquestions
          })
        })
        
    }
        //request type given because form is used more than once
        //also specifying the module id for updating a specific module.
  handleFormSubmit = (e, requestMethod, testID) => {
      e.preventDefault();
      let grade = " ";
      let effectiveness = "";
      const total = e.target.elements.total_mark.value;
      const total_sub = e.target.elements.total_sub.value;
      const weakest = e.target.elements.weakest.value;
      const final_mark = parseInt((total_sub/total)*100)
      if(final_mark >= 70 && final_mark <= 100)
      {
        grade = "A";
        effectiveness = "Outstanding";
      }
      else if(final_mark >= 60 && final_mark <= 69)
      {
        grade = "B";
        effectiveness = "Good";
      }
      else if(final_mark >= 50 && final_mark <= 59)
      {
        grade = "C";
        effectiveness = "Need Improvement";
      }
      else if(final_mark >= 45 && final_mark <= 49)
      {
        grade = "D";
        effectiveness = "Poor";
      }
      else
      {
        grade = "Fail";
        effectiveness = "Fail";
      }
      console.log(testID.id + " " + total + " " + total_sub + " " + final_mark)
      switch(requestMethod) {
        case 'post':
          axios.post(`http://127.0.0.1:8000/api/create/grade/`, {
            grade: grade,
            grade_mark: final_mark,
            effectiveness: effectiveness,
            test: testID.id
          })
          .then(res => {
            console.log(res) 
            let new_str = "";
            this.state.topics.map(function(item, i){
              new_str = new_str +","+ item
            })
            
            console.log(new_str)
            axios.post('http://127.0.0.1:8000/api/create/answer/', {
              test: testID.id,
              total_mark_for_question: total,
              topics: new_str,
              total_sub_marks: total_sub,
              weakest_topic: weakest,
            })
            .then(res => {
              console.log(res)
            })
            this.setState({
                showingAlert: true
            });
            setTimeout(() => {
                this.setState({
                  showingAlert: false,
                });
            }, 5000);
              //redirect to home page after creating
            //window.location = '/Grade'
          })
          .catch(err => console.log(err))
        case 'put':
            // axios.put(`http://127.0.0.1:8000/api/module/${moduleID}/update/`, {
              
            // })
            // .then(res => console.log(res))
            // .catch(err => console.log(err))
            return null
      }
  }
  onKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
     if (/\+|-/.test(keyValue))
       event.preventDefault();
  }
  handleTopicSubmit(e, counter)
  {
    counter = counter+1;
    console.log(counter)
    e.preventDefault();
    const topic = e.target.elements.topic.value;
    this.setState({
      counter: counter
    })
    
    var join = this.state.topics.concat(topic);
    this.setState({
      topics: join
    })
    if(counter == this.state.num_subquestions)
    {
      this.setState({
        topicsAsked: true,
      })
    }
  }
  render() {
    
    return (
      <div>
        {this.state.topics}
        <div className={`alert alert-success ${this.state.showingAlert ? 'alert-shown': 'alert-hidden'}`}>
                <strong>The grade that you have given for this test has been saved!</strong>Go check your saved tests to check them out!!
        </div>
        {
          this.state.topicsAsked ?
          
          <Form onSubmit={(event) => this.handleFormSubmit(event, this.props.requestMethod, this.props.testID)}>
            <div>
                <strong>All of your topics were saved! Now add more information</strong>
            </div>
            <Row gutter={20}>
              <Col span={8}>
                <Form.Item label="Total mark for all questions">
                  <Input type="number" name="total_mark" pattern="[0-9]*" onKey Press={this.onKeyPress.bind(this)} />
                </Form.Item>
                <Form.Item label="Total mark given to students for sub questions">
                    <Input type="number" name="total_sub" pattern="[0-9]*" onKey Press={this.onKeyPress.bind(this)} />
                </Form.Item>
                <Form.Item label="What was the students weakest topic?">
                    <Input name="weakest" placeholder="" />
                </Form.Item>
              </Col>
              
            </Row>
      
            {/* <Form.Item label="Grade Number">
                  <Input type="number" name="num" pattern="[0-9]*" onKey Press={this.onKeyPress.bind(this)} />
              </Form.Item> */}
              {/* <Form.Item label="Effectiveness">
                <Input name="effectiveness" placeholder="Outstanding, Good, Need Improvement, Poor or Fail.." />
              </Form.Item> */}
          <Form.Item>
            <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
            </Form.Item>
          </Form>
          :
          this.state.counter != this.state.num_subquestions ?
          <Form onSubmit={(event) => this.handleTopicSubmit(event,this.state.counter)}>
            <Row>
              <Col>
                <Form.Item label={"What was the topic for question " + (this.state.counter+1)}>
                  <Input name="topic" placeholder="" />
                </Form.Item>
                <Form.Item style={{textAlign: 'center'}}>
                    <Button type="primary" htmlType="submit">Add topic</Button>
                </Form.Item>
          
              </Col>
            </Row>
          </Form>
          :
          <h3>Well done all of your topics were saved!</h3>
        }
      </div>
    );
  }
}

export default GradeForm