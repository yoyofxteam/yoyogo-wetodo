import React from 'react';
import './config';



class TaskCol extends React.Component {
    state = {
        in: false
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
        e.preventDefault();
        this.props.dragTo(this.props.status);
        this.setState({
            in: false
        })
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
                    {global.constants.STATUS_CODE[status]}
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
    render() {
        let { id, title, point, username, active, onDragEnd } = this.props;
        return (
            <div 
                onDragStart={this.handleDragStart}
                onDragEnd={onDragEnd}
                id={`item-${id}`} 
                className={'item' + (active ? ' active' : '')}
                draggable="true"
            >
                <header className="item-header">
                    <span className="item-header-username">{username}</span>
                    <span className="item-header-point">{point}</span>
                </header>
                <main className="item-main">{title}</main>
            </div>
        );
    }
}

export { TaskCol,TaskItem  }