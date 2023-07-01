import { message, Upload, UploadProps, Form as AForm } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';
import { Form } from '../../..';
import { useAddProductReviewByInvCodeMutation } from '../../../../app/features/reviews/reviewsApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import {
  IGetTransactionDetailsResponse,
  ITransaction,
} from '../../../../helpers/types';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import {
  IAddProductReviewRequest,
  IGetProductReviewByInvCodeResponse,
} from '../../../../helpers/types/review.interface';
import { Button, Card, FormLabel, Rate, TextArea } from '../../../atoms';
import ProductItem from '../ProductItem';
import style from './index.module.scss';

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

interface CardReviewProductProps {
  data: IGetProductReviewByInvCodeResponse;
  transaction: ITransaction | IGetTransactionDetailsResponse | undefined;
}

interface ValuesForm {
  rating: number;
  image_url: File;
  description: string;
}

const CardReviewProduct: React.FC<CardReviewProductProps> = ({
  data,
  transaction,
}) => {
  const [file, setFile] = useState<File>();
  const [addReview, { isLoading }] = useAddProductReviewByInvCodeMutation();

  const handleUpload: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    setFile(info.fileList[0].originFileObj);
  };

  const uploadButton = <div style={{ marginTop: 8 }}>Upload</div>;

  useEffect(() => {
    if (data.reviewed_at === null) {
      return;
    }
    form.setFieldsValue({
      rating: data.rating,
      image_url: data.image_url,
      description: data.description,
    });
  }, []);

  const [form] = AForm.useForm();

  const handleSubmitReview = async (formData: IAddProductReviewRequest) => {
    try {
      await addReview(formData).unwrap();
      message.success('Review Product Success');
    } catch (error) {
      const err = error as IErrorResponse;
      message.error(capitalizeFirstLetter(err.message));
    }
  };

  const onFinish = (values: ValuesForm) => {
    const formData = new FormData();

    if (!transaction) {
      return;
    }

    if (file) {
      formData.append('image', file as File);
    }

    formData.append('rating', JSON.stringify(values.rating));
    formData.append('description', values.description || '');
    formData.append('product_id', JSON.stringify(data.product_id));
    formData.append('variant_item_id', JSON.stringify(data.variant_item_id));

    const body = {
      invoice_code: transaction.invoice_code,
      form_data: formData,
    };

    handleSubmitReview(body);
  };

  return (
    <Card className={style.card__review__product}>
      <ProductItem item={data} />
      <Form
        form={form}
        onFinish={onFinish}
        className={style.card__review__product__form}
      >
        <FormLabel
          label="Rating"
          name="rating"
          className={style.card__review__product__label}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Rate
            defaultValue={data.rating}
            disabled={data.reviewed_at !== null}
          />
        </FormLabel>
        <FormLabel
          name="image_url"
          className={style.card__review__product__label}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleUpload}
            disabled={data.reviewed_at !== null}
          >
            {data.reviewed_at !== null ? (
              <img
                src={data.image_url}
                alt="avatar"
                style={{ width: '100%' }}
              />
            ) : file ? (
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
        <FormLabel
          name="description"
          className={style.card__review__product__label}
        >
          <TextArea
            placeholder="Review Product "
            disabled={data.reviewed_at !== null}
            value={data.reviewed_at !== null ? data.description : ''}
          />
        </FormLabel>
        {data.reviewed_at === null && (
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Submit
          </Button>
        )}
      </Form>
    </Card>
  );
};

export default CardReviewProduct;
