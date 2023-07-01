import { Upload, message } from 'antd';
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/es/upload';
import React, { useState } from 'react';
import { ModalHeader } from '../../..';
import { Avatar, Button, Card } from '../../../atoms';
import style from './index.module.scss';
import { Modal } from '../../../';
import classNames from 'classnames';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { useUpdateMerchantProfileMutation } from '../../../../app/features/merchant/merchantApiSlice';

interface CardAvatarProps {
  src: string;
}

const CardAvatar: React.FC<CardAvatarProps> = ({ src }) => {
  const [patch, { isLoading }] = useUpdateMerchantProfileMutation();
  const [file, setFile] = useState<File>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    setIsError(!isJpgOrPng || !isLt2M);
    return false;
  };

  const handleUpload: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    setFile(info.fileList[0].originFileObj);
    if (isError) return;
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFile(undefined);
  };

  const handleSubmit = async () => {
    try {
      if (!file) return;
      const formData = new FormData();
      formData.append('image', file);
      await patch(formData).unwrap();
      setIsModalOpen(false);
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  return (
    <>
      <Card className={style.profile__section__avatar}>
        <Avatar
          shape="square"
          className={style.profile__section__avatar__photo}
          src={src}
          alt="profile"
        />
        <Upload
          name="file"
          onChange={handleUpload}
          showUploadList={false}
          beforeUpload={beforeUpload}
          maxCount={1}
          className={classNames(
            style.profile__section__avatar__upload,
            'upload',
          )}
        >
          <Button className={style.profile__section__avatar__button} block>
            Upload
          </Button>
        </Upload>
        <p className={style.profile__section__avatar__info}>
          File format must be in JPG or PNG. File size must be less than 2MB.
        </p>
      </Card>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          onOk={handleSubmit}
          okButtonProps={{ loading: isLoading, disabled: isLoading }}
          centered
        >
          <ModalHeader
            title="Edit profile Picture"
            info="Are you sure you want to change your profile picture?"
          />
        </Modal>
      )}
    </>
  );
};

export default CardAvatar;
