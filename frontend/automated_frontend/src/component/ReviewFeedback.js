import React from "react";
import { Form, Button, Input,Card, Col, Row,notification, Spin  } from "antd";
import axios from "axios";
import {Link} from "react-router-dom";
import '../css/Layout.css';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
class ReviewFeedback extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            showFeedback: false,
            improvement: false,
            effectiveness: ""
        }
    }
    componentDidMount(){
        const testName = this.props.match.params.testid
        const testGrade = this.props.match.params.testgrade
        const testMark = this.props.match.params.testmark
        const correct = this.props.match.params.correct
        const incorrect = this.props.match.params.incorrect
        let test_id = 0
        let final_effect = ""
        axios.get(`http://127.0.0.1:8000/api/processnltk/${testName}/${testGrade}/${testMark}/${correct}`)
        .then(res => {
            console.log(res.data)
            var random_feedback = res.data[Math.floor(Math.random()*res.data.length)];
            console.log(random_feedback)
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
    generateFeedback(testName, testGrade, testMark, correct){
        console.log("hi yes!!")
        
        this.setState({
            showFeedback: false,
        })
        axios.get(`http://127.0.0.1:8000/api/processnltk/${testName}/${testGrade}/${testMark}/${correct}`)
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
    render()
    {
        return(
            <div >
                
                <Row gutter={10} justify="space-around" type="flex">
                  <Col span={5}>
                    <Card bordered style={{color: 'blue'}} title="Test Information" bordered={false}>
                      Test Name: {this.props.match.params.testid} <br/>
                      Test Grade: {this.props.match.params.testgrade} <br />
                      Test Mark: {this.props.match.params.testmark} % <br/>
                      Correct Answers: {this.props.match.params.correct} <br/>
                      Incorrect Answers: {this.props.match.params.incorrect} <br/>
                    </Card>
                  </Col>
                  <Col span={5}>
                    <Card bordered style={{ color: 'blue'}} title="Feedback for this test" bordered={false}>
                      {this.state.showFeedback ? this.state.data.review : <Spin indicator={antIcon} />}
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered style={{color: 'blue'}} title="Feedback Score & other information" bordered={false}>
                      Percentage: {this.state.showFeedback ? this.state.data.score : <Spin indicator={antIcon} />} <br/>
                      Outcome of the generator: {this.state.showFeedback ? this.state.data.category : <Spin indicator={antIcon} />} <br />
                      {this.state.showFeedback ? <p>Based on this information this student {this.state.improvement ? <p>Needs improvement</p> : <p>Is doing very well</p>}</p> : null} 
                    </Card>
                    
                  </Col>
                </Row>
                <div className="btnFeedback">
                    <Button style={{margin: '5px'}} type="primary" onClick={(e) => this.generateFeedback(this.props.match.params.testid, this.props.match.params.testgrade, this.props.match.params.testmark, this.props.match.params.correct)}>Generate another feedback?</Button>
                    <Link to={`/generatefeedback/` + this.props.match.params.testid + `/` + this.props.match.params.userid}><Button style={{margin: '5px'}} type="primary">Happy to see the full result?</Button></Link>
                </div>
            </div>
        )
    }
}
export default ReviewFeedback