import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button } from '../../../atoms';
import style from './index.module.scss';
import './override.scss';
import EditDetails from '../EditDetails';
import { IDetails } from '../../../../helpers/types';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { dateToDayMonthYear } from '../../../../helpers/parseDate';

type IItem = { label: string; key: string; value: string | undefined };

interface DetailsProps {
  details: IDetails;
}

const Details: React.FC<DetailsProps> = ({ details }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<IItem[]>();

  useEffect(() => {
    if (details) {
      const name = {
        label: 'Name',
        key: 'name',
        value: details.name
          .split(' ')
          .map((name) => capitalizeFirstLetter(name))
          .join(' '),
      };
      const phone = { label: 'Phone', key: 'phone', value: details.phone };
      const birthdate = {
        label: 'Birthdate',
        key: 'birthdate',
        value: details.birthdate
          ? dateToDayMonthYear(new Date(details.birthdate))
          : undefined,
      };
      const gender = {
        label: 'Gender',
        key: 'gender',
        value: details.gender
          ? capitalizeFirstLetter(details.gender)
          : undefined,
      };
      setItems([name, phone, birthdate, gender]);
    }
  }, [details]);

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
      <EditDetails
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        details={details}
      />
    </>
  );
};

export default Details;
