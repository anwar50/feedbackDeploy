import React from "react"
import {Link} from "react-router-dom";
import axios from "axios";
import {Button, Table, Divider, Modal, Typography } from "antd";
import {CSVLink} from 'react-csv';
import '../css/Layout.css';
const {Text} = Typography;

class GeneratedFeedback extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            test: [],
            grades: [],
            generatedFeedback: [],
            answers: [],
            showingAlert: false,
            docDefinition: {}
        }
    }
  
    componentDidMount(){
        axios.all([
            axios.get('http://127.0.0.1:8000/api/test'),
            axios.get('http://127.0.0.1:8000/api/grades'),
            axios.get('http://127.0.0.1:8000/api/generatedFeedback'),
            axios.get('http://127.0.0.1:8000/api/answers')
        ])
        .then(axios.spread((savedtestsres, grades, feedback, answers) => {
                this.setState({
                    test: savedtestsres.data,
                    grades: grades.data,
                    generatedFeedback: feedback.data,
                    answers: answers.data
                })
                console.log(this.state.test)
                console.log(this.state.grades)
                console.log(this.state.generatedFeedback)
                console.log(this.state.answers)
        }))
    }
    saveFeedback(event1, event2) {
        console.log(event1 + "" + event2)
        
        axios.get(`http://127.0.0.1:8000/api/processnltk`)
        .then(res => {
            
            console.log(res.data)
        })
      }
    handleSave (test, grade, feedback, user, percentage) {
        let found = false
        let tempgrade = this.state.grades;
        let temptest = this.state.test;
        let grade_id = 0;
        let test_id = 0;
        //remove the percentage sign from the number
        percentage = percentage.replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, " ");
        tempgrade.map(function(gradeID, i){
            if(gradeID.grade == grade)
            {
                grade_id = gradeID.id
                temptest.map(function(testID, i){
                    if(testID.name == test)
                    {
                        test_id = testID.id
                        found = true
                        console.log("true")
                    }
                })
            }
        })
        if(found)
        {
            axios.post(`http://127.0.0.1:8000/api/save/feedback/`,{
                    test: test_id,
                    grade: grade_id,
                    user: user,
                    feedback: feedback,
                    percentage: percentage,
                    created_by: "QMFeedback",
            })
            
            let secondsToGo = 10;
            const modal = Modal.success({
              title: 'Feedback for ' + test + ' has been saved! Go check your saved feedbacks to check them out!!',
              content: `Your feedback has been saved! Go check your saved feedbacks to check them out!!`,
            });
            const timer = setInterval(() => {
              secondsToGo -= 1;
              modal.update({
                content: `This message will be destroyed after ${secondsToGo} seconds.`,
              });
            }, 1000);
            setTimeout(() => {
              clearInterval(timer);
              modal.destroy();
            }, secondsToGo * 1000);
        }
        else
        {
            alert("Could not save the feedback!")
        }
        console.log(test + " " + grade + " " + feedback + " " + user + " " + percentage)
    }

    handleSaveImprovement(test, grade, area, feedback, user) {
      let found = false
      let tempgrade = this.state.grades;
      let temptest = this.state.test;
      let grade_id = 0;
      let test_id = 0;
      
      tempgrade.map(function(gradeID, i){
          if(gradeID.grade == grade)
          {
              grade_id = gradeID.id
              temptest.map(function(testID, i){
                  if(testID.name == test)
                  {
                      test_id = testID.id
                      found = true
                      console.log("true")
                  }
              })
          }
      })
      if(found)
      {
          axios.post(`http://127.0.0.1:8000/api/save/improvement/`,{
                  test: test_id,
                  area_of_improvement: area,
                  user: user,
                  improvement_feedback: feedback,
          })
          
          let secondsToGo = 10;
          const modal = Modal.success({
            title: 'The improvement Feedback for ' + test + ' has been saved! Go check your saved feedbacks to check them out!!',
            content: `Your feedback has been saved! Go check your saved feedbacks to check them out!!`,
          });
          const timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
              content: `This message will be destroyed after ${secondsToGo} seconds.`,
            });
          }, 1000);
          setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
          }, secondsToGo * 1000);
      }
      else
      {
          alert("Could not save the improvement feedback!")
      }
      console.log(test + " " + grade + " " + feedback + " " + user )
  }
    render(){
        var divStyle = {
            height: "40vh", /* Magic here */
            width: "200vh",
            top: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        };
        const {id} = this.props.match.params
        console.log(id)
        let test_id = 0
        let test_grade = 0
        let test_mark = 0
        let correct_answers = 0
        let min = 1
        let max = this.state.generatedFeedback.length
        let randNum = Math.floor(Math.random()*(max-min+1)+min)
        let final_generated_feedback = []
            
        
            //randomly generate a feedback whether its positive or negative
        var random_feedback = final_generated_feedback[Math.floor(Math.random()*final_generated_feedback.length)];
        var random_percentage = 0
        this.state.generatedFeedback.map(function(item, i){
          if(random_feedback == item.feedback_bank)
          {
              random_percentage = item.percentage
          }
        })
        
        const columns = [{
            title: 'Test Name',
            dataIndex: 'test',
            key: 'test',
            render: (text) => {
                        //    console.log(text);
              return {
                children: text,
                props: {
                  'data-tip': 'a very long text',
                },
              };
            },
          }, {
            title: 'Grade given',
            dataIndex: 'grade',
            key: 'grade',
          }, {
            title: 'Feedback Generated',
            dataIndex: 'feedback',
            render: (text) => {
                        //    console.log(text);
              return {
                children: text,
                props: {
                  'data-tip': 'a very long text',
                },
              };
            },
          }, 
          {
            title: 'Feedback percentage',
            dataIndex: 'percentage',
            render: (text) => {
                        //    console.log(text);
              return {
                children: text,
                props: {
                  'data-tip': 'a very long text',
                },
              };
            },
          }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                {/* <a href="#">Action 一 {record.test}</a> */}
                <Button onClick={(e) => this.handleSave(record.test, record.grade, this.props.match.params.feedback, this.props.match.params.userid, record.percentage)} type="primary" htmlType="submit">Save Feedback</Button>
                <Divider type="vertical" />
                <Link to={`/createFeedback/` + this.props.match.params.testid + '/' + this.props.match.params.userid}><Button type="primary" htmlType="submit" style={{alignItems:'center'}}>Not happy with this feedback?</Button></Link>

           </span>
            ),
          },{
            title: 'Export Information',
            key: 'action',
            render: (text, record) => (
              <span>
                {/* <a href="#">Action 一 {record.test}</a> */}
                <CSVLink data={this.props.match.params.feedback} ><Button type="primary" htmlType="submit" >Export Overall Feedback</Button></CSVLink>
           </span>
            ),
          }];
          const Imrpovementcolumns = [{
            title: 'Imrpovement Feedback',
            dataIndex: 'feedback',
            key: 'feedback',
            render: (text) => {
                        //    console.log(text);
              return {
                children: text,
                props: {
                  'data-tip': 'a very long text',
                   
                },
              };
            },
          }, {
            title: 'Area (s) of improvement',
            dataIndex: 'areaOfImprovement',
            key: 'areaOfImprovement',
          },{
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                {/* <a href="#">Action 一 {record.test}</a> */}
                <Button onClick={(e) => this.handleSaveImprovement(this.props.match.params.testid, this.props.match.params.testgrade, record.areaOfImprovement, record.feedback, this.props.match.params.userid)} type="primary" htmlType="submit">Save Improvement Feedback</Button>
                <Divider type="vertical" />
                <Link to={`/createFeedback/` + this.props.match.params.testid + '/' + this.props.match.params.userid}><Button type="primary" htmlType="submit" style={{alignItems:'center'}}>Not happy with this improvement feedback</Button></Link>
           </span>
            ),
          },{
            title: 'Export Information',
            key: 'export',
            render: (text, record) => (
              <span>
                {/* <a href="#">Action 一 {record.test}</a> */}
                <CSVLink data={this.props.match.params.improvement} ><Button type="primary" htmlType="submit" >Export Improvement Feedback</Button></CSVLink>
           </span>
            ),
          }];
          let score = 0;
          if(this.props.match.params.score.toString().length == 2)
          {
            score = this.props.match.params.score;
          }
          else
          {
            score = Math.round(this.props.match.params.score * 100)
          }
          

          const testInfo = [{
            key: '1',
            test: this.props.match.params.testid,
            grade: this.props.match.params.testgrade,
            feedback: this.props.match.params.feedback,
            percentage: score + "%"
          }];
          const improvementInfo = [{
            key: '1',
            feedback: this.props.match.params.improvement,
            areaOfImprovement: this.props.match.params.topicImprovement
          }];
        return(
            <div>
                <h2 style={{color: 'skyblue', display: 'flex', justifyContent: 'center'}} >Here's a summary of your chosen feedback</h2>
                <Link to={`/reviewFeedback/` + this.props.match.params.testid + `/` + this.props.match.params.testmark +`/` + this.props.match.params.testgrade + `/` + this.props.match.params.correct +`/`+ this.props.match.params.incorrect +`/` + this.props.match.params.effect  + `/` +this.props.match.params.userid}><ion-icon src="../images/arrow-back-outline.PNG">Back</ion-icon></Link>
                <Table id="test" columns={columns} dataSource={testInfo} />
                {/*   ############IMPROVEMENT TABLE############      */}
                <h2 style={{color: 'skyblue', display: 'flex', justifyContent: 'center'}} >Here's a summary of your chosen improvement feedback</h2>
                <Table id="test2" columns={Imrpovementcolumns} dataSource={improvementInfo} />
                
            </div>
        )
    }
}

export default GeneratedFeedback


// Take a look at this npm library - https://www.npmjs.com/package/react-csv

// For example -

// import {CSVLink, CSVDownload} from 'react-csv';

// const csvData =[
//   ['firstname', 'lastname', 'email'] ,
//   ['John', 'Doe' , 'john.doe@xyz.com'] ,
//   ['Jane', 'Doe' , 'jane.doe@xyz.com']
// ];
// <CSVLink data={csvData} >Download me</CSVLink>
// // or
// <CSVDownload data={csvData} target="_blank" />