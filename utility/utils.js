import { Alert, AsyncStorage } from 'react-native';

export default Utils =  {
    isLoggedIn: async function(callback) {
        const loginResStr = await AsyncStorage.getItem('LOGIN::USER::RES'); 
        callback && callback(!!loginResStr);
        return !!loginResStr;
    },

    doLogout: async function(callback) {
        await AsyncStorage.removeItem('LOGIN::USER::RES');
        await AsyncStorage.removeItem('LOGIN::USER::RES::USER');
        callback && callback(true);
        return true;
    },

    doLogin: function(email, password, callback){
        const data = {
            email, password
        }

        fetch(`https://kalendars.io/api/v1/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(json => {
            if(json.status >=400) {
                throw json;
            }
            AsyncStorage.setItem('LOGIN::USER::RES', JSON.stringify(json.data.token))
            .then(() => {
                callback && callback(json)
            });
        }).catch(res => {
            Alert.alert('Error', 'Either email or password is invalid');
            //callback && callback(res)
        });
    },

    doSignUp: function(data, callback){
        fetch(`https://kalendars.io/api/v1/register-or-login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(json => {
            AsyncStorage.setItem('LOGIN::USER::RES', JSON.stringify(json))
            .then(() => {
                callback && callback({status: 200})
            });
        }).catch(res => {
            Alert.alert('Error', 'Signup Error');
            //callback && callback(res)
        });
    },

    getMyProfile: async function(callback){
        let user = await AsyncStorage.getItem('LOGIN::USER::RES::USER');
        if(user) {
            user = JSON.parse(user);
            callback && callback(user)
            return user;
        }
        const loginResStr = await AsyncStorage.getItem('LOGIN::USER::RES'); 
        console.log(loginResStr);
        const loginRes = JSON.parse(loginResStr);
        const token  = loginRes.token;
        fetch(`https://kalendars.io/api/v1/users/me`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json()).then(json => {
            console.log(json);
            AsyncStorage.setItem('LOGIN::USER::RES::USER', JSON.stringify(json.user))
            .then(() => {
                callback && callback(json.user)
            });
        }).catch(res => {
            Alert.alert('Error', 'Internal Server Error');
            // callback && callback(res)
        });
    },

    getDateFormat: function() {
        return 'D MMMM YYYY, dddd';
    } 
}