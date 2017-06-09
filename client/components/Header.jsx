import React, {Component} from 'react';
// import moment from 'moment';
// import ReactDOM from 'react-dom';
import AppSettings from './AppSettings';
import AppManager from './AppManager';
import Button from './Button.jsx';

export default class Header extends Component{

    onPrevBtnClick(){
        AppManager.calendar.firstDay = AppManager.calendar.firstDay.add(-1, 'month');
        AppManager.calendar.lastDay = AppManager.calendar.firstDay.clone().endOf('month');

        AppManager.calendar.setState({
            visibleMonth: AppManager.calendar.state.visibleMonth === 0 ?11 :AppManager.calendar.state.visibleMonth - 1,
            visibleYear: AppManager.calendar.state.visibleMonth === 0 ?AppManager.calendar.state.visibleYear - 1 :AppManager.calendar.state.visibleYear,
            leapYear: AppManager.calendar.state.visibleMonth === 0 ?(AppManager.calendar.isLeapYear(AppManager.calendar.state.visibleYear - 1)) :AppManager.calendar.state.leapYear,
            prevMonth:  AppManager.calendar.state.prevMonth === 0 ?11 :AppManager.calendar.state.prevMonth - 1,
            firstDay: parseInt(AppManager.calendar.firstDay.format('E')),
            lastDay: parseInt(AppManager.calendar.lastDay.format('E')),
        });
    }


    onNextBtnClick(){
        AppManager.calendar.firstDay = AppManager.calendar.firstDay.add(1, 'month');
        AppManager.calendar.lastDay = AppManager.calendar.firstDay.clone().endOf('month');

        AppManager.calendar.setState({
            visibleMonth: AppManager.calendar.state.visibleMonth === 11 ?0 :AppManager.calendar.state.visibleMonth + 1,
            visibleYear: AppManager.calendar.state.visibleMonth === 11 ?AppManager.calendar.state.visibleYear + 1 :AppManager.calendar.state.visibleYear,
            leapYear: AppManager.calendar.state.visibleMonth === 11 ?(AppManager.calendar.isLeapYear(AppManager.calendar.state.visibleYear + 1)) :AppManager.calendar.state.leapYear,
            prevMonth:  AppManager.calendar.state.prevMonth === 11 ?0 :AppManager.calendar.state.prevMonth + 1,
            firstDay: parseInt(AppManager.calendar.firstDay.format('E')),
            lastDay: parseInt(AppManager.calendar.lastDay.format('E')),
        });
    }

    render(){
        return(
            <div className = 'header'>
                <Button label = 'Prev' className = 'btn prev' onClickBtn = {this.onPrevBtnClick}/>
                <div>{AppSettings.months[AppManager.calendar.state.visibleMonth]}</div>
                <Button label = 'Next' className = 'btn next' onClickBtn = {this.onNextBtnClick}/>
            </div>
        )
    }
}
