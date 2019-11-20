import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Vibration} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { Container, Content, Body, Button, Text, Grid, Row, Spinner, Icon} from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';

import api from '../../services/api';

import Header from '../../components/header/header';

import success from '../../assets/images/circle-checked.png';
import error from '../../assets/images/circle-x.png';
import notFound from '../../assets/images/error_24px.png';
import warning from '../../assets/images/warning_24px.png';

const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const ALREADY_REGISTERED = 'ALREADY_REGISTERED';
const NOT_FOUND = 'NOT_FOUND';

export default function QRCodeReader({ navigation }) {
    const [hasCameraPermission, setCameraPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [isReady, setReady] = useState(false);
    const [madeRequest, setMadeRequest] = useState(false);
    const [loading, setLoading] = useState(false);
    const [scannedUrl, setScannedUrl] = useState('');

    const [status, setStatus] = useState('');

    useEffect(() => {
        componentDidMount = async () => {
            await Font.loadAsync({
                Roboto: require('../../assets/fonts/Roboto-Regular.ttf'),
                Roboto_medium: require('../../assets/fonts/Roboto-Medium.ttf'),
                Red_Hat_Display: require('../../assets/fonts/RedHatDisplay-Regular.ttf'),
                Red_Hat_Display_Bold: require('../../assets/fonts/RedHatDisplay-Bold.ttf'),
                Red_Hat_Display_medium: require('../../assets/fonts/RedHatDisplay-Medium.ttf'),
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
            
            try {
                const response = await api.post('/invoice/qrcode', null, { headers: { url: data } });

                const { status } = response;

                if (status == 200) {
                    setStatus(SUCCESS);

                } else {
                    setStatus(ERROR);
                }
            } catch (e) {
                const { status } = e.response;
                
                if (status == 404) {
                    setStatus(NOT_FOUND);

                } else if (status == 409) {
                    setStatus(ALREADY_REGISTERED);

                } else if (status == 500) {
                    setStatus(ERROR);

                } else {
                    setStatus(ERROR);
                }
            }

            setLoading(false);
        }
    }

    const resetToAddAnother = () => {
        setMadeRequest(false);
        setScannedUrl('');
        setStatus('');
        setScanned(false);
        setLoading(false);
    }

    useEffect (() => {
        getPermissionsAsync = async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            setCameraPermission({ hasCameraPermission: status === 'granted' });
        }

        getPermissionsAsync();
    });

    const header = {
        title: 'CADASTRAR NOTA FISCAL',
        subtitle: 'Via QRCode',
        backFunction: () => navigation.navigate('Home')
    }

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
                <Container
                    style={styles.body}
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

                                <Container style={styles.body}>

                                    <Container style={styles.body}>
                                        {loading && (
                                            <Container style={styles.progressBar}>
                                                <ProgressBar indeterminate={true} color={'#003B94'} />
                                            </Container>
                                        )}

                                        {!loading && status === SUCCESS && (
                                            <Container style={styles.body}>
                                                <Image source={success} style={styles.image} />
                                                <Text styles={styles.textInfo}>
                                                    Nota fiscal adicionada com sucesso!
                                                </Text>
                                            </Container>
                                        )}

                                        {!loading && status === ERROR && (
                                            <Container style={styles.body}>
                                                <Image source={error} style={styles.image} />
                                                <Text styles={styles.textInfo}>
                                                    Ocorreu um erro ao salvar a nota
                                                </Text>
                                            </Container>
                                        )}


                                        {!loading && status === ALREADY_REGISTERED && (
                                            <Container style={styles.body}>
                                                <Image source={warning} style={styles.image} />
                                                <Text styles={styles.textInfo}>
                                                    Nota fiscal já cadastrada
                                                </Text>
                                            </Container>
                                        )}

                                        {!loading && status === NOT_FOUND && (
                                            <Container style={styles.body}>
                                                <Image source={notFound} style={styles.image} />
                                                <Text styles={styles.textInfo}>
                                                    Nota fiscal não disponível
                                                </Text>
                                            </Container>
                                        )}

                                    </Container>
                                    
                                    <Container style={styles.buttons}>
                                        
                                        <Button
                                            style={styles.button}
                                            primary
                                            onPress={() => resetToAddAnother()}
                                            disabled={loading}
                                        >
                                            <Text
                                                style={styles.textButton}
                                            >
                                                Adicionar outra
                                            </Text>
                                        </Button>

                                        <Button
                                            style={styles.button}
                                            warning
                                            onPress={() => navigation.navigate('Home')}
                                        >
                                            <Text
                                                style={styles.textButton}
                                            >
                                                Voltar
                                            </Text>
                                        </Button>

                                        <Button
                                            style={styles.button}
                                            light
                                            onPress={() => navigation.navigate('AddInvoiceCode')}
                                        >
                                            <Text
                                                style={styles.textButton}
                                            >
                                                Por Código
                                            </Text>
                                        </Button>
                                        
                                    </Container>
                                </Container>
                            )
                        }
                </Container>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF9FF',
    },

    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },

    buttons: {
        flex: 1,
        flexDirection: 'row',
        width: '97%',
    },

    button: {
        flex: 1,
        margin: 5,
        alignItems:'center',
        justifyContent: 'center',
    },

    textButton: {
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    progressBar: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        width: '80%',
    },

    image: {
        marginVertical: 25,
    },

    textInfo: {
        fontFamily: 'Red_Hat_Display_Bold',
        fontSize: 20,
        fontWeight: 'bold'
    }
});