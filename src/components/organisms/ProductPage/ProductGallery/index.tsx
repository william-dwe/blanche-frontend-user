import { Skeleton } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import { setProductInfo } from '../../../../app/features/product/productSlice';
import { useAppDispatch } from '../../../../app/hooks';
import useProduct from '../../../../hooks/useProduct';
import { Image } from '../../../atoms';
import ModalGallery from '../ModalGallery';
import style from './index.module.scss';

const ProductGallery: React.FC = () => {
  const { product, activeImage, isLoading } = useProduct();
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleActiveImage = (image: string) => {
    dispatch(
      setProductInfo({
        activeImage: image,
      }),
    );
  };

  return (
    <div className={style.product__gallery}>
      <div className={style.product__gallery__image__active}>
        {isLoading ? (
          <Skeleton.Image />
        ) : (
          <Image
            src={activeImage as string}
            alt="active image"
            className={style.product__gallery__image__active__item}
            onClick={showModal}
          />
        )}
      </div>
      <div className={style.product__gallery__image__list}>
        {product?.images?.map((image, index) =>
          isLoading ? (
            <Skeleton key={image} />
          ) : (
            <div
              key={`${image} ${index}`}
              className={style.product__gallery__image__list__container}
            >
              <Image
                src={image}
                alt=""
                onClick={() => handleActiveImage(image)}
                className={classNames(
                  style.product__gallery__image__list__item,
                  activeImage === image &&
                    'product__gallery__image__list__item__active',
                )}
              />
            </div>
          ),
        )}
      </div>
      <ModalGallery
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        img={activeImage as string}
      />
    </div>
  );
};

export default ProductGallery;
