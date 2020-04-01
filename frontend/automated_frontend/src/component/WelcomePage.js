import React from "react"
import {PageHeader, Button, Descriptions} from "antd";
import {Link} from "react-router-dom"
import '../css/Welcome.css';
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
      title="Welcome to QMFeedback, here we will provide you with the best source for feedback to your students."
      subTitle=""
      extra={[
        
      ]}
    >
      <div style={{textAlign: 'center',  marginLeft: "30%", marginRight: '50%', margin: '23px'}}>
        <Link to="/login"><Button size="large" style={{margin: '5px'}}key="3">Login</Button></Link>
        <Link to="/registerteacher/"><Button size="large" key="2">Sign Up</Button></Link>
      </div>
      <Descriptions style={{textAlign: 'center'}} size="large" column={1}>
        <Descriptions.Item  label=""><p style={{color: 'black', fontSize: '29px'}}>Here are a list of features that this web application has to offer!</p></Descriptions.Item>
      </Descriptions>
    
    <div style={{marginLeft: '20%', color: 'skyblue', fontSize: '20px'}}>
        <Descriptions className="popupwelcome" style={{width: "300px", height: "50px", margin: '5px'}}size="20" column={1}>
          <Descriptions.Item  style={{margin: '5px'}} label="1. Generate multiple feedbacks for a single test!"></Descriptions.Item>
        </Descriptions>
        <Descriptions className="popupwelcome" style={{width: "450px", height: "50px"}}size="20" column={1}>
          <Descriptions.Item label="2. Feedbacks generated for exams, mid terms and even for revision!"></Descriptions.Item>
        </Descriptions><br/>
        <Descriptions className="popupwelcome" style={{width: "300px", height: "50px", margin: '5px'}}size="20" column={1}>
          <Descriptions.Item  label="3. See improvement feedback for weak topics"></Descriptions.Item>
        </Descriptions>
        <Descriptions className="popupwelcome" style={{width: "350px", height: "50px"}}size="20" column={1}>
          <Descriptions.Item  label="4. Save and export feedback and test information"></Descriptions.Item>
        </Descriptions>
         {/* <Descriptions.Item className="popupwelcome" label="2. Feedbacks generated for exams, mid terms and even for revision!">
          </Descriptions.Item><br/>
          <Descriptions.Item className="popupwelcome" label="3. See improvement feedback for weak topics"></Descriptions.Item><br/>
          <Descriptions.Item className="popupwelcome" label="4. Save and export feedback and test information"></Descriptions.Item> */}
    </div>
    </PageHeader>
    
            </div>
        )
    }
}

export default WelcomePage