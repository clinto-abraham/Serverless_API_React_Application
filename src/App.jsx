import "./utils/init"
import './styles/App.css'
import { Suspense, lazy } from 'react'
import { BrowserRouter,Routes, Route  } from 'react-router-dom';
import Home from './pages/Home'
const Login = lazy(() => import('./pages/Others/Login'));
const ListDashboard = lazy(() => import('./pages/Others/ListDashboard'));
const SignUp = lazy(() => import('./pages/Others/SignUp'));
const SignInSide = lazy(() => import('./pages/Others/SignIn'));
import ErrorBoundary from './ErrorHandlers/Component';
import { Amplify } from 'aws-amplify';
import amplifyConfiguration from './amplifyconfiguration.json'
Amplify.configure(amplifyConfiguration);
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ErrorBoundary name='Home'><Home /></ErrorBoundary>}/>
        <Route path='/sign-up' element={<ErrorBoundary name='SignUp'><Suspense fallback={<h1>Loading</h1>}><SignUp /></Suspense></ErrorBoundary>}/>
        <Route path='/login' element={<ErrorBoundary name='Login'><Suspense fallback={<h1>Loading</h1>}><Login /></Suspense></ErrorBoundary>}/>
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