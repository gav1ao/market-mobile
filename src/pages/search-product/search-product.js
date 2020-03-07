import React, { useState, useEffect } from 'react'
import { AsyncStorage, Picker, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-navigation';

import { Container, Spinner, Text } from 'native-base';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { ProgressBar, Searchbar } from 'react-native-paper';

import Product from '../../components/product/product';

import api from '../../services/api';

import Header from '../../components/header/header';

const USER_CHOOSEN_ADDRESS = 'USER_CHOOSEN_ADDRESS';

export default SearchProduct = ({ navigation }) => {    
    const [isReady, setReady] = useState(false);
    const [isAddressReady, setAddressReady] = useState(false);

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

    useEffect(() => {
        
        getUserChoosenAddress = async () => {
            if (!isAddressReady) {
                await handleRequestAddress();

                try {
                    const userChoosenAddress = await AsyncStorage.getItem(USER_CHOOSEN_ADDRESS);
            
                    if (userChoosenAddress) {
                        setChoosenAddress(userChoosenAddress);
                        const index = addresses.indexOf(userChoosenAddress) || 0;
                        setSelectedAddress(index);
                    }
                } catch (ex) {}
                

                setAddressReady(true);
            }
        }

        getUserChoosenAddress();
    })

    const [readyToReset, setReadyToReset] = useState(false);
    const [readyToSearch, setReadyToSearch] = useState(true);
    const [productName, setProductName] = useState('');
    const [products, setProducts] = useState([]);
    const [madeRequest, setMadeRequest] = useState(false);
    const [loading, setLoading] = useState(false);

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(0);
    const [choosenAddress, setChoosenAddress] = useState({});


    const handleRequestAddress = async () => {
        const { data } = await api.get('/market/cities/', null);

        const addressList = [];

        data.map( (item, index) => {
            const address = {
                'municipality' : item._id,
                'state' : item.state,
                'exhibition' : item._id + ', ' + item.state,
            }

            addressList.push(address);
        });

        const others = {
            'municipality' : null,
            'state' : null,
            'exhibition' : 'OUTROS',
        }

        addressList.push(others);

        const all = {
            'municipality' : 'all',
            'state' : 'all',
            'exhibition' : 'TODOS',
        }

        addressList.push(all);

        setAddresses(addressList);
        setChoosenAddress(addressList[0]);
    }

    const handleSearchProduct = async () => {
        if (!madeRequest || readyToSearch) {
            setLoading(true);
            setMadeRequest(true);
            setReadyToSearch(false);

            let option;
            const { municipality, state, exhibition } = choosenAddress;

            if (exhibition === 'TODOS') {
                option = {
                    'all' : true,
                };

            } else {
                option = {
                    'address': {
                        'municipality': municipality,
                        'state': state  
                    }
                };
            }

            const response = await api.post('/product/', {
                productName: productName,
                option,
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

    const handleChangeAddress = async (itemIndex) => {
        
        const address = addresses[itemIndex];

        setSelectedAddress(itemIndex);
        setChoosenAddress(address);

        try {
            await AsyncStorage.setItem(USER_CHOOSEN_ADDRESS, address);

        } catch (ex) {}

        setReadyToReset(false);
        setReadyToSearch(true);
    }

    const resetSearch = () => {
        setMadeRequest(false);
        setReadyToSearch(true);
        setLoading(false);
        setProducts([]);
    }

    const header = {
        title: 'BUSCAR PRODUTOS',
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
                    style={styles.searchBar}
                >
                    <Searchbar
                        onSubmitEditing={() => handleSearchProduct()}
                        placeholder="Buscar produtos"
                        value={productName}
                        onChangeText={query => handleChangeText(query)}
                        onIconPress={() => handleSearchProduct()}
                        disabled={!isAddressReady}
                    />

                    { !isAddressReady && (
                        <Spinner color='blue' />
                    )}

                    { isAddressReady && (
                        <Picker
                            selectedValue={selectedAddress}
                            style={{height: 50, width: 300}}
                            onValueChange={ async (itemValue, itemIndex) => await handleChangeAddress(itemValue)}
                        >
                            {
                                addresses.map( (address, index) => (
                                    <Picker.Item key={index} label={address.exhibition} value={index} />
                                ))
                            }
                        </Picker>
                    )}

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
        maxHeight: 98,
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