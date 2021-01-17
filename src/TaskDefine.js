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
                draggable="true"
            >
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
    handleDragStart = (e) => {
        this.props.onDragStart(this.props.id);
    }

    onActiveSelect = (e) => {
        this.props.onActiveSelect(this.props.id);
    }


    render() {
        let { id, title, content, active, onDragEnd } = this.props;
        return (
            <div 
                onDragStart={this.handleDragStart}
                onDragEnd={onDragEnd}
                onClick={this.onActiveSelect}
                id={`item-${id}`} 
                className={'item' + (active ? ' active' : '')}
                draggable="true"
            >
                <header className="item-header">
                    <span className="item-header-title"> 🟣 {title}</span>
                </header>
                <main className="item-content">{content}</main>
            </div>
        );
    }
}

export { TaskCol,TaskItem  }