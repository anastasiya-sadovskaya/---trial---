import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import AppSettings from './AppSettings';
// import AppManager from './AppManager';
// import Month from './Month.jsx';

export default class Button extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <button className = {this.props.className}>{this.props.label}</button>
        )
    }
}
