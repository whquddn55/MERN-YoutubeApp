import {useEffect} from 'react';
import {useDispatch} from 'react-redux'; 
import {auth} from '../_action/user_action';

// option : null => 아무나 출입 가능
//          true => 로그인 한 유저만 출입 가능
//          false => 로그인한 유지는 출입 불가능
// adminRouter : null => 아무나 출입 가능
//               true => admin만 출입 가능
export default function(SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth())
            .then((response) => {
                if (!response.payload.isAuth) {
                    if (option)
                        props.history.push('/login');
                } else {
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/');
                    } else if (option === false) 
                        props.history.push('/');
                }
            })
        });
        return (
            <SpecificComponent {...props} />
        )
    }

    return AuthenticationCheck;
}