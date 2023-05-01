import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { router } from './app/router/Routes';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-datepicker/dist/react-datepicker.css'


import './app/layout/styles.css';
import { StoreContext, store } from './app/stores/store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // I commented out  React.StrictMode to avoid error message 
  // on the conole due to semantic ui doesn't work with stric mode.
  // <React.StrictMode>


  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>



  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
