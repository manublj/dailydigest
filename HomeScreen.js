import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const API_URL = 'https://api.notion.com/v1/databases/4822a250e7df409289a301c2b2ddbac8'; // Replace with your Notion API endpoint
  const API_KEY = 'secret_UA92HqNMXnQ7u5lvcN2Ed1fDCpgaIewR3ZtPuSUrKCr'; // Replace with your Notion API key

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        setData(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openUrl(item.url)}>
      <View style={styles.itemContainer}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.headline}>{item.headline}</Text>
        <Text style={styles.brief}>{item.brief}</Text>
        <Text style={styles.tags}>{item.tags.join(', ')}</Text>
      </View>
    </TouchableOpacity>
  );

  const openUrl = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headline: {
    fontSize: 18,
    marginVertical: 8,
  },
  brief: {
    fontSize: 14,
  },
  tags: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default HomeScreen;
