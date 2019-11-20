import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-navigation';

import { Container, Text } from 'native-base';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { ProgressBar, Searchbar } from 'react-native-paper';

import Product from '../../components/product/product';

import api from '../../services/api';

import Header from '../../components/header/header';

export default SearchProduct = ({ navigation }) => {    
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

    useEffect(() => {
        if (productName === '' && !readyToReset) {
            setReadyToReset(true);
            resetSearch();
        }
    });

    const [readyToReset, setReadyToReset] = useState(false);
    const [readyToSearch, setReadyToSearch] = useState(true);
    const [productName, setProductName] = useState('');
    const [products, setProducts] = useState([]);
    const [madeRequest, setMadeRequest] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearchProduct = async () => {
        if (!madeRequest || readyToSearch) {
            setLoading(true);
            setMadeRequest(true);
            setReadyToSearch(false);

            const response = await api.post('/product/', {
                productName: productName,
            });

            const result = response.data;

            if (result.length > 0) {
                setProducts(result);
            }

            setLoading(false);
        }
    }

    const handleChangeText = (query) => {
        setProductName(query);
        setReadyToReset(false);
        setReadyToSearch(true);

        if (productName === '') {
            resetSearch();
        }
    }

    const resetSearch = () => {
        setMadeRequest(false);
        setReadyToSearch(true);
        setLoading(false);
        setProducts([]);
    }

    const header = {
        title: 'BUSCAR PRODUTOS',
        backFunction: () => navigation.navigate('DummyPage')
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
                    style={styles.searchBar}
                >
                    <Searchbar
                        placeholder="Buscar produtos"
                        value={productName}
                        onChangeText={query => handleChangeText(query)}
                        onIconPress={() => handleSearchProduct()}
                    />
                </Container>

                {loading && (
                    <Container style={styles.progressBar}>
                        <ProgressBar indeterminate={true} color={'#003B94'} />
                    </Container>
                )}

                {!(loading || madeRequest) && productName === '' && (
                    <Container style={styles.content} >
                        <Text style={styles.textInfo}>Digite no campo acima para buscar informações de um produto</Text>
                    </Container>
                )}

                {!loading && madeRequest && productName !== '' && products.length === 0
                    ? (
                        <Container style={styles.content} >
                            <Text style={styles.textInfo}>Nenhum produto encontrado</Text>
                        </Container>
                    ) : (
                        
                        !loading && products.length > 0 && (
                            <Container style={styles.productsWrapper}>
                                <ScrollView>
                                    {
                                        products.map((product, index) => (
                                            <Product key={index} product={product} />
                                        ))
                                    }
                                </ScrollView>
                            </Container>
                        )
                    )
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },

    searchBar: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 20,
        maxHeight: 48,
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    progressBar: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        height: '100%',
        width: '80%',
    },

    productsWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textInfo: {
        fontFamily: 'Red_Hat_Text',
        fontSize: 16,
        lineHeight: 21,
        textAlign: 'center',
        color: '#6B6B6B'
    },
});