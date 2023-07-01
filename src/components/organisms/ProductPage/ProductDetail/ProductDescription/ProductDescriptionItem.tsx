import { Divider } from 'antd';
import React, { useState } from 'react';
import useProduct from '../../../../../hooks/useProduct';
import style from './index.module.scss';

const ProductDescriptionItem: React.FC = () => {
  const { product } = useProduct();
  const [showFullText, setShowFullText] = useState(false);

  return (
    <ul>
      <li>
        <span>Condition:</span>
        <p>{product?.is_used ? 'Used' : 'New'}</p>
      </li>
      <li>
        <span>Weight:</span>
        <p>{product?.weight}</p>
      </li>
      <li>
        <span>Category</span>
        <p>{product?.category?.name}</p>
      </li>
      <li className={style.desc}>
        <span>Description:</span>
        <p>
          {showFullText
            ? product?.description
            : product?.description?.substring(0, 200)}
        </p>
        <Divider style={{ margin: 0 }}>
          {!showFullText && product?.description ? (
            <button onClick={() => setShowFullText(true)}>Show more</button>
          ) : (
            <button onClick={() => setShowFullText(false)}>Show less</button>
          )}
        </Divider>
      </li>
    </ul>
  );
};

export default ProductDescriptionItem;
