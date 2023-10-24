import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY= '@save_name' //key 

class App extends React.Component{
  state = {
    text: '',
    name: ''
  };


  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = async () => {
    try {
      const name = await AsyncStorage.getItem(STORAGE_KEY); //gets items from asyncstorage by key

      if (name!==null){
        this.setState({name});
      }
    } catch (e) {
      alert('Failed to load name.');
    }
  }

  save = async name => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, name);
      alert('Data successfully saved!');
      this.setState({ name });
    } catch (e) {
      alert('Failed to save name.');
    }
  };

  removeEverything = async () =>{
    try{
      await AsyncStorage.clear();
      alert('Storage successfully cleared!');
    } catch (e) {
      alert('Failed to clear the async storage.')
    }
  }

  onChangeText = text => this.setState({ text });

  onSubmitEditing = () => {
    const onSave = this.save;
    const { text } = this.state;

    if (!text) return;

    onSave(text);
    this.setState({ text: '' });
  };
  
  render() {
    const { text, name } = this.state
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={text}
                placeholder='Type your name, hit enter, and refresh'
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitEditing}
            />
            <Text style={styles.text}>Hello {name}!</Text>
            <TouchableOpacity onPress={this.removeEverything} style={styles.button}>
                <Text style={styles.buttonText}>Clear Storage</Text>
            </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    padding: 10,
    backgroundColor: 'orange'
  },
  input: {
    padding: 15,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    margin: 10
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: 'red'
  },
  buttonText: {
    fontSize: 14,
    color: 'black'
  }
})

export default App

// save = async () => {
//   const { name } = this.state;
//   try {
//     await AsyncStorage.setItem(STORAGE_KEY, name);
//     alert('Data successfully saved!');
//   } catch (e) {
//     alert('Failed to save name.');
//   }
// };

// onSubmitEditing = () => {
//   const { text } = this.state;

//   if (!text) return;

//   this.setState({ name: text }, () => {
//     this.save();
//   });
//   this.setState({ text: '' });
// };


// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
