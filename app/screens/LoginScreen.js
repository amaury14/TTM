import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import firebase from '../../database/firebase';
import colors from '../config/colors';

const LoginScreen = () => {
    const addNewUser = async (result) => {
        const dbRef = firebase.fireDb.collection('users').doc(result?.user?.uid);
        await dbRef.set({
            id: result?.user?.uid,
            gmail: result?.user?.email,
            profile_picture: result?.additionalUserInfo?.profile?.picture,
            locale: result?.additionalUserInfo?.profile?.locale,
            first_name: result?.additionalUserInfo?.profile?.given_name,
            last_name: result?.additionalUserInfo?.profile?.family_name,
            created_at: Date.now()
        });
    };

    const updateUser = async (result) => {
        const dbRef = firebase.fireDb.collection('users').doc(result?.user?.uid);
        await dbRef.update({
            last_logged_in: Date.now()
        });
    };

    const isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser?.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (
                    providerData?.[i]?.providerId === firebase.firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData?.[i]?.uid === googleUser?.user?.id
                ) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    };

    const onSignIn = async (googleUser) => {
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.firebase.auth().onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.firebase.auth.GoogleAuthProvider.credential(
                    googleUser?.idToken,
                    googleUser?.serverAuthCode
                );

                // Sign in with credential from the Google user.
                firebase.firebase
                    .auth()
                    .signInWithCredential(credential)
                    .then((result) => {
                        if (result?.additionalUserInfo?.isNewUser) {
                            addNewUser(result);
                        } else {
                            updateUser(result);
                        }
                    })
                    .catch(() => {
                        // Catch error
                    });
                // New User signning-in on Firebase.
            } else {
                // User already signed-in Firebase.
            }
        });
    };

    const signInWithGoogleAsync = async () => {
        try {
            GoogleSignin.configure({
                webClientId: '150449439362-bt80j08j0ttomppmj6rkj3lhfghhnppu.apps.googleusercontent.com',
                offlineAccess: true
            });
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const result = await GoogleSignin.signIn();

            if (result?.idToken) {
                onSignIn(result);
                return result?.idToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/background3.png')} resizeMode="cover" style={styles.image}>
                {/* <Image style={styles.logo} source={require('../assets/logo.png')} /> */}

                {/* <TouchableOpacity style={[styles.buttonContainer, styles.fabookButton]}>
                    <View style={styles.socialButtonContent}>
                        <Icon style={styles.icon} name="facebook" type="fontisto" color={colors.white} />
                        <Text style={styles.loginText}>Continuar con Facebook</Text>
                    </View>
                </TouchableOpacity> */}

                <TouchableOpacity
                    style={[styles.buttonContainer, styles.googleButton]}
                    onPress={() => signInWithGoogleAsync()}
                >
                    <View style={styles.socialButtonContent}>
                        <Icon style={styles.icon} name="google" type="fontisto" color={colors.white} />
                        <Text style={styles.loginText}>Continuar con Google</Text>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    background: {
        alignItems: 'center',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
    },
    buttonContainer: {
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        height: 45,
        justifyContent: 'center',
        marginBottom: 20,
        width: 250
    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    // fabookButton: {
    //     backgroundColor: colors.facebookColor
    // },
    googleButton: {
        backgroundColor: colors.googleColor
    },
    icon: {
        height: 'auto',
        marginRight: 5,
        width: 30
    },
    loginText: {
        color: colors.white
    },
    logo: {
        height: 80,
        position: 'absolute',
        top: 50,
        width: 270
    },
    socialButtonContent: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default LoginScreen;
