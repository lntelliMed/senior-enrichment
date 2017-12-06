'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import MainContainer from './components/Main'

render (
  <Provider store={store}>
    <MainContainer/>
  </Provider>,
  document.getElementById('main')
)
