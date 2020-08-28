import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Espetinhos from './pages/Espetinhos/Espetinhos';
import Cachaças from './pages/Cachaças/Cachaças';
import Refrigerantes from './pages/Refrigerantes/Refrigerantes';
import Caldos from './pages/Caldos/Caldos';
import Petiscos from './pages/Petiscos/Petiscos';
import Outros from './pages/Outros/Outros';
import BebidasQuentes from './pages/BebidasQuentes/BebidasQuentes'

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Espetinhos" component={Espetinhos}/>
        <Drawer.Screen name="Cachaças" component={Cachaças}/>
        <Drawer.Screen name="Refrigerantes" component={Refrigerantes}/>
        <Drawer.Screen name="Bebidas Quentes" component={BebidasQuentes}/>
        <Drawer.Screen name="Caldos" component={Caldos}/>
        <Drawer.Screen name="Petiscos" component={Petiscos}/>
        <Drawer.Screen name="Outros" component={Outros}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}