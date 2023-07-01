import { Button, message } from 'antd';
import React from 'react';
import { MdShare } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import {
  TwitterIcon,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  LineIcon,
  LineShareButton,
} from 'react-share';
import useProduct from '../../../../../hooks/useProduct';
import { Input } from '../../../../atoms';
import { Modal, ModalHeader } from '../../../../molecules';
import style from './index.module.scss';

interface ModalShareProps {
  isModalOpen: boolean;
  handleClose: () => void;
}

const ModalShare: React.FC<ModalShareProps> = ({
  isModalOpen,
  handleClose,
}) => {
  const { product } = useProduct();

  const title = `
  Find this product on Blanche.life ${product?.title}
  `;

  const { store, slug } = useParams();
  const shareUrl = `https://www.blanche.life/${store}/${slug}`;

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    message.info('Link copied to clipboard');
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleClose}
      className={style.product__action__container}
      closable={true}
      footer={null}
      width={450}
    >
      <ModalHeader
        title="Share"
        info="
        Share this product with your friends
      "
      />
      <div className={style.product__action__modal}>
        <WhatsappShareButton url={shareUrl} title={title}>
          <WhatsappIcon round={true} size={54} iconFillColor={'white'} />
        </WhatsappShareButton>

        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon round={true} size={54} iconFillColor={'white'} />
        </TwitterShareButton>

        <FacebookShareButton url={shareUrl} title={title}>
          <FacebookIcon round={true} size={54} iconFillColor={'white'} />
        </FacebookShareButton>

        <LineShareButton url={shareUrl} title={title}>
          <LineIcon round={true} size={54} iconFillColor={'white'} />
        </LineShareButton>

        <LinkedinShareButton url={shareUrl} title={title}>
          <LinkedinIcon round={true} size={54} iconFillColor={'white'} />
        </LinkedinShareButton>
      </div>
      <div className={style.product__action__share}>
        <h6>or copy this link </h6>
        <div className={style.product__action__share__link}>
          <Input value={shareUrl} />
          <Button
            onClick={handleCopyShareLink}
            type="primary"
            size="large"
            className={style.product__action__share__link__btn}
          >
            <MdShare /> Copy
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalShare;
