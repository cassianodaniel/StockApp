import React from 'react';
import Note from '../../components/NewNote';
import AsyncStorage from '@react-native-community/async-storage';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class Estoque extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
    }

    const init = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@estoque')
        if(jsonValue !== null){
          this.setState(JSON.parse(jsonValue));
        }
        console.log("Sucess!")
      } catch(e) {
        console.log(e)
      }
    }

    init();
  }

  render(){

    let notes = this.state.noteArray.map((val,key) => {
      return <Note 
        key={key} 
        keyval={key} 
        val={val}
        deleteMethod={() => this.deleteNote(key)}
        addQuantityMethod={() => this.addQuantity(val.id)}
        removeQuantityMethod={() => this.removeQuantity(val.id)}/>
    });

    return (
      <>
        <SafeAreaView>
            <View style={styles.header}>
                  <Text style={styles.headerText}>Espetinhos</Text>
            </View>

            <ScrollView>
                <View style={styles.scrollContainer}>
                  {notes}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TextInput
                  onChangeText={(noteText) => this.setState({noteText})}
                  value={this.state.noteText}
                  style={styles.textInput}
                  placeholder='Insira aqui o nome do produto a ser cadastrado'
                  placeholderTextColor='white'
                  underlineColorAndroid='transparent'>
                </TextInput>
            </View>

            <TouchableOpacity onPress = { this.addNote.bind(this) } style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

        </SafeAreaView>
      </>
    );
  }

  async addNote(){
    if(this.state.noteText){
      const count = this.state.noteArray.length;
      this.state.noteArray.push({
        id: count,
        note: this.state.noteText,
        qtd: 0
      });

      try {
        const jsonValue = JSON.stringify(this.state)
        await AsyncStorage.setItem('@estoque', jsonValue)
        console.log("Note created!");
      } catch (e) {
        console.log(e);
      }

      this.setState({ noteArray: this.state.noteArray });
      this.setState({ noteText: ''});
    }
  }

  async addQuantity(id){
    const arrays = this.state.noteArray;
    arrays.map((item) => {
      if (item.id == id) {
        const newProduct = {
          id: id,
          note: item.note,
          qtd: item.qtd+1
        }
        arrays.pop(item);
        arrays.push(newProduct);
        console.log(newProduct);
        this.setState({ noteArray: arrays});
      }
    })
    try {
      const jsonValue = JSON.stringify(this.state)
      await AsyncStorage.setItem('@estoque', jsonValue)
      console.log("+1!");
    } catch (e) {
      console.log(e);
    }
  }

  async removeQuantity(id){
    const arrays = this.state.noteArray;
    arrays.map((item) => {
      if (item.id == id) {
        const newProduct = {
          id: id,
          note: item.note,
          qtd: item.qtd-1
        }
        arrays.pop(item);
        arrays.push(newProduct);
        console.log(newProduct);
        this.setState({ noteArray: arrays});
      }
    })
    
    try {
      const jsonValue = JSON.stringify(this.state)
      await AsyncStorage.setItem('@estoque', jsonValue)
      console.log("-1!");
    } catch (e) {
      console.log(e);
    }
  }

  async deleteNote(key){
    this.state.noteArray.splice(key, 1);
    this.setState({ noteArray: this.state.noteArray });

    try {
      const jsonValue = JSON.stringify(this.state)
      await AsyncStorage.setItem('@estoque', jsonValue)
      console.log("Note deleted!");
    } catch (e) {
      console.log(e);
    }
  }
};

const styles = StyleSheet.create({
  header:{
      backgroundColor: '#E91E63',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 3,
      borderBottomColor: '#ddd',
      padding: 32,
      flex:1,
  },
  headerText:{
      color: 'white',
      marginTop: 10,
      fontSize: 22,
      padding: 26,    
  },
  scrollContainer: {
      flex: 1,
      marginTop: 48,
  },
  footer: {
      position: 'absolute',
      top: 750,
      left: 0,
      right: 0,
      zIndex: 10,
      flex: 1
  },
  textInput: {
      alignSelf: 'stretch',
      color: '#fff',
      padding: 24,
      fontSize: 16,
      backgroundColor: '#E40000',
      borderTopWidth: 2,
      borderTopColor: '#ededed',
  },
  addButton:{
    position: 'absolute',
    zIndex: 11,
    right: 20,
    top: 628,
    backgroundColor: '#F55858',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButton2:{
    position: 'absolute',
    zIndex: 11,
    right: 20,
    top: 200,
    backgroundColor: '#F55858',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText:{
    color: '#fff',
    fontSize: 24
  }
});