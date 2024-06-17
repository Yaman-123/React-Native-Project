import React from 'react'
import { Button, Platform, StyleSheet, Text, View } from 'react-native';


const Contact = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Contact Screen</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
};
// Example of using Platform module
const styles = StyleSheet.create({
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
});


export default Contact