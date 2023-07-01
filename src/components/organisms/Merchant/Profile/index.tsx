import { Col, Row } from 'antd';
import React from 'react';
import { useGetMerchantProfileQuery } from '../../../../app/features/merchant/merchantApiSlice';
import CardAvatar from './CardAvatar';
import Details from './Details';
import style from './index.module.scss';

const Profile: React.FC = () => {
  const { data, isLoading } = useGetMerchantProfileQuery();
  return (
    <Row className={style.profile__section} gutter={[32, 32]}>
      <Col xl={8}>{data && <CardAvatar src={data.image} />}</Col>
      <Col xl={16}>
        <div className={style.profile__section__item}>
          <div className={style.profile__section__item__left}>
            <h6>Profile</h6>
            <p className={style.profile__section__item__left__info}>
              Edit your profile information here.
            </p>
          </div>
        </div>
        {data && <Details data={data} />}
      </Col>
    </Row>
  );
};

export default Profile;
