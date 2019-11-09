import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, Text } from 'react-native'

import { Container } from 'native-base';

export default Product = (props) => {

    return (
        <Container style={styles.container}>
            <Container style={styles.text}>
                <Text style={styles.name}>{props.product.name}</Text>
                <Text>{props.product.marketName}</Text>
            </Container>

            <Container style={styles.info}>
                <Text style={styles.price}>R$ {props.product.price}</Text>
                <Text style={styles.purchaseDate}>{props.product.purchaseDate || ''}</Text>
            </Container>
        </Container>
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

        width: '90%',
        height: '10%',
        padding: 5,
        justifyContent: 'space-between',
        alignContent: 'space-between',
    },

    textWrapper: {

    },

    name: {
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },

    text: {
        flex: 0,
        flexWrap: 'wrap',
        width: '60%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },

    info: {
        flex: 0,
        width: '40%',
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