import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/config/firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// No necesitamos 'useNavigation' ni 'StackActions' si usamos el observador de Firebase

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingrese ambos campos.");
      return;
    }

    try {
      // 1. Inicia sesión con Firebase.
      await signInWithEmailAndPassword(auth, email, password);

      // 2. ¡ELIMINAR LA NAVEGACIÓN MANUAL!
      // El componente <Navigation/> principal detectará automáticamente
      // este cambio de estado (a través de onAuthStateChanged) y
      // redirigirá al usuario a AppTabs.
      
      // Opcional: Puedes dejar la alerta o eliminarla para un flujo más limpio.
      // Alert.alert("Login exitoso", "Has iniciado sesión correctamente."); 

    } catch (error) {
      let errorMessage = "Hubo un problema al iniciar sesión.";
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = "El formato del correo electrónico no es válido.";
          break;
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          // Combinamos los errores de usuario no encontrado y contraseña incorrecta
          // para mayor seguridad, sin revelar detalles del backend.
          errorMessage = "Credenciales inválidas. Por favor verifique su correo y contraseña.";
          break;
        case 'auth/network-request-failed':
          errorMessage = "Error de conexión, por favor intenta más tarde.";
          break;
        default:
          errorMessage = error.message;
      }
      Alert.alert("Error", errorMessage);
    }
  };
// ... (El resto del componente `return` y `styles` permanece igual)
// ...
  return (
    <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={10}
      >
      <LinearGradient colors={["#4a56e2", "#64bae8"]} style={styles.container}>
        {/* ... (Contenido visual del Login) ... */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/copia.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <LinearGradient
          colors={["#43a4e8", "#314ed9"]}
          style={styles.card}
        >
          {/* Usuario */}
          <Text style={styles.label}> <FontAwesome name="envelope" size={18} color="#ffffffff" style={styles.icon} /> Correo</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Correo electronico"
              value={email}
              onChangeText={setEmail}
              keyboardType="default"
              autoCapitalize="none"
            />
          </View>

          {/* Contraseña */}
          <Text style={styles.label}> <FontAwesome name="key" size={18} color="#ffffffff" style={styles.icon} /> Contraseña</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <FontAwesome
                name={showPassword ? "eye-slash" : "eye"}
                size={18}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          {/* Botón */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>INGRESAR</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Enlace de Registro */}
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>¿No tienes cuenta aún? Regístrate</Text>
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
    // ... (Tu código de estilos aquí) ...
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      logoContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginTop: -100,
        marginBottom: 60,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 6,
      },
      logo: {
        width: "100%",
        height: "100%",
      },
      card: {
        width: "85%",
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 6,
        marginBottom: 20,
      },
      label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 5,
      },
      inputGroup: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
      },
      icon: {
        marginRight: 8,
      },
      input: {
        flex: 1,
        height: 45,
        fontSize: 14,
        color: "#333",
      },
      eyeButton: {
        padding: 5,
      },
      button: {
        backgroundColor: "#05f7c2ff",
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 10,
        marginHorizontal: 70,
      },
      buttonText: {
        color: "#000000ff",
        fontSize: 16,
        fontWeight: "bold",
      },
      forgotPassword: {
        marginTop: 10,
        color: "#fff",
        fontSize: 14,
        textDecorationLine: "underline",
      },
    
      signUpText: {
        marginTop: 20,
        color: '#ffffffff',
      },
});