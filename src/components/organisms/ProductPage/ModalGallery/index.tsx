import { Skeleton } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import useProduct from '../../../../hooks/useProduct';
import { Image } from '../../../atoms';
import Modal from '../../../molecules/Modal';
import style from './index.module.scss';

interface ModalGalleryProps {
  img: string;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const ModalGallery: React.FC<ModalGalleryProps> = ({
  img,
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const { product, activeImage, isLoading } = useProduct();
  const [activeImg, setActiveImg] = useState(img);

  const handleActiveImage = (image: string) => {
    setActiveImg(image);
  };

  useEffect(() => {
    setActiveImg(img);
  }, [img]);

  return (
    <Modal
      title="Modal Product Gallery"
      open={isModalOpen}
      onOk={handleOk}
      centered
      onCancel={handleCancel}
      width={900}
    >
      <div className={style.modal__gallery}>
        <div className={style.modal__gallery__image__active}>
          {isLoading ? (
            <Skeleton.Image />
          ) : (
            <Image
              src={activeImg as string}
              alt="active image"
              className={style.modal__gallery__image__active__item}
            />
          )}
        </div>
        <div className={style.modal__gallery__image__list}>
          {product?.images?.map((image, index) =>
            isLoading ? (
              <Skeleton key={image} />
            ) : (
              <div
                key={`${image} ${index}`}
                className={style.modal__gallery__image__list__container}
              >
                <Image
                  src={image}
                  alt=""
                  onClick={() => handleActiveImage(image)}
                  className={classNames(
                    style.modal__gallery__image__list__item,
                    activeImage === image &&
                      'modal__gallery__image__list__item__active',
                  )}
                />
              </div>
            ),
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalGallery;
