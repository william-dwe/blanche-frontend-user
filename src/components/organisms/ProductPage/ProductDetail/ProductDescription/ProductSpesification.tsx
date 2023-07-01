import React from 'react';
import useProduct from '../../../../../hooks/useProduct';

const ProductSpecification: React.FC = () => {
  const { product } = useProduct();
  return (
    <ul>
      <li>
        <span>Width: </span>
        <p>{product?.dimension?.width}</p>
      </li>
      <li>
        <span>Length: </span>
        <p>{product?.dimension?.length}</p>
      </li>
      <li>
        <span>Height:</span>
        <p>{product?.dimension?.height}</p>
      </li>
    </ul>
  );
};

export default ProductSpecification;
