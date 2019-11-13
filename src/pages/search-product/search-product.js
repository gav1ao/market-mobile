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
    Spinner,
    ListItem,
    Left,
    Right,
    List
} from 'native-base';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { DataTable } from 'react-native-paper';

import Product from '../../components/product/product';

import api from '../../services/api';


export default SearchProduct = ({ navigation }) => {    
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

    const [productName, setProductName] = useState('');
    const [products, setProducts] = useState([]);
    const [madeRequest, setMadeRequest] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearchProduct = async () => {
        if (!madeRequest) {
            setLoading(true);
            setMadeRequest(true);

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
                                floatingLabel={true}
                            >
                                <Label>Produto</Label>
                                <Input
                                    autoCompleteType='off'
                                    autoCorrect={true}
                                    value={productName}
                                    onChangeText={setProductName}
                                />
                            </Item>

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

                                <Button
                                    light
                                    onPress={() => setProductName('')}
                                    disabled={madeRequest}
                                >
                                    <Text>Limpar</Text>
                                </Button>

                                <Button
                                    disabled={madeRequest}
                                    onPress={handleSearchProduct}
                                >
                                    <Text>Buscar</Text>
                                </Button>
                            </Container>

                            {loading && (
                                <Spinner color='blue' />
                            )}

                            {/* {!loading && madeRequest && products.length === 0
                                ? <Text style={styles.empty}>Nenhum produto encontrado</Text>
                                : (
                                    <List>
                                        {
                                            products.map((product, index) => (
                                                <ListItem key={product.id} icon>
                                                    <Left>
                                                        <Text>{product.name}</Text>
                                                    </Left>
                                                    
                                                    <Body>
                                                        <Text>{product.price}</Text>
                                                    </Body>

                                                    <Right>
                                                        <Text>{product.marketName}</Text>
                                                    </Right>
                                                </ListItem>

                                            ))
                                        }
                                    </List>
                                    
                                )
                            } */}

                            {!loading && madeRequest && products.length === 0
                                ? <Text style={styles.empty}>Nenhum produto encontrado</Text>
                                : (
                                    <Container>
                                        {
                                            products.map((product, index) => (
                                                <Product product={product} />
                                            ))
                                        }
                                    </Container>
                                    
                                )
                            }


                        </Form>
                    </Container>
                </Body>
            </Container>
        );
    }
}