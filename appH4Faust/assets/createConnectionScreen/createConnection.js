// this is what we import so the code works
import React, { Component }  from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Ccs from './createConnectionStyleSheet';

export default class Login extends Component {
    constructor(){ // the constructor and super is needed, in order to use this.props and this.setstate later on.
        super();
        this.state = ({ host: "", user: "", password: "" }); // This picces of code can be reached globaly in the code
    };

    static navigationOptions = {
        headerShown: false
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
         // the color of the background
            <View style={Ccs.baggrund}>

                <TextInput // inside here define we the area, where you can write your host.
                    style={Ccs.Inputfelter}
                    autoCorrect={false} // this is so the system does not change, what you type in the textarea, if it thinks it is wrong.
                    placeholder="host"
                    autoCapitalize="none" // this does so you don't have, by default, have capitalize beginning letter, when you press on the textarea.
                    onChangeText={(hostInput) => this.setState({ host: hostInput })} // hostInput positioned state is overwritten with host as soon as the user starts to write. host is text from the user
                />

                <TextInput
                    style={Ccs.Inputfelter}
                    autoCorrect={false}
                    placeholder="user"
                    autoCapitalize="none"
                    onChangeText={(userInput) => this.setState({ user: userInput })}
                />

                <TextInput // inside here define we the area, where you can write your password.
                    style={Ccs.Inputfelter1}
                    autoCorrect={false} // this is so the system does not change, what you type in the textarea, if it thinks it is wrong.
                    placeholder="password" // the name displayed inside the text area, until anything gets type inside it.
                    autoCapitalize="none" // this does so you don't have, by default, have capitalize beginning letter, when you press on the textarea.
                    autoCompleteType="password" // stops keyboard, from trying to auto correct your password
                    secureTextEntry={true} // this change the letter to dots, then you type the password
                    onChangeText={(passwordInput) => this.setState({ password: passwordInput })} // passwordInput positioned state is overwritten with password as soon as the user starts to write. password is text from the user
                />

                <TouchableOpacity style={Ccs.button} onPress={ () => // connection to the backend
                    fetch( 'http://127.0.0.1:42000/CreateConnection', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            // removes tabs, newlines, whitespace etc.
                            host: this.state.host.replace(/\s\s+/g, ''),
                            user: this.state.user.replace(/\s\s+/g, ''),
                            password: this.state.password.replace(/\s\s+/g, '')
                        })
                    }).then((response) => response.json()).then((responseJson) => {
                        console.log(responseJson);
                    })
                }>
                    <Text style={Ccs.buttonText}>Connect</Text>
                </TouchableOpacity>
            </View>
        );
    }
}