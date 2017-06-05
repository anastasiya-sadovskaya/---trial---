import React, {Component} from 'react';
import AppSettings from './AppSettings';
import AppManager from './AppManager';
// import ReactDOM from 'react-dom';

export default class Day extends Component{
    constructor(props){
        super(props);
        AppManager.days.push(this.props.date);
        this.state = {
            
        }
        this.day = new Date(AppSettings.currentYear, AppSettings.currentMonth, this.props.date).getDay();
    }

    addClass(){
        this.className = 'cell';
        if (this.props.isCurrentMonth && AppSettings.currentDate === this.props.date){
            this.className += ' today';
        }
        return this.className;
    }
    
    render(){
        return (
            <div className = {this.addClass()}>
                <p>{this.props.date}</p>
            </div>
        )
    }
}

