import React, { useState, useContext } from "react";
import { Image } from "react-native";
import * as Yup from "yup";
import {
  Form,
  FormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import Screen from "../components/Screen";
import styles from "../styles/Login";
import jwtDecode from "jwt-decode";
import authApi from "../api/auth";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
  const authContext = useContext(AuthContext);

  const [error, setError] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) {
      console.log(result);
      return setError(true);
    }
    setError(false);
    const user = jwtDecode(result.data.token);
    authContext.setUser(user);
    authStorage.storeToken(result.data.token);
  };
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />

      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error="Invalid credentials" visible={error} />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </Form>
    </Screen>
  );
}

export default LoginScreen;
