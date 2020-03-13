import React from "react";
import { Form, Button, Input,Card, Col, Row,notification, Spin, Typography  } from "antd";
import axios from "axios";
import {Link} from "react-router-dom";
import '../css/Layout.css';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const {Text} = Typography;
class ReviewFeedback extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            feedbackData: [],
            improvementFeedbackData: [],
            showFeedback: false,
            improvement: false,
            giveImprovement: false,
            effectiveness: "",
            AreasOfImprovement: ""
        }
    }
    componentDidMount(){
        const testName = this.props.match.params.testid
        const testGrade = this.props.match.params.testgrade
        const testMark = this.props.match.params.testmark
        const correct = this.props.match.params.correct
        const incorrect = this.props.match.params.incorrect
        const effectiveness = this.props.match.params.effect
      
        let final_effect = ""
        let temp_feedback = [];
        let improvement_feedback = [];
        let test_id = 0
        let weakest = ""
       
        axios.get(`http://127.0.0.1:8000/api/test`)
        .then(res => {
            res.data.map(function(item, i){
              if(testName == item.name)
              {
                test_id = item.id
              }
            })
            axios.get(`http://127.0.0.1:8000/api/answers`)
            .then(res => {
                res.data.map(function(item, i){
                  if(item.test == test_id)
                  {
                    weakest = item.weakest_topic
                  }
                })
                this.setState({
                  AreasOfImprovement: weakest
                })
            })
        })
        axios.get(`http://127.0.0.1:8000/api/processnltk/${testName}/${testGrade}/${testMark}/${correct}/${incorrect}/${effectiveness}`)
        .then(res => {
            console.log(res.data)
            temp_feedback = res.data[0]
            improvement_feedback = res.data[1]
            var q1 = (0.25*improvement_feedback.length+1)
            var q2 = (0.5*improvement_feedback.length+1)
            var q3 = (0.75*improvement_feedback.length+1)
            
            var random_feedback = temp_feedback[Math.floor(Math.random()*temp_feedback.length)];
            var improvement = improvement_feedback[Math.floor(Math.random()*improvement_feedback.length)]
            console.log(random_feedback)
            if(random_feedback.category == "negative")
            {
              this.setState({
                improvement: true,
              })
            }
            this.setState({
                feedbackData: random_feedback,
                improvementFeedbackData: improvement,
                showFeedback: true
            })
            
        })
        
    }
    generateFeedback(testName, testGrade, testMark, correct, incorrect, effect){
        console.log("hi yes!!")
        
        this.setState({
            showFeedback: false,
            giveImprovement: false
        })
        axios.get(`http://127.0.0.1:8000/api/processnltk/${testName}/${testGrade}/${testMark}/${correct}/${incorrect}/${effect}`)
        .then(res => {
            console.log(res.data)
            var random_feedback = res.data[Math.floor(Math.random()*res.data.length)];
            if(random_feedback.category == "negative")
            {
              this.setState({
                improvement: true,
              })
            }
            this.setState({
                data: random_feedback,
                showFeedback: true
            })
        })
    }
    generateImprovementfeedback(testName, testGrade, testMark, correct, incorrect, effect){
        
        this.setState({
            giveImprovement: true,
        })
        
        
    }
    render()
    {
      let score_one = Math.round(this.state.feedbackData.score * 100)
      let score_two = Math.round(this.state.improvementFeedbackData.score * 100)
        return(
            <div >
                
                <Row gutter={10} justify="space-around" type="flex">
                  <Col span={5}>
                    <Card bordered style={{color: 'blue'}} title="Test Information" bordered={false}>
                      <Text strong>Test Name:</Text> <Text strong style={{color: '#096dd9'}}>{this.props.match.params.testid}</Text> <br/>
                      <Text strong>Test Grade:</Text> <Text strong style={{color: '#096dd9'}}>{this.props.match.params.testgrade}</Text> <br />
                      <Text strong>Test Mark:</Text> <Text strong style={{color: '#096dd9'}}>{this.props.match.params.testmark} %</Text> <br/>
                      <Text strong>Correct Answers:</Text> <Text strong style={{color: '#096dd9'}}>{this.props.match.params.correct}</Text> <br/>
                      <Text strong>Incorrect Answers:</Text> <Text strong style={{color: '#096dd9'}}>{this.props.match.params.incorrect}</Text> <br/>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Card headStyle={{backgroundColor: 'green'}} bordered style={{color: 'blue'}} title="Positive Feedback for the overall test" bordered={false}>
                      <Text strong>Feedback: {this.state.showFeedback ? this.state.feedbackData.review : <Spin indicator={antIcon} />}</Text>
                    </Card>
                  </Col>
                  <Col span={10}>
                    <Card  bordered style={{color: 'blue', marginLeft: 150}} title="Positive feedback information" bordered={false}>
                      <Text strong>Percentage:</Text> {this.state.showFeedback ? <Text strong style={{color: '#096dd9'}}>{score_one}</Text> : <Spin indicator={antIcon} />} <br/>
                      <Text strong>Outcome of the generator:</Text> {this.state.showFeedback ? <Text strong style={{color: '#096dd9'}}>{this.state.feedbackData.category}</Text>: <Spin indicator={antIcon} />} <br />
                      <Text strong>Outcome of the test:</Text> {this.state.showFeedback ? <Text strong style={{color: '#096dd9'}}>{this.state.feedbackData.effectiveness}</Text>: <Spin indicator={antIcon} />} <br />
                      <Text strong type="warning">{this.state.showFeedback ? <p>Based on this information this student {this.state.improvement ? <p>Needs improvement!</p> : <p>Is doing very well!</p>}</p> : null} </Text>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Card headStyle={{backgroundColor: 'red'}} bordered style={{color: 'blue'}} title="Improvement Feedback" bordered={false}>
                        
                        <Text strong>Feedback: {this.state.giveImprovement ?  this.state.improvementFeedbackData.review : null}</Text>
                        <Text strong>{this.state.showFeedback ? <Button onClick={(e) => this.generateImprovementfeedback(this.props.match.params.testid, this.props.match.params.testgrade, this.props.match.params.testmark, this.props.match.params.correct, this.props.match.params.incorrect, this.props.match.params.effect)}>Find out feedback for areas of improvement</Button> : <Spin indicator={antIcon} />}</Text>
                        
                    </Card>
                  </Col>
                  <Col span={10}>
                    <Card bordered style={{color: 'blue',marginLeft: 150}} title="Improvement Information" bordered={false}>
                      <Text strong>Area (s) of improvement:</Text>{this.state.giveImprovement ? <Text strong>{this.state.AreasOfImprovement}</Text> : <Spin indicator={antIcon} />} <br/>
                      <Text strong>Improvement:</Text> {this.state.giveImprovement ? <Text strong style={{color: '#096dd9'}}>{this.state.improvementFeedbackData.quartile}</Text> : <Spin indicator={antIcon} />} <br/>
                      <Text strong>Outcome of the generator:</Text> {this.state.giveImprovement ? <Text strong style={{color: '#096dd9'}}>{this.state.improvementFeedbackData.category}</Text>: <Spin indicator={antIcon} />} <br />
                      
                    </Card>    
                  </Col>      
                </Row>
                <div className="btnFeedback" style={{textAlign: 'center',  marginLeft: "30%",marginRight: '50%', margin: '23px'}}>
                    <Button style={{ margin: '5px'}} type="primary" onClick={(e) => this.generateFeedback(this.props.match.params.testid, this.props.match.params.testgrade, this.props.match.params.testmark, this.props.match.params.correct, this.props.match.params.incorrect, this.props.match.params.effect)}>Generate another feedback?</Button>
                    <Link to={`/chooseExistingFeedback/` + this.props.match.params.testid + `/` + this.props.match.params.testmark +`/` + this.props.match.params.testgrade + `/` + this.props.match.params.correct +`/`+ this.props.match.params.incorrect +`/` + this.state.feedbackData.score + `/` + this.props.match.params.effect + `/` + this.props.match.params.userid}><Button style={{marginLeft: '70%', margin: '5px'}} type="primary">Choose from a batch of feedbacks?</Button></Link>
                    <Link to={`/generatefeedback/` + this.props.match.params.testid + `/` + this.props.match.params.testmark +`/` + this.props.match.params.testgrade + `/` + this.props.match.params.correct +`/`+ this.props.match.params.incorrect +`/` + this.state.feedbackData.score + `/` + this.state.feedbackData.review + `/` + this.props.match.params.userid}><Button style={{marginLeft: '70%', margin: '5px'}} type="primary">Happy to see the full result?</Button></Link>
                </div>
                
            </div>
        )
    }
}
export default ReviewFeedback