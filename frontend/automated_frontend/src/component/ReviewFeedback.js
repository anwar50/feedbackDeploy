import React from "react";
import { Form, Button, Input,Card, Col, Row,notification  } from "antd";
import axios from "axios";
class ReviewFeedback extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
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
                data: res.data
            })
        })
    }
    render()
    {
        return(
            <div >
                
                <Row gutter={10}>
                  <Col span={5}>
                    <Card bordered style={{color: 'blue'}} title="Test Information" bordered={false}>
                      Test Name: {this.props.match.params.testid} <br/>
                      Test Mark: {this.props.match.params.testmark}% <br/>
                      Correct Answers: {this.props.match.params.correct} <br/>
                      Incorrect Answers: {this.props.match.params.incorrect} <br/>
                    </Card>
                  </Col>
                  <Col span={5}>
                    <Card bordered style={{color: 'blue'}} title="Feedback for this test" bordered={false}>
                      {this.state.data[0]}
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered style={{color: 'blue'}} title="Feedback Score & other information" bordered={false}>
                      Sentiment Score: {this.state.data[1]} <br/>
                      Sentiment Category: {this.state.data[2]}
                    </Card>
                  </Col>
                </Row>
            </div>
        )
    }
}
export default ReviewFeedback