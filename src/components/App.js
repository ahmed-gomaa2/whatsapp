import React, {Component} from 'react';
import './css/app.css'
import Sidbar from "./Sidbar";
import Chat from "./Chat";

class App extends Component {
    render() {
        return (
            <div className={'app'}>
                <div className="app-body">
                    <Sidbar/>
                    <Chat/>
                </div>
            </div>
        );
    }
}

export default App;