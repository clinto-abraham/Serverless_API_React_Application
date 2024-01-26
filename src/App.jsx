import "./utils/init"
import './styles/App.css'
import { Suspense, lazy } from 'react'
import { BrowserRouter,Routes, Route  } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const ListDashboard = lazy(() => import('./pages/ListDashboard'));
const SignUp = lazy(() => import('./pages/SignUp'));
import ErrorBoundary from './ErrorHandlers/Component';
import SignInSide from "./pages/SignIn";

function App() {

  // useEffect(()=>{
  //   let user = UserPool.getCurrentUser();
  //     if(user){
  //       <Navigate to="/list-dashboard" replace />
  //     }
  // },[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ErrorBoundary name='Home'><Suspense fallback={<h1>Loading</h1>}><Home /></Suspense></ErrorBoundary>}/>
        <Route path='/sign-up' element={<ErrorBoundary name='SignUp'><SignUp /></ErrorBoundary>}/>
        <Route path='/login' element={<ErrorBoundary name='Login'><Login /></ErrorBoundary>}/>
        <Route path='/sign-in' element={<ErrorBoundary name='SignInSide'><SignInSide /></ErrorBoundary>}/>
        <Route path="/list-dashboard" element={<ErrorBoundary name='ListDashboard'><ListDashboard /></ErrorBoundary>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import './styles/App.css'
// import Login from './pages/AmplifyUI'
// import {Amplify} from 'aws-amplify';
// import { REGION, USER_POOL_ID, USER_POOL_APP_CLIENT_ID } from './utils/awsExports';
// Amplify.configure({
//   Auth: {
//     region: REGION,
//     userPoolId: USER_POOL_ID,
//     userPoolWebClientId: USER_POOL_APP_CLIENT_ID
//   }
// })
// function App() {
//   return (
//     <>
//       <Login />
//     </>
//   )
// }

// export default App
// 