import React from "react"
import {PageHeader, Button, Descriptions, Typography, Divider, Row, Col, Card} from "antd";
import {Link} from "react-router-dom"
import '../css/Welcome.css';
const {Text} = Typography;
class WelcomePage extends React.Component {
  state = {
    size: 'large'
  }
    render(){
        return(
            <div style={{display: 'flex', justifyContent: 'center'}} >
              <PageHeader
      ghost={false}
      // onBack={() => window.history.back()}
      //title="Welcome to QMFeedback, here we will provide you with the best source for feedback to your students."
      subTitle=""
      extra={[
        
      ]}
    >
      <div style={{textAlign: 'center',  marginLeft: "30%", marginRight: '50%', margin: '23px'}}>
        <Text strong style={{color: 'skyblue', fontSize: '29px'}}>Welcome to QMFeedback, here we will provide you with the best source for feedback to your students.</Text><br/>
        <Link to="/login"><Button size="large" style={{margin: '5px'}}key="3">Login</Button></Link>
        <Link to="/registerteacher/"><Button size="large" key="2">Sign Up</Button></Link>
      </div>
      {/* <Descriptions style={{textAlign: 'center'}} size="large" column={1}>
        <Descriptions.Item  label=""><p style={{color: 'black', fontSize: '29px'}}>Here are a list of features that this web application has to offer!</p></Descriptions.Item>
      </Descriptions> */}
      <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
        <p style={{color: 'black', fontSize: '29px'}}>Here are a list of features that this web application has to offer!</p>
      </Divider>
    
      <Row justify="space-around" align="middle">
        <Col span={8} style={{margin: '5px'}}>
          <Card className="popupwelcome"><Text strong>1. Generate multiple feedbacks for a single test!</Text></Card>
        </Col>
        <Col span={8} style={{margin: '5px'}}>
          <Card className="popupwelcome"><Text strong>2. Feedbacks generated for exams, mid terms and even for revision!</Text></Card>
        </Col>
        <Col span={6} style={{margin: '5px'}}>
          <Card className="popupwelcome"><Text strong>3. See improvement feedback for weak topics</Text></Card>
        </Col>
        <Col span={6} style={{margin: '5px'}}>
          <Card className="popupwelcome"><Text strong>4. Save and export feedback and test information</Text></Card>
        </Col>
      </Row>
    </PageHeader>
    
  </div>
        )
    }
}

export default WelcomePage