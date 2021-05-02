import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from "react-native";
import styled from "styled-components/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  imgContainer: {
    padding: 8
  },
  itemContainer: {
    padding: 8
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
});

const StyledText = styled.Text`
  font-size: 24px;
  margin: 10px;
`;

const renderItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <View>
        <Text>user id: {item.id}</Text>
        <Text>title: {item.title}</Text>
        <Text>code: {item.code}</Text>
        <Text>linenos: {item.linenos}</Text>
        <Text>language: {item.language}</Text>
        <Text>style: {item.style}</Text>
      </View>
    </View>
  );
};

const LIMIT = 11;

export default function App() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    fetch("http://172.30.1.9:8000/snippets")
      .then(res => res.json())
      .then(res => setData(data.concat(res.slice(offset, offset + LIMIT))))
      .then(() => {
        setOffset(offset + LIMIT);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert("Error!");
      });
  };
  const onEndReached = () => {
    if (loading) {
      return;
    } else {
      getData();
    }
    useEffect(() => {
      getData();
    }, []);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
        ListFooterComponent={loading && <ActivityIndicator />}
      />
    </SafeAreaView>
  );
}
