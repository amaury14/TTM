import * as Google from 'expo-google-app-auth';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import firebase from '../../database/firebase';
import colors from '../config/colors';

const LoginScreen = () => {
    // Commented to see if the new way works
    // useEffect(() => {
    //     checkLogin();
    // }, []);

    // const checkLogin = async () => {
    //     await firebase.firebase.auth().onAuthStateChanged(function(user) {
    //         if (user) {
    //             props.navigation.navigate('BottomTabsScreen', { user: {
    //                 id: user.uid,
    //                 gmail: user.email,
    //                 profile_picture: user.photoURL,
    //                 first_last_name: user.displayName
    //             }});
    //         } else {
    //             props.navigation.navigate('LoginScreen');
    //         }
    //     });
    // };

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
                    googleUser?.accessToken
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
                // props.navigation.navigate('BottomTabsScreen', { user: {
                //     id: firebaseUser.uid,
                //     gmail: firebaseUser.email,
                //     profile_picture: firebaseUser.photoURL,
                //     first_last_name: firebaseUser.displayName
                // }});
                // User already signed-in Firebase.
            }
        });
    };

    const signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                androidStandaloneAppClientId:
                    '150449439362-e8ocsm95f0nnbddpjva1jp7ma2kuuim9.apps.googleusercontent.com',
                iosStandaloneAppClientId: '150449439362-sbjk90u5gfv2oi29qj6q3mp7chih2pqe.apps.googleusercontent.com',
                androidClientId: '150449439362-l1f4ogos63o5bfbpin8hhek756ju0utm.apps.googleusercontent.com',
                iosClientId: '150449439362-e43j1h4emqe3h80q8bspqvq83pfludmu.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            });

            if (result.type === 'success') {
                onSignIn(result);
                return result?.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.mainColor, colors.mainColor, colors.white, colors.white, colors.white]}
                style={styles.background}
            >
                <Image style={styles.logo} source={require('../assets/rocket2.png')} />

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
        borderRadius: 30,
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
        height: 30,
        marginRight: 5,
        width: 30
    },
    loginText: {
        color: colors.white
    },
    logo: {
        height: 150,
        position: 'absolute',
        top: 50,
        width: 150
    },
    socialButtonContent: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default LoginScreen;
