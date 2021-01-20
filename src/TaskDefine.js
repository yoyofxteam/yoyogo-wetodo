import React from 'react';
import './config';



class TaskCol extends React.Component {
    state = {
        in: false
    }

    handleAddNote = (e) => {
        e.preventDefault();
        this.props.addNote(this.props.status);
    }

    handleDragEnter = (e) => {
        e.preventDefault();
        if (this.props.canDragIn) {
            this.setState({
                in: true
            })
        }
    }
    handleDragLeave = (e) => {
        e.preventDefault();
        if (this.props.canDragIn) {
            this.setState({
                in: false
            })
        }
    }
    handleDrop = (e) => {
        console.log(this.props.status)
        e.preventDefault();
        this.props.dragTo(this.props.status);
        try{
            this.setState({
                in: false
            })
        }
        catch{}
    }
    render() {
        let { status, children } = this.props;
        return (
            <div
                id={`col-${status}`}
                className={'col'}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDragOver={this.handleDragEnter}
                onDrop={this.handleDrop}
                draggable="true" >
                <header className="col-header">
                <span className="col-header-point">{children.length}</span>
                    {global.constants.STATUS_CODE[status]}
                <span className="col-header-adder" onClick={this.handleAddNote}>+</span>
                </header>
                <main className={'col-main' + (this.state.in ? ' active' : '')}>
                    {children}
                </main>
            </div>
        );
    }
}

class TaskItem extends React.Component {
    state = {
        itemContent: this.props.content
    }

    handleDragStart = (e) => {
        this.props.onDragStart(this.props.id);
    }

    onActiveSelect = (e) => {
        this.props.onActiveSelect(this.props.id);
    }

    handleContentChange = (e) => {
        this.setState({
            itemContent: e.target.value
        })
    }

    onOk =(e)=>{
        this.props.onOK({id:this.props.id,content:this.state.itemContent})
    }

    onCancel =(e)=>{
        this.props.onCancel({id:this.props.id})
    }

    render() {
        let { id,editable ,active, onDragEnd } = this.props;
        return (
            <div 
                onDragStart={this.handleDragStart}
                onDragEnd={onDragEnd}
                onClick={this.onActiveSelect}
                id={`item-${id}`} 
                className={'item' + (active ? ' active' : '')}
                draggable="true"
            >
                {
                    !editable?
                    <div>
                    <header className="item-header">
                        <span className="item-header-title"> 🟣 Task {id} </span>
                    </header>
                    <main className="item-content">{this.itemContent}</main>
                    </div>
                    :
                    <div className="item-editer">
                       <textarea className="item-note-textarea" name="note"   onChange={this.handleContentChange.bind(this)} required=""  
                       autoFocus aria-label="Enter a note" maxLength="50"  placeholder="Enter a note">{this.itemContent}</textarea>
                       <div>
                        <button className="btn-primary" type="button"  onClick={this.onOk.bind(this)}>ok</button> 
                        <button className="btn-blue" type="button" onClick={this.onCancel.bind(this)}>cancel</button>
                       </div>
                    </div>
                }
            </div>
        );
    }
}

export { TaskCol,TaskItem  }