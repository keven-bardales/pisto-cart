import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  productCategoryStore,
  useProductCategoryStore,
} from "@/stores/product-category/product-category.store";
import { useProductStore } from "@/stores/product/product.store";
import { Link } from "expo-router";

export default function Products() {
  const categories = useProductCategoryStore(
    (state) => state.productCategories
  );
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    productCategoryStore
      .getCategories()
      .then((categories) => {})
      .catch((error) => {});
  }, []);

  const navigateToProductDetails = (productId) => {
    // Aquí deberías añadir la lógica para navegar a los detalles del producto
    console.log(`Navigating to product details for ID: ${productId}`);
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigateToProductDetails(item.id)}
    >
      <Text style={styles.productName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.productsList}>
        <Text style={styles.headerText}>Product List:</Text>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productsList: {
    flex: 1,
  },
  productItem: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  productName: {
    fontSize: 16,
  },
  productLink: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
