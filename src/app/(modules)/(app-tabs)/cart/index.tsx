import { CartStore, cartStore, useCartStore } from "@/stores/cart/cart.store";
import { CartDetail } from "@/types/cart/types/cart.type";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "@rneui/base";

// Datos ficticios para el carrito de compra con imágenes

const CartPage = () => {
  // Obtener el carrito de la tienda usando useCartStore
  const cart = useCartStore((state) => state.cart);
  const setCart = useCartStore((state) => state.setCart);

  // Función para agregar cantidad a un ítem del carrito
  const increaseQuantity = (itemId) => {
    // Implementa la lógica para aumentar la cantidad del ítem del carrito aquí
    console.log(`Aumentar cantidad para el producto con ID ${itemId}`);
  };

  // Función para reducir cantidad de un ítem del carrito
  const decreaseQuantity = (itemId) => {
    // Implementa la lógica para reducir la cantidad del ítem del carrito aquí
    console.log(`Reducir cantidad para el producto con ID ${itemId}`);
  };

  // Función para eliminar un ítem del carrito
  const removeFromCart = (itemId) => {
    // Implementa la lógica para eliminar el ítem del carrito aquí
    console.log(`Eliminar producto con ID ${itemId} del carrito`);
  };

  // Calcular el total del carrito
  const calculateTotal = () => {
    return cart.cartDetail.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const renderCartItem = (item: CartDetail) => {
    return (
      <View key={item.id} style={styles.cartItem}>
        <Image
          source={{
            uri: item.product.imageUrl,
          }}
          style={styles.productImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.product.name}</Text>
          <Text style={styles.itemPrice}>${item.price} por unidad</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => {
                cartStore.decreaseQuantity(item);
              }}
            >
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => {
                cartStore.increaseQuantity(item);
              }}
            >
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            cartStore.removeProduct(item);
          }}
        >
          <Text style={styles.removeButton}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Carrito de Compra</Text>
        <View style={styles.cartItemsContainer}>
          {cart.cartDetail.map((item) => renderCartItem(item))}
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalAmount}>${calculateTotal()}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Pagar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  cartItemsContainer: {
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "#777",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 5,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  removeButton: {
    color: "red",
    fontSize: 14,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CartPage;
