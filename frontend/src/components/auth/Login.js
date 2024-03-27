import React from 'react'
import './Auth.css'

import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';


//components
import EmailComp from '../components/EmailComp'
import PasswordComp from '../components/PasswordComp';
import Header from '../components/Header';

const NavReg = () => {
    const navigate = useNavigate();
    const switchToReg = () => {
        navigate('/register')
    }
    return (
        <p onClick={switchToReg}
            style={{
                cursor: 'pointer',
                textDecoration: 'underline',
            }}>{
                "Dont have an account? Register"
            }
        </p>
    )
}
const SignIn = () => {
    return (
        <div>
            <h2>Sign In</h2>
        </div>
    );
}
const Error = ({ error }) => {
    return (
        <div>
            {
                error !== '' &&
                <p style={{
                    color: error === 'Successful' ? 'green' : 'red',
                    justifyContent: "center",
                    fontSize: "15px"
                }}>{error}</p>
            }
        </div>
    );
}

function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    const cookies = new Cookies();


    React.useEffect(() => {
        const access_token = cookies.get('access_token');
        if (access_token) {
            const decode = jwtDecode(access_token);
            console.log(decode);
            const d = new Date();
            if (decode.exp < d.getMilliseconds()) {
                cookies.remove('access_token');
            } else {
                navigate('/');
                window.location.reload();
            }
        } else {
            console.log("No refresh token");
        }
    }, []);


    const check = () => {
        if (email == 'admin' && password == '1234') {
            setError('Successful');
        } else {
            setError("Wrong Credentials");
        }
        setLoading(false);
    }

    return (
        <div className='auth'>
            <div className='auth-container'>

                <Header />

                {/*Login and Register Form*/}
                <div className='auth-login'>
                    <div className='auth-login-container'>

                        <form
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <SignIn />

                            <EmailComp value={email} onChange={(e) => setEmail(e.target.value)} />
                            <PasswordComp value={password} onChange={(e) => setPassword(e.target.value)} />

                            <div className='formBtn'>
                                <Button
                                    onClick={check}
                                    style={{
                                        backgroundColor: 'violet',
                                        color: 'white'
                                    }}
                                    variant='contained'
                                >
                                    {
                                        loading ? "Logging In..." : "Login"
                                    }
                                </Button>

                            </div>
                        </form>
                        <div>
                            {
                                error !== '' &&
                                <p style={{
                                    color: error === 'Successful' ? 'green' : 'red',
                                    justifyContent: "center",
                                    fontSize: "15px"
                                }}>{error}</p>
                            }
                        </div>

                        <NavReg />

                    </div>
                </div>

            </div>
        </div >
    )
}

export default Login