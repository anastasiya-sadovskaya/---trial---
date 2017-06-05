import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import AppSettings from './AppSettings';
import Button from './Button.jsx';

export default class Header extends Component{
    render(){
        return(
            <div className = 'header'>
                <Button label = 'Prev' className = 'btn prev'/>
                <div>{AppSettings.months[AppSettings.currentMonth]}</div>
                <Button label = 'Next' className = 'btn next'/>
            </div>
        )
    }
}
