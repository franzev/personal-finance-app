import React from 'react';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
};

const Image = ({ src, alt, width, height, priority, fill, ...props }: ImageProps) => {
  return <img src={src} alt={alt} width={width} height={height} {...props} />;
};

export default Image;
