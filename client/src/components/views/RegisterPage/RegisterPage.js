import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_action/user_action';
function RegisterPage(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    function onNameHandler(event) {
        setName(event.target.value);
    }
    function onEmailHandler(event) {
        setEmail(event.target.value);
    }
    function onPasswordHandler(event) {
        setPassword(event.target.value);
    }
    function onConfirmPasswordHandler(event) {
        setConfirmPassword(event.target.value);
    }
    function onSubmitHandler(event) {
        event.preventDefault();
        if (password !== confirmPassword) {
            return document.getElementById("msg").innerHTML = "입력된 비밀번호가 다릅니다.";
        }
        let body = {
            name,
            email,
            password
        }

        dispatch(registerUser(body)).then(response => {
            if (response.payload.success)
                props.history.push('/login');
            else
                alert('error');
        })
    }

    return (
        <div style = {{
            display : 'flex', justifyContent : 'center', alignItems : 'center'
            , width : '100%', height : '100vh'}}>
           <form style = {{display : 'flex', flexDirection : 'column'}}
            onSubmit = {onSubmitHandler}>
            <h2>회원가입</h2>
            <label>Name</label>
            <input type = "text" value = {name} onChange = {onNameHandler}/>
            <label>Email</label>
            <input type = "email" value = {email} onChange = {onEmailHandler}/>
            <label>Password</label>
            <input type = "password" value = {password} onChange = {onPasswordHandler}/>
            <label>Confirm Password</label>
            <input type = "password" value = {confirmPassword} onChange = {onConfirmPasswordHandler}/>
            <br/>
            <h3 style = {{color : 'red'}} id = "msg"></h3>
            <button type = "submit">Join</button>


        </form>
        </div>
    )
}

export default RegisterPage;