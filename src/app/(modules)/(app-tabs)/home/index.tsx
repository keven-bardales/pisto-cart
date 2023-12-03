import { Text } from "react-native";
import { Button, Card, Image, SearchBar } from "@rneui/base";
import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  productCategoryStore,
  useProductCategoryStore,
} from "@/stores/product-category/product-category.store";

export default function Home() {
  const searchBarRef = useRef(null);

  const categories = useProductCategoryStore((state) => state.parentCategories);

  const [search, setsearch] = useState("");

  useEffect(() => {
    productCategoryStore
      .getCategories()
      .then((categories) => {})
      .catch((error) => {
        console.log(error);
      });
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
