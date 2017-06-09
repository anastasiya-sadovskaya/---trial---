import React, {Component} from 'react';
import moment from 'moment';
import AppSettings from './AppSettings';
import AppManager from './AppManager';
import Month from './Month.jsx';
import Header from './Header.jsx';


export default class Calendar extends Component{
    constructor(props){
        super(props);
        AppManager.calendar = this;
        this.visibleMonth = AppSettings.currentMonth;
            this.visibleYear = AppSettings.currentYear,
            this.firstDay = moment(`${this.visibleYear}-${this.visibleMonth + 1}-01`);
            this.lastDay = this.firstDay.clone().endOf('month');

        this.state = {
            visibleMonth: this.visibleMonth,
            visibleYear: this.visibleYear,
            prevMonth: this.visibleMonth - 1,
            leapYear: this.visibleYear % 4 === 0 ?true :false,
            firstDay: parseInt(this.firstDay.format('E')),
            lastDay:  parseInt(this.lastDay.format('E')),
        }
    }

    isLeapYear(year){
        if(year % 4 === 0 && year % 100 !== 0 || year % 400 === 0){
            AppSettings.daysInMonth[1] = 29;
            return true;
        } else { 
            AppSettings.daysInMonth[1] = 28;
            return false;
        }
    }

    render(){
        const daysOfWeek = AppSettings.days.map( (el, i) => {
            return (
                <div key = {i} className = 'cell'> {el} </div>
            )
        });

        return (
            <div className = 'calendar'>
                <Header />
                <div>
                    <div className = 'days-of-week'>{daysOfWeek}</div>
                    <Month className = {'prev-month'} firstVisibleDate = {AppSettings.daysInMonth[this.state.prevMonth] - (this.state.firstDay - 1) + 1} lastVisibleDate = {AppSettings.daysInMonth[this.state.prevMonth]} />
                    <Month 
                            className = 'current-month'
                            isCurrentMonth = {this.state.visibleYear === AppSettings.currentYear && this.state.visibleMonth === AppSettings.currentMonth ?true :false}
                            firstVisibleDate = {1}
                            lastVisibleDate = {AppSettings.daysInMonth[this.state.visibleMonth]}
                    />
                    <Month className = {this.state.lastDay === 0 ?'none' :'next-month'} firstVisibleDate = {1} lastVisibleDate = {7 - this.state.lastDay} />
                </div>
            </div>
        )
    }
}
