import { useTransition } from 'react';
import { useNavigate } from 'react-router-dom'
import { cognitoURL } from '../utils/awsExports';

const Home = () => {
    const Navigate = useNavigate();
    const [pending, startTransition] = useTransition();
    
    console.log(pending, cognitoURL)
    return (
        <>
            <div className='home'>
                <h3>Welcome to TOC </h3>
                <h6>Top Of Cliff Developer</h6>
                <div className='homeButtons'>
                    <a href='https://serverless-dockets-manager.auth.ap-south-1.amazoncognito.com/login?client_id=bp9sla9jgtnlfd34qgpauv6rc&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2F'>
                        Sign In
                    </a>
                    <button style={{ margin: '10px' }} onClick={() => startTransition(() => Navigate('/sign-in'))}>
                        Login
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home