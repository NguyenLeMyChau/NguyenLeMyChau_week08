import { StyleSheet} from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import AddNoteScreen from './Components/AddNoteScreen';
import NoteScreen from './Components/NoteScreen';

export default function App() {
  return (
    <StackNavigator/>
    //<AddNoteScreen/>

  );
}

const styles = StyleSheet.create({});