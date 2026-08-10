import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

/**
 * POST /api/upload
 * Receives a file (as FormData) and uploads it to Cloudinary.
 * Returns the secure URL of the uploaded image.
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const side = formData.get('side') || 'product'; // front, left, right, back

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary using upload_stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `prachinluxe/products`,
          public_id: `${side}_${Date.now()}`,
          resource_type: 'image',
          transformation: [
            { quality: 'auto', fetch_format: 'auto' },
            { width: 1200, height: 1200, crop: 'limit' },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      side,
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
