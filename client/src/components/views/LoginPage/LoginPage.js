import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from "../../../_action/user_action";

function LoginPage(props) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onEmailHandler(event) {
        setEmail(event.currentTarget.value);
    }
    function onPasswordHandler(event) {
        setPassword(event.currentTarget.value);
    }
    function onSubmitHandler(event) {
        event.preventDefault(); // refresh방지
        
        let body = {
            email,
            password,
        }

        dispatch(loginUser(body)).then(response => {
            if (response.payload.loginSuccess) {
                props.history.push('/');
            } else {
                alert(response.payload.message);
            }
        })
    }

    return (
        <div style = {{
            display : 'flex', justifyContent : 'center', alignItems : 'center'
            , width : '100%', height : '100vh'}}>
            
        <form style = {{display : 'flex', flexDirection : 'column'}}
            onSubmit = {onSubmitHandler}>
            <label>Email</label>
            <input type = "email" value = {email} onChange = {onEmailHandler}/>
            <label>Password</label>
            <input type = "password" value = {password} onChange = {onPasswordHandler}/>
            <br/>
            <button type = "submit">Login</button>
            <a href = "/register">회원가입</a>
        </form>
        </div>
    )
}

export default LoginPage;
