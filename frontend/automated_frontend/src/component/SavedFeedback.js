import React from "react"
import { List, Typography, Table, Icon, Divider, Button, Alert, Input, Modal} from 'antd';
import {Link} from "react-router-dom";
import axios from "axios";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
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
    render(){
        const {id} = this.props.match.params
        console.log(id)
        let test_id = []
        let testInfo = []
        let savedtests = []
        let testNames = []
        let modulei_ids = []
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
        //console.log(TEMPTEST)
            //retrieving the grades of all the tests
        // this.state.grades.map(function(item, index){
        //     let temp_test = {}
        //     TEMPTEST.map(function(testID, i){
        //         savedtests.map(function(TestID, i){
        //             if(item.test == TestID && testID.id == TestID )
        //             {
        //                 //savedGrades.push(item.grade)
        //                 temp_test = {
        //                     key: index,
        //                     name: testID.name,
        //                     address: item.grade,
        //                 }
        //             }
        //             if(item.test == "")
        //             {
        //                 console.log(testID.name)
        //             }
        //         })
        //     })
        //     testInfo.push(temp_test)
        // })
        this.state.test.map(function(item, i){
            savedtests.map(function(testID, i){
                if(item.id == testID)
                {
                    testNames.push(item.name);
                    // testInfo.push({
                    //     key: i,
                    //     name: 'John Brown',
                    //     age: item.name,
                    //     address: 'New York No. 1 Lake Park',
                    // })
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
                    // testInfo.push({
                    //     key: i,
                    //     name: 'John Brown',
                    //     age: item.name,
                    //     address: 'New York No. 1 Lake Park',
                    // })
                    modulei_ids.push(item.module)
                }
            })
            
        })
        // this.state.module.map(function(ittem, i){
        //     modulei_ids.map(function(ModID, i){
        //         if(ModID == ittem.id)
        //         {
        //             moduleNames.push(ittem.title)
        //         }
        //     })
        // })
        // testNames.map(function(item, index){
        //     let temp_test = {}
        //     savedGrades.map(function(grades, i){
        //         temp_test = {
        //             key: index,
        //             name: item,
        //             address: grades,
        //         }
        //     })
        //     testInfo.push(temp_test)
        // })
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
                <Button onClick={(e) => this.handleDelete(record.feedback)} type="danger" htmlType="submit">Delete Feedback</Button>
              </span>
            ),
          }];
        return(
            
            <div>
              <h1 style={{textAlign: 'center'}}>Welcome back {this.props.match.params.id.toUpperCase()} heres a collection of your saved feedbacks!</h1>
              <Table columns={columns} dataSource={testInfo} />
            </div>
        )
    }
}

export default SavedFeedback