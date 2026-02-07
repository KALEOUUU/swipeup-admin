import imageCompression from 'browser-image-compression';

/**
 * Converts an image file to a base64 string (without data URL prefix), with compression to reduce size.
 * @param file - The image file to convert.
 * @returns A promise that resolves to the base64 string.
 */
export const convertImageToBase64 = async (file: File): Promise<string> => {
  const options = {
    maxSizeMB: 1, // Maximum size in MB
    maxWidthOrHeight: 800, // Maximum width or height
    useWebWorker: true, // Use web worker for better performance
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