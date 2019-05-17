import * as React from 'react';
import syled from 'styled-components';

import Link from '../atoms/Link';
import Image from '../atoms/Image';

interface Props {
  url: string;
  src: string;
}

const component: React.FC<Props> = ({ url, src, ...props }) => (
  <Link url={url} {...props}>
    <Image src={src} />
  </Link>
);

export default component;
