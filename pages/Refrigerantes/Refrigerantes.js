import React from 'react';
import Note from '../../components/NewNote'

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
      quantity: 0,
    }
  }

  render(){

    let notes = this.state.noteArray.map((val,key) => {
      return <Note 
        key={key} 
        keyval={key} 
        val={val}
        deleteMethod={() => this.deleteNote(key)}
        quantityMethod={() => this.addQuantity(key)}/>
    });

    return (
      <>
        <SafeAreaView>
            <View style={styles.header}>
                  <Text style={styles.headerText}>Refrigerantes</Text>
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

  addNote(){
    if(this.state.noteText){
      this.state.noteArray.push({
        'note': this.state.noteText
      });

      this.setState({ noteArray: this.state.noteArray });
      this.setState({ noteText: ''});
    }
  }

  addQuantity(key){
    this.setState({ quantity: this.state.quantity + 1});
  }

  deleteNote(key){
    this.state.noteArray.splice(key, 1);
    this.setState({ noteArray: this.state.noteArray });
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
  addButtonText:{
    color: '#fff',
    fontSize: 24
  }
});