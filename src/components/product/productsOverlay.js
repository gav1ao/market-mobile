import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Text } from 'native-base';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { formatPrice, formatDate } from '../../util/format';

export default ProductOverlay = (props) => {

    const [isReady, setReady] = useState(false);

    useEffect(() => {
        componentDidMount = async () => {
            await Font.loadAsync({
                Roboto: require('../../assets/fonts/Roboto-Regular.ttf'),
                Roboto_medium: require('../../assets/fonts/Roboto-Medium.ttf'),
                Red_Hat_Display: require('../../assets/fonts/RedHatDisplay-Regular.ttf'),
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
            <Overlay
                isVisible={props.visible}
                windowBackgroundColor="rgba(0, 0, 0, .7)"
                overlayBackgroundColor="#FFF"
                onBackdropPress={props.handleOnBackdropPress}
                width="80%"
                height="80%"
            >
                <View
                    style={styles.container}
                >
                    <View
                        style={styles.textWrapper}
                    >
                        <Text
                            style={styles.title}
                        >
                            Nome do produto:
                        </Text>
                        <Text
                            style={styles.description}
                        >
                            {props.product.name}
                        </Text>
                    </View>

                    <View
                        style={[styles.textWrapper]}
                    >
                        <Text
                            style={styles.title}
                        >
                            Preço:
                        </Text>
                        <Text
                            style={styles.description}
                        >
                            {formatPrice(props.product.price)}
                        </Text>
                    </View>

                    <View
                        style={[styles.textWrapper]}
                    >
                        <Text
                            style={styles.title}
                        >
                            Data da compra:
                        </Text>
                        <Text
                            style={styles.description}
                        >
                            {formatDate(props.product.purchaseDate)}
                        </Text>
                    </View>

                    <View
                        style={[styles.textWrapper]}
                    >
                        <Text
                            style={styles.title}
                        >
                            Local da compra:
                        </Text>
                        <Text
                            style={styles.description}
                        >
                            {props.product.marketName}
                        </Text>
                    </View>
                </View>
            </Overlay>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: '100%',
        width: '100%',
    },

    textWrapper: {
        flex: -1,
        alignItems: 'flex-start',
        width: '100%',
    },

    title: {
        fontFamily: 'Red_Hat_Display',
        fontSize: 17,
    },

    description: {
        fontFamily: 'Roboto',
        fontSize: 25,
    }
})