import React from 'react';
import { StyleSheet } from 'react-native';
import {
    Body,
    Button,
    Icon,
    Header,
    Left,
    Right,
    Subtitle,
    Title
} from 'native-base';

export default function HeaderAPP ( props ) {

    const onClickButton = () => {
        if (props.header) {
            props.header.backFunction();
        }
    }

    return (
        <Header>
            {props.header.backFunction && (
                <Left>
                    <Button
                        transparent
                        onPress={() => onClickButton()}
                    >
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
            )}
            
            <Body
                style={[
                    styles.body,
                    props.header.backFunction && styles.withBackFunction
                ]}
            >
                <Title>{props.header.title}</Title>

                {props.header.subtitle && (
                    <Subtitle>{props.header.subtitle}</Subtitle>
                )}
                
            </Body>
        </Header>
    );
}

const styles = StyleSheet.create({
    body: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    withBackFunction: {
        marginLeft: -100,
    }
})