import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAccount } from '../../../../helpers/types';
import { Button } from '../../../atoms';
import EditAccount from '../EditAccount';
import style from './index.module.scss';

type IItem = { label: string; key: string; value: string };

interface AccountProps {
  account: IAccount;
}

const Account: React.FC<AccountProps> = ({ account }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<IItem[]>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) return;
    const email = { label: 'Email', key: 'email', value: account.email };
    setItems([email]);
  }, [account]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const changePassword = () => {
    navigate('change-password');
  };

  return (
    <>
      <div className={style.profile__section__tab}>
        <div
          className={classNames(style.profile__section__tab__header, 'header')}
        >
          <p className={style.profile__section__tab__header__title}>Account</p>
          <Button
            type="text"
            onClick={showModal}
            className={style.profile__section__tab__header__button}
          >
            Edit
          </Button>
        </div>
        <ul className={style.profile__section__tab__flex}>
          {items &&
            items.map((item, index) => (
              <li
                key={index}
                className={style.profile__section__tab__flex__item}
              >
                <p className={style.profile__section__tab__flex__item__label}>
                  {item.label}
                </p>
                <p>{item.value}</p>
              </li>
            ))}
        </ul>
        <Button
          type="link"
          onClick={changePassword}
          className={style.profile__section__tab__pass}
        >
          Change password
        </Button>
        <EditAccount
          account={account}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      </div>
    </>
  );
};

export default Account;
