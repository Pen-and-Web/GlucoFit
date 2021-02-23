export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

const BASE_URL = 'https://gentle-ravine-47650.herokuapp.com';

export const loginUser = ({email, password}) => {

    return async dispatch => {
        // logic to make a post to LOGIN the user
        const result = await(await fetch(`${BASE_URL}/api/auth`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }));

        const resultData = await result.json();
        console.log(resultData);

        if(resultData.success) {
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: resultData
            });
            console.log('LOGIN SUCCESS');
        } else {
            dispatch({
                type: LOGIN_USER_FAIL
            });
            console.log('LOGIN FAIL');
        }
        return resultData;
    }
};
