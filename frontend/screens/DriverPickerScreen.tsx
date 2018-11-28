import React from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableHighlight,
    StyleSheet,
    ListRenderItemInfo
} from 'react-native';
import { ListRenderItem } from 'react-native';

const dummyDrivers = [
    {
        key: 'bob',
        name: "Bob",
        rating: 4.2,
        home: require('./../assets/images/h-s1.png'),
        class: require('./../assets/images/h-l1.png'),
        work: require('./../assets/images/h-w1.png'),
        homeDirs: [{ key: '1', time: '1 min', desc: 'Walk to  4689 Holladay Blvd E' }, { key: '2', time: '16 mins', desc: 'Drive to 2000 1100 E' }, { key: '3', time: '5 mins', desc: 'Walk to 2011 1100 E' }],
        workDirs: [{ key: '1', time: '5 mins', desc: 'Walk to 4501 2565 E' }, { key: '2', time: '15 mins', desc: 'Drive to 290 1500 E' }, { key: '3', time: '2 mins', desc: 'Walk to 295 1500 E' }],
        classDirs: [{ key: '1', time: '5 mins', desc: 'Walk to 4501 2565 E' }, { key: '2', time: '15 mins', desc: 'Drive to 70 Central Campus Drive' }, { key: '3', time: '2 mins', desc: 'Walk to 72 Central Campus Dr' }],
    },
    {
        key: 'fred',
        name: "Fred",
        rating: 3.4,
        home: require('./../assets/images/h-s2.png'),
        class: require('./../assets/images/h-l2.png'),
        work: require('./../assets/images/h-w2.png'),
        homeDirs: [{ key: '1', time: '6 mins', desc: 'Walk to 2301 E Sky Pines Ct' }, { key: '2', time: '16 mins', desc: 'Drive to 2000 1100 E' }, { key: '3', time: '2 mins', desc: 'Walk to 2011 1100 E' }],
        workDirs: [{ key: '1', time: '1 min', desc: 'Walk to 4689 Holladay Blvd E' }, { key: '2', time: '15 mins', desc: 'Drive to 290 1500 E' }, { key: '3', time: '2 mins', desc: 'Walk to 295 1500 E' }],
        classDirs: [{ key: '2', time: '5 mins', desc: 'Walk to 4501 2565 E' }, { key: '2', time: '15 mins', desc: 'Drive to 70 Central Campus Drive' }, { key: '3', time: '2 mins', desc: 'Walk to 72 Central Campus Dr' }],
    },
    {
        key: 'daphne',
        name: "Daphne",
        rating: 4.8,
        home: require('./../assets/images/h-s3.png'),
        class: require('./../assets/images/h-l3.png'),
        work: require('./../assets/images/h-w3.png'),
        homeDirs: [{ key: '1', time: '5 mins', desc: 'Walk to 4501 2565 E' }, { key: '2', time: '16 mins', desc: 'Drive to 2000 1100 E' }, { key: '3', time: '2 mins', desc: 'Walk to 2011 1100 E' }],
        workDirs: [{ key: '1', time: '6 mins', desc: 'Walk to 2301 E Sky Pines Ct' }, { key: '2', time: '15 mins', desc: 'Drive to 290 1500 E' }, { key: '3', time: '2 mins', desc: 'Walk to 295 1500 E' }],
        classDirs: [{ key: '1', time: '1 min', desc: 'Walk to 4689 Holladay Blvd E' }, { key: '2', time: '15 mins', desc: 'Drive to 70 Central Campus Drive' }, { key: '3', time: '2 mins', desc: 'Walk to 72 Central Campus Dr' }],
    }
];

export default class DriverPickerScreen extends React.Component {
    props: {
        navigation: any,
    };

    state = {
        address: this.props.navigation.getParam('address', {name: 'Not Found', address: '-'}),
    };

    private chooseDriver = (item: any) => {
        this.props.navigation.push('DriverDetails', {address: this.state.address, driver: item});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Here are drivers who can get you to:</Text>
                <Text>{this.state.address.name}</Text>
                <Text>{this.state.address.address}</Text>

                <FlatList
                    style={styles.searchResultsList}
                    data={dummyDrivers}
                    renderItem={({item, separators}: any) => (

                    <TouchableHighlight
                        style={styles.searchResultsItem}
                        onPress={() => this.chooseDriver(item)}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}>

                        <View>
                            <Text style={styles.searchResultsName}>{item.name}</Text>
                            <Text style={styles.searchResultsAddress}>{item.rating} stars</Text>
                        </View>
                    </TouchableHighlight>
                )}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    queryBox: {
      borderColor: '#c3c3c3',
      borderWidth: 1,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 15,
      marginRight: 15,
      fontSize: 36,
    },
    searchResultsList: {
      marginTop: 10,
      marginBottom: 10,
    },
    searchResultsItem: {
      borderColor: '#c3c3c3',
      borderBottomWidth: 1,
    },
    searchResultsName: {
      fontSize: 20,
    },
    searchResultsAddress: {
      fontSize: 20,
      color: 'grey',
    },
  });
