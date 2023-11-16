import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal } from 'react-native';
import moment from 'moment';



export default function NoteScreen({ navigation, route }) {
    const userId = route.params;

    var [data, setData] = useState([]);

    var [dataUser, setDataUser] = useState([]);

    var [show, setShow] = useState(false);

    var [content, setContent] = useState('');
    var timeNote = moment(Date(new Date())).format('DD-MM-YYYY');

    useEffect(() => {
        getAPINote(),
            getAPIUser()
    }, []);




    const saveAPINote = async () => {

        const url = "http://localhost:3000/note";
        let result = await fetch(url, {
            method: "POST",
            headers: { 'Accept': 'application/json, text/plain, */*', "Content-Type": "application/json" },
            body: JSON.stringify({ userId: userId.userId, content, timeNote })
        });
        result = await result.json();
        if (result) {
            getAPINote()
            alert("Data is added");
        } else {
            alert("Error");
        }
    }


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
                <TouchableOpacity style={styles.btnAddNote}
                    onPress={() => {
                        // navigation.navigate('AddNoteScreen', { userId: userId.userId })
                        setShow(true);

                    }}
                >
                    <Text style={{ fontSize: 25, fontWeight: 500, color: '#FFFFFF' }}>ADD NOTE</Text>
                </TouchableOpacity>
            </View>


            <Modal visible={show} transparent={true}>
                <View style={{ width: '80%', height: 220, justifyContent: 'center', alignItems: 'center', marginTop: 200, marginLeft: 40, border: '1px solid #C4C4C4', backgroundColor: 'white' }}>
                    <View style={{ width: '100%', height: 30, marginTop: '-20px' }}>
                        <Text style={{ fontSize: 25, fontWeight: 500, color: '#8353E2', left: 30 }}>Add Note</Text>
                    </View>

                    <View style={{ width: '100%', height: 50, marginTop: 15 }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Content"
                            value={content}
                            onChangeText={(text) => setContent(text)}
                        />

                    </View>

                    <View style={{ width: '100%', height: 50, marginTop: 15, flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.btnRegister} onPress={saveAPINote}>
                            <Text style={{ fontSize: 25, fontWeight: 500, color: '#FFFFFF' }}>Send</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnRegister} onPress={() => {
                            setShow(false);
                        }}>
                            <Text style={{ fontSize: 25, fontWeight: 500, color: '#FFFFFF' }}>Close</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>

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
        width: '90%',
        height: 50,
        paddingLeft: 20,
        fontSize: 20,
        borderRadius: 10,
        border: '1px #9095A0 solid',
        marginLeft: 20,

    },

    btnRegister: {
        width: '40%',
        height: 50,
        backgroundColor: '#8353E2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        left: 20,
        marginLeft: 10
    },

    btnAddNote: {
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
