import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const API_HOST = "numbersapi.p.rapidapi.com"; 
const API_KEY = "4a0c8c7811msha2f5d43a7606bc5p1e4eb3jsndf9121a89f52";

export default function App() {
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [fact, setFact] = useState<string>("");

  useEffect(() => {
