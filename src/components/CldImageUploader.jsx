"use client";

import React, { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

/**
 * CldImageUploader - A reusable Next.js client component for uploading images via Cloudinary.
 *
 * @param {Object} props
 * @param {string} [props.label] - Optional label text to display above the uploader.
 * @param {Object|string} [props.value] - Current image value ({ url, publicId } object or string URL).
 * @param {Function} props.onChange - Callback triggered on successful upload: ({ url, publicId }) => void.
 */
export default function CldImageUploader({ label, value, onChange }) {
  const [isUploading, setIsUploading] = useState(false);

  // Safely extract the image URL for preview (supports string or { url, publicId } object)
  const imageUrl = typeof value === 'string' ? value : value?.url || '';

  const handleSuccess = (result) => {
    setIsUploading(false);
    console.log("UPLOADIMG", {
      url: result.info.secure_url,
      publicId: result.info.public_id,
    })
    if (result?.info?.secure_url && result?.info?.public_id) {
      onChange?.({
        url: result.info.secure_url,
        publicId: result.info.public_id,
      });
    }
  };

  const handleUploadStart = () => {
    setIsUploading(true);
  };

  const handleError = (error) => {
    setIsUploading(false);
    console.error('Cloudinary Upload Error:', error);
  };

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="block text-xs font-bold text-royal-blue-900 uppercase tracking-widest font-cinzel">
          {label}
        </label>
      )}

      <div className="bg-sand-50/50 border border-gold-500/20 rounded-xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm transition-all hover:border-gold-500/40">
        {/* Preview Container */}
        {imageUrl ? (
          <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gold-500/30 bg-white shadow-sm group">
            <img
              src={imageUrl}
              alt={label || 'Uploaded image'}
              className="w-full h-full object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center gap-2 text-white">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Uploading...</span>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full aspect-square rounded-lg border-2 border-dashed border-gold-500/20 bg-white flex flex-col items-center justify-center text-gray-400 p-4 text-center">
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-3 border-gold-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-[11px] font-bold text-royal-blue-900 uppercase tracking-wider">Uploading...</span>
              </div>
            ) : (
              <>
                <svg className="w-8 h-8 mb-2 text-gold-500/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[11px] font-semibold text-gray-400">No Image Uploaded</span>
              </>
            )}
          </div>
        )}

        {/* Cloudinary Upload Widget */}
        <CldUploadWidget
          uploadPreset={uploadPreset}
          onSuccess={handleSuccess}
          onOpen={handleUploadStart}
          onError={handleError}
          options={{
            maxFiles: 1,
            resourceType: 'image',
            clientAllowedFormats: ['png', 'jpeg', 'jpg', 'webp'],
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              disabled={isUploading}
              className="w-full py-2.5 px-4 bg-royal-blue-900 hover:bg-gold-600 active:scale-[0.98] text-white text-xs font-bold font-cinzel tracking-widest rounded-lg transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed uppercase flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {imageUrl ? 'Change Image' : 'Upload Image'}
            </button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
}
