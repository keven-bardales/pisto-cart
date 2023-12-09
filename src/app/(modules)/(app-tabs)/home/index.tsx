import { View, Text, StyleSheet } from "react-native";
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
import { Icon } from "@rneui/themed";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Home() {
  const searchBarRef = useRef(null);

  const categories = useProductCategoryStore((state) => state.parentCategories);
  const products = useProductStore((state) => state.products);
  const cart = useCartStore((state) => state.cart);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [qrData, setQrData] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [searchByQrCode, setsearchByQrCode] = useState(false);

  const [search, setsearch] = useState("");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

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

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setQrData(data);
    setsearchByQrCode(false);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    updateSearch(data);
  };

  const updateSearch = (search: string) => {
    setsearch(search);

    const searchToLowerCase = search.toLowerCase();

    const newProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchToLowerCase) ||
        product.productCategory?.name
          .toLowerCase()
          .includes(searchToLowerCase) ||
        product.code.toLowerCase().includes(searchToLowerCase)
    );

    setfilteredProducts(newProducts);
  };

  return (
    <>
      {hasPermission && searchByQrCode ? (
        <View style={StyleSheet.absoluteFillObject}>
          <BarCodeScanner
            style={StyleSheet.absoluteFillObject}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
          <Button
            onPress={() => {
              setsearchByQrCode(false);
              setScanned(false);
            }}
          >
            Cancelar
          </Button>
        </View>
      ) : (
        <ScrollView
          style={{
            padding: 5,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SafeAreaView>
            <Card.Title
              style={{
                textAlign: "left",
                padding: 6,
                width: "100%",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Bienvenido a nuestra tienda
            </Card.Title>

            <View
              style={{
                marginBottom: 10,
              }}
            >
              <SearchBar
                ref={(search) => (search = searchBarRef)}
                onChangeText={updateSearch}
                value={search}
                placeholder="Buscar productos, categorias, etc..."
              />

              <Button
                onPress={() => {
                  setsearchByQrCode(true);
                  setScanned(false);
                }}
              >
                <Text>Buscar por codigo de barra</Text>
                <Icon name="camera"></Icon>
              </Button>
            </View>

            <Text>
              {JSON.stringify({
                scanned,
                hasPermission,
                qrData,
                searchByQrCode,
              })}
            </Text>

            {!isLoading && filteredProducts.length === 0 ? (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}
                >
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
      )}
    </>
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
