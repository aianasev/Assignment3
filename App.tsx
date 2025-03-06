import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const API_HOST = "numbersapi.p.rapidapi.com"; 
const API_KEY = "4a0c8c7811msha2f5d43a7606bc5p1e4eb3jsndf9121a89f52";

export default function App() {
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [fact, setFact] = useState<string>("");

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Group 8: Assignment 3</Text>
      {fact ? (
        <Text style={styles.fact}>{fact}</Text>
      ) : (
        <Text style={styles.message}>Enter for a fact:</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="MM"
        keyboardType="numeric"
        onChangeText={setMonth}
      />
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
});
