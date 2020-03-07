import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Text} from 'native-base';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import success from '../../assets/images/circle-checked.png';
import error from '../../assets/images/circle-x.png';
import notFound from '../../assets/images/error_24px.png';
import warning from '../../assets/images/warning_24px.png';

const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const ALREADY_REGISTERED = 'ALREADY_REGISTERED';
const NOT_FOUND = 'NOT_FOUND';
const WRONG_CAPTCHA = 'WRONG_CAPTCHA';

export default InvoiceResult = (props) => {

    const [isReady, setReady] = useState(false);

    useEffect(() => {
        componentDidMount = async () => {
            await Font.loadAsync({
                Red_Hat_Display_Bold: require('../../assets/fonts/RedHatDisplay-Bold.ttf'),
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
            <Container style={styles.body}>

                {props.status === SUCCESS && (
                    <Container style={styles.body}>
                        <Image source={success} style={styles.image} />
                        <Text styles={styles.textInfo}>
                            Nota fiscal adicionada com sucesso!
                        </Text>
                    </Container>
                )}

                {props.status === ERROR && (
                    <Container style={styles.body}>
                        <Image source={error} style={styles.image} />
                        <Text styles={styles.textInfo}>
                            Ocorreu um erro ao salvar a nota
                        </Text>
                    </Container>
                )}


                {props.status === ALREADY_REGISTERED && (
                    <Container style={styles.body}>
                        <Image source={warning} style={styles.image} />
                        <Text styles={styles.textInfo}>
                            Nota fiscal já cadastrada
                        </Text>
                    </Container>
                )}

                {props.status === NOT_FOUND && (
                    <Container style={styles.body}>
                        <Image source={notFound} style={styles.image} />
                        <Text styles={styles.textInfo}>
                            Nota fiscal não disponível
                        </Text>
                    </Container>
                )}

                {/* TODO: Transferir para HelperText de captcha */}
                {props.status === WRONG_CAPTCHA && (
                    <Container style={styles.body}>
                        <Image source={error} style={styles.image} />
                        <Text styles={styles.textInfo}>
                            Captcha incorreto. Por favor, tente novamente.
                        </Text>
                    </Container>
                )}

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
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