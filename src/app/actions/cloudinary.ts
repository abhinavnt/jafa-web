'use server';

import { v2 as cloudinary } from 'cloudinary';

// Configure cloudinary
cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export async function deleteCloudinaryImage(url: string) {
  try {
    if (!url || !url.includes('cloudinary.com')) return { success: true };
    
    // Extract public_id from URL
    // e.g. https://res.cloudinary.com/dxyz123/image/upload/v1234567/my_folder/my_image.jpg
    const parts = url.split('/');
    const uploadIndex = parts.findIndex(p => p === 'upload');
    if (uploadIndex === -1) return { success: false, error: 'Invalid cloudinary URL' };
    
    // public_id is everything after the version (vXXXX) excluding the file extension
    // e.g. my_folder/my_image
    const versionIndex = uploadIndex + 1;
    let publicIdWithExtension = parts.slice(versionIndex + 1).join('/');
    
    // Handle cases where there is no version
    if (!parts[versionIndex].startsWith('v')) {
      publicIdWithExtension = parts.slice(versionIndex).join('/');
    }

    // Remove extension
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");
    
    if (!publicId) return { success: false, error: 'Could not extract public_id' };

    const result = await cloudinary.uploader.destroy(publicId);
    
    return { success: result.result === 'ok', result };
  } catch (error: any) {
    console.error('Error deleting image from Cloudinary:', error);
    return { success: false, error: error.message };
  }
}
