import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const StepTwo = ({ navigation, route }: any) => {
    const { values } = route.params;
    const [img, setImg] = useState<string | null>(null);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permission to access gallery is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImage = result.assets[0].uri;
            const base64Img : any = await toBase64(selectedImage);
            setImg(base64Img)
        }
    };
    const toBase64 = async (uri: any) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result); // Get base64 string
            };
            reader.readAsDataURL(blob);
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Upload Profile Image (Optional)</Text>

            <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                <Text style={styles.imagePickerButtonText}>Pick an Image</Text>
            </TouchableOpacity>

            {img && <Image source={{ uri: img }} style={styles.imagePreview} />}

            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => navigation.navigate('StepThree', { values: { ...values, img } })}
            >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default StepTwo;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { fontSize: 25, fontWeight: '600', marginBottom: 20 },
    imagePickerButton: {
        backgroundColor: '#1443C3',
        paddingVertical: 12,
        borderRadius: 50,
        alignItems: 'center',
    },
    imagePickerButtonText: { color: '#fff', fontWeight: '500' },
    imagePreview: { width: 100, height: 100, borderRadius: 50, marginTop: 20 },
    nextButton: {
        backgroundColor: '#1443C3',
        paddingVertical: 12,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 20,
    },
    nextButtonText: { color: '#fff', fontWeight: '500' },
    backButton: {
        marginTop: 15,
        paddingVertical: 12,
        borderRadius: 50,
        alignItems: 'center',
        borderColor: '#CBD2E0',
        borderWidth: 1,
    },
    backButtonText: { color: '#1443C3' },
});
