import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/es/upload';
import React, { useState } from 'react';
import { useMakeRequestRefundMutation } from '../../../../app/features/refund/refundApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { IRequestRefund } from '../../../../helpers/types/refund.interface';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import { Button, FormLabel, TextArea } from '../../../atoms';
import { Form, Modal, ModalHeader } from '../../../molecules';
import style from './index.module.scss';
import { rules } from './validation';

interface ModalRequestRefundProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  invoice_code: string;
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return false;
};

const ModalRequestRefund: React.FC<ModalRequestRefundProps> = ({
  isModalOpen,
  handleCancel,
  invoice_code,
}) => {
  const [file, setFile] = useState<File>();
  const [requestRefund, { isLoading }] = useMakeRequestRefundMutation();

  const handleUpload: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    setFile(info.fileList[0].originFileObj);
  };

  const handleSubmit = async (values: IRequestRefund) => {
    if (!file) {
      message.error('Please upload image');
      return;
    }

    const formData = new FormData();
    formData.append('invoice_code', invoice_code);
    formData.append('reason', values.reason);
    formData.append('image', file);

    try {
      await requestRefund(formData).unwrap();
      message.success('Request refund success');
      handleCancel();
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      closable
      className={style.modal__refund}
      destroyOnClose
    >
      <ModalHeader
        title="Request Refund"
        info={`Are you sure you want to request refund for invoice ${invoice_code}? please provide the reason below.`}
      />
      <Form
        className={style.modal__refund__form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <FormLabel
          name="reason"
          label="Reason"
          className={style.modal__refund__form__item}
          rules={rules.reason}
        >
          <TextArea showCount maxLength={300} minLength={10} />
        </FormLabel>
        <FormLabel
          name="image"
          label="image"
          rules={rules.image}
          className={style.modal__refund__form__item}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleUpload}
          >
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="avatar"
                style={{ width: '100%' }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </FormLabel>
        <div className={style.modal__refund__footer}>
          <Button type="primary" size="large" htmlType="submit">
            Request
          </Button>

          <Button type="primary" ghost size="large" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalRequestRefund;
