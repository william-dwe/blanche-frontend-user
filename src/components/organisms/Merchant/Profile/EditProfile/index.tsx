import { Input } from 'antd';
import React from 'react';
import { Form, Modal } from '../../../../';
import { Alert, FormLabel } from '../../../../atoms';
import { Form as Aform } from 'antd';
import useForm from './useForm';
import style from './index.module.scss';
import { rules } from './validation';
import { capitalizeFirstLetter } from '../../../../../helpers/capitalizeFirstLetter';
import { EditMerchantProfileProps } from '../../../../../helpers/types/merchant/profile.interface';

interface EditProfileProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  profile: EditMerchantProfileProps;
}

const EditProfile: React.FC<EditProfileProps> = ({
  isModalOpen,
  handleCancel,
  handleOk,
  profile,
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
          <h5 className={style.ea__header__title}>Edit Profile</h5>
          <p className={style.ea__header__info}>
            Make sure the data is correct before submitting.
          </p>
        </div>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            name: profile.name,
          }}
          onFinish={handleSubmit}
          autoComplete="off"
          preserve={false}
          form={form}
        >
          <FormLabel label="Name" name="name" rules={rules.name}>
            <Input placeholder="Name" />
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

export default EditProfile;
