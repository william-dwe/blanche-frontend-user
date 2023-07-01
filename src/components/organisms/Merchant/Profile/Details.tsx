import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { formatToDate } from '../../../../helpers/formatToDate';
import { IMerchantInfo } from '../../../../helpers/types';
import { Button } from '../../../atoms';
import EditProfile from './EditProfile';
import style from './index.module.scss';

interface DetailsProps {
  data: IMerchantInfo;
}

type IItem = { label: string; key: string; value: string | undefined };

const Details: React.FC<DetailsProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<IItem[]>();

  useEffect(() => {
    if (data) {
      const name = {
        label: 'Name',
        key: 'name',
        value: data.name,
      };
      const domain = {
        label: 'Domain',
        key: 'domain',
        value: data.domain,
      };
      const joinDate = {
        label: 'Join Date',
        key: 'joinDate',
        value: formatToDate(data.join_date),
      };
      setItems([name, domain, joinDate]);
    }
  }, [data]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={style.profile__section__tab}>
        <div
          className={classNames(style.profile__section__tab__header, 'header')}
        >
          <p className={style.profile__section__tab__header__title}>Details</p>
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
                <p>{item.value || '-'}</p>
              </li>
            ))}
        </ul>
      </div>
      <EditProfile
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        profile={data}
      />
    </>
  );
};

export default Details;
