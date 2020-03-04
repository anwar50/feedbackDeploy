import React from "react"
import {Button, PageHeader} from "antd";
import {Link} from "react-router-dom"

class Home extends React.Component {
  state = {
    size: 'large'
  }
    render(){
      const {size} = this.state
        return(
            <div style={{display: 'flex', justifyContent: 'center'}} >
              <PageHeader  title={"WELCOME TO MY PLATFORM BASED ON AUTOMATED MARKINGGG"} subTitle={"by anwar"} />

              <div style={{display: "flex", justifyContent: "center"}}>
                  <Link to={`login`}>
                  <Button type="primary" size={size}>
                    Wanna head inside lol?
                  </Button>
                </Link>
              </div>
              
              
            </div>
        )
    }
}

export default Home