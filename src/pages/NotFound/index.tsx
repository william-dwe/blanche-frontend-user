import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, ItemNotFound } from '../../components';
import style from './index.module.scss';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Card className={style.nf}>
      <ItemNotFound
        title="Page is Not Found"
        body="Please check again your destination."
      />
      <Button
        className={style.btn}
        type="primary"
        onClick={handleBackToHome}
        size="large"
      >
        Back to Home
      </Button>
    </Card>
  );
};

export default NotFound;
