import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import AppSettings from './AppSettings';
// import AppManager from './AppManager';
import Month from './Month.jsx';
import Header from './Header.jsx';


export default class Calendar extends Component{
    constructor(props){
        super(props);
        let firstDayOfVisibleMonth = new Date(AppSettings.currentYear, AppSettings.currentMonth, 1).getDay(),
            lastDayOfVisibleMonth = new Date(AppSettings.currentYear, AppSettings.currentMonth, AppSettings.daysInMonth[AppSettings.currentMonth]).getDay(),
            lastDaysOfPrevMonthCount = firstDayOfVisibleMonth - 1,
            lastDaysOfPrevMonthSinse = AppSettings.daysInMonth[AppSettings.currentMonth - 1] - lastDaysOfPrevMonthCount,
            lastDayOfNextMonth = 7 - lastDayOfVisibleMonth;
        this.state = {
            year: AppSettings.currentYear,
            month: AppSettings.currentMonth,
            firstDayOfVisibleMonth : firstDayOfVisibleMonth,
            lastDayOfVisibleMonth : lastDayOfVisibleMonth,
            lastDaysOfPrevMonthCount :lastDaysOfPrevMonthCount,
            lastDaysOfPrevMonthSinse : lastDaysOfPrevMonthSinse,
            lastDayOfNextMonth : lastDayOfNextMonth,
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
                {/*<Button label = 'Prev' />*/}
                <div>
                    <div className = 'days-of-week'>{daysOfWeek}</div>
                    <Month className = 'prev-month' firstVisibleDay = {this.state.lastDaysOfPrevMonthSinse + 1} lastVisibleDay = {AppSettings.daysInMonth[this.state.month - 1]} />
                    <Month 
                            className = 'current-month'
                            year = {this.state.year} 
                            month = {this.state.month} 
                            isCurrentMonth = {this.state.year === AppSettings.currentYear && this.state.month === AppSettings.currentMonth ?true :false}
                            firstVisibleDay = {1}
                            lastVisibleDay = {AppSettings.daysInMonth[this.state.month]}
                    />
                    <Month className = 'next-month' firstVisibleDay = {1} lastVisibleDay = {this.state.lastDayOfNextMonth} />
                </div>
                {/*<Button label = 'Next' />*/}
            </div>
        )
    }
}
