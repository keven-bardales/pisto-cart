import { shuffleProducts } from "@/lib/utils/shuffle-products";
import {
  productCategoryStore,
  useProductCategoryStore,
} from "@/stores/product-category/product-category.store";
import { productStore, useProductStore } from "@/stores/product/product.store";
import { Card } from "@rneui/base/dist/Card";
import { Button, Image, Text } from "@rneui/themed";
import { Link, useGlobalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductCategoryById() {
  const { id } = useGlobalSearchParams();

  const categories = useProductCategoryStore((state) =>
    state.productCategories.filter(
      (category) => category.parentCategoryId === id
    )
  );

  const products = useProductStore((state) => state.products);

  const [filteredProducts, setfilteredProducts] = useState(products);

  useEffect(() => {
    productCategoryStore
      .getCategories()
      .then((categories) => {})
      .catch((error) => {});

    return () => {};
  }, []);

  useEffect(() => {
    productStore
      .getProducts()
      .then((products) => {
        const newProducts = shuffleProducts(
          products.filter(
            (product) =>
              product.productCategory.parentCategoryId === id ||
              product.productCategory.id === id
          )
        );

        setfilteredProducts(newProducts);
      })
      .catch((error) => {});
  }, [products, id]);

  const router = useRouter();

  return (
    <ScrollView>
      <SafeAreaView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {categories.map((category) => {
            return (
              <Link
                style={{
                  padding: 5,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  display: "flex",
                  flexDirection: "column",
                  width: "40%",
                  flexGrow: 1,
                  margin: 5,
                }}
                href={`product-category/${category.id}`}
                key={category.id}
              >
                <Image
                  style={{
                    width: "100%",
                    minWidth: 100,
                    minHeight: 200,
                    height: "auto",
                    resizeMode: "contain",
                  }}
                  source={{
                    uri: category.imageUrl,
                  }}
                />
                <Card.Title
                  style={{
                    marginTop: 5,
                  }}
                >
                  {category.name}
                </Card.Title>
              </Link>
            );
          })}
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Card.Title
            style={{
              textAlign: "left",
              padding: 6,
              width: "100%",
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            Productos
          </Card.Title>

          {filteredProducts.map((product) => {
            return (
              <Link
                style={{
                  padding: 5,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  display: "flex",
                  flexDirection: "column",
                  width: "40%",
                  flexGrow: 1,
                  margin: 5,
                }}
                href={`product-category/${product.id}`}
                key={product.id}
              >
                <Image
                  style={{
                    width: "100%",
                    minWidth: 100,
                    minHeight: 200,
                    height: "auto",
                  }}
                  source={{
                    uri: product.imageUrl,
                  }}
                />
                <Card.Title
                  style={{
                    marginTop: 5,
                  }}
                >
                  {product.name}
                </Card.Title>
              </Link>
            );
          })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
