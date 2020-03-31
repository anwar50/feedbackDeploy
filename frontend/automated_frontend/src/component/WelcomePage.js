import React from "react"
import {PageHeader, Button, Descriptions} from "antd";
import {Link} from "react-router-dom"
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
        <Link to="/login"><Button style={{margin: '5px'}}key="3">Login</Button></Link>
        <Link to="/registerteacher/"><Button key="2">Sign Up</Button></Link>
      </div>
      <Descriptions style={{textAlign: 'center'}} size="large" column={1}>
        <Descriptions.Item  label=""><p style={{color: 'black', fontSize: '29px'}}>Here are a list of features that this web application has to offer!</p></Descriptions.Item>
      </Descriptions>
    
    <div style={{marginLeft: '20%', color: 'skyblue', fontSize: '20px'}}>
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Generate multiple feedbacks for a single test!"></Descriptions.Item>
          <Descriptions.Item label="Feedbacks generated for exams, mid terms and even for revision!">
          </Descriptions.Item><br/>
          <Descriptions.Item label="See improvement feedback for weak topics"></Descriptions.Item>
          <Descriptions.Item label="Save and export feedback and test information"></Descriptions.Item>
        </Descriptions>
    </div>
    </PageHeader>
    
            </div>
        )
    }
}

export default WelcomePage