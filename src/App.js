import './App.css';
import React from 'react';
import { TaskCol,TaskItem }  from './TaskDefine'
import './config';



class  App extends React.Component {
  state = {
      tasks: [],
      activeId: null,

  }
  isAddtion = false
  conn = null

  componentDidMount = () => {
    this.conn = new WebSocket("wss://" + global.constants.DOMAIN +"/app/v1/hub/ws");
    fetch('https://' + global.constants.DOMAIN +'/app/v1/hub/gettodolist', {
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
    if (this.isAddtion === false) {
      this.isAddtion = true
      var item = {
        id: this.state.tasks.length,
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
  }
  
  editNote = (e) => {

  }

  okNote = (e) => {
    console.log(e)
    // eslint-disable-next-line
    this.state.tasks[e.id].content = e.content
    // eslint-disable-next-line
    this.state.tasks[e.id].editable = false

    let strTasks = JSON.stringify(this.state.tasks)
    this.syncTasks(strTasks)
          .then(data => console.log(data))
          .then(e => this.conn.send(strTasks))
          .then(e => this.setState({ tasks: this.state.tasks }) )

    this.isAddtion = false
  }

  cancelNote = (e) => {
    if (e.mode === 'add') {
      this.state.tasks.splice(e.id, 1)
      this.setState({
        activeId: null,
        tasks: this.state.tasks
      })
    }

    this.isAddtion = false
  }


//#region UI event
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
            this.syncTasks(strTasks)
                  .then(data => console.log(data))
                  .then(e => this.conn.send(strTasks))
                  .then(e => this.setState({ tasks: tasks }) )

        }
        this.cancelSelect();
    }
  }
  
  cancelSelect = () => {
      this.setState({
          activeId: null
      })
  }

  syncTasks =(tasks) => {
    return fetch('https://' + global.constants.DOMAIN +'/app/v1/hub/posttodosync', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: tasks
    }).then(resp =>  resp.json())
  }

////#endregion
  
  
  render() {
      let { tasks, activeId } = this.state;
      let { onDragStart, cancelSelect,onActiveSelect } = this;
      return (
          <div>
            <span className="main-title">🌈 WeTodo <a  href="https://github.com/yoyofx/yoyogo">@yoyofx/yoyogo</a> </span>
            <div className="task-wrapper">
                {
                    Object.keys(global.constants.STATUS_CODE).map(status => 
                        <TaskCol 
                            status={status} 
                            key={status} 
                            addNote={this.addNote}
                            dragTo={this.dragTo}
                            canDragIn={activeId != null}>
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
                                    onOK={this.okNote}
                                    onCancel={this.cancelNote}
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
