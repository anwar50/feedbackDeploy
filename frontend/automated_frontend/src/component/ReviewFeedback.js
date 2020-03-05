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
            showFeedback: false
        }
    }
    componentDidMount(){
        const testName = this.props.match.params.testid
        const testMark = this.props.match.params.testmark
        const correct = this.props.match.params.correct
        const incorrect = this.props.match.params.incorrect
        axios.get(`http://127.0.0.1:8000/api/processnltk/${testName}/${testMark}/${correct}`)
        .then(res => {
            console.log(res.data)
            this.setState({
                data: res.data,
                showFeedback: true
            })
        })
    }
    generateFeedback(testName, testMark, correct){
        console.log("hi yes!!")
        
        this.setState({
            showFeedback: false,
        })
        axios.get(`http://127.0.0.1:8000/api/processnltk/${testName}/${testMark}/${correct}`)
        .then(res => {
            console.log(res.data)
            this.setState({
                data: res.data,
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
                      Test Mark: {this.props.match.params.testmark}% <br/>
                      Correct Answers: {this.props.match.params.correct} <br/>
                      Incorrect Answers: {this.props.match.params.incorrect} <br/>
                    </Card>
                  </Col>
                  <Col span={5}>
                    <Card bordered style={{ color: 'blue'}} title="Feedback for this test" bordered={false}>
                      {this.state.showFeedback ? this.state.data[0] : <Spin indicator={antIcon} />}
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered style={{color: 'blue'}} title="Feedback Score & other information" bordered={false}>
                      Sentiment Score: {this.state.showFeedback ? this.state.data[1] : <Spin indicator={antIcon} />} <br/>
                      Sentiment Category: {this.state.showFeedback ? this.state.data[2] : <Spin indicator={antIcon} />}
                    </Card>
                  </Col>
                </Row>
                <div className="btnFeedback">
                    <Button style={{margin: '5px'}} type="primary" onClick={(e) => this.generateFeedback(this.props.match.params.testid, this.props.match.params.testmark, this.props.match.params.correct)}>Generate another feedback?</Button>
                    <Link to={`/generatefeedback/` + this.props.match.params.testid + `/` + this.props.match.params.userid}><Button style={{margin: '5px'}} type="primary">Happy to see the full result?</Button></Link>
                </div>
            </div>
        )
    }
}
export default ReviewFeedback