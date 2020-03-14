import React from "react";
import { Form, Button, Input,Card, Col, Row,notification, Spin, Typography, Modal, Tooltip  } from "antd";
import axios from "axios";
import {Link} from "react-router-dom";
import '../css/Layout.css';
import '../css/reviewFeedback.css';
import { LoadingOutlined } from '@ant-design/icons';
import NumericInput from "./NumericInput"
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const {Text} = Typography;

class ChooseExistingFeedback extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            showFeedback: false,
            improvement: false,
            effectiveness: "",
            feedbackAmount: 0,
            feedbackAmountState: false,
            collectionFeedback: true,
            value: ''
        }
    }
    onChange = value => {
      this.setState({ value });
    };
    componentDidMount(){
        // const testName = this.props.match.params.testid
        // const testGrade = this.props.match.params.testgrade
        // const testMark = this.props.match.params.testmark
        // const correct = this.props.match.params.correct
        // const incorrect = this.props.match.params.incorrect
        // let test_id = 0
        // let final_effect = ""
        // axios.get(`http://127.0.0.1:8000/api/processnltk/${testName}/${testGrade}/${testMark}/${correct}`)
        // .then(res => {
        //     console.log(res.data)
        //     var random_feedback = res.data[Math.floor(Math.random()*res.data.length)];
        //     console.log(random_feedback)
        //     if(random_feedback.category == "negative")
        //     {
        //       this.setState({
        //         improvement: true,
        //       })
        //     }
        //     this.setState({
        //         data: random_feedback,
        //         showFeedback: true
        //     })
            
        // })
        
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
    handleFormSubmit = (e, testName, testGrade, testMark, correct,incorrect, effect) => {
        e.preventDefault();
        this.setState({
          collectionFeedback: true,
        })
        const total = this.state.value;
        let random_data = [];
        let temp_feedback = [];
        console.log(total);
        axios.get(`http://127.0.0.1:8000/api/processnltk/${testName}/${testGrade}/${testMark}/${correct}/${incorrect}/${effect}`)
        .then(res => {
            console.log(res.data)
            temp_feedback = res.data[0]
            // var random_feedback = res.data[Math.floor(Math.random()*res.data.length)];
            for(let i = 0; i < total; i++)
            {
                var random_feedback = temp_feedback[Math.floor(Math.random()*temp_feedback.length)];
                random_data.push(random_feedback)
            }
            this.setState({
                data: random_data,
                collectionFeedback: false,
            })
        })
        this.setState({
            feedbackAmountState: true,
            feedbackAmount: total
        })
    }
    onKeyPress(event) {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
         if (/\+|-/.test(keyValue))
           event.preventDefault();
      }
    SendFeedback(e)
    {
        console.log(e)
        // let secondsToGo = 10;
        //     const modal = Modal.success({
        //       title: 'Feedback for ' + test + ' has been saved! Go check your saved feedbacks to check them out!!',
        //       content: <Link to={`/generatefeedback/` + this.props.match.params.testid + `/` + this.props.match.params.testmark +`/` + this.props.match.params.testgrade + `/` + this.props.match.params.correct +`/`+ this.props.match.params.incorrect +`/` + this.state.data.score + `/` + this.state.data.review + `/` + this.props.match.params.userid}>See full result</Link>,
        //     });
        //     const timer = setInterval(() => {
        //       secondsToGo -= 1;
        //       modal.update({
        //         content: `This message will be destroyed after ${secondsToGo} seconds.`,
        //       });
        //     }, 1000);
        //     setTimeout(() => {
        //       clearInterval(timer);
        //       modal.destroy();
        //     }, secondsToGo * 1000);
        //`/generatefeedback/` + this.props.match.params.testid + `/` + this.props.match.params.testmark +`/` + this.props.match.params.testgrade + `/` + this.props.match.params.correct +`/`+ this.props.match.params.incorrect +`/` + this.state.data.score + `/` + this.state.data.review + `/` + this.props.match.params.userid
    }
    render()
    {
      let testName = this.props.match.params.testid
      let testGrade = this.props.match.params.testgrade
      let testMark = this.props.match.params.testmark
      let correct = this.props.match.params.correct
      let incorrect = this.props.match.params.incorrect
      let score = this.props.match.params.score;
      let effect = this.props.match.params.effect;
      let user = this.props.match.params.userid
        return(
            <div >
                
                {
                this.state.feedbackAmountState ? 
                    
                <Row gutter={10} justify="space-around" type="flex">
                  <Col span={5}>
                    <Card className = "popupreview" bordered style={{color: 'blue'}} title="Test Information" bordered={true}>
                      <Text strong>Test Name:</Text> <Text strong style={{color: '#096dd9'}}>{this.props.match.params.testid}</Text> <br/>
                      <Text strong>Test Grade:</Text> <Text strong style={{color: '#096dd9'}}>{this.props.match.params.testgrade}</Text> <br />
                      <Text strong>Test Mark:</Text> <Text strong style={{color: '#096dd9'}}>{this.props.match.params.testmark} %</Text> <br/>
                      <Text strong>Correct Answers:</Text> <Text strong style={{color: '#096dd9'}}>{this.props.match.params.correct}</Text> <br/>
                      <Text strong>Incorrect Answers:</Text> <Text strong style={{color: '#096dd9'}}>{this.props.match.params.incorrect}</Text> <br/>
                    </Card>
                  </Col>
                  {
                    this.state.collectionFeedback ?
                   <div>Please wait while {this.state.feedbackAmount} feedbacks are being generated!<Spin indicator={antIcon} /></div>
                    :
                    <div style={{type: 'flex', justifyContent: 'center'}}>
                      {this.state.data.map(function(item, i){
                        let title = "Feedback " + (i+1)
                        let review = item.review
                       function SendFeedback(review)
                        {
                          //<Button onClick={(e) => this.SendFeedback("ggg")}>HEY</Button>
                          
                            console.log(review)
                            let secondsToGo = 20;
                                const modal = Modal.success({
                                  title: 'Thank you for choosing a feedback! You can now choose to save or export!',
                                  content: <Button onClick={(e) => this.SendFeedback("dfgh")}>See full result</Button>,
                                });
                                const timer = setInterval(() => {
                                  secondsToGo -= 1;
                                  modal.update({
                                    content: `This message will be destroyed after ${secondsToGo} seconds` ,
                                  });
                                }, 1000);
                                setTimeout(() => {
                                  clearInterval(timer);
                                  modal.destroy();
                                }, secondsToGo * 1000);
                            //`/generatefeedback/` + testName + `/` + testMark +`/` + testGrade + `/` + correct + `/` + incorrect +`/` + score + `/` + review + `/` + userid
                        }
                        let score = Math.round(item.score * 100)
                        
                        return(
                          <Col span={5}>
                            <Card bordered style={{ color: 'blue'}} title={title} bordered={false}>
                                <Text type="warning" strong>Review: </Text><Text strong>{item.review}</Text><br />
                                <Text type="warning" strong>Score: </Text><Text strong>{score}</Text><br />
                                <Text type="warning" strong>Outcome of test: </Text><Text strong>{item.effectiveness}</Text>
                            </Card>
                            
                            <Link to={`/generatefeedback/` + testName + `/` + testMark +`/` + testGrade + `/` + correct + `/` + incorrect +`/` + score + `/` + review + `/` + user}><Button onClick={(e) => SendFeedback(review)} style={{margin: '5px'}} type="primary">Choose Feedback</Button></Link>
                            
                          </Col>
                        )
                      })}
                    </div>
                  }
                </Row>
                 : 
                 <Form onSubmit={(event) => this.handleFormSubmit(event, this.props.match.params.testid, this.props.match.params.testgrade, this.props.match.params.testmark, this.props.match.params.correct, this.props.match.params.incorrect, this.props.match.params.effect)}>
                    <Form.Item style={{textAlign: 'center'}} label="How many feedbacks would you like to see? (maximum 5)">
                        <NumericInput name="amount" style={{ width: 120 }} value={this.state.value} onChange={this.onChange} />
                    </Form.Item>
                    <Form.Item style={{textAlign: 'center'}} >
                        <Button type="primary" htmlType="submit">Generate Feedback</Button>
                    </Form.Item>
                 </Form>
            
                }
            </div>
        )
    }
}
export default ChooseExistingFeedback