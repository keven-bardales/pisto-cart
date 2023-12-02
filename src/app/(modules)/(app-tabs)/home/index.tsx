import { View, Text } from "react-native";
import { Button, Card, Image, SearchBar } from "@rneui/base";
import { Link, Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

export default function Home() {
  const searchBarRef = useRef(null);

  const [categories, setCategories] = useState([]);

  const [search, setsearch] = useState("");

  useEffect(() => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/productCategory/getAll`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setCategories(json.data ?? []);
      })
      .catch((error) => console.error(error));
  }, []);

  const updateSearch = (search) => {
    setsearch(search);
  };

  return (
    <ScrollView
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SearchBar
        ref={(search) => (search = searchBarRef)}
        onChangeText={updateSearch}
        value={search}
        placeholder="Buscar productos, categorias, etc..."
      />

      {categories.map((category) => {
        return (
          <Card key={category.id}>
            <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: category.imageUrl,
              }}
            />
            <Text>{category.name}</Text>
          </Card>
        );
      })}
    </ScrollView>
  );
}
