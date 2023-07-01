import React, { ChangeEvent, Fragment, useState } from 'react';
import {
  Card,
  FormLabel,
  Input,
  Modal,
  ModalHeader,
  SEO,
} from '../../components';
import style from './index.module.scss';
import { Button, Divider, message, Radio, RadioChangeEvent } from 'antd';
import { useGetSealabsPayAccountQuery } from '../../app/features/profile/profileApiSlice';
import classNames from 'classnames';
import './override.scss';
import { toRupiahWithoutSymbol } from '../../helpers/toRupiah';
import { useTopUpWalletMutation } from '../../app/features/wallet/walletApiSlice';
import TopupIframe from '../../components/organisms/TopupIframe';
import { ValidateStatus } from 'antd/es/form/FormItem';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';
import { MdAddCircleOutline } from 'react-icons/md';
import AddSealabsPay from '../../components/organisms/UserSealabsPay/AddSealabsPay';

const { Group } = Radio;

interface IInput {
  value: number | undefined;
  formattedValue: string | undefined;
}

const initialInputState: IInput = {
  value: undefined,
  formattedValue: undefined,
};

const TopupWallet: React.FC = () => {
  const { data } = useGetSealabsPayAccountQuery();
  const [inputState, setInputState] = useState(initialInputState);
  const [selectedAcc, setSelectedAcc] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIFrameOpen, setIsIFrameOpen] = useState(false);
  const [src, setSrc] = useState('');
  const [topup] = useTopUpWalletMutation();
  const [status, setStatus] = useState<ValidateStatus>('');
  const [errorInput, setErrorInput] = useState('');

  const [isModalSLPOpen, setIsModalSLPOpen] = useState(false);

  const handleOpenModalSLP = () => {
    setIsModalSLPOpen(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const body = {
        amount: Number(inputState.value),
        slp_card_number: selectedAcc.toString(),
      };
      const data = await topup(body).unwrap();
      setSrc(data.slp_redirect_url);
      setIsIFrameOpen(true);
    } catch (err) {
      message.error(capitalizeFirstLetter((err as Error).message));
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFrameCancel = () => {
    setIsIFrameOpen(false);
  };
  const handleCloseModalSLP = () => {
    setIsModalSLPOpen(false);
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    let str = e.target.value;
    str = str.replace(/[^0-9]/g, '');
    const amount = str !== '' ? parseInt(str) : undefined;
    setInputState({
      value: amount,
      formattedValue: amount ? toRupiahWithoutSymbol(amount) : '',
    });
    if (!amount) {
      setErrorInput('Amount must be filled');
      setStatus('error');
      return;
    }
    if (amount < 10000) {
      setErrorInput('Amount must be more than 10.000');
      setStatus('error');
      return;
    }
    if (amount > 2000000) {
      setErrorInput('Amount must be less than 2.000.000');
      setStatus('error');
      return;
    }
    setErrorInput('');
    setStatus('success');
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    setSelectedAcc(e.target.value);
  };

  return (
    <>
      <SEO title="Top Up Wallet" description="Top Up Wallet page" />
      <div className={style.tw}>
        <h3 className={style.tw__title}>Top Up Wallet</h3>
        <Card className={style.tw__card}>
          <div className={style.tw__amount}>
            <h4 className={style.tw__card__subtitle}>Amount</h4>
            <FormLabel help={errorInput} validateStatus={status}>
              <Input
                addonBefore="Rp"
                onChange={onChangeInput}
                value={inputState.formattedValue}
              />
            </FormLabel>
          </div>
          <div className={style.tw__card__list}>
            <h4 className={style.tw__card__subtitle}>Pay with:</h4>
            {data && (
              <Group
                name="group"
                className={classNames(style.tw__radio, 'topup__radio')}
                onChange={onChangeRadio}
              >
                {data.map((item, index) => (
                  <Fragment key={item.id}>
                    <div className={style.tw__radio__item}>
                      <Radio
                        value={item.card_number}
                        className={style.tw__radio__item__group}
                      >
                        <p className={style.tw__radio__item__name}>
                          {item.name_on_card}
                        </p>
                        <p className={style.tw__radio__item__number}>
                          {item.card_number.match(/.{1,4}/g)?.join(' ') || ''}
                        </p>
                      </Radio>
                    </div>
                    {index < data.length - 1 && (
                      <Divider className={style.tw__divider} />
                    )}
                  </Fragment>
                ))}
              </Group>
            )}
          </div>
          <Button
            block
            size="large"
            icon={<MdAddCircleOutline />}
            className={style.choose__payment__modal__button}
            onClick={handleOpenModalSLP}
          >
            Add Sealabs Pay Account
          </Button>
          <AddSealabsPay
            isModalOpen={isModalSLPOpen}
            handleCancel={handleCloseModalSLP}
            handleOk={handleCloseModalSLP}
          />
          <Button
            className={style.tw__button}
            type="primary"
            onClick={showModal}
            disabled={!inputState.value || selectedAcc === 0}
            block
          >
            Pay
          </Button>
        </Card>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        width={400}
        centered
      >
        <ModalHeader
          title="Confirm Payment"
          info="Are you sure you want to top up your wallet?"
        />
      </Modal>
      <Modal
        open={isIFrameOpen}
        footer={null}
        width={800}
        onCancel={handleFrameCancel}
        destroyOnClose
      >
        <TopupIframe src={src} />
      </Modal>
    </>
  );
};

export default TopupWallet;
