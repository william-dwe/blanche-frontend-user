import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAddSealabsPayAccountMutation } from '../../../../app/features/profile/profileApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import { FormLabel, Input } from '../../../atoms';
import { Form, Modal, ModalHeader } from '../../../molecules';
import style from './index.module.scss';

interface AddSealabsPayProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const initialFormData = {
  cardNumber: '',
  nameOnCard: '',
  activeDate: '',
};

const AddSealabsPay: React.FC<AddSealabsPayProps> = ({
  isModalOpen,
  handleCancel,
  handleOk,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(initialFormData);
  const [submit, { isLoading }] = useAddSealabsPayAccountMutation();

  useEffect(() => {
    setFormData(initialFormData);
    setError(initialFormData);
  }, [isModalOpen]);

  const onChangeCardNumber = (str: string) => {
    const splitted = str.replace(/ /g, '').match(/[0-9]{1,4}/g);
    setFormData((prevValue) => ({
      ...prevValue,
      cardNumber: splitted?.join(' ') || '',
    }));
    setError((prevValue) => ({
      ...prevValue,
      cardNumber: '',
    }));
  };

  const onChangeActiveDate = (str: string) => {
    const splitted = str.replace(/ /g, '').match(/[0-9]{1,2}/g);
    if (str[1] === ' ' && str.length === 3) {
      const joined = str.replace(/ /g, '');
      setFormData((prevValue) => ({
        ...prevValue,
        activeDate: `${joined} / `,
      }));
      return;
    }
    setFormData((prevValue) => ({
      ...prevValue,
      activeDate: splitted?.join(' / ') || '',
    }));
    setError((prevValue) => ({
      ...prevValue,
      activeDate: '',
    }));
  };

  const onChangeNameOnCard = (str: string) => {
    setFormData((prevValue) => ({
      ...prevValue,
      nameOnCard: str,
    }));
    setError((prevValue) => ({
      ...prevValue,
      nameOnCard: '',
    }));
  };

  const validateCardNumber = () => {
    const trim = formData.cardNumber.replace(/ /g, '');
    if (trim.length !== 16) {
      setError((prevValue) => ({
        ...prevValue,
        cardNumber: 'Card number must be 16 digits',
      }));
    }
  };

  const validateNameOnCard = () => {
    if (!formData.nameOnCard) {
      setError((prevValue) => ({
        ...prevValue,
        nameOnCard: 'Name on card is required',
      }));
    }
  };

  const validateActiveDate = () => {
    const trim = formData.activeDate.replace(/ \/ /g, '');
    const splitted = formData.activeDate.replace(/ \/ /g, ' ').trim();
    const month = parseInt(splitted.split(' ')[0]);
    const year = parseInt('20' + splitted.split(' ')[1]);
    if (month > 12) {
      setError((prevValue) => ({
        ...prevValue,
        activeDate: 'Month must be less than 12',
      }));
      return;
    }
    if (Date.now() > new Date(year, month).getTime()) {
      setError((prevValue) => ({
        ...prevValue,
        activeDate: 'Active date is already expired',
      }));
      return;
    }
    if (trim.length !== 4) {
      setError((prevValue) => ({
        ...prevValue,
        activeDate: 'Active date is invalid',
      }));
    }
  };

  const preventNonNumeric = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (formData.activeDate[0] === '0' && event.key === '0') {
      event.preventDefault();
    }
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
    if (!formData.activeDate && event.key > '1') {
      setFormData((prevValue) => ({
        ...prevValue,
        activeDate: `0${prevValue.activeDate} `,
      }));
    }
    if (
      formData.activeDate.length === 1 &&
      formData.activeDate[0] === '1' &&
      event.key > '2'
    ) {
      event.preventDefault();
    }
  };

  const preventPasteNonNumeric = (
    event: React.ClipboardEvent<HTMLInputElement>,
  ) => {
    const clipBoardData = event.clipboardData.getData('text');
    if (!Number(clipBoardData)) {
      event.preventDefault();
    }
  };

  const handleSubmit = async () => {
    try {
      const { cardNumber, nameOnCard, activeDate } = formData;
      const splitted = activeDate.split(' / ');
      const year = parseInt('20' + splitted[1]);
      const month = parseInt(splitted[0]);
      const body = {
        card_number: cardNumber.replace(/ /g, ''),
        name_on_card: nameOnCard,
        active_date: new Date(year, month),
      };
      await submit(body).unwrap();
      handleOk();
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      width={600}
      okButtonProps={{ loading: isLoading, disabled: isLoading }}
    >
      <ModalHeader
        title="Add Sealabs Pay Account"
        info="Add your Sealabs Pay account that you want to use for payment in the
          future."
      />
      <Form name="basic" layout="vertical" autoComplete="off" preserve={false}>
        <FormLabel
          label="Card Number"
          help={error.cardNumber}
          validateStatus={error.cardNumber ? 'error' : 'success'}
        >
          <Input
            placeholder="Fill with the card number"
            maxLength={19}
            value={formData.cardNumber}
            onChange={(e) => {
              onChangeCardNumber(e.target.value);
            }}
            className={style.asp__input}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onBlur={() => {
              validateCardNumber();
            }}
            onPaste={(event) => {
              preventPasteNonNumeric(event);
            }}
          />
        </FormLabel>
        <FormLabel
          label="Name on card"
          help={error.nameOnCard}
          validateStatus={error.nameOnCard ? 'error' : 'success'}
        >
          <Input
            maxLength={32}
            placeholder="Fill with the name on your card"
            onChange={(e) => onChangeNameOnCard(e.target.value)}
            className={style.asp__input}
            onBlur={() => {
              validateNameOnCard();
            }}
            value={formData.nameOnCard}
          />
        </FormLabel>
        <FormLabel
          label="Active date (MM / YY)"
          help={error.activeDate}
          validateStatus={error.activeDate ? 'error' : 'success'}
        >
          <Input
            placeholder="Fill with the card active date"
            maxLength={7}
            value={formData.activeDate}
            onChange={(e) => onChangeActiveDate(e.target.value)}
            className={style.asp__input}
            onKeyPress={(event) => {
              preventNonNumeric(event);
            }}
            onPaste={(event) => {
              preventPasteNonNumeric(event);
            }}
            onBlur={() => {
              validateActiveDate();
            }}
          />
        </FormLabel>
      </Form>
    </Modal>
  );
};

export default AddSealabsPay;
