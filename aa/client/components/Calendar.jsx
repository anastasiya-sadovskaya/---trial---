import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import AppSettings from './AppSettings';
import AppManager from './AppManager';
import Month from './Month.jsx';
import Header from './Header.jsx';


export default class Calendar extends Component{
    constructor(props){
        super(props);
        AppManager.calendar = this;
        this.today = new Date();
        this.currentMonth = this.today.getMonth();
        this.currentYear = this.today.getFullYear();
        var visibleMonth = this.currentMonth,
            visibleYear = this.currentYear,
            firstDayOfVisibleMonth = new Date(visibleYear, visibleMonth, 1).getDay(),
            lastDayOfVisibleMonth = new Date(visibleYear, visibleMonth, AppSettings.daysInMonth[visibleMonth]).getDay(),
            lastDaysOfPrevMonthCount = firstDayOfVisibleMonth - 1,
            firstDateOfPrevMonth = AppSettings.daysInMonth[visibleMonth - 1] - lastDaysOfPrevMonthCount,
            lastDateOfNextMonth = 7 - lastDayOfVisibleMonth;

        this.state = {
            visibleMonth : visibleMonth,
            visibleYear : visibleYear,
            firstDayOfVisibleMonth : firstDayOfVisibleMonth,
            lastDayOfVisibleMonth : lastDayOfVisibleMonth,
            lastDaysOfPrevMonthCount : lastDaysOfPrevMonthCount,
            firstDateOfPrevMonth : firstDateOfPrevMonth,
            lastDateOfNextMonth : lastDateOfNextMonth,
        }
    }

    calcLastDaysOfPrevMonthCount(){
        return this.state.firstDayOfVisibleMonth - 1;
    }

    calcFirstDateOfPrevMonth(){
        return AppSettings.daysInMonth[this.state.visibleMonth - 1] - this.state.lastDaysOfPrevMonthCount;
    }

    calcLastDateOfNextMonth(){
        return 7 - this.state.lastDayOfVisibleMonth;
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
                {/*<Button label = 'Prev' />*/}
                <div>
                    <div className = 'days-of-week'>{daysOfWeek}</div>
                    <Month className = 'prev-month' firstVisibleDay = {this.state.firstDateOfPrevMonth + 1} lastVisibleDay = {AppSettings.daysInMonth[this.state.visibleMonth - 1]} />
                    <Month
                            className = 'current-month'
                            year = {this.state.visibleYear} 
                            month = {this.state.visibleMonth} 
                            isCurrentMonth = {this.state.visibleYear === this.currentYear && this.state.visibleMonth === this.currentMonth ?true :false}
                            firstVisibleDay = {1}
                            lastVisibleDay = {AppSettings.daysInMonth[this.state.visibleMonth]}
                    />
                    <Month className = 'next-month' firstVisibleDay = {1} lastVisibleDay = {this.state.lastDateOfNextMonth} />
                </div>
                {/*<Button label = 'Next' />*/}
            </div>
        )
    }
}
