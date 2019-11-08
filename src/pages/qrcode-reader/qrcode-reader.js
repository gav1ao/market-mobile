import React, { useState, useEffect } from 'react';
import { StyleSheet, Vibration } from 'react-native';
import { Container, Header, Content, Body, Button, Text, Grid, Row, Spinner} from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';

import api from '../../services/api';


export default function QRCodeReader({ navigation }) {
    const [hasCameraPermission, setCameraPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [isReady, setReady] = useState(false);
    const [madeRequest, setMadeRequest] = useState(false);
    const [loading, setLoading] = useState(false);
    const [scannedUrl, setScannedUrl] = useState('');

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
    
    handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        console.log(data);
        setScannedUrl(data);
        Vibration.vibrate();

        await handleRequestAccess(data);

        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    const handleRequestAccess = async (data) => {
        if (!madeRequest) {
            setMadeRequest(true);
            setLoading(true);
            
            const response = await api.post('/invoice/qrcode', null, { headers: { url: data } });

            setLoading(false);
        }
    }

    useEffect (() => {
        getPermissionsAsync = async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            setCameraPermission({ hasCameraPermission: status === 'granted' });
        }

        getPermissionsAsync();
    });

    if (!isReady) {
        return (
            <AppLoading />
        )
    } else {
        return (
            <Container

            >
                    {
                        hasCameraPermission === null && (
                            <Text>Requesting for camera permission</Text>
                        )
                    }
                    {
                        hasCameraPermission === false && (
                            <Text>No access to camera</Text>
                        )
                    }
                    {
                        hasCameraPermission && (
                            <BarCodeScanner
                                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                                style={StyleSheet.absoluteFillObject}
                            />

                        )
                    }
                    {   
                        scanned && (
                            <Container
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >

                                {loading && (
                                    <Spinner color='blue' />
                                )}

                                {!loading && (
                                    <Text>Nota fiscal adicionada com sucesso!</Text>
                                )}

                                <Button
                                    primary
                                    onPress={() => setScanned(false)}
                                >
                                    <Text>Adicionar outra</Text>
                                </Button>

                                <Button
                                    warning
                                    onPress={() => navigation.navigate('DummyPage')}
                                >
                                    <Text>Voltar</Text>
                                </Button>

                                <Button light>
                                    <Text>Modo Texto</Text>
                                </Button>
                            </Container>
                        )
                    }
            </Container>
        );
    }
}