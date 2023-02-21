import { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';


import '../layout/styles.css';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';


// to get more idea about Generics look ERROR HANDLING


function App() {

  const location = useLocation();

  return (

    <Fragment>

      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
        {location.pathname === '/' ? <HomePage /> : (
        <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
               <Outlet /> 
                {/* // equal to router of all the components that inheret history object  */}
            </Container>
        </Fragment>
        )}

    </Fragment>



  );
}



export default observer(App);

// App -> ActivityDashboard -> ActivityList  -> ActivityDetails

//Activity --under domain for C# class
//models/Activity  interface in under clinet-app

//https://github1s.com/TryCatchLearn/Reactivities/blob/main/Persistence/Migrations/20221204055302_PostgresInitial.cs
