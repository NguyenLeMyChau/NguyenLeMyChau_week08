import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal } from 'react-native';



export default function NoteScreen({ navigation, route }) {
    const userId = route.params;

    var [data, setData] = useState([]);

    var [dataUser, setDataUser] = useState([]);


    useEffect(() => {
        getAPINote(),
            getAPIUser()
    }, []);

    const getAPINote = async () => {
        const url = "http://localhost:3000/note?userId=" + userId.userId;
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
            });

    }

    const getAPIUser = async () => {
        const url = "http://localhost:3000/user?id=" + userId.userId;
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setDataUser(json);
            });

    }

    const deleteAPINote = async (id) => {
        const url = "http://localhost:3000/note/" + id;
        let result = await fetch(url, {
            method: "DELETE",
        });
        result = await result.json();
        if (result) {
            alert("Data delete success");
            getAPINote()
        } else {
            alert("Error");
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={{ fontSize: 25, fontWeight: 500, color: '#8353E2' }}>HELLO
                    {dataUser.map((element, index) => <View key={index}><Text> {element.fullname}</Text></View>)}
                </Text>
            </View>

            <View style={styles.mid}>
                {
                    data.map((item, index) =>
                        <View key={index} style={styles.listNote}>

                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ width: 200, fontSize: 18, fontWeight: 400 }}>{item.content}</Text>
                                <Text style={{ width: 200, fontSize: 18, color: 'red', fontWeight: 620 }}>{item.timeNote}</Text>
                            </View>

                            <TouchableOpacity style={{ ...styles.btnEdit, backgroundColor: 'green' }}><Text style={{ fontSize: 18, color: 'white' }}>Edit</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteAPINote(item.id)} style={{ ...styles.btnEdit, backgroundColor: 'red' }}><Text style={{ fontSize: 18, color: 'white' }}>Delete</Text></TouchableOpacity>

                        </View>
                    )
                }

            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.btnRegister}
                    onPress={() => {
                        navigation.navigate('AddNoteScreen', { userId: userId.userId })

                    }}
                >
                    <Text style={{ fontSize: 25, fontWeight: 500, color: '#FFFFFF' }}>ADD NOTE</Text>
                </TouchableOpacity>
            </View>

        </View>
    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    head: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        top: 10
    },

    mid: {
        width: '100%',
        height: 400,
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
        marginTop: '30px'
    },

    btnEdit: {
        width: 60,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },

    listNote: {
        width: '100%',
        height: 80,
        border: '1px solid #C4C4C4',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20

    }
});
