import React from "react";
import { useFormikContext } from "formik";

import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";
import { TouchableWithoutFeedback, View } from "react-native";

import colors from "../../config/colors";

const AppFormField = ({ name, width, ...otherProps }) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <TouchableWithoutFeedback onPress={() => handleChange(name)}>
      <View>
        <TextInput
          selectionColor={colors.secondary}
          onBlur={() => setFieldTouched(name)}
          onChangeText={handleChange(name)}
          width={width}
          {...otherProps}
        />
        <ErrorMessage error={errors[name]} visible={touched[name]} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppFormField;
