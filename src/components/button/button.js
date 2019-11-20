import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from 'native-base';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default ButtonMarket = (props) => {

    const [isReady, setReady] = useState(false);

    useEffect(() => {
        componentDidMount = async () => {
            await Font.loadAsync({
                Roboto: require('../../assets/fonts/Roboto-Regular.ttf'),
                Roboto_medium: require('../../assets/fonts/Roboto-Medium.ttf'),
                Red_Hat_Text: require('../../assets/fonts/RedHatText-Regular.ttf'),
            ...Ionicons.font,
            });

            setReady(true);
        }

        componentDidMount();
    });

    if (!isReady) {
        return (
            <AppLoading />
        )
    } else {
        return (
            <TouchableOpacity
                onPress={props.onPress}
            >
                <View style={styles.button}>
                    <Text style={styles.title}>{props.title}</Text>

                    {props.subtitle && (
                        <Text style={styles.subtitle}>{props.subtitle}</Text>
                    )}
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#003B94',
        minHeight: 90,
        minWidth: '85%',
        borderRadius: 15,
    },

    title: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 28,
        lineHeight: 35,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#FFF',
    },

    subtitle: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFF',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
});