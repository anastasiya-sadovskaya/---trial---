import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import AppSettings from './AppSettings';
import AppManager from './AppManager';
import Day from './Day.jsx';

export default class Month extends Component{
    constructor(props){
        super(props);
        AppManager.visibleMonth = this;
                                //   {
                                //       year: this.props.year,
                                //       month: this.props.month,
                                //   };
        this.state = {
            today: AppSettings.currentDate,
        }
    }

    static defaultProps = {
        firstDay: new Date(AppSettings.currentYear, AppSettings.currentMonth, 1).getDay(),
    }

    render(){
        let year = this.props.year;
        let month = this.props.month;
        console.log(AppManager);
        console.log(AppSettings);
        let days = [];
        for (let i = this.props.firstVisibleDay; i <= this.props.lastVisibleDay; i += 1){
            days.push(i);
        }
        var dayTemplate = days.map( (el, i) => {
            return (
                <Day 
                    date = {i + this.props.firstVisibleDay} 
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

