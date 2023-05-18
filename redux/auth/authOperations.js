import db from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password, picture = "" }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);

      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: login,
        email: email,
        pictureURL: picture,
      });

      const { displayName, uid, email, pictureURL } = await db.auth().currentUser;

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        email: email,
        picture: pictureURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (err) {
      console.log("err", err.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("err", err.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await db.auth().signOut();

    dispatch(authSignOut());
  } catch (err) {
    console.log("err", err.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await db.auth().onAuthStateChanged((user) => {
      if (user) {
        const userUpdateProfile = {
          userId: user.uid,
          login: user.displayName,
          picture: user.pictureURL,
          email: user.email,
        };
        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile(userUpdateProfile));
      }
    });
  } catch (err) {
    console.log("err", err.message);
  }
};
