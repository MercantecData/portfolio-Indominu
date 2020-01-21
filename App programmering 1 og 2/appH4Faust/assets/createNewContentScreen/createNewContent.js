import React, { Component }  from 'react';
import { View, Text } from 'react-native';
import NavBar from '../navigationBar/navBar';
import Cnc from './createNewContentStyleSheet';

export default class Profile extends Component {
    constructor(){
        super();
        this.state = ({ });
    };

    static navigationOptions = {
        headerShown: false
    };

    render() {
        return (
            <View style={Cnc.background}>
                <Text>ksjadfnkjndf</Text>
               
                <NavBar nav={this.props.navigation}/>
            </View>
        );
    }
}