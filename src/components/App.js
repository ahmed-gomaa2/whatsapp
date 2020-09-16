import React, {Component} from 'react';
import './css/app.css'
import Sidbar from "./Sidbar";

class App extends Component {
    render() {
        return (
            <div className={'app'}>
                <div className="app-body">
                    <Sidbar/>
                </div>
            </div>
        );
    }
}

export default App;