import React, { Component }  from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';

export default class OverView extends Component {
    constructor(){
        super();
        this.state = { overViewListData: [] }
    };

    static navigationOptions = {
        headerShown: false
    };

    componentDidMount() {
    };

    OverViewListItem = (item) => {
        return (
            <TouchableOpacity>
                <Text>{item.jobId}</Text>
            </TouchableOpacity>
        );
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>

                <SafeAreaView>
                    <FlatList
                        data={this.state.overViewListData}
                        renderItem = {({item}) => this.OverViewListItem(item)}
                        keyExtractor={(item) =>  item.jobId.toString()}
                    />
                </SafeAreaView>

            </View>
        );
    };
}