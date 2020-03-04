import React from "react";
import axios from "axios";
import "../css/ModuleList.css"
import {Input, Table, PageHeader} from "antd";
//const {TextArea} = Input;

//import {Button} from "antd";
class TestList extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            questions: [],
            module: [],
            entertest: false,
            question_id: 0,
            answer: null
        }
        this.sendAnswer = this.sendAnswer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount()
    {
        axios.all([
            axios.get('http://127.0.0.1:8000/api/questions'),
            axios.get('http://127.0.0.1:8000/api/modules')
        ])
        .then(axios.spread((questionres, moduleres) => {
                this.setState({
                    questions: questionres.data,
                    module: moduleres.data,
                    questionId: questionres.data.module
                })
                console.log(this.state.questions)
        }))
    }
    handleClick = () => {
        this.setState({
            entertest: true,
        })
    }
    handleDelete = (event) => {
        const questionId = this.props.match.params;
        console.log(questionId.id);
        console.log("wertf")
        axios.delete(`http://127.0.0.1:8000/api/test/${event}/delete`);
        this.props.history.push('/');
        this.forceUpdate();
    }
    handleChange = ({target}) => {
      this.setState({
        [target.name]: target.value
      })
    }
    sendAnswer(event) {
      console.log(this.refs.answer.value)
      axios.post(`http://127.0.0.1:8000/api/create/answer/`, {
        answer: this.refs.answer.value
      })
    }
    render()
    {
        const {id} = this.props.match.params
        console.log(id)
        let title = ''
        let question_one = ''
        let student_num = 0
            //collect the questions set if there is any
        {this.state.questions.map(function(item, i){
            if(item.module == id)
            {
                question_one = item.question_one
            }
        })}
            //collect the title from the modules api
        {this.state.module.map(function(item, i){
            if(item.id == id)
            {
                title = item.title
                student_num = item.num_students
            }
        })}
        const columns = [
            {
              title: 'Question',
              dataIndex: 'question',
              key: 'question',
              render: text => <a>{text}</a>,
            },
            
          ];
          const data = [
            {
              key: '1',
              question: question_one,
              answer: <input type="text" ref="answer" placeholder="Enter your answer here..."/>,
            },
          ];
        console.log(this.state.module[0])
            return(
                <div style={{display: 'flex', justifyContent: 'center'}} >
                   
                    <PageHeader  title={title} subTitle={student_num} />
                    <Table columns={columns} dataSource={data} />
                    <br />
                    {/* <Button onClick={() => this.handleDelete(question_id, )} type="danger" htmlType="submit">Delete</Button> */}
                    {/* <Link to={`/questions/` + question_id}>
                      <Button type="primary" htmlType="submit">Update</Button>
                    </Link> <br></br> */}
                </div>    
            )
    }
}

export default TestList;