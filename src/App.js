import './App.css';
import React from 'react';
import { TaskCol,TaskItem }  from './TaskDefine'
import './config';

let tasks = [{
  id: 0,
  status: global.constants.STATUS_TODO,
  title: '每周七天阅读五次，每次阅读完要做100字的读书笔记',
  username: '小夏',
  point: 10
}, {
  id: 1,
  status: global.constants.STATUS_TODO,
  title: '每周七天健身4次，每次健身时间需要大于20分钟',
  username: '橘子🍊',
  point: 5
}, {
  id: 2,
  status: global.constants.STATUS_TODO,
  title: '单词*100',
  username: '┑(￣Д ￣)┍',
  point: 2
}, {
  id: 3,
  status: global.constants.STATUS_TODO,
  title: '单词*150',
  username: '┑(￣Д ￣)┍',
  point: 2
}, {
  id: 4,
  status: global.constants.STATUS_TODO,
  title: '单词*200',
  username: '┑(￣Д ￣)┍',
  point: 2
}, {
  id: 5,
  status: global.constants.STATUS_TODO,
  title: '单词*250',
  username: '┑(￣Д ￣)┍',
  point: 2
}]

class  App extends React.Component {
  state = {
      tasks: tasks,
      activeId: null
  }
  /**
   * 传入被拖拽任务项的 id
   */
  onDragStart = (id) => {
      this.setState({
          activeId: id
      })
  }
  
  dragTo = (status) => {
      let { tasks,  activeId} = this.state;
      let task = tasks[activeId];
      if (task.status !== status) {
          task.status = status;
          this.setState({
              tasks: tasks
          })
      }
      this.cancelSelect();
  }
  
  cancelSelect = () => {
      this.setState({
          activeId: null
      })
  }
  
  render() {
      let { tasks, activeId } = this.state;
      let { onDragStart, onDragEnd, cancelSelect } = this;
      return (
          <div className="task-wrapper">
              {
                  Object.keys(global.constants.STATUS_CODE).map(status => 
                      <TaskCol 
                          status={status} 
                          key={status} 
                          dragTo={this.dragTo}
                          canDragIn={activeId != null && tasks[activeId].status !== status}>
                          { tasks.filter(t => t.status === status).map(t => 
                              <TaskItem
                                  key={t.id}
                                  active={t.id === activeId}
                                  id={t.id}
                                  title={t.title} 
                                  point={t.point} 
                                  username={t.username}
                                  onDragStart={onDragStart}
                                  onDragEnd={cancelSelect}
                              />)
                          }
                      </TaskCol>
                  )
              }
          </div>
      )
  }
}

export default App;
