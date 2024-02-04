import { Button } from '@mui/material'
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import UserPool from '../../utils/awsExports';

import { logout } from '../../services/aws-cognito-service';

const ListDashboard = () => {
  const Navigate = useNavigate();
  
  useEffect(()=>{
    let user = UserPool.getCurrentUser();
    console.log(user, 13);
    if(!user){
      Navigate('/login');
    }
  },[]);

  const handleLogoout=()=>{
    logout();
  };

  return (
    <div className='ListDashboard'>
      <Button
        style={{margin:"10px"}}
        variant='contained'
        onClick={handleLogoout}
      >
        Logout
      </Button>
    </div>
  )
}

export default ListDashboard