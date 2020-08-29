import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class Note extends React.Component{
  render(){
    return(
        <View key={this.props.keyval} style={styles.note}>
          <View style={styles.freespace}/>
          
            <Text style={styles.noteText}>{this.props.val.note}</Text>

            <TouchableOpacity onPress={this.props.deleteMethod} 
            style={styles.noteDelete}> 
                <Text style={styles.noteDeleteText}>Deletar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.noteQuantity}> 
                <Text style={styles.noteQuantityText}>Qtd: {this.props.val.qtd}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.props.addQuantityMethod}
            style={styles.plusOne}> 
                <Text style={styles.plus}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={this.props.removeQuantityMethod}
            style={styles.minusOne}> 
                <Text style={styles.minus}>-</Text>
            </TouchableOpacity>

        </View>
    );
  }
};

const styles = StyleSheet.create({
  note:{
    position: "relative",
    padding: 20,
    paddingRight: 130,
    borderBottomWidth: 20,
    borderBottomColor: 'transparent',
    marginTop: -55,
    flex: 1
  },
  noteText:{
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingTop: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#E91E63',
    backgroundColor: 'whitesmoke',
    fontSize: 14,
  },
  noteDelete:{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2980b9',
    padding: 10,
    bottom: 10,
    top: -8,
    right: 14,
    marginTop: 34,   
    width: 80,
    height: 20
  },
  noteQuantity:{
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 10,
    bottom: 0,
    top: -25,
    width: 80,
    height: 20,
    left: 297,
  },
  noteDeleteText:{
    color: 'white'
  },
  noteQuantityText:{
    color: 'white'
  },
  plusOne:{
    backgroundColor:'#E91E63',
    left: 290,
    top: 25,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 16,
    position: 'absolute'
  },
  plus:{
    color:'white'
  },
  minusOne:{
    backgroundColor:'#E91E63',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 16,
    backgroundColor:'#E91E63',
    position:'absolute',
    left: 290,
    top: 55
  },
  minus:{
    color:'white',
    fontSize: 20
  },
  freespace:{
  }
});
