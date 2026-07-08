'use client';
import React, { useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { X, Check } from 'lucide-react';

interface ImageCropperModalProps {
  imageSrc: string;
  onCropComplete: (croppedImageFile: File) => void;
  onClose: () => void;
  aspectRatio?: number;
}

export default function ImageCropperModal({ 
  imageSrc, 
  onCropComplete, 
  onClose,
  aspectRatio = 1 // Default to 1:1 square
}: ImageCropperModalProps) {
  const cropperRef = useRef<ReactCropperElement>(null);

  const createCroppedImage = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.getCroppedCanvas({
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      }).toBlob((blob) => {
        if (!blob) {
          alert('Failed to crop image');
          return;
        }
        const file = new File([blob], 'cropped_image.jpg', { type: 'image/jpeg' });
        onCropComplete(file);
      }, 'image/jpeg', 0.9);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-bold text-lg text-gray-900">
            {aspectRatio ? `Crop Image` : `Crop Image (Free Ratio)`}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cropper Container */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] bg-gray-900 flex items-center justify-center">
          <Cropper
            src={imageSrc}
            style={{ height: '100%', width: '100%' }}
            // Apply aspectRatio only if it's passed and greater than 0
            // When aspectRatio is NaN or undefined, it allows free cropping
            aspectRatio={aspectRatio || NaN}
            guides={true}
            ref={cropperRef}
            viewMode={1}
            dragMode="crop"
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          />
        </div>

        {/* Footer Controls */}
        <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={createCroppedImage}
            className="px-5 py-2.5 rounded-lg bg-[#8B3A2B] text-white font-medium hover:bg-[#722F23] transition-colors flex items-center gap-2"
          >
            <Check size={18} />
            Crop & Upload
          </button>
        </div>
      </div>
    </div>
  );
}
