import './App.css';
import React from 'react';
import { TaskCol,TaskItem }  from './TaskDefine'
import './config';



class  App extends React.Component {
  state = {
      tasks: [],
      activeId: null
  }
  conn = null

  componentDidMount = () => {
    this.conn = new WebSocket("ws://" + global.constants.DOMAIN +"/app/v1/hub/ws");
    fetch('http://' + global.constants.DOMAIN +'/app/v1/hub/gettodolist', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(resp =>  resp.json())
    .then(data =>  this.setState({ tasks: data }))

 
    this.conn.onopen = (evt) => {
      console.log(evt)
    }

    this.conn.onclose = function (evt) {
      console.log(evt)
    }
    let self = this
    this.conn.onmessage = function (evt) {
        var data = evt.data
        var json = JSON.parse(data)
        self.setState({
          tasks: json
        })
    }

  }

  addNote = (status) => {
    console.log(status)
    
    var item = {
      id: this.state.tasks.length ,
      status: status,
      content: '',
      title: '',
      editable: true
    }
    this.state.tasks.push(item)
    this.setState({
      tasks: this.state.tasks,
      activeId: item.id
    })
    console.log(this.state.tasks)
  }

  onDragStart = (id) => {
      this.setState({
          activeId: id
      })
  }

  onActiveSelect = (id) => {
    console.log("select")
    this.setState({
        activeId: id
    })
  }
  
  dragTo = (status) => {
    let { tasks,  activeId} = this.state;
    let task = tasks[activeId];
    if (task != null) {
        if (task.status !== status) {
            task.status = status;
            let strTasks = JSON.stringify(tasks)
            fetch('http://' + global.constants.DOMAIN +'/app/v1/hub/posttodosync', {
              method:'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: strTasks
            })
            .then(resp => resp.json())
            .then(data=> console.log(data))
            this.conn.send(strTasks)
            this.setState({
                tasks: tasks
            })
            
        }
        this.cancelSelect();
    }
  }
  
  cancelSelect = () => {
      this.setState({
          activeId: null
      })
  }

  
  
  render() {
      let { tasks, activeId } = this.state;
      let { onDragStart, cancelSelect,onActiveSelect } = this;
      return (
          <div>
            <span className="main-title">🦄🌈 WeTodo <a  href="https://github.com/yoyofx/yoyogo">yoyofx/yoyogo</a> </span>
            <div className="task-wrapper">
                {
                    Object.keys(global.constants.STATUS_CODE).map(status => 
                        <TaskCol 
                            status={status} 
                            key={status} 
                            addNote={this.addNote}
                            dragTo={this.dragTo}
                            canDragIn={activeId != null && tasks[activeId].status !== status}>
                            { tasks.filter(t => t.status === status).map(t => 
                                <TaskItem
                                    key={t.id}
                                    active={t.id === activeId}
                                    id={t.id}
                                    editable={t.editable}
                                    content={t.content} 
                                    point={t.point} 
                                    title={t.title}
                                    onDragStart={onDragStart}
                                    onDragEnd={cancelSelect}
                                    onActiveSelect={onActiveSelect}
                                />)
                            }
                        </TaskCol>
                    )
                }
            </div>
          </div>
      )
  }
}

export default App;
