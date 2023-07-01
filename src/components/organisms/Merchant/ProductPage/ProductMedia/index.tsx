import { PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/es/upload';
import React, { useState } from 'react';
import { Card, FormLabel } from '../../../../atoms';
import { rules } from '../validation';
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

const getFile = (e: UploadChangeParam<UploadFile>) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const ProductMedia: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleUpload: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    setFileList(info.fileList);
  };

  return (
    <Card className={style.pm}>
      <div className={style.pm__header}>
        <h2 className={style.pm__title}>Product Media</h2>
        <p className={style.pm__info}>
          Upload the product media to attract user attention. You can upload up
          to 9 images.
        </p>
      </div>
      <FormLabel
        label="Product Image"
        name="images"
        rules={rules.images}
        valuePropName="fileList"
        getValueFromEvent={getFile}
      >
        <Upload
          name="file"
          onChange={handleUpload}
          fileList={fileList}
          beforeUpload={beforeUpload}
          listType="picture-card"
          showUploadList={{ showPreviewIcon: false }}
        >
          {fileList?.length >= 9 ? null : (
            <div className={style.pm__upload}>
              <PlusOutlined />
              <p>Upload</p>
            </div>
          )}
        </Upload>
      </FormLabel>
    </Card>
  );
};

export default ProductMedia;
