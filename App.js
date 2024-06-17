import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const App = () => {
    const [loading, setLoading] = useState(false);
    const [getData, setData] = useState([]);
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState(''); // New state for filter text
    const [error, setError] = useState(null);
    const [selectId, setSelectedId] = useState(null);

    const postData = async () => {
        if (input === '') {
            Alert.alert('Validation Error', 'Please fill in the input box.');
            return;
        }
        try {
            setLoading(true);
            if (selectId) {
                await axios.put(`http://192.168.4.235:3000/Users/${selectId}`, { name: input, date: new Date().getDate(), year: new Date().getFullYear(), month: new Date().getMonth() });
                setSelectedId(null); // Clear the selected ID after updating
            } else {
                await axios.post("http://192.168.4.235:3000/Users", { name: input, date: new Date().getDate(), year: new Date().getFullYear(), month: new Date().getMonth() });
            }
            setInput('');
            fetchData();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://192.168.4.235:3000/Users");
            setData(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteData = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`http://192.168.4.235:3000/Users/${id}`);
            fetchData();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateData = (item) => {
        setSelectedId(item.id);
        setInput(item.name);
    };

    // Filter the data based on the filter text
    const filteredData = getData.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <View style={styles.main}>
            <StatusBar style="auto" />
            <TextInput
                style={styles.textInput}
                onChangeText={setInput}
                value={input}
                placeholder='Enter todo'
            />
            <TextInput
                style={styles.textInput}
                onChangeText={setFilter}
                value={filter}
                placeholder='Filter by name'
            />
            <View style={styles.buttonContainer}>
                <Button title={selectId ? "UPDATE" : "SUBMIT"} color="#4CAF50" onPress={postData} />
                <Button title="Fetch Data" color="#2196F3" onPress={fetchData} />
            </View>

            <ScrollView>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />
                ) : (
                    filteredData.map((item) => (
                        <View key={item.id} style={styles.itemContainer}>
                            <ScrollView style={styles.scrollView}>
                                <Text style={styles.itemName}>{item.name}</Text>


                            </ScrollView>
                            <Text style={styles.itemName}>{item.date}/{item.year}/{item.month}</Text>
                            <TouchableOpacity style={styles.iconButton} onPress={() => updateData(item)}>
                                <Ionicons name="pencil" size={24} color="blue" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton} onPress={() => deleteData(item.id)}>
                                <Ionicons name="trash" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 20,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10, // Add margin bottom to separate inputs
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
    },
    activityIndicator: {
        marginTop: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    scrollView: {
        flex: 1,

    },
    itemName: {
        flexShrink: 1,
        maxWidth: '50%', // Set a max width to prevent overflow
        whiteSpace: 'nowrap',

        textOverflow: 'ellipsis',
        paddingHorizontal: 10,
        borderRightWidth: 1,
        borderRightColor: '#ccc',
    },
    iconButton: {
        paddingHorizontal: 10,
    },
});

export default App;
