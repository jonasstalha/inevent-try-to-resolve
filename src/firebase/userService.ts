import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

interface UserProfile {
  email: string;
  name: string;
  phone: string;
  role: 'artist' | 'client' | 'admin';
}

export const createUserProfile = async (userId: string, profile: UserProfile) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      ...profile,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserRole = async (userId: string): Promise<'artist' | 'client' | 'admin' | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
    return null;
  } catch (error) {
    console.error('Error getting user role:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  try {
    await setDoc(doc(db, 'users', userId), updates, { merge: true });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
