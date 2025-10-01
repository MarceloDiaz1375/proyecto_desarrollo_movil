import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from '../src/config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- NUEVOS ESTADOS PARA LOS REQUISITOS DE CONTRASEÑA ---
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);

  // --- FUNCIONES DE VALIDACIÓN INDIVIDUALES ---
  const validatePasswordRequirements = (pwd) => {
    setHasMinLength(pwd.length >= 6);
    setHasUpperCase(/[A-Z]/.test(pwd));
    setHasLowerCase(/[a-z]/.test(pwd));
    setHasNumber(/\d/.test(pwd));
  };

  // --- MODIFICACIÓN: onChangeText para la contraseña ---
  const handlePasswordChange = (text) => {
    setPassword(text);
    validatePasswordRequirements(text); // Validar requisitos al cambiar la contraseña
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    // --- Verificación de requisitos antes de enviar ---
    // Usamos los estados actuales de validación
    if (!(hasMinLength && hasUpperCase && hasLowerCase && hasNumber)) {
        Alert.alert(
            "Error",
            "La contraseña no cumple con todos los requisitos."
        );
        return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Registro exitoso", "Usuario registrado con éxito.");
      // Después de un registro exitoso, generalmente querrías que el usuario inicie sesión
      // o redirigirlo a la pantalla principal si la autenticación se maneja automáticamente
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] }); 
    } catch (error) {
      let errorMessage = "Hubo un problema al registrar el usuario.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "El correo electrónico ya está en uso.";
          break;
        case 'auth/invalid-email':
          errorMessage = "El formato del correo electrónico no es válido.";
          break;
        case 'auth/weak-password':
          errorMessage = "La contraseña es demasiado débil. " +
                         "Asegúrate de que tenga al menos 6 caracteres, una mayúscula, una minúscula y un número.";
          break;
        case 'auth/network-request-failed':
          errorMessage = "Error de conexión, por favor intenta más tarde.";
          break;
        default:
          errorMessage = error.message; // Para errores no previstos
      }
      Alert.alert("Error", errorMessage);
    }
  };

  // --- COMPONENTE AUXILIAR PARA EL REQUISITO INDIVIDUAL ---
  const PasswordRequirement = ({ meets, text }) => (
    <Text style={[styles.passwordRequirement, { color: meets ? 'lightgreen' : 'lightcoral' }]}>
      {meets ? '✓' : '•'} {text}
    </Text>
  );

  return (
    <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={30}
      >
      <LinearGradient colors={["#4a56e2", "#64bae8"]} style={styles.container}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Regístrate</Text>

          <Text style={styles.label}>Nombre</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Ingrese su nombre"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <Text style={styles.label}>Apellido</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Ingrese su apellido"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <Text style={styles.label}>Correo</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Ingrese su correo"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="key" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Ingrese su contraseña"
              value={password}
              onChangeText={handlePasswordChange} // Usa la nueva función
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={20} color="#ccc" />
            </TouchableOpacity>
          </View>
          
          {/* --- NUEVO: REQUISITOS DE CONTRASEÑA --- */}
          <View style={styles.passwordRequirementsContainer}>
            <PasswordRequirement meets={hasMinLength} text="Al menos 6 caracteres" />
            <PasswordRequirement meets={hasUpperCase} text="Una mayúscula" />
            <PasswordRequirement meets={hasLowerCase} text="Una minúscula" />
            <PasswordRequirement meets={hasNumber} text="Un número" />
          </View>

          <Text style={styles.label}>Confirmar Contraseña</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="key" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirme su contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <FontAwesome name={showConfirmPassword ? "eye-slash" : "eye"} size={20} color="#ccc" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signUpText}>¿Ya tienes cuenta? Inicia sesión</Text>
          </TouchableOpacity>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // Elimina backgroundColor: '#fff' si quieres que el LinearGradient ocupe todo
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain', // Asegura que el logo se ajuste
  },
  title: {
    fontSize: 28, // Tamaño de título un poco más grande
    fontWeight: 'bold',
    marginBottom: 20, // Más espacio debajo del título
    color: '#fff', // Color del título
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    width: '80%', // Asegura que el label esté alineado con los inputs
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10, // Menos margen para dejar espacio a los requisitos
    paddingHorizontal: 10,
    width: '80%', // Ancho fijo para los inputs
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  icon: {
    marginRight: 10,
    color: '#888', // Iconos un poco más oscuros
  },
  input: {
    flex: 1,
    height: 45, // Altura un poco mayor para inputs
    fontSize: 16, // Texto más grande en inputs
    color: '#333',
  },
  button: {
    backgroundColor: "#05f7c2ff",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20, // Más margen superior
    width: '60%', // Ancho del botón
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#000', // Texto del botón negro para contraste
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 20,
    color: '#ffffffff',
    fontSize: 15,
  },
  // --- NUEVOS ESTILOS PARA LOS REQUISITOS DE CONTRASEÑA ---
  passwordRequirementsContainer: {
    width: '80%', // Mismo ancho que los inputs
    marginBottom: 15,
    marginTop: -5, // Para que esté más cerca del input de contraseña
  },
  passwordRequirement: {
    fontSize: 13,
    marginBottom: 3,
    marginLeft: 5, // Un poco de sangría
    fontWeight: '500',
  },
});