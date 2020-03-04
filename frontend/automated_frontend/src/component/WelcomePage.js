import React from "react"
import {PageHeader} from "antd";

class WelcomePage extends React.Component {
  state = {
    size: 'large'
  }
    render(){
        return(
            <div style={{display: 'flex', justifyContent: 'center'}} >
              <PageHeader  title={"Here is some information..."} subTitle={"by anwar"} />
            </div>
        )
    }
}

export default WelcomePage