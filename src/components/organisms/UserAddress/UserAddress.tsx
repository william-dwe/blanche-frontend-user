import React from 'react';
import { ItemNotFound } from '../..';
import { useGetUserAddressQuery } from '../../../app/features/address/userAddressApiSlice';
import { IUserAddress } from '../../../helpers/types';
import CardAddress from './CardAddress';
import style from './index.module.scss';

const UserAddress: React.FC = () => {
  const { data } = useGetUserAddressQuery();

  if (!data) {
    return (
      <ItemNotFound
        title="You don't have any address yet"
        body="Add your address to make it easier to buy"
      />
    );
  }

  return (
    <div className={style.user__address}>
      <>
        {data.filter(
          (item: IUserAddress) => item.is_default && item.is_merchant_address,
        ).length > 0
          ? data
              .filter(
                (item: IUserAddress) =>
                  item.is_default && item.is_merchant_address,
              )
              .map((item: IUserAddress) => (
                <CardAddress key={item.id} data={item} />
              ))
              .concat(
                data
                  ?.filter(
                    (item: IUserAddress) =>
                      !item.is_default && !item.is_merchant_address,
                  )
                  .map((item: IUserAddress) => (
                    <CardAddress key={item.id} data={item} />
                  )),
              )
          : data.length > 1
          ? data
              .filter((item: IUserAddress) => item.is_default)
              ?.map((item: IUserAddress) => (
                <CardAddress key={item.id} data={item} />
              ))
              .concat(
                data
                  .filter((item: IUserAddress) => item.is_merchant_address)
                  .map((item: IUserAddress) => (
                    <CardAddress key={item.id} data={item} />
                  )),
              )

              .concat(
                data
                  ?.filter(
                    (item: IUserAddress) =>
                      !item.is_default && !item.is_merchant_address,
                  )
                  .map((item: IUserAddress) => (
                    <CardAddress key={item.id} data={item} />
                  )),
              )
          : data?.map((item: IUserAddress) => (
              <CardAddress key={item.id} data={item} />
            ))}
      </>
    </div>
  );
};
export default UserAddress;
