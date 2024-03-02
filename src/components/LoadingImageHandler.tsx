import { CircleUser, Loader2 } from 'lucide-react';
import { useState } from 'react';

type Props = {
  src: string;
  type: string;
  alt?: string;
  className?: string;
  sizeLoader?: number;
}

const ImageLoadingHandler = ({ src, alt, className, sizeLoader=16, type }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div className={className}>
      {isLoading && type === 'avatar' && <CircleUser size={sizeLoader} className="slate-800 m-auto h-full animate-pulse" />}
      {isLoading && type === 'image' && <Loader2 size={sizeLoader} className="slate-800 m-auto h-full animate-spin" />}
      <img src={src} alt={alt} onLoad={handleImageLoaded} className={!isLoading ? className : 'hidden'} />
    </div>
  )
}

export default ImageLoadingHandler;
