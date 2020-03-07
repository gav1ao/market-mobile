import React, { useState, useEffect } from 'react'
import { StyleSheet, Image } from 'react-native'
import { HelperText, ProgressBar, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';

import {   
    Container,
    Button,
    Text,
} from 'native-base';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import api from '../../services/api';

import Header from '../../components/header/header';
import InvoiceResult from '../../components/invoiceResult/invoiceResult';

const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const ALREADY_REGISTERED = 'ALREADY_REGISTERED';
const NOT_FOUND = 'NOT_FOUND';
const WRONG_CAPTCHA = 'WRONG_CAPTCHA';

export default AddInvoiceCode = ({ navigation }) => {

    const [isReady, setReady] = useState(false);

    useEffect(() => {
        componentDidMount = async () => {
            await Font.loadAsync({
                Roboto: require('../../assets/fonts/Roboto-Regular.ttf'),
                Roboto_medium: require('../../assets/fonts/Roboto-Medium.ttf'),
            ...Ionicons.font,
            });

            setReady(true);
        }

        componentDidMount();
    });

    const [loading, setLoading] = useState(false);
    const [accessCode, setAccessCode] = useState('');
    const [captchaCode, setCaptchaCode] = useState('');
    const [accessCodeMessageError, setAccessCodeMessageError] = useState(false);
    const [captchaCodeMessageError, setCaptchaCodeMessageError] = useState(false);
    const [madeRequest, setMadeRequest] = useState(false);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaImage, setCaptchaImage] = useState('');
    const [invoiceRequested, setInvoiceRequested] = useState(false);


    const [loadingRequest, setLoadingRequest] = useState(false);

    const [status, setStatus] = useState('');

    // const [accessCode, setAccessCode] = useState('33191207473160000105650060002557599005115180');
    // const [showCaptcha, setShowCaptcha] = useState(true);
    // const [status, setStatus] = useState(SUCCESS);
    // const [captchaImage, setCaptchaImage] = useState('data:image/png;base64,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');

    const handleAccessCodeLength = () => {
        if (accessCode.length < 44 || accessCode.length > 44) {
            setAccessCodeMessageError(true);
            return;
        }
    };

    const handleAccessCodeChange = (text) => {
        if (text.length > 44) {
            setAccessCodeMessageError(true);
        } else {
            setAccessCodeMessageError(false);
        }

        setAccessCode(text);
    };

    const handleCaptchaCodeLength = () => {
        if (accessCode.length < 7 || accessCode.length > 7) {
            setCaptchaCodeMessageError(true);
            return;
        }
    };

    const handleCaptchaCodeChange = (text) => {
        if (captchaCode.length > 7) {
            setCaptchaCodeMessageError(true);
        } else {
            setCaptchaCodeMessageError(false);
        }

        setCaptchaCode(text);
    };

    const handleCleanAccessCode = () => {
        setAccessCode('');
        setAccessCodeMessageError(false);
    };

    const handleCleanCaptchaCode = () => {
        setCaptchaCode('');
        setCaptchaCodeMessageError(false);
    }
    
    const handleRequestAccess = async () => {
        handleAccessCodeLength();

        if (!madeRequest && accessCode.length == 44) {
            setMadeRequest(true);
            setLoading(true);

            const response = await api.get('/invoice/code', { accessCode: accessCode });

            const { accessCodeRes, captchaImage } = response.data;
            // console.log(accessCodeRes);
            // console.log(captchaImage);
            
            // if (accessCode === accessCodeRes) {
                setCaptchaImage(captchaImage);
                setLoading(false);
                setShowCaptcha(true);
            // }
        }
    };

    const handleGetResult = async () => {
        handleCaptchaCodeLength();

        if (captchaCode.length == 7) {
            
            setLoadingRequest(true);
            setInvoiceRequested(true);

            try {
                const response = await api.post('/invoice/code', {
                    accessCode,
                    captchaCode
                });

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

                } else if (status == 400) {
                    // TODO: Alterar para HelperText do Captcha e atualizar imagem
                    setStatus(WRONG_CAPTCHA);

                } else {
                    setStatus(ERROR);
                }
            }

            setLoadingRequest(false);
        }
    };

    const handleResetButton = () => {
        setAccessCode('');
        setCaptchaCode('');
        setStatus('');
        setShowCaptcha(false);
        setMadeRequest(false);
        
        setInvoiceRequested(false);
    }

    const handleOnClickAddButton = () => {
        if (invoiceRequested && !loadingRequest) {
            handleResetButton();
        } else if (showCaptcha) {
            handleGetResult();
        } else {
            handleRequestAccess();
        }
    };

    const handleOnClickCleanButton = () => {
        if (showCaptcha) {
            handleCleanCaptchaCode();
        } else {
            handleCleanAccessCode();
        }
    };

    const header = {
        title: 'CADASTRAR NOTA FISCAL',
        subtitle: 'Via Código de Acesso',
        backFunction: () => navigation.navigate('Home')
    };

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
                    {!invoiceRequested && (
                        <Container
                            style={styles.accessCodeInputWrapper}
                        >
                            <TextInput
                                mode='outlined'
                                underlineColor='#003B94'
                                label='Código de Acesso'
                                keyboardType='numeric'
                                autoCompleteType='off'
                                error={accessCodeMessageError}
                                value={accessCode}
                                disabled={showCaptcha}
                                onChangeText={text => handleAccessCodeChange(text)}
                                onSubmitEditing={() => handleRequestAccess()}
                            />

                            <HelperText
                                type='error'
                                visible={accessCodeMessageError}
                            >
                                Erro: O código de acesso deve possuir 44 dígitos
                            </HelperText>

                        </Container>
                    )}

                    { !invoiceRequested && loading && (
                        <Container style={styles.progressBar}>
                            <ProgressBar indeterminate={true} color={'#003B94'} />
                        </Container>
                    )}

                    { !invoiceRequested && showCaptcha && (
                        <Container
                            style={styles.captchaContainer}
                        >
                            <Container
                                style={styles.imageWrapper}
                            >
                                <Image
                                    style={styles.image}
                                    source={{uri: captchaImage}}
                                />
                            </Container>

                            <Container
                                style={styles.captchaWrapper}
                            >
                                <TextInput
                                    mode='outlined'   
                                    underlineColor='#003B94'
                                    label='Captcha'
                                    autoCompleteType='off'
                                    autoCapitalize='none'
                                    error={captchaCodeMessageError}
                                    value={captchaCode}
                                    onChangeText={text => handleCaptchaCodeChange(text)}
                                    onSubmitEditing={() => handleGetResult()}
                                />

                                <HelperText
                                    type='error'
                                    visible={captchaCodeMessageError}
                                >
                                    Erro: O captcha deve possuir 7 dígitos
                                </HelperText>
                            </Container>
                            
                        </Container>
                    )}

                    { invoiceRequested && (
                        <Container
                            style={styles.result}
                        >
                            { loadingRequest && (
                                <Container style={styles.progressBar}>
                                    <ProgressBar indeterminate={true} color={'#003B94'} />
                                </Container>
                            )}

                            { !loadingRequest && (
                                <InvoiceResult status={status} />
                            )}
                        </Container>
                    )}
                    
                    <Container
                        style={styles.buttons}
                    >
                        <Button
                            style={styles.button}
                            onPress={handleOnClickAddButton}
                            disabled={invoiceRequested && loadingRequest}
                        >
                            { !invoiceRequested && (
                                <Text
                                    style={styles.textButton}
                                >
                                    Adicionar
                                </Text>
                            )}

                            { invoiceRequested && (
                                <Text
                                    style={styles.textButton}
                                >
                                    Adicionar outra
                                </Text>
                            )}
                        </Button>

                        <Button
                            style={styles.button}
                            light
                            onPress={() => handleOnClickCleanButton()}
                            disabled={invoiceRequested}
                        >
                            <Text
                                style={styles.textButton}
                            >
                                Limpar
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

                    </Container>

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

    content: {
        flex: 1,
        justifyContent:  'center',
        alignItems: 'center',
    },

    accessCodeInputWrapper: {
        flex: 0,
        height: '14%',
        width: '90%',
    },

    buttons: {
        flex: 0,
        flexDirection: 'row',
        height: '10%',
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
        flex: 0,
        justifyContent: 'center',
        height: '20%',
        width: '80%',
    },

    captchaContainer: {
        flex: 0,
        width: '100%',
        height: '25%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    captchaWrapper: {
        flex: 0,
        height: '50%',
        width: '90%',
        paddingTop: 10,
    },

    imageWrapper: {
        flex: 0,
        height: '33%',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },

    image: {
        height: 50,
        width: 250,
    },

    result: {
        flex: 0,
        height: '50%',
        width: '100%',
        marginTop: -250,
        justifyContent: 'center',
        alignItems: 'center',
    }
});