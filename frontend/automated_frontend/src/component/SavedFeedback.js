import React from "react"
import { List, Typography, Table, Icon, Divider, Button, Alert, Input, Modal, Collapse} from 'antd';
import {Link} from "react-router-dom";
import axios from "axios";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
class SavedFeedback extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            size: 'large',
            test: [],
            module: [],
            savedtests: [],
            savedfeedback: [],
            grades: [],
            showingAlert: false,
            searchText: '',
            searchedColumn: '',
            improvement: '',
            area: '',
            improvementClicked: false
        }
    }
  
    componentDidMount(){
        axios.all([
            axios.get('http://127.0.0.1:8000/api/test'),
            axios.get('http://127.0.0.1:8000/api/modules'),
            axios.get('http://127.0.0.1:8000/api/savedtests'),
            axios.get('http://127.0.0.1:8000/api/grades'),
            axios.get('http://127.0.0.1:8000/api/savedfeedbacks')
        ])
        .then(axios.spread((questionres, moduleres, savedtestsres, grades, savedfeedbackres) => {
                this.setState({
                    test: questionres.data,
                    module: moduleres.data,
                    savedtests: savedtestsres.data,
                    grades: grades.data,
                    savedfeedback: savedfeedbackres.data
                })
                console.log(this.state.test)
                console.log(this.state.module)
                console.log(this.state.savedtests)
                console.log(this.state.grades)
                console.log(this.state.savedfeedback)
        }))
    }
    handleImprovement (testid){
        axios.get(`http://127.0.0.1:8000/api/savedimprovements`)
        .then(res =>{
          let found = false
          let temp_area = ""
          let temp_improvement = ""
          res.data.map(function(item, i){
            if(testid == item.test)
            {
              found = true
              temp_area = item.area_of_improvement
              temp_improvement = item.improvement_feedback
            }
          })
          if(found)
          {
            this.setState({
                area: temp_area,
                improvement: temp_improvement,
                improvementClicked: true
              })
          }
        })
    }
    handleDelete (e) {
        console.log(e)
        let FEEDBACKID = 0
        let found = false
        this.state.savedfeedback.map(function(item, i){
            if(item.feedback == e)
            {
                found = true
                FEEDBACKID = item.id
                console.log(FEEDBACKID)
                axios.delete(`http://127.0.0.1:8000/api/savedfeedback/${FEEDBACKID}/delete`)
                //window.location.reload(false);
                //window.location.href = '/'
            }
        }) 
        if(found)
        {
            let secondsToGo = 10;
            const modal = Modal.success({
              title: 'The feedback  ' + e + ' has been deleted! ',
              content: ``,
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

        }
    }
    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: text =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    });
  
    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };
    handleClick(){
      this.setState({
        improvementClicked: false
      })
    }
    render(){
        function callback(key) {
          console.log(key);
        }
        const {id} = this.props.match.params
        console.log(id)
        let test_id = []
        let testInfo = []
        let savedtests = []
        let testNames = []
        let modulei_ids = []
        let testID = 0
        let TEMPMODULES = this.state.module
        let savedGrades = []
        let TEMPGRADES = this.state.grades
        let TEMPFEEDBACKS = this.state.savedfeedback
        this.state.savedtests.map(function(item, i){
                //check the username against the given username
            if(item.username === id)
            {
                savedtests.push(item.test)
                test_id.push(item.module)
            }
        })
        
        this.state.test.map(function(item, i){
            savedtests.map(function(testID, i){
                if(item.id == testID)
                {
                    testNames.push(item.name);
                   
                    modulei_ids.push(item.module)
                }
            })
        })
        this.state.test.map(function(item, index){
            let temp_test = {}
            TEMPGRADES.map(function(GRADE, i){
                savedtests.map(function(SAVEDTESTID, i){
                    if(item.id == SAVEDTESTID && GRADE.test == SAVEDTESTID)
                    {
                        TEMPMODULES.map(function(MODID, i){
                            TEMPFEEDBACKS.map(function(FEEDBACKID, i){
                                if(item.module == MODID.id && item.id == FEEDBACKID.test){
                                  testID = item.id
                                    console.log(item.name + " " + GRADE.grade)
                                    temp_test = {
                                        key: index,
                                        name: MODID.title,
                                        test: item.name,
                                        grade: GRADE.grade,
                                        feedback: FEEDBACKID.feedback,
                                        accuracy: FEEDBACKID.percentage,
                                        creation: FEEDBACKID.created_by
                                    }
                                    testInfo.push(temp_test)
                                }
                            })
                            
                        })
                        
                    }
                })
            })
        })
        this.state.test.map(function(item, i){
            savedtests.map(function(testID, i){
                if(item.id == testID)
                {
                    testNames.push(item.name);
                    
                    modulei_ids.push(item.module)
                }
            })
            
        })
        
        console.log(testInfo)
        const columns = [{
            title: 'Module Name',
            dataIndex: 'name',
            key: 'name',
            ...this.getColumnSearchProps('name'),
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
            title: 'Test Name',
            dataIndex: 'test',
            key: 'test',
            ...this.getColumnSearchProps('test')
          }, {
            title: 'Grade given',
            dataIndex: 'grade',
            ...this.getColumnSearchProps('grade'),
            render: (text) => {
                if(text == "None")
                {
                    
                }
                        //    console.log(text);
              return {
                children: text,
                props: {
                  'data-tip': 'a very long text',
                },
              };
            },
          }, {
            title: 'Saved feedback',
            dataIndex: 'feedback',
            key: 'feedback',
            ...this.getColumnSearchProps('feedback')
          }, {
            title: 'Accuracy',
            dataIndex: 'accuracy',
            key: 'accuracy',
            ...this.getColumnSearchProps('accuracy')
          }, {
            title: 'Created By',
            dataIndex: 'creation',
            key: 'accuracy',
            ...this.getColumnSearchProps('creation')
          },{
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                {/* <a href="#">Action 一 {record.test}</a> */}
                <Button onClick={(e) => this.handleImprovement(testID)} type="primary" htmlType="submit">See Improvement</Button>
                <Divider type="vertical" />
                <Button onClick={(e) => this.handleDelete(record.feedback)} type="danger" htmlType="submit">Delete Feedback</Button>

              </span>
            ),
          }];
        return(
            
            <div>
              <h1 style={{textAlign: 'center'}}>Welcome back {this.props.match.params.id.toUpperCase()} heres a collection of your saved feedbacks!</h1>
              <Table style={{display: "inline-block"}}columns={columns} dataSource={testInfo} />
              {
                this.state.improvementClicked ?
                <div>
                    <Collapse defaultActiveKey = {['1']} onChange={callback}>
                    <Panel header="Improvement feedback" key="2">
                      <p>{this.state.improvement}</p>
                    </Panel>
                    <Panel header="Area of improvement" key="3">
                      <p>{this.state.area}</p>
                    </Panel>
                  </Collapse><br/>
                  <div style={{marginLeft: '40%', marginRight: '50%'}}>
                    <Button onClick={(e) => this.handleClick()} type="primary">Close popup</Button>
                  </div>
                </div>
                :
                null
              }
              
            </div>
        )
    }
}

export default SavedFeedback