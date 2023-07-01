import React from 'react';
import style from './index.module.scss';
import { AuthSectionLeft, AuthSectionRight } from '../../molecules';
import { Row, Col } from 'antd';
import useMediaQuery from '../../../hooks/useMediaQuery';

interface AuthProps {
  children: React.ReactNode;
}

const AuthLayoutPage: React.FC<AuthProps> = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Row className={style.auth__layout}>
      {!isMobile && (
        <Col flex="none">
          <AuthSectionLeft />
        </Col>
      )}
      <Col flex="auto">
        <AuthSectionRight>{children}</AuthSectionRight>
      </Col>
    </Row>
  );
};

export default AuthLayoutPage;
