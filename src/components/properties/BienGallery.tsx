import { useState } from 'react';
import { resolveAssetUrl } from '../../lib/assetUrl';
import type { PhotoDto } from '../../types';
import { LazyImage } from './LazyImage';

interface BienGalleryProps {
  photos: PhotoDto[];
  title: string;
  fallbackImageUrl: string | null;
}

export function BienGallery({ photos, title, fallbackImageUrl }: BienGalleryProps) {
  const images = photos.length > 0 ? photos.map((p) => p.url) : fallbackImageUrl ? [fallbackImageUrl] : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = resolveAssetUrl(images[activeIndex]);

  return (
    <div>
      <LazyImage src={activeImage} alt={title} className="h-64 w-full rounded-lg sm:h-80 lg:h-96" />

      {images.length > 1 && (
        <div role="list" aria-label="Photos du bien" className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              role="listitem"
              aria-current={index === activeIndex}
              aria-label={`Photo ${index + 1} sur ${images.length}`}
              onClick={() => setActiveIndex(index)}
              className={`flex-shrink-0 overflow-hidden rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                index === activeIndex ? 'ring-2 ring-brand-600' : ''
              }`}
            >
              <LazyImage src={resolveAssetUrl(image)} alt="" className="h-16 w-24" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
