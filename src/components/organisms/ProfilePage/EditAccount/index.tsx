import { Input } from 'antd';
import React from 'react';
import { Form, Modal } from '../../..';
import { IAccount } from '../../../../helpers/types';
import { Alert, FormLabel } from '../../../atoms';
import { Form as Aform } from 'antd';
import useForm from './useForm';
import style from './index.module.scss';
import { rules } from './validation';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';

interface EditAccountProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  account: IAccount;
}

const EditAccount: React.FC<EditAccountProps> = ({
  isModalOpen,
  handleCancel,
  handleOk,
  account,
}) => {
  const { handleSubmit, error, isLoading, isError } = useForm({ handleOk });
  const [form] = Aform.useForm();

  return (
    <Modal
      open={isModalOpen}
      onOk={form.submit}
      centered
      onCancel={handleCancel}
      width={600}
      destroyOnClose
      okButtonProps={{ loading: isLoading, disabled: isLoading }}
    >
      <div className={style.ea}>
        <div className={style.ea__header}>
          <h5 className={style.ea__header__title}>Edit Details</h5>
          <p className={style.ea__header__info}>
            Make sure the data is correct before submitting.
          </p>
        </div>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            email: account.email,
          }}
          onFinish={handleSubmit}
          autoComplete="off"
          preserve={false}
          form={form}
        >
          <FormLabel label="Email" name="email" rules={rules.email}>
            <Input placeholder="Email" />
          </FormLabel>
          {isError && error && (
            <Alert
              message={capitalizeFirstLetter(error?.message)}
              type="error"
              showIcon
              className={style.card__login__alert}
            />
          )}
        </Form>
      </div>
    </Modal>
  );
};

export default EditAccount;
