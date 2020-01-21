import React, { Component }  from 'react';
import { View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import Ov from './overViewStyleSheet';
import NavBar from '../navigationBar/navBar';

export default class OverView extends Component {
    constructor(){
        super();
        this.state = { overViewListData: [], preDatabase: "", nr: 0, hideShowChildList: [], dbLoadDone: false, modalVisible: false, chosenData: "" };
    };

    static navigationOptions = {
        headerShown: false
    };

    componentDidMount() {
        this.FetchData('GetAllOverView', 'POST', null, (resJson) => {
            if(resJson.overViewData) {
                this.setState({overViewListData: resJson.overViewData});
            } else {
                alert("Sorry an error occurred");
            }
        }).done();
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
            <View style={Ov.background}>

                {this.state.overViewListData.map((item, index) => {

                    if(item["TABLE_SCHEMA"] !== this.state.preDatabase) {
                        let nr = this.state.nr;

                        this.state.preDatabase = item["TABLE_SCHEMA"];

                        if(!this.state.dbLoadDone) {
                            this.state.hideShowChildList.push(false);
                        }

                        return (
                            <View>
                                <TouchableOpacity onPress={() => { 
                                    let newArr = this.state.hideShowChildList;
                                    newArr[nr] = !newArr[nr];
                                    this.setState({hideShowChildList: newArr, nr: 0});
                                }}>

                                    <Text>{item["TABLE_SCHEMA"]}</Text>
                                </TouchableOpacity>

                                {this.state.hideShowChildList[nr] && this.state.overViewListData.map((element) => {
                                    if(this.state.preDatabase == element["TABLE_SCHEMA"]) {
                                        return(                                      
                                            <TouchableOpacity onPress={() => {
                                                this.FetchData('GetData', 'POST', JSON.stringify({
                                                    db: element["TABLE_SCHEMA"],
                                                    table: element["TABLE_NAME"],
                                                    type: element["TABLE_TYPE"]
                                                }), (resJson) => {
                                                    this.setState({modalVisible: true, chosenData: JSON.stringify(resJson)});
                                                }).done();
                                                }}>
                                                <Text>{element["TABLE_NAME"]}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                })}

                            </View>
                        );
                    }
                    this.state.nr+=1;

                    if(index+1 == this.state.overViewListData.length) {
                        this.state.dbLoadDone = true
                    }
                })}

                <Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.setState({modalVisible: false})}
                >

                    <View style={Ov.modalContainer}>
                        <View style={Ov.innerContainer}>
                            <Text>{this.state.chosenData}</Text>
                            <Button
                            onPress={() => this.setState({modalVisible: false})}
                            title="Close modal"
                            >
                            </Button>
                        </View>
                    </View>
                </Modal>

                <NavBar nav={this.props.navigation}/>

            </View>
        );
    };
}