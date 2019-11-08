import React, { useState, useEffect } from 'react'
import { StyleSheet, Image } from 'react-native'

import {   
    Container,
    Header,
    Content,
    Form,
    Body,
    Button,
    Text,
    Item,
    Input,
    Label,
    Icon,
    Spinner
} from 'native-base';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import api from '../../services/api';

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

    const [loading, setLoading] = useState(false);
    const [accessCode, setAccessCode] = useState('');
    const [accessCodeRightSize, setAccessCodeRightSize] = useState(false);
    const [accessCodeSuccess, setAccessCodeSuccess] = useState(false);
    const [madeRequest, setMadeRequest] = useState(false);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaImage, setCaptchaImage] = useState('');
    const [captchaCode, setCaptchaCode] = useState('');
    const [maxLengthSecureCode, setMaxLengthSecureCode] = useState(7);
    
    const [responseObject, setResponseObject] = useState({});

    // useEffect(() => {
        // handleAccessCodeChange = async () => {
        const handleAccessCodeChange = async () => {
            // console.log('Cod.Acesso: '+ accessCode);
            // console.log('Tam: ' + accessCode.length);

            if (accessCode.length == 44) {
                setMadeRequest(true);
                setAccessCodeRightSize(true);
                setLoading(true);

                await handleRequestAccess();
            }
        };

        // handleAccessCodeChange();
    // });
    
    const handleRequestAccess = async () => {
        if (accessCode.length < 44) {
            //TODO: Melhorar notificação de erro
            alert('Código de acesso inválido');
        }

        if (!madeRequest) {
            const response = await api.get('/invoice/code', { accessCode: accessCode });

            // console.log(response);

            const { accessCodeRes, captchaImage } = response.data;
            // console.log(accessCodeRes);
            // console.log(captchaImage);
            
            // if (accessCode === accessCodeRes) {
                setCaptchaImage(captchaImage);
                setLoading(false);
                setShowCaptcha(true);
            // }
        }
    }

    const handleOnClickButton = async () => {
        console.log('Captcha: '+ captchaCode);
        const response = await api.post('/invoice/code', null, {
            headers: {
                accesscode: accessCode,
                captchacode: captchaCode
            }
        });

        const { status } = response.data;

        if (status) {
            setAccessCodeRightSize(false);
            setAccessCodeSuccess(true);
            setShowCaptcha(false);
        }
    }


    if (!isReady) {
        return (
            <AppLoading />
        )
    } else {
        return (
            <Container>    
                <Header transparent />
                <Body>
                    <Container>
                        <Form>
                            <Item
                                floatingLabel={!(accessCodeRightSize || accessCodeSuccess)}
                                stackedLabel={accessCodeRightSize || accessCodeSuccess}
                                disabled={accessCodeRightSize || accessCodeSuccess}
                                success={accessCodeSuccess}
                            >
                                <Label>Código de Acesso</Label>
                                <Input
                                    autoCompleteType='off'
                                    autoCorrect={false}
                                    keyboardType='numeric'
                                    value={accessCode}
                                    onChangeText={setAccessCode}
                                    disabled={accessCodeRightSize || accessCodeSuccess}
                                />
                                {accessCodeRightSize && (
                                    <Icon name='information-circle' />
                                )}
                                {accessCodeSuccess && (
                                    <Icon name='checkmark-circle' />
                                )}
                            </Item>

                            {loading && (
                                <Spinner color='blue' />
                            )}

                            {showCaptcha && (
                                <Container>
                                    <Image
                                        style={{width: 250, height: 50}}
                                        source={{uri: captchaImage}}
                                    />

                                    <Item floatingLabel last>
                                        <Label>Captcha</Label>
                                        <Input
                                            autoCompleteType='off'
                                            autoCorrect={false}
                                            maxLength={maxLengthSecureCode}
                                            value={captchaCode}
                                            onChangeText={setCaptchaCode}
                                        />
                                    </Item>
                                </Container>
                            )}

                            <Container
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Button
                                    warning
                                    onPress={() => navigation.navigate('DummyPage')}
                                >
                                    <Text>Voltar</Text>
                                </Button>

                                <Button light onPress={handleAccessCodeChange}>
                                    <Text>Limpar</Text>
                                </Button>

                                <Button
                                    disabled={!showCaptcha}
                                    onPress={handleOnClickButton}
                                >
                                    <Text>Cadastrar</Text>
                                </Button>
                            </Container>
                        </Form>
                    </Container>
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