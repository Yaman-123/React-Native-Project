import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>Yaman</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        padding: 10,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        fontSize: 16,
        color: 'white',
    },
});

export default Footer;
