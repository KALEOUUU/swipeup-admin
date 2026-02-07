import imageCompression from 'browser-image-compression';

/**
 * Converts an image file to a base64 string (without data URL prefix), with aggressive compression to reduce size.
 * @param file - The image file to convert.
 * @returns A promise that resolves to the base64 string.
 */
export const convertImageToBase64 = async (file: File): Promise<string> => {
  const options = {
    maxSizeMB: 0.1, // Maximum size 100KB untuk menghindari error database
    maxWidthOrHeight: 300, // Maximum width or height untuk QRIS cukup 300px
    useWebWorker: true, // Use web worker for better performance
    initialQuality: 0.6, // Kualitas awal 60%
  };

  try {
    // Compress the image first
    const compressedFile = await imageCompression(file, options);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data URL prefix (e.g., "data:image/png;base64,")
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(compressedFile);
    });
  } catch (error) {
    throw new Error('Failed to compress and convert image: ' + error.message);
  }
};