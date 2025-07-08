import { db } from '../db/Firebase';
import { doc, getDoc, updateDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';

export const getUserById = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data() : null;
};

export const updateUser = async (uid, data) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, data);
};

export const getBlogsByUser = async (uid) => {
  const blogsRef = collection(db, 'blogs');
  const q = query(blogsRef, where('authorId', '==', uid));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteBlog = async (blogId) => {
  await deleteDoc(doc(db, 'blogs', blogId));
};
