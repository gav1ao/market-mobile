import React, { useState, useEffect } from 'react'
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { Container, Text } from 'native-base';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Header from '../../components/header/header';

import Button from '../../components/button/button';

if (Platform.OS === 'android') {
    SafeAreaView.setStatusBarHeight(0);
}

export default Home = ({navigation}) => {
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

    const header = { title: 'MERCADO HELPER' };

    if (!isReady) {
        return (
            <AppLoading />
        )
    } else {
        return (
            <SafeAreaView
                style={styles.container}
                forceInset={{top: 'always'}}
            >
                <Header header={header} />

                <Container style={styles.buttons}>
                    <Button
                        title="Cadastrar nota"
                        subtitle="(via qrcode)"
                        onPress={() => navigation.navigate('QRCodeReader')}
                    />

                    <Button
                        title="Cadastrar nota"
                        subtitle="(via código de acesso)"
                        onPress={() => navigation.navigate('AddInvoiceCode')}
                    />

                    <Button
                        title="Buscar produtos"
                        onPress={() => navigation.navigate('SearchProduct')}
                    />
                </Container>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },

    buttons: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});