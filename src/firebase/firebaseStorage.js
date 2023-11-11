import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from './firebaseConfig';

export const uploadImage = async (file) => {
  if (!file) return null;

  const storageRef = ref(storage, 'images/' + file.name); // Creates a reference to 'images/filename'
  await uploadBytes(storageRef, file);

  return getDownloadURL(storageRef); // Returns the URL of the uploaded file
};

// Delete an image
export const deleteImage = async (imageUrl) => {
    if (imageUrl) {
      // Delete the image from Firebase Storage
      const storage = getStorage();
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }
};