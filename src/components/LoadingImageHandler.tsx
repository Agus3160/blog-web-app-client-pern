import { Loader2 } from 'lucide-react';
import { useState } from 'react';

type Props = {
  src: string;
  alt?: string;
  className?: string;
  sizeLoader?: number;
}

const ImageLoadingHandler = ({ src, alt, className, sizeLoader=16 }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div className={className}>
      {isLoading && <Loader2 size={sizeLoader} color="white" className="m-auto h-full animate-spin" />}
      <img src={src} alt={alt} onLoad={handleImageLoaded} className={!isLoading ? className : 'hidden'} />
    </div>
  )
}

export default ImageLoadingHandler;
