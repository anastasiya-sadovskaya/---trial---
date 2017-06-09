import React, {Component} from 'react';
import AppSettings from './AppSettings';
import AppManager from './AppManager';
import Day from './Day.jsx';

export default class Month extends Component{
    constructor(props){
        super(props);
        AppManager.visibleMonths.push(this);
    }

    render(){
        let year = this.props.year;
        let month = this.props.month;
        console.log(AppManager);
        console.log(AppSettings);
        let days = [];
        for (let i = this.props.firstVisibleDate; i <= this.props.lastVisibleDate; i += 1){
            days.push(i);
        }
        var dayTemplate = days.map( (el, i) => {
            return (
                <Day 
                    date = {i + this.props.firstVisibleDate} 
                    key = {i} 
                    isCurrentMonth = {this.props.isCurrentMonth}
                    year = {year}
                    month = {month}
                />
            )
        })
        return (
            <div className = {this.props.className} >{ dayTemplate }</div>
        )
    }
}

