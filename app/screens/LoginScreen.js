import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { Button } from 'react-native-elements/dist/buttons/Button';
import TDMButtom from './components/TDMButtom';

import firebase from '../../database/firebase';
import colors from '../config/colors';
import UpdateUser from './user/UpdateUser';

const LoginScreen = (props) => {

    const addNewUser = async (result) => {
        const dbRef = firebase.fireDb.collection('users').doc(result.user.uid)
        await dbRef.set({
            gmail: result.user.email,
            profile_picture: result.additionalUserInfo.profile.picture,
            locale: result.additionalUserInfo.profile.locale,
            first_name: result.additionalUserInfo.profile.given_name,
            last_name: result.additionalUserInfo.profile.family_name,
            created_at: Date.now()
        });
    };

    const updateUser = async (result) => {
        const dbRef = firebase.fireDb.collection('users').doc(result.user.uid)
        await dbRef.update({
            last_logged_in: Date.now()
        });
    };

    const isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    };

    const onSignIn = async (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.firebase.auth().onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken, googleUser.accessToken);
        
                // Sign in with credential from the Google user.
                firebase.firebase
                    .auth().signInWithCredential(credential)
                    .then((result) => {
                        if (result.additionalUserInfo.isNewUser) {
                            addNewUser(result);
                        } else {
                            updateUser(result);
                        }
                    })
                    .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                });
            } else {
                console.log('User already signed-in Firebase.');
            }
        });
    };

    const signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: '150449439362-l1f4ogos63o5bfbpin8hhek756ju0utm.apps.googleusercontent.com',
                iosClientId: '150449439362-e43j1h4emqe3h80q8bspqvq83pfludmu.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });
        
            if (result.type === 'success') {
                onSignIn(result);
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
          return { error: true };
        }
    };

    return (
        <View style={styles.body}>
            <TDMButtom title="Login con Google" customClick={() => signInWithGoogleAsync()} />
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
    }
});

export default LoginScreen;
