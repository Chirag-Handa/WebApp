import React,{Component} from 'react';
import './Background.css';

export class Home extends Component{
    render(){
        return(
            <div>
                <h3 class="whiteTextOverride">This is Student Home Page</h3>
                <div className='BGImage'></div>
            </div>
        )
    }
}