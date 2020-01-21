import React, { Component }  from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Nbs from './navBarStyleSheet';

export default class NavBar extends Component {
    constructor(){
        super();
    };

    render() {
        const {navigate} = this.props.nav;
        return (
            <View style={Nbs.navContainer}>
                <TouchableOpacity
                    onPress={ () => navigate('OverViewScreen')}
                    style={[Nbs.navBtns]}>
                    <Text style={[Nbs.navBtnsText]}>Overview</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={ () => navigate('CreateNewContentScreen')}
                    style={[Nbs.navBtns]}>
                    <Text style={[Nbs.navBtnsText]}>New db</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    // onPress={ () => navigate('')}
                    style={[Nbs.navBtns]}>
                    <Text style={[Nbs.navBtnsText]}>Users</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={ () => { navigate('CreateConnectionScreen'); fetch('http://172.16.116.40:42000/Disconnect'); }}
                    style={[Nbs.navBtns]}>
                    <Text style={[Nbs.navBtnsText]}>Disconnect</Text>
                </TouchableOpacity>
            </View>
        );
    }
}