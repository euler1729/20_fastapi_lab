import React from 'react'
import './Auth.css'

import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
// import { color } from '../../color/color';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import api from '../../api/API';
import icon from './res/logo.png'

import EmailComp from '../components/EmailComp';
import PasswordComp from '../components/PasswordComp';
import ConfirmPasswordComp from '../components/ConfirmPasswordComp';
import NameCom from '../components/NameCom'
import Header from '../components/Header'
import PhoneComp from '../components/PhoneCom';

const NavLogin = () => {
    const navigate = useNavigate();
    const switchToReg = () => {
        navigate('/login')
    }
    return (
        <p onClick={switchToReg}
            style={{
                cursor: 'pointer',
                textDecoration: 'underline',
            }}>{
                "Already have an account? Login"
            }
        </p>
    )
}



function Register() {
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirm_password, setConfirmPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [success, setSuccess] = React.useState('');

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
            // console.log("No refresh token");
        }
    }, [error, password, email, name, phone, confirm_password]);

    const switchToLogin = () => {
        navigate('/login')
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        if (email === '' || password === '' || name === '' || phone === '' || confirm_password === '') {
            setError('Please fill all the fields');
            setLoading(false);
            return;
        }
        else if (password !== confirm_password) {
            setError('Password does not match');
            setLoading(false);
            return;
        }
        else if (name.length < 5) {
            setError('Username must be at least 5 characters');
            setLoading(false);
            return;
        }
        else if (phone.length != 11) {
            setError('Phone number must be at exactly 11 characters');
            setLoading(false);
            return;
        }
        else if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }
        else {
            setError('');
            api.post('/register', {
                username: name,
                password: password,
                confirm_password: confirm_password,
                email: email.toLowerCase(),
                phone_number: phone,
            }).then(res => {
                setLoading(false);
                console.log(res.data);
                if (res.status < 300) {
                    console.log(res.data);
                    setError('');
                    setSuccess(res.data.message);
                    // navigate('/login');
                    // window.location.reload();
                } else {
                    setError(res.data.detail);
                    setLoading(false);
                }
            }).catch(err => {
                console.log(err);
                setError(err.response.data.detail);
                setLoading(false);
            })
        }
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
                            <div>
                                <h2>Sign Up</h2>
                                {
                                    success !== '' &&
                                    <p style={{
                                        color: 'green',
                                        justifyContent: "center",
                                        fontSize: "15px"
                                    }}>{success}</p>
                                }
                            </div>
                            <NameCom value={name} onChange={(e) => setName(e.target.value)} />
                            <PasswordComp value={password} onChange={(e) => setPassword(e.target.value)} />
                            <ConfirmPasswordComp value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <EmailComp value={email} onChange={(e) => setEmail(e.target.value)} />
                            <PhoneComp value={phone} onChange={(e) => setPhone(e.target.value)} />

                            <div className='formBtn'>
                                <Button
                                    style={{
                                        backgroundColor: 'violet',
                                        color: 'white'
                                    }}
                                    variant='contained'
                                    onClick={handleRegister}
                                >
                                    {loading ? "Registering..." : "Register"}
                                </Button>
                            </div>
                        </form>

                        {
                            error && <div>
                                {
                                    error !== '' &&
                                    <p style={{
                                        color: 'red',
                                        justifyContent: "center",
                                        fontSize: "15px"
                                    }}>{error}</p>
                                }
                            </div>
                        }

                        <NavLogin />
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Register