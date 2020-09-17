import React, {Component} from 'react';
import './css/app.css'
import Sidbar from "./Sidbar";
import Chat from "./Chat";
import {BrowserRouter, Route,} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <div className={'app'}>
                <div className="app-body">
                    <BrowserRouter>
                        <Sidbar/>
                        <Route exact path='/rooms/:roomId' component={() => <Chat />} />
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;