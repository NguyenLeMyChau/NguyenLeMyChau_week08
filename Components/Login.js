import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

export default function Login() {

    const [data, setData] = useState([])

    var [userName, setUserName] = useState('');
    var [password, setPassword] = useState('');

    useEffect(() => {
        getAPIUser()
    }, [])

    const getAPIUser = async () => {
        const url = "http://localhost:3000/user";
        let result = await fetch(url);
        result = await result.json();
        setData(result);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const user = data.find((user) => user.username === userName && user.password === password);
        if (user) {
            alert('Đăng nhập thành công')
            console.log(data)
            console.log(userName, password)
        }
        else {
            alert('Đăng nhập thất bại. Vui lòng thử lại')
            console.log(data)
            console.log(userName, password)
        }

    }


    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={{ fontSize: 40, fontWeight: 500, color: '#8353E2' }}>LOGIN</Text>
            </View>

            <View style={styles.mid}>

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={userName}
                    onChangeText={(text) => setUserName(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry="true"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.btnRegister} onPress={handleLogin}>
                    <Text style={{ fontSize: 25, fontWeight: 500, color: '#FFFFFF' }}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    head: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        top: 100
    },

    mid: {
        width: '100%',
        height: 400,
        justifyContent: 'center',
        alignItems: 'center'
    },

    footer: {
        width: '100%',
        height: 100,
        alignItems: 'center'
    },

    input: {
        width: '80%',
        height: 50,
        padding: 10,
        paddingLeft: 20,
        fontSize: 20,
        marginTop: 30,
        borderRadius: 10,
        border: '1px #9095A0 solid'

    },

    btnRegister: {
        width: '80%',
        height: 50,
        backgroundColor: '#8353E2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop:'-70px'
    }
});
