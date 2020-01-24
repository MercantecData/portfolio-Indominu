import React, { Component }  from 'react';
import { View, Picker, TextInput, Text, TouchableOpacity } from 'react-native';
import NavBar from '../navigationBar/navBar';
import Cnc from './createNewContentStyleSheet';

export default class createNewContent extends Component {
    constructor(){
        super();
        this.state = ({ dbList: [], tbList: [], dbChoice: "", dbTitle: "", tbName: "", colName: "", col: "" });
    };

    static navigationOptions = {
        headerShown: false
    };

    componentDidMount() {
        this.FetchData('GetAllDb', 'POST', null, (resJson) => {
            if(resJson.allDb) {
                this.setState({dbList: resJson.allDb});
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

    GetTabels(itemValue) {
        this.FetchData('GetAllTabels', 'POST', JSON.stringify({ choosenDb: itemValue }), (resJson) => {
            if(resJson.allTb) {
                this.setState({tbList: resJson.allTb});        
            } else {
                alert("Sorry an error occurred");
            }
        });
    };

    AddTabels() {
        this.state.tbList.push({TABLE_NAME: ""})
        this.setState({tbList: this.state.tbList})
    };

    SaveNewTabel() {
        let newTb = { colName: this.state.colName, col: this.state.col };
        this.FetchData('TbStuff', 'POST', JSON.stringify({ action: 'Create', choosenDb: this.state.dbTitle, choosenTb: this.state.tbName, newTb: newTb }), (resJson) => {
            if(resJson.tbStuff) {
                alert("worls");
                this.GetTabels(this.state.dbTitle);
        
            } else {
                alert("Sorry an error occurred");
            }
        });
    };

    DeleteTabels(tabel) {
        this.FetchData('TbStuff', 'POST', JSON.stringify({ action: 'Delete', choosenDb: this.state.dbTitle, choosenTb: tabel }), (resJson) => {
            if(resJson.tbStuff) {
                this.GetTabels(this.state.dbTitle);
                alert("worls");
 
            } else {
                alert("Sorry an error occurred");
            }
        });
    };

    DBstuff(action) {
        let noDbMatch = true;

        if(action == 'Create') {
            this.state.dbList.forEach((item) => {
                if(item.SCHEMA_NAME == this.state.dbTitle) {
                    noDbMatch = false;
                }
            });
        }


        if(noDbMatch) {
            this.FetchData('DbStuff', 'POST', JSON.stringify({ dbStuff: action, choosenDb: this.state.dbTitle }), (resJson) => {
                if(resJson.dbStuff) {
                    alert("Suceess");
                    this.FetchData('GetAllDb', 'POST', null, (resJson) => {
                        if(resJson.allDb) {
                            this.setState({dbList: resJson.allDb});
                        } else {
                            alert("Sorry an error occurred");
                        }
                    });
                } else {
                    alert("Sorry an error occurred");
                }
            });
        } else {
            alert("db name is already in use");
        }
    };    

    render() {
        return (
            <View style={Cnc.background}>

                <Picker
                    selectedValue={this.state.dbChoice}
                    style={{height: 50, width: '50%'}}
                    onValueChange={(itemValue, itemIndex) => {this.GetTabels(itemValue); this.setState({dbChoice: itemValue, dbTitle: itemValue});}
                }>
                    <Picker.Item label="Create New db" value=""/>

                    {this.state.dbList.map((item) => {
                        return(
                            <Picker.Item label={item.SCHEMA_NAME} value={item.SCHEMA_NAME}/>
                        );
                    })}

                </Picker>

                <TextInput
                    autoCorrect={false}
                    placeholder="Database title"
                    autoCapitalize="none"
                    value={this.state.dbTitle}
                    onChangeText={(dbTitleInput) => this.setState({ dbTitle: dbTitleInput })}
                />

                {this.state.dbChoice ? 
                <View>
                    <TouchableOpacity onPress={() => this.DBstuff('Delete')} activeOpacity={0.7}  >
                        <Text>delete db</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={() => this.AddTabels()}>
                        <Text>new tabel</Text>
                    </TouchableOpacity>
                </View>
                : 
                <TouchableOpacity onPress={() => this.DBstuff('Create')} activeOpacity={0.7}  >
                    <Text> create db</Text>
                </TouchableOpacity>}

                {/* {this.state.dbChoice ? this.GetTabels() : this.state.tbList = []} */}

                {this.state.tbList.map((element) => {
                    if(element.TABLE_NAME) {
                        return(

                            <View>

                                <TextInput
                                autoCorrect={false}
                                placeholder="Tabel name"
                                autoCapitalize="none"
                                value={element.TABLE_NAME}
                                />

                                <TouchableOpacity onPress={() => this.DeleteTabels(element.TABLE_NAME)}>
                                    <Text>delete</Text>
                                </TouchableOpacity>
                            </View>

                        );
                    } else {
                        return(

                            <View>

                                <TextInput
                                autoCorrect={false}
                                placeholder="Tabel name"
                                autoCapitalize="none"
                                onChangeText={(tbNameInput) => this.setState({ tbName: tbNameInput })}
                                />

                                <TextInput
                                autoCorrect={false}
                                placeholder="col name"
                                autoCapitalize="none"
                                onChangeText={(colNameInput) => this.setState({ colName: colNameInput })}
                                />

                                <Picker
                                selectedValue={this.state.col}
                                style={{height: 50, width: '50%'}}
                                onValueChange={(itemValue, itemIndex) => this.setState({col: itemValue})}>
                                    <Picker.Item label="INT" value="INT"/>
                                    <Picker.Item label="TEXT" value="TEXT"/>
                                    
                                </Picker>

                                <TouchableOpacity onPress={() => this.SaveNewTabel()}>
                                    <Text>save</Text>
                                </TouchableOpacity>
                            </View>

                        );
                    }
                })}

                <NavBar nav={this.props.navigation}/>
            </View>
        );
    }
}