import { Divider, message } from 'antd';
import React from 'react';
import { MdFavorite, MdShare } from 'react-icons/md';
import { IProductDetail } from '../../../../../helpers/types';
import { Button } from '../../../../atoms';
import style from './index.module.scss';
import ModalShare from './ModalShare';
import {
  useGetFavoriteProductsQuery,
  useUpdateFavoriteProductMutation,
} from '../../../../../app/features/profile/favoriteProductApiSlice';
import { useAppSelector } from '../../../../../app/hooks';
import { IErrorResponse } from '../../../../../helpers/types/response.interface';
import { capitalizeFirstLetter } from '../../../../../helpers/capitalizeFirstLetter';
import { useNavigate } from 'react-router-dom';

interface ProductActionProps {
  product?: IProductDetail;
}

const ProductAction: React.FC<ProductActionProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const { data: dataFavProduct } = useGetFavoriteProductsQuery(
    {
      productId: product?.id || 0,
    },
    { skip: !isLoggedIn },
  );

  const [updateFavoriteProduct] = useUpdateFavoriteProductMutation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isFavorite = Boolean(dataFavProduct?.products?.length);

  const handleButtonFavClick = async () => {
    try {
      if (!isLoggedIn || !product) {
        message.warning('Please Login To Add Favorite Product');

        navigate('/login');
        return;
      }
      await updateFavoriteProduct({
        product_id: product?.id || 0,
        is_favorited: !isFavorite,
      }).unwrap();

      message.success(
        isFavorite
          ? 'Successfully remove favorite product'
          : 'Succesfully favorite product',
      );
    } catch (err) {
      const error = err as IErrorResponse;

      message.error(capitalizeFirstLetter(error.message));
    }
  };

  return (
    <div className={style.product__action}>
      <Button
        type="link"
        size="large"
        className={style.product__action__btn}
        onClick={handleOpenModal}
      >
        {' '}
        <MdShare /> Share{' '}
      </Button>
      <Divider type="vertical" />
      <Button
        type="link"
        size="large"
        onClick={handleButtonFavClick}
        className={
          isFavorite
            ? style.product__action__fav_filled
            : style.product__action__btn
        }
      >
        <MdFavorite />
        Favorite
      </Button>

      <ModalShare isModalOpen={isModalOpen} handleClose={handleCloseModal} />
    </div>
  );
};

export default ProductAction;
