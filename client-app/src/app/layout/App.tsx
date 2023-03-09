import { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';


import '../layout/styles.css';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
// import CommonStore from '../stores/commonStore';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';


// to get more idea about Generics look ERROR HANDLING


function App() {

  const location = useLocation();
  const { commonStore: {token, setAppLoaded, appLoaded}, userStore: {getUser} } = useStore();
  //const { commonStore, userStore} = useStore();

  

  useEffect( () => {

    if(token){
    

      getUser().finally( () => setAppLoaded());

    } else {
    setAppLoaded();
    }

  }, [getUser, setAppLoaded, token])

  if(!appLoaded) return <LoadingComponent content='Loading app...'/>

  return (

    <Fragment>

      <ModalContainer />

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

//font-size: clamp(1rem, 1.25vw, 1.25rem)

// App -> ActivityDashboard -> ActivityList  -> ActivityDetails

//Activity --under domain for C# class
//models/Activity  interface in under clinet-app

//https://github1s.com/TryCatchLearn/Reactivities/blob/main/Persistence/Migrations/20221204055302_PostgresInitial.cs


// https://github.com/TryCatchLearn/Reactivities


// STEPS TO REMEMBER FOR DATA FLOW..
    // for C#
// 1. DOMAIN (Entity Class)
// 2. DbContext inheritance class for read and write
// 3. Repository class if it is nessaary for instantiating data
// 4. call the class that inherit DbContext class or use the repository class if any
// 5. in Controller class use #4 class for manipulating the data and pass it to the View

// for react
// 1. Model (Entity Class  ~  Entity interface )
// 2. use axios as a DbContext to read and write 
// 3. storeClass (spesfic class i.e. userStore ore entityStore...) for instantiating data
// 4. import all the storeClasses to the store which combine all the necessary entities

// 5. and use the store class  as a data source for each view


/**
                 NB.  -important note

 storeClasses   === reducers in react
 store class == combineReducers(reducers)

 As your app grows more complex, you'll want to split your reducing 
 function into separate functions, each managing independent parts of the state.

 **/