import React, { useState } from 'react';
import { Button, Card, FormLabel } from '../../../../atoms';
import { Modal, ModalHeader } from '../../../../molecules';
import ProductAttribute from '../ProductAttribute';
import ProductVariants from '../ProductVariants';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import style from './index.module.scss';
import { Switch, Form } from 'antd';
import { rules } from '../validation';
import classNames from 'classnames';
import './override.scss';

interface ProductTypeProps {
  isVariant: boolean;
  handleSetVariant: (value: boolean) => void;
}

const ProductType: React.FC<ProductTypeProps> = ({
  isVariant,
  handleSetVariant,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleSetVariant(!isVariant);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className={style.pt}>
        <div className={style.pt__header}>
          <div className={style.pt__top}>
            <h2 className={style.pt__title}>Product Attributes</h2>
            <Button
              onClick={showModal}
              size="small"
              icon={isVariant ? <MinusOutlined /> : <PlusOutlined />}
            >
              {isVariant ? 'Disable ' : 'Enable '}Variants
            </Button>
          </div>
          <p className={style.pt__info}>
            Decide whether the product has variants or not. Also, fill the
            attributes for the products.
          </p>
        </div>
        {isVariant ? <ProductVariants /> : <ProductAttribute />}
        <FormLabel label="Status" preserve={false} className={style.pt__label}>
          <div className={classNames(style.pt__switch, 'pt__switch')}>
            <Form.Item
              name="status"
              rules={rules.status}
              valuePropName="checked"
              initialValue={true}
            >
              <Switch defaultChecked disabled />
            </Form.Item>
            <span className={style.pt__switch__label}>Active</span>
          </div>
        </FormLabel>
      </Card>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        width={400}
        centered
      >
        <ModalHeader
          title={`${isVariant ? 'Disable' : 'Enable'} Variants`}
          info={`Are you sure you want to ${
            isVariant ? 'disable' : 'enable'
          }  variants? Variants data will be reset.`}
        />
      </Modal>
    </>
  );
};

export default ProductType;
