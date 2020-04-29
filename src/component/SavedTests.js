import React from "react"
import { List, Typography, Table, Icon, Divider, Button, Input, Modal, Form, Select} from 'antd';
import {Link} from "react-router-dom";
import axios from "axios";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const {Option} = Select;
class SavedTests extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            type: 'default',
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
            moduleName: "",
            test_id: 0
        }
    }
    handleChange = (e) => {
      const val = e.label
      console.log(val)
      this.setState({
        type: e.label
      })
    }
    handleModuleSubmit(e, requestMethod, test, mod)
    {
      e.preventDefault();
      const title = e.target.elements.name.value;
      const description = e.target.elements.description.value;
      const num_questions = e.target.elements.num.value;
      const num_sub = e.target.elements.sub.value;
      const type = this.state.type;
      
      console.log(title, num_questions, description, type, num_sub);
      let TESTID = 0;
      let MODULEID
      axios.get(`http://127.0.0.1:8000/api/test`)
      .then(res => {
        res.data.map(function(item, i){
          if(item.name == test)
          {
            TESTID = item.id
            MODULEID = item.module
          }
        })
        switch(requestMethod) {
          case 'put':
              axios.put(`http://127.0.0.1:8000/api/test/${TESTID}/update/`, {
                name: title,
                test_count: num_questions,
                num_subquestions: num_sub,
                description: description,
                created_date: new Date().toLocaleString(),
                questiontype: type,
                module: MODULEID,
              })
              .then(res => {
                console.log(res)
                  this.setState({
                    showingAlert: true
                });
                setTimeout(() => {
                    this.setState({
                      showingAlert: false,
                    });
                }, 5000);
                //window.location = '/feedbackstage/' + moduleID + '/' + this.props.userID
              })
              .catch(err => console.log(err))
          default:
            return null
        }
      })
    }
    handleGradeSubmit(e, requestMethod, test, moduleName){
      e.preventDefault();
      let grade = " ";
      let effectiveness = "";
      const total = e.target.elements.total_mark.value;
      const total_sub = e.target.elements.total_sub.value;
      const weakest = e.target.elements.weakest.value;
      const final_mark = parseInt((total_sub/total)*100)
      if(final_mark >= 70 && final_mark <= 100)
      {
        grade = "A";
        effectiveness = "Outstanding";
      }
      else if(final_mark >= 60 && final_mark <= 69)
      {
        grade = "B";
        effectiveness = "Good";
      }
      else if(final_mark >= 50 && final_mark <= 59)
      {
        grade = "C";
        effectiveness = "Need Improvement";
      }
      else if(final_mark >= 45 && final_mark <= 49)
      {
        grade = "D";
        effectiveness = "Poor";
      }
      else
      {
        grade = "Fail";
        effectiveness = "Fail";
      }
      console.log(test + " " + total + " " + total_sub + " " + final_mark)
      let TESTID = 0;
      let GRADEID = 0;
      axios.get(`http://127.0.0.1:8000/api/test`)
      .then(res => {
          res.data.map(function(item, i){
            if(item.name == test)
            {
              TESTID = item.id
            }
          })
          console.log(TESTID)
          
          axios.get(`http://127.0.0.1:8000/api/grades`)
          .then(res => {
            res.data.map(function(item, i){
              if(item.test = TESTID)
              {
                GRADEID = item.id
              }
            })
            console.log(GRADEID)
            switch(requestMethod) {
              case 'put':
                axios.put(`http://127.0.0.1:8000/api/grade/${GRADEID}/update/`, {
                  grade: grade,
                  grade_mark: final_mark,
                  effectiveness: effectiveness,
                  test: TESTID
                })
                .then(res => {
                  console.log(res) 
                  axios.post('http://127.0.0.1:8000/api/create/answer/', {
                    test: TESTID,
                    total_mark_for_question: total,
                    total_sub_marks: total_sub,
                    weakest_topic: weakest
                  })
                    .then(res => {
                      console.log(res)
                    })
                    this.setState({
                        showingAlert: true
                    });
                    setTimeout(() => {
                        this.setState({
                          showingAlert: false,
                        });
                    }, 5000);
                    //redirect to home page after creating
                  //window.location = '/Grade'
                })
                .catch(err => console.log(err))
              case 'post':
                  // axios.put(`http://127.0.0.1:8000/api/module/${moduleID}/update/`, {
                    
                  // })
                  // .then(res => console.log(res))
                  // .catch(err => console.log(err))
                  return null
            }
          })
          
      })
      
    }
    onKeyPress(event) {
      const keyCode = event.keyCode || event.which;
      const keyValue = String.fromCharCode(keyCode);
       if (/\+|-/.test(keyValue))
         event.preventDefault();
    } 
    toggle = (test, mod) =>{

      let secondsToGo = 600;
      
      const modal = Modal.success({
        title: `This message will be destroyed after 10 minutes` ,
        content: '',
      });
      const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: 
          <div>
          <div className={`alert alert-success ${this.state.showingAlert ? 'alert-shown': 'alert-hidden'}`}>
                <strong>Your test has been updated!</strong>
          </div>
          <h2 style={{display: 'flex', justifyContent: 'center'}} >Update {test} Information here!</h2>
          <Form onSubmit={(event) => this.handleModuleSubmit(event, "put", test, mod)}>
              <Form.Item label="Name">
                <Input name="name" placeholder="Name of exam..." />
              </Form.Item>
              <Form.Item label="Number of questions">
                <Input type="number" name="num" pattern="[0-9]*" onKeyPress={this.onKeyPress.bind(this)} />
              </Form.Item>
              <Form.Item label="Number of sub questions">
                <Input type="number" name="sub" pattern="[0-9]*" onKeyPress={this.onKeyPress.bind(this)} />
              </Form.Item>
              <Form.Item label="Description">
                <Input name="description" name="description" placeholder="e.g. mid term or revision..." />
              </Form.Item>
              <Form.Item label="Type of question">
                  <Select ref={ref => {
                    this._select = ref }} labelInValue defaultValue={this.state.value} style={{width: 190}} onChange={this.handleChange}>
                      <Option value="MCQ">Multiple choice questions</Option>
                      <Option value="Definition">Short definitions</Option>
                      <Option value="Skeleton Program">Skeleton program questions</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Update Test Information</Button>
              </Form.Item>
        </Form>
      </div> ,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
      }, secondsToGo * 1000);
      // this.setState({
      //   showPopupGrade: !this.state.showPopupGrade,
      //   testName: test,
      //   moduleName: mod
      // });
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
      // this.setState({
      //   showPopup: !this.state.showPopup,
      //   testName: test,
      //   moduleName: mod,
      // });
    }
    toggleGrade = (test, mod) =>{
      let secondsToGo = 600;
      
      const modal = Modal.success({
        title: `This message will be destroyed after 10 minutes` ,
        content: '',
      });
      const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: 
          <div style={{color: 'red'}}> 
          <div className={`alert alert-success ${this.state.showingAlert ? 'alert-shown': 'alert-hidden'}`}>
               <strong>The grade Information has been saved! </strong> Go check your saved tests!!
          </div> 
          <div >  
          <h2 style={{display: 'flex', justifyContent: 'center'}} >Update grade Information {test} here!</h2>
            <Form onSubmit={(event) => this.handleGradeSubmit(event, "put", test)}>
              <Form.Item label="Total mark for all questions">
                <Input type="number" name="total_mark" pattern="[0-9]*" onKey Press={this.onKeyPress.bind(this)} />
              </Form.Item>
              <Form.Item label="Total mark given to students for sub questions">
                  <Input type="number" name="total_sub" pattern="[0-9]*" onKey Press={this.onKeyPress.bind(this)} />
              </Form.Item>
              <Form.Item label="What was the students weakest topic?">
                  <Input name="weakest" placeholder="" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Update Grade</Button>
            </Form.Item>
          </Form>
          </div>  
      </div> ,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
      }, secondsToGo * 1000);
      // this.setState({
      //   showPopupGrade: !this.state.showPopupGrade,
      //   testName: test,
      //   moduleName: mod
      // });
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
          let secondsToGo = 10;
          const modal = Modal.success({
            title: 'Test for ' + e + ' has been deleted',
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
              <h1 style={{textAlign: 'center'}}>Welcome back {this.props.match.params.id.toUpperCase()} heres a summary of your saved tests!</h1>
                <Table columns={columns} dataSource={testInfo} />
            </div>
        )
    }
}

export default SavedTests