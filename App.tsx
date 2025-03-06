import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from "react-native";

const API_HOST = "numbersapi.p.rapidapi.com"; 
const API_KEY = "4a0c8c7811msha2f5d43a7606bc5p1e4eb3jsndf9121a89f52";

const months = [
  { label: "Jan", value: "1" },
  { label: "Feb", value: "2" },
  { label: "Mar", value: "3" },
  { label: "Apr", value: "4" },
  { label: "May", value: "5" },
  { label: "Jun", value: "6" },
  { label: "Jul", value: "7" },
  { label: "Aug", value: "8" },
  { label: "Sep", value: "9" },
  { label: "Oct", value: "10" },
  { label: "Nov", value: "11" },
  { label: "Dec", value: "12" },
];

export default function App() {
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [fact, setFact] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  useEffect(() => {
    if (month && day) {
      const fetchFact = async () => {
        try {
          const response = await fetch(
            `https://${API_HOST}/${month}/${day}/date`,
            {
              method: "GET",
              headers: {
                "X-RapidAPI-Key": API_KEY,
                "X-RapidAPI-Host": API_HOST,
              },
            }
          );
          const text = await response.text();
          setFact(text);
        } catch (error) {
          setFact("Error.");
        }
      };
      fetchFact();
    } else {
      setFact("");
    }
  }, [month, day]);

  const handleMonthSelect = (value: string) => {
    setMonth(value);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Group 8: Assignment 3</Text>
      {fact ? (
        <Text style={styles.fact}>{fact}</Text>
      ) : (
        <Text style={styles.message}>Enter for a fact:</Text>
      )}
      
      {/*Dropdown*/}
      <TouchableOpacity 
        style={styles.dropdown} 
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <Text style={styles.dropdownText}>{month}</Text>
      </TouchableOpacity>
      
      {dropdownVisible && (
        <FlatList
          data={months}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => handleMonthSelect(item.value)}
            >
              <Text style={styles.dropdownItemText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="DD"
        keyboardType="numeric"
        onChangeText={setDay}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAB8C0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 20,
    color: "green",
  },
  fact: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  message: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  input: {
    width: "50%",
    color: "green",
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 20,
    marginBottom: 10,
    backgroundColor: "white",
  },
  dropdown: {
    height: 50,
    width: "50%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dropdownText: {
    color: "green",
    fontSize: 20,
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#EAB8C0",
  },
  dropdownItemText: {
    color: "green",
    fontSize: 18,
  },
});