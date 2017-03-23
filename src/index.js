import React from 'react';
import {render} from 'react-dom';
import Routers from "./routers.js"
import injectTapEventPlugin from 'react-tap-event-plugin';
import "./main.css"

injectTapEventPlugin();

render(<Routers />,document.getElementById('root'));
