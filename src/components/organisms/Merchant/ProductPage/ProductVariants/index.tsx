import {
  Button,
  Divider,
  Form,
  InputNumber,
  message,
  Select,
  Table,
  Upload,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { FormLabel, Input } from '../../../../atoms';
import { rules } from '../validation';
import style from './index.module.scss';
import './override.scss';
import { PlusOutlined } from '@ant-design/icons';
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/es/upload';
import { useGetVariantsByIDQuery } from '../../../../../app/features/merchant/merchantApiSlice';
import { useParams } from 'react-router';

interface Row {
  key: string;
  image: React.ReactNode;
  price: React.ReactNode;
  stock: React.ReactNode;
  firstVariant?: string;
  secondVariant?: string;
}

const defaultOptions = [
  {
    label: 'Type 1',
    value: 'Type 1',
  },
  {
    label: 'Type 2',
    value: 'Type 2',
  },
  {
    label: 'Type 3',
    value: 'Type 3',
  },
];

const defaultColumns: ColumnsType<Row> = [
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
  },
];

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

const ProductVariants: React.FC = () => {
  const params = useParams();

  const { data: variants } = useGetVariantsByIDQuery(
    params.id ? parseInt(params.id) : 0,
    { skip: !Boolean(params.id) },
  );
  const [isSecondVariant, setIsSecondVariant] = useState(
    variants?.variant_options?.length === 2,
  );
  const [dataSource, setDataSource] = useState<Row[]>();
  const [columns, setColumns] = useState<ColumnsType<Row>>(defaultColumns);
  const form = Form.useFormInstance();
  const firstVariant: string = Form.useWatch('firstVariant', form);
  const secondVariant: string = Form.useWatch('secondVariant', form);
  const firstSelect: string[] = Form.useWatch('firstSelect', form);
  const secondSelect: string[] = Form.useWatch('secondSelect', form);
  const variantItems = Form.useWatch('variantItems', form);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUpload: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    setFileList(info.fileList);
  };

  useEffect(() => {
    let newArr: ColumnsType<Row> = defaultColumns;
    if (firstVariant && firstVariant.length >= 3) {
      const newColumns = {
        title: firstVariant.toString(),
        dataIndex: 'firstVariant',
        key: 'firstVariant',
      };
      newArr = [newColumns, ...defaultColumns];
    }
    if (
      secondVariant &&
      secondVariant.length >= 3 &&
      secondSelect &&
      secondSelect.length > 0 &&
      secondVariant !== firstVariant
    ) {
      const newColumns = {
        title: secondVariant.toString(),
        dataIndex: 'secondVariant',
        key: 'secondVariant',
      };
      newArr = [newArr[0], newColumns, ...defaultColumns];
    }
    setColumns(newArr);
  }, [firstVariant, secondVariant, firstSelect, secondSelect, isSecondVariant]);

  useEffect(() => {
    if (!firstSelect || firstVariant.length < 3) {
      setDataSource([]);
      return;
    }
    if (firstSelect && !secondSelect) {
      const res: Row[] = firstSelect.map((item, index) => {
        return {
          key: index.toString(),
          firstVariant: item,
          image: (
            <FormLabel
              name={['variantItems', index, 'image']}
              valuePropName="fileList"
              getValueFromEvent={getFile}
              rules={rules.images}
            >
              <Upload
                name="file"
                beforeUpload={beforeUpload}
                listType="picture-card"
                showUploadList={{ showPreviewIcon: false }}
                fileList={fileList}
                onChange={handleUpload}
              >
                {variantItems &&
                  variantItems[index] &&
                  (!variantItems[index].image ||
                    variantItems[index].image.length !== 1) && (
                    <div className={style.pm__upload}>
                      <PlusOutlined />
                      <p>Upload</p>
                    </div>
                  )}
              </Upload>
            </FormLabel>
          ),
          price: (
            <FormLabel
              name={['variantItems', index, 'price']}
              rules={rules.price}
              preserve={false}
            >
              <InputNumber min={100} placeholder="Price" addonBefore="Rp" />
            </FormLabel>
          ),
          stock: (
            <FormLabel
              name={['variantItems', index, 'stock']}
              rules={rules.stock}
              preserve={false}
            >
              <InputNumber min={0} placeholder="Stock" />
            </FormLabel>
          ),
        };
      });
      setDataSource(res);
      return;
    }

    if (
      firstSelect &&
      firstVariant.length >= 3 &&
      secondSelect &&
      secondVariant.length >= 3
    ) {
      const res: Row[] = [];
      firstSelect.forEach((firstItem, firstIndex) =>
        secondSelect.forEach((secondItem, secondIndex) => {
          const idx = firstIndex * secondSelect.length + secondIndex;
          res.push({
            key: `${firstIndex}-${secondIndex}`,
            firstVariant: firstItem,
            secondVariant: secondItem,
            image: (
              <FormLabel
                name={['variantItems', idx, 'image']}
                valuePropName="fileList"
                getValueFromEvent={getFile}
                rules={rules.images}
              >
                <Upload
                  name="file"
                  beforeUpload={beforeUpload}
                  listType="picture-card"
                  showUploadList={{ showPreviewIcon: false }}
                >
                  {variantItems &&
                    variantItems[idx] &&
                    (!variantItems[idx].image ||
                      variantItems[idx].image.length !== 1) && (
                      <div className={style.pm__upload}>
                        <PlusOutlined />
                        <p>Upload</p>
                      </div>
                    )}
                </Upload>
              </FormLabel>
            ),
            price: (
              <FormLabel
                name={['variantItems', idx, 'price']}
                rules={rules.price}
                preserve={false}
              >
                <InputNumber min={100} placeholder="Price" />
              </FormLabel>
            ),
            stock: (
              <FormLabel
                name={['variantItems', idx, 'stock']}
                rules={rules.stock}
                preserve={false}
              >
                <InputNumber min={0} placeholder="Stock" />
              </FormLabel>
            ),
          });
        }),
      );
      setDataSource(res);
    }
  }, [
    firstSelect,
    secondSelect,
    firstVariant,
    secondVariant,
    isSecondVariant,
    variantItems,
  ]);

  const toggleSecondVariant = () => {
    setIsSecondVariant((prevValue) => !prevValue);
  };

  return (
    <div className={classNames(style.pv, 'pv')}>
      <div>
        <FormLabel
          name="firstVariant"
          label="Variant 1"
          validateTrigger="onBlur"
          rules={rules.firstVariant}
          preserve={false}
        >
          <Input placeholder="ex: Size or Color" size="small" />
        </FormLabel>
        {firstVariant && firstVariant.length >= 3 && (
          <FormLabel
            name="firstSelect"
            rules={rules.variantType}
            preserve={false}
          >
            <Select
              mode="tags"
              placeholder="Type and press enter to add new variant type"
              options={defaultOptions}
            />
          </FormLabel>
        )}
      </div>
      <Divider dashed />
      {isSecondVariant ? (
        <>
          <FormLabel
            name="secondVariant"
            label="Variant 2"
            rules={rules.secondVariant}
            preserve={false}
          >
            <Input placeholder="ex: Size or Color" size="small" />
          </FormLabel>
          {secondVariant && secondVariant.length >= 3 && (
            <FormLabel
              name="secondSelect"
              rules={rules.variantType}
              preserve={false}
            >
              <Select
                mode="tags"
                placeholder="Type and press enter to add new variant type"
                options={defaultOptions}
              />
            </FormLabel>
          )}
          <Button onClick={toggleSecondVariant}>Remove second variant</Button>
        </>
      ) : (
        <Button
          onClick={toggleSecondVariant}
          disabled={!firstVariant || !firstSelect}
        >
          Add second variant
        </Button>
      )}
      <Divider dashed />
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default ProductVariants;
