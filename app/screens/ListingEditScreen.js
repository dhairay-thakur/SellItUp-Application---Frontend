import React, { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Done from "../components/Done";
import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import Modal from "react-native-modal";
import listingsApi from "../api/listings";
import categories from "../constants/categories";
import styles from "../styles/ListingEdit";
import { ScrollView } from "react-native-gesture-handler";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

function ListingEditScreen() {
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async (listing, { resetForm }) => {
    setModalVisible(true);
    const result = await listingsApi.addListing(listing, (progress) =>
      setProgress(progress)
    );
    if (!result.ok) {
      setModalVisible(false);
      return alert("Could Not Add Listing");
    }
    resetForm();
  };
  return (
    <Screen style={styles.container}>
      <View style={styles.modalContainer}>
        <Modal
          useNativeDriver
          backdropOpacity={0.5}
          isVisible={modalVisible}
          style={styles.modal}
          onBackButtonPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            {progress === 1 && (
              <Done
                onAnimationFinish={() => {
                  setModalVisible(false);
                }}
              />
            )}
            <ActivityIndicator visible={progress !== 1} />
          </View>
        </Modal>
      </View>
      <KeyboardAvoidingView>
        <Form
          initialValues={{
            title: "",
            price: "",
            description: "",
            category: null,
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <FormImagePicker name="images" />
            <FormField maxLength={255} name="title" placeholder="Title" />
            <FormField
              keyboardType="numeric"
              name="price"
              placeholder="Price"
              width={120}
            />
            <Picker
              items={categories}
              name="category"
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Category"
              width="50%"
            />
            <FormField
              maxLength={255}
              multiline
              name="description"
              numberOfLines={3}
              placeholder="Description"
            />
            <SubmitButton title="Post" />
          </ScrollView>
        </Form>
      </KeyboardAvoidingView>
    </Screen>
  );
}

export default ListingEditScreen;
