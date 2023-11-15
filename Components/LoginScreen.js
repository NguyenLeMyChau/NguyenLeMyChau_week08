import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

export default function LoginScreen({ navigation }) {
    var [username, setUserName] = useState('');
    var [password, setPassword] = useState('');

    const getAPIUser = async () => {
        const url = "http://localhost:3000/user?username=" + username;
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                json.forEach(element => {
                    if (element.password === password) {
                        alert("Login success");
                        navigation.navigate('NoteScreen', {userId: element.id})
                    } else {
                        alert("Login fail");
                    }
                });
            });

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
                    value={username}
                    onChangeText={(text) => setUserName(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry="true"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <TouchableOpacity
                    style={{ color: 'blue', fontSize: 18, top: 15, left: 115, fontWeight: 700 }}
                    onPress={() => {
                        navigation.navigate('RegisterScreen')
                    }}
                >Register</TouchableOpacity>

            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.btnRegister} onPress={getAPIUser}>
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
        marginTop: '-70px'
    }
});
