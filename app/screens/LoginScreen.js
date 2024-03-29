// import * as Google from 'expo-google-app-auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import firebase from '../../database/firebase';
import colors from '../config/colors';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '150449439362-mgtsbevol33nnhf1qqdt9888hos58asm.apps.googleusercontent.com',
        iosClientId: '150449439362-e43j1h4emqe3h80q8bspqvq83pfludmu.apps.googleusercontent.com',
        androidClientId: '150449439362-l1f4ogos63o5bfbpin8hhek756ju0utm.apps.googleusercontent.com',
        webClientId: '150449439362-bt80j08j0ttomppmj6rkj3lhfghhnppu.apps.googleusercontent.com'
    });

    useEffect(() => {
        if (response?.type === 'success') {
            onSignIn(response);
        }
    }, [response]);

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
                    googleUser?.params?.id_token,
                    googleUser?.authentication?.accessToken
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
            promptAsync();
        } catch (e) {
            return { error: true };
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.gray2, colors.gray2, colors.gray2, colors.grayLigth, colors.white]}
                style={styles.background}
            >
                <Image style={styles.logo} source={require('../assets/logo.png')} />

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
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
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
