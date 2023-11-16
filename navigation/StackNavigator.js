import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../Components/LoginScreen';
import RegisterScreen from '../Components/RegisterScreen';
import NoteScreen from '../Components/NoteScreen';
import AddNoteScreen from '../Components/AddNoteScreen';


export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="NoteScreen" component={NoteScreen} />
        <Stack.Screen name="AddNoteScreen" component={AddNoteScreen} />

      </Stack.Navigator>
    </NavigationContainer>

  );

};
