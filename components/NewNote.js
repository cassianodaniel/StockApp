import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class Note extends React.Component {
  render() {
    return (
      <View key={this.props.keyval} style={styles.note}>
        <View style={styles.freespace} />

        <Text style={styles.noteText}>{this.props.val.note}</Text>

        <TouchableOpacity
          onPress={this.props.deleteMethod}
          style={styles.noteDelete}>
          <Text style={styles.noteDeleteText}>Deletar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.noteQuantity}>
          <Text style={styles.noteQuantityText}>Qtd: {this.props.val.qtd}</Text>
        </TouchableOpacity>

        <TextInput
          onChangeText={(text) => {
            this.props.editInput(text);
          }}
          placeholder="_____"
          placeholderTextColor="gray"
          underlineColorAndroid="transparent"
          style={styles.qtd}></TextInput>

        <TouchableOpacity
          onPress={this.props.modQuantityMethod}
          style={styles.mudar}>
          <Text style={styles.plus}>Mudar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.props.addQuantityMethod}
          style={styles.plusOne}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.props.removeQuantityMethod}
          style={styles.minusOne}>
          <Text style={styles.minus}>-</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 130,
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 60,
    height: 110,
    marginTop: -45,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  noteText: {
    paddingLeft: 20,
    paddingBottom: 25,
    paddingRight: 20,
    paddingTop: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#E91E63',
    backgroundColor: 'whitesmoke',
    fontSize: 14,
  },
  noteDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2980b9',
    padding: 10,
    bottom: 10,
    top: -8,
    right: 14,
    marginTop: 34,
    width: 95,
    height: 20,
  },
  noteQuantity: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 10,
    bottom: 10,
    top: 18,
    right: 14,
    marginTop: 34,
    width: 95,
    height: 20,
  },
  noteDeleteText: {
    color: 'white',
  },
  noteQuantityText: {
    color: 'white',
  },
  plusOne: {
    backgroundColor: '#E91E63',
    right: 135,
    top: 25,
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    position: 'absolute',
  },
  qtd: {
    position: 'absolute',
    left: 280,
    top: 72,
  },
  mudar: {
    backgroundColor: 'red',
    right: 14,
    top: 78,
    width: 60,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  plus: {
    color: 'white',
  },
  minusOne: {
    backgroundColor: '#E91E63',
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#E91E63',
    position: 'absolute',
    right: 135,
    top: 55,
  },
  minus: {
    color: 'white',
    fontSize: 20,
  },
  freespace: {},
});
