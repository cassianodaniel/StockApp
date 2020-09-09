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
  TouchableOpacity,
} from 'react-native';

export default class Estoque extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
    };

    this.input = 0;

    const init = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@espetinhos');
        if (jsonValue !== null) {
          this.setState(JSON.parse(jsonValue));
        }
        console.log('Sucess!');
      } catch (e) {
        console.log(e);
      }
    };

    //Limpar o armazenamento
    //AsyncStorage.clear();

    init();
  }

  render() {
    let notes = this.state.noteArray.map((val, key) => {
      return (
        <Note
          key={key}
          keyval={key}
          val={val}
          deleteMethod={() => this.deleteNote(key)}
          addQuantityMethod={() => this.addQuantity(val.id)}
          removeQuantityMethod={() => this.removeQuantity(val.id)}
          editInput={(input) => this.modInput(input)}
          modQuantityMethod={() => this.modQuantity(val.id)}
        />
      );
    });

    return (
      <>
        <SafeAreaView>
          <View style={styles.header}>
            <Text style={styles.headerText}>Refrigerantes</Text>
          </View>

          <ScrollView>
            <View style={styles.scrollContainer}>{notes}</View>
          </ScrollView>

          <View style={styles.footer}>
            <TextInput
              onChangeText={(noteText) => this.setState({noteText})}
              value={this.state.noteText}
              style={styles.textInput}
              placeholder="Insira aqui o nome do produto"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"></TextInput>
          </View>

          <TouchableOpacity
            onPress={this.addNote.bind(this)}
            style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    );
  }

  async save() {
    try {
      const jsonValue = JSON.stringify(this.state);
      await AsyncStorage.setItem('@espetinhos', jsonValue);
      console.log('Salvo!');
    } catch (e) {
      console.log(e);
    }
  }

  gerarId() {
    if (this.state.noteArray.length == 0) {
      return 0;
    } else {
      let id = 0;
      this.state.noteArray.map((produto) => {
        id = produto.id + 1;
      });
      return id;
    }
  }

  addNote() {
    if (this.state.noteText) {
      this.state.noteArray.push({
        id: this.gerarId(),
        note: this.state.noteText,
        qtd: 0,
      });

      this.setState({noteArray: this.state.noteArray});
      this.setState({noteText: ''});

      this.save();
    }
  }

  addQuantity(id) {
    this.state.noteArray.map((produto) => {
      if (produto.id === id) {
        produto.qtd = produto.qtd + 1;
      }
    });

    this.setState({noteArray: this.state.noteArray});
    this.save();
  }

  modInput(input) {
    this.input = parseInt(input);
    console.log(this.input);
  }

  modQuantity(id) {
    this.state.noteArray.map((produto) => {
      if (produto.id === id) {
        produto.qtd = this.input;
      }
    });

    this.setState({noteArray: this.state.noteArray});
    this.save();
  }

  removeQuantity(id) {
    this.state.noteArray.map((produto) => {
      if (produto.id === id) {
        if (produto.qtd > 0) {
          produto.qtd = produto.qtd - 1;
        }
      }
    });

    this.setState({noteArray: this.state.noteArray});
    this.save();
  }

  deleteNote(key) {
    this.state.noteArray.splice(key, 1);
    this.setState({noteArray: this.state.noteArray});

    this.save();
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#ddd',
    padding: 32,
    flex: 1,
  },
  headerText: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
    padding: 26,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 140,
  },
  footer: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    zIndex: 10,
    flex: 1,
    width: '75%',
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 24,
    fontSize: 16,
    backgroundColor: '#E40000',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
    borderRadius: 14,
    marginLeft: 10,
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 10,
    top: 70,
    backgroundColor: '#F55858',
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButton2: {
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
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});
