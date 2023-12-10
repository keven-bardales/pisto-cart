import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Perfil de Usuario</Text>
      </View>
      <View style={styles.profileInfo}>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
          }}
        />
        <Text style={styles.username}>Nombre de Usuario</Text>
        <Text style={styles.userBio}>Una breve descripción sobre el usuario</Text>
      </View>
      <View style={styles.userDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Correo:</Text>
          <Text style={styles.detailValue}>usuario@example.com</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Ubicación:</Text>
          <Text style={styles.detailValue}>Ciudad, País</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Fecha de Nacimiento:</Text>
          <Text style={styles.detailValue}>DD/MM/AAAA</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Intereses:</Text>
          <Text style={styles.detailValue}>Interés 1, Interés 2, Interés 3</Text>
        </View>
        <View style={styles.socialLinks}>
          <Text style={styles.detailLabel}>Redes Sociales:</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity>
              {/* Aquí podrías incluir iconos de redes sociales */}
              <Text style={styles.socialIcon}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              {/* Otro icono de red social */}
              <Text style={styles.socialIcon}>Twitter</Text>
            </TouchableOpacity>
            {/* Puedes agregar más redes sociales según sea necesario */}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userBio: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  userDetails: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: "bold",
  },
  detailValue: {
    color: "#333",
  },
  socialLinks: {
    marginTop: 15,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  socialIcon: {
    color: "#007bff",
    marginRight: 10,
  },
});

export default Profile;
