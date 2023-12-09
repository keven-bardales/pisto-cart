import { View, Text } from "react-native";
import { Button, ButtonGroup, Card, Image, SearchBar } from "@rneui/base";
import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  productCategoryStore,
  useProductCategoryStore,
} from "@/stores/product-category/product-category.store";
import { Link } from "expo-router";
import { productStore, useProductStore } from "@/stores/product/product.store";
import { SafeAreaView } from "react-native-safe-area-context";
import { cartStore, useCartStore } from "@/stores/cart/cart.store";
import Toast from "react-native-toast-message";

export default function Home() {
  const searchBarRef = useRef(null);

  const categories = useProductCategoryStore((state) => state.parentCategories);
  const products = useProductStore((state) => state.products);
  const cart = useCartStore((state) => state.cart);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const [search, setsearch] = useState("");

  useEffect(() => {
    setisLoading(true);
    productCategoryStore
      .getCategories()
      .then((categories) => {
        setisLoading(false);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    setisLoading(true);
    productStore
      .getProducts()
      .then((products) => {
        setfilteredProducts(products);
        setisLoading(false);
      })
      .catch((error) => {});
  }, [products]);

  const updateSearch = (search: string) => {
    setsearch(search);

    const searchToLowerCase = search.toLowerCase();

    const newProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchToLowerCase) ||
        product.productCategory?.name
          .toLowerCase()
          .includes(searchToLowerCase) ||
        `${product.price}`.toLowerCase().includes(searchToLowerCase) ||
        `${product.name} ${product.productCategory?.name}`
          .toLowerCase()
          .includes(searchToLowerCase) ||
        `${product.name} ${product.productCategory?.name} ${product.price}`
          .toLowerCase()
          .includes(searchToLowerCase)
    );

    setfilteredProducts(newProducts);
  };

  return (
    <ScrollView
      style={{
        padding: 5,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SafeAreaView>
        <View
          style={{
            marginBottom: 10,
          }}
        >
          <Button
            onPress={() => {
              productStore.setProducts([]);
            }}
          >
            Limpiar
          </Button>
          <SearchBar
            ref={(search) => (search = searchBarRef)}
            onChangeText={updateSearch}
            value={search}
            placeholder="Buscar productos, categorias, etc..."
          />
        </View>

        {!isLoading && filteredProducts.length === 0 ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>
              No hay productos disponibles.
            </Text>
            <Text style={{ marginTop: 10 }}>Intenta buscar otra cosa.</Text>
            {/* Puedes agregar más contenido o un botón para acciones adicionales */}
          </View>
        ) : null}

        {isLoading ? (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {[...Array(10).keys()].map((key) => (
              <LoadingCard key={key} />
            ))}
          </View>
        ) : null}

        {!search && !isLoading ? (
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
              Categorias
            </Card.Title>

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
        ) : null}

        {!isLoading ? (
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
                <View
                  style={{
                    padding: 5,
                    backgroundColor: "#fff",
                    borderRadius: 5,
                    display: "flex",
                    flexDirection: "column",
                    width: "40%",
                    flexGrow: 1,
                    margin: 5,
                    position: "relative",
                  }}
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

                  <Button
                    onPress={() => {
                      cartStore.addProduct(product);

                      Toast.show({
                        type: "success",
                        text1: `${product?.name} agregado al carrito`,
                        visibilityTime: 1000,
                      });
                    }}
                  >
                    Agregar al carrito
                  </Button>

                  <Text
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      backgroundColor: "#fff",
                      borderRadius: 5,
                      padding: 5,
                      fontWeight: "bold",
                    }}
                  >
                    L. {product.price}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const LoadingCard = () => {
  return (
    <View
      style={{
        padding: 5,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        width: "40%",
        flexGrow: 1,
        margin: 5,
      }}
    >
      <View
        style={{
          width: "100%",
          minHeight: 200,
          backgroundColor: "#ddd",
          borderRadius: 5,
        }}
      />
      <View
        style={{
          marginTop: 5,
          backgroundColor: "#ddd",
          height: 20,
          borderRadius: 5,
        }}
      />
    </View>
  );
};
