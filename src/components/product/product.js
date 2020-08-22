import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { Container } from 'native-base';

import ProductOverlay from '../../components/product/productsOverlay';

import { formatPrice, formatDate } from '../../util/format';

export default Product = (props) => {

    const [showOverlay, setShowOverlay] = useState(false);

    const handleOnPressProduct = () => {
        setShowOverlay(true);
    }

    const handleOnBackdropPress = () => {
        setShowOverlay(false);
    }

    return (
        <TouchableOpacity
            onPress={handleOnPressProduct}
        >
            
            <ProductOverlay
                visible={showOverlay || false}
                product={props.product}
                handleOnBackdropPress={handleOnBackdropPress}
            />

            <Container style={styles.container}>
                <Container style={styles.text}>
                    <Text
                        style={styles.name}
                        numberOfLines={1}
                    >
                        {props.product.name}
                    </Text>

                    <Text
                        numberOfLines={2}
                    >
                        {props.product.marketName}
                    </Text>
                </Container>

                <Container style={styles.info}>
                    <Text style={styles.price}>{formatPrice(props.product.price)}</Text>
                    <Text style={styles.purchaseDate}>{formatDate(props.product.purchaseDate) || ''}</Text>
                </Container>
            </Container>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D7D7D7',
        borderStyle: 'solid',
        borderRadius: 3,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,

        height: 70,
        padding: 5,
        margin: 7,
        justifyContent: 'space-between',
        alignContent: 'space-between',
    },

    textWrapper: {

    },

    name: {
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },

    text: {
        flex: 0,
        flexWrap: 'nowrap',
        width: '65%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },

    info: {
        flex: 0,
        flexWrap: 'nowrap',
        width: '35%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },

    price: {
        color: '#4C8D18',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 18,
    },

    purchaseDate: {
        fontSize: 12,
    }
})