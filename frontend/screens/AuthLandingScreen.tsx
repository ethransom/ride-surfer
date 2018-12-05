import React from 'react';
import { StyleSheet, View, Button, Text, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Styles from '../constants/Styles';
import Colors from '../constants/Colors';

export default class AuthLandingScreen extends React.Component<{ navigation: any }> {
    constructor(props) {
        super(props);
        console.log('in constructor')
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        var userDetails = await AsyncStorage.getItem('userDetails');
        if (userDetails != null) {
            this.props.navigation.navigate('Main')
        }
    }

    render() {
        return (
            <View style={[Styles.wrapper, Styles.container]}>
                <View style={styles.title}>
                    <Text style={[Styles.titleText]}>Ride Surfer</Text>
                </View>

                <View style={styles.buttonsView}>
                    <View style={styles.item}>
                        <Button color={Colors.primary} title="Log in" onPress={() => this.props.navigation.navigate('Login')}/>
                    </View>
                    <View style={styles.item}>
                        <Button color={Colors.primary} title="Sign Up" onPress={() => this.props.navigation.navigate('Signup')}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        flex: 2,
        justifyContent: 'center',
    },
    item: {
        paddingBottom: 10,
    },
    buttonsView: {
        // flex: 1,
    },
});
