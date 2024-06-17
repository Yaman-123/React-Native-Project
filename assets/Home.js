import React from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';

const Home = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Text style={styles.text}>Home Screen</Text>
                <Text style={styles.text}>Home Screen</Text>
                <Text style={styles.text}>Home Screen</Text>
                <Text style={styles.text}>Home Screen</Text>
                <Button title="Go to Contact" onPress={() => navigation.navigate('Contact')} />
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Yaman</Text>
            </View>


        </View>
    );
};

// Example of using Platform module
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Platform.OS === 'ios' ? 'lightblue' : 'lightgreen',
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
        color: Platform.OS === 'ios' ? 'darkblue' : 'darkgreen',
    },
    footer: {
        padding: 10,
        backgroundColor: 'grey',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 16,
        color: 'white',
    },
});

export default Home;
