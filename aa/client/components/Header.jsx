import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import AppSettings from './AppSettings';
import AppManager from './AppManager';
import Button from './Button.jsx';

export default class Header extends Component{

    onClickPrevBtnHandler(e){
        e.preventDefault();
        console.log(AppSettings.visibleMonth);
        AppManager.calendar.setState({
                                        visibleMonth : AppManager.calendar.state.visibleMonth - 1,
                                        visibleYear : AppManager.calendar.state.visibleYear,
                                        firstDayOfVisibleMonth : AppManager.calendar.state.firstDayOfVisibleMonth,
                                        lastDayOfVisibleMonth : AppManager.calendar.state.lastDayOfVisibleMonth,
                                        lastDaysOfPrevMonthCount : AppManager.calendar.calcLastDaysOfPrevMonthCount(),
                                        firstDayOfPrevMonth : AppManager.calendar.calcFirstDayOfPrevMonth(),
                                        lastDayOfNextMonth : AppManager.calendar.calcLastDayOfNextMonth(),
                                    });
        // console.log(AppManager.calendar.state.month);
    }

    onClickNextBtnHandler(e){
        e.preventDefault();
        AppManager.calendar.setState({month: AppManager.calendar.state.month + 1});
        console.log(AppManager.calendar.state.month);
    }

    render(){
        return(
            <div className = 'header'>
                <Button label = 'Prev' className = 'btn prev' onBtnClick = {this.onClickPrevBtnHandler}/>
                <div>{AppSettings.months[AppManager.calendar.state.visibleMonth]}</div>
                <Button label = 'Next' className = 'btn next' onBtnClick = {this.onClickNextBtnHandler}/>
            </div>
        )
    }
}
