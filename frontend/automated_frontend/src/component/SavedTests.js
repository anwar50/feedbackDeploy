import React from "react"
import { List, Typography, Table, Icon, Divider, Button, Input} from 'antd';
import {Link} from "react-router-dom";
import axios from "axios";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import UpdateTestPopUp from "./UpdateTestPopUp";
import UpdateGradePopUp from "./UpdateGradePopUp";
class SavedTests extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            size: 'large',
            test: [],
            module: [],
            savedtests: [],
            grades: [],
            showingAlerts: false,
            searchText: '',
            searchedColumn: '',
            showPopup: false,
            showPopupGrade: false,
            testName: "",
            moduleName: ""
        }
    }
    toggle = (test, mod) =>{
      this.setState({
        showPopup: !this.state.showPopup,
        testName: test,
        moduleName: mod,
      });
    }
    toggleGrade = (test, mod) =>{
      this.setState({
        showPopupGrade: !this.state.showPopupGrade,
        testName: test,
        moduleName: mod
      });
    }
    componentDidMount(){
        axios.all([
            axios.get('http://127.0.0.1:8000/api/test'),
            axios.get('http://127.0.0.1:8000/api/modules'),
            axios.get('http://127.0.0.1:8000/api/savedtests'),
            axios.get('http://127.0.0.1:8000/api/grades')
        ])
        .then(axios.spread((questionres, moduleres, savedtestsres, grades) => {
                this.setState({
                    test: questionres.data,
                    module: moduleres.data,
                    savedtests: savedtestsres.data,
                    grades: grades.data
                })
                console.log(this.state.test)
                console.log(this.state.module)
                console.log(this.state.savedtests)
                console.log(this.state.grades)
        }))
    }
    handleDelete (e) {
        console.log(e)
        let TESTID = 0
        let found = false
        this.state.test.map(function(item, i){
            if(item.name == e)
            {
                found = true
                TESTID = item.id
                axios.delete(`http://127.0.0.1:8000/api/test/${TESTID}/delete`);
                //window.location.reload(false);
                //window.location.href = '/'
            }
        }) 
        if(found)
        {
            this.setState({
                showingAlert: true
              });
              setTimeout(() => {
                this.setState({
                  showingAlert: false,
                });
              }, 5000);
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
                            if(item.module == MODID.id){
                                console.log(item.name + " " + GRADE.grade)
                                temp_test = {
                                    key: index,
                                    name: MODID.title,
                                    test: item.name,
                                    grade: GRADE.grade,
                                    mark: GRADE.grade_mark
                                }
                                testInfo.push(temp_test)
                            }
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
        console.log(savedGrades)
        console.log(testNames)
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
                        //    console.log(text);
              return {
                children: text,
                props: {
                  'data-tip': 'a very long text',
                },
              };
            },
          }, {
            title: 'Grade Mark',
            dataIndex: 'mark',
            key: 'test',
            ...this.getColumnSearchProps('mark')
          }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                {/* <a href="#">Action 一 {record.test}</a> */}
                <Link to={`/feedbackInfo/` + record.test + `/` + this.props.match.params.id}>Generate feedback</Link>
                <Divider type="vertical" />
                <Button onClick={(e) => this.toggle(record.test, record.name)} type="primary" htmlType="submit">Update Test</Button>
                <Divider type="vertical" />
                <Button onClick={(e) => this.toggleGrade(record.test, record.name)} type="primary" htmlType="submit">Update Grade</Button>
                <Divider type="vertical" />
                <Button onClick={(e) => this.handleDelete(record.test)} type="danger" htmlType="submit">Delete Test</Button>
              </span>
            ),
          }];
          
        var divStyle = {
            height: "40vh", /* Magic here */
            width: "200vh",
            top: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        };
        return(
            
            <div>
            <div className={`alert alert-success ${this.state.showingAlert ? 'alert-shown': 'alert-hidden'}`}>
                <strong>This test has been deleted!</strong>
            </div>
              <h1 style={{textAlign: 'center'}}>Welcome back {this.props.match.params.id.toUpperCase()} heres a summary of your saved tests!</h1>
                <Table columns={columns} dataSource={testInfo} />
                {this.state.showPopup ?  
                  <UpdateTestPopUp  
                            text='Click "Close Button" to hide popup'  
                            closePopup={this.toggle}  
                            testName={this.state.testName}
                            moduleName={this.state.moduleName}
                            userID={this.props.match.params.id}
                  />  
                : null  
                }  
                {this.state.showPopupGrade ?  
                  <UpdateGradePopUp  
                            text='Click "Close Button" to hide popup'  
                            closePopup={this.toggleGrade}  
                            testName={this.state.testName}
                            moduleName={this.state.moduleName}
                  />  
                : null  
                }  
            </div>
        )
    }
}

export default SavedTests