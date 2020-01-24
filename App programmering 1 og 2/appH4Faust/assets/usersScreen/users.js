import React, { Component }  from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Us from './usersStyleSheet';
import NavBar from '../navigationBar/navBar';

export default class Users extends Component {
    constructor(){
        super();
        this.state = { usersListData: [], preUser: "", nr: 0, hideShowChildList: [], usersLoadDone: false, chosenData: "" };
    };

    static navigationOptions = {
        headerShown: false
    };

    componentDidMount() {
        this.FetchData('GetAllUsers', 'POST', null, (resJson) => {
            if(resJson.usersData) {
                this.setState({usersListData: resJson.usersData});
            } else {
                alert("Sorry an error occurred");
            }
        });
    };

    async FetchData(url, method, data, callback) {
        let result = await fetch(`http://172.16.116.40:42000/${url}`, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        }).then((res) => { return res.json(); });
        callback(result);
    };

    render() {
        return (
            <View style={Us.background}>

                {this.state.usersListData.map((item, index) => {

                    if(item["GRANTEE"] !== this.state.preUser) {
                        let nr = this.state.nr;
                        this.state.nr+=1;

                        this.state.preUser = item["GRANTEE"];

                        if(!this.state.usersLoadDone) {
                            this.state.hideShowChildList.push(false);
                        }

                        return (
                            <View>
                                <TouchableOpacity onPress={() => { 
                                    let newArr = this.state.hideShowChildList;
                                    newArr[nr] = !newArr[nr];
                                    this.setState({hideShowChildList: newArr, nr: 0});
                                }}>

                                    <Text>{item["GRANTEE"]}</Text>
                                </TouchableOpacity>

                                {this.state.hideShowChildList[nr] && this.state.usersListData.map((element) => {
                                    if(this.state.preUser == element["GRANTEE"]) {
                                        return(                                      
                                            <TouchableOpacity>
                                                <Text>{element["PRIVILEGE_TYPE"]}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                })}

                            </View>
                        );
                    }

                    if(index+1 == this.state.usersListData.length) {
                        this.state.usersLoadDone = true
                    }
                })}

                <NavBar nav={this.props.navigation}/>

            </View>
        );
    };
}