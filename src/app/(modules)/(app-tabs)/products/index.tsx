import {
  productCategoryStore,
  useProductCategoryStore,
} from "@/stores/product-category/product-category.store";
import { Link, Stack } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";

export default function Products() {
  const categories = useProductCategoryStore(
    (state) => state.productCategories
  );

  useEffect(() => {
    productCategoryStore
      .getCategories()
      .then((categories) => {})
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View>
      <Text>Products</Text>
      <Link
        href={{
          pathname: "products/50",
        }}
      >
        Ver producto 50
      </Link>

      {categories.map((cate) => {
        return <Text key={`${cate.name}`}>{cate.name}</Text>;
      })}
    </View>
  );
}
