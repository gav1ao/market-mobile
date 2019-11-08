import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Content, Body, Button, Text } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default DummyPage = ({ navigation }) => {

    const [isReady, setReady] = useState(false);

    useEffect(() => {
        componentDidMount = async () => {
            await Font.loadAsync({
                Roboto: require('../../../assets/fonts/Roboto-Regular.ttf'),
                Roboto_medium: require('../../../assets/fonts/Roboto-Medium.ttf'),
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
            <Container>    
                
                <Header>
                    <Text>Mercado Helper</Text>
                </Header>
                <Body padder style={styles.content}>
                    <Button onPress={() => navigation.navigate('QRCodeReader')}>
                        <Text>QRCode</Text>
                    </Button>

                    <Button onPress={() => navigation.navigate('AddInvoiceCode')}>
                        <Text>Inserir código de acesso</Text>
                    </Button>

                    <Button onPress={() => navigation.navigate('SearchProduct')}>
                        <Text>Buscar produtos</Text>
                    </Button>
                </Body>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent:  'center',
        alignItems: 'center',
    }
});