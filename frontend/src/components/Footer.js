import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
      <Row className='justify-content-center'>
        <Col xs='auto'>
          <h4 style={{ fontSize: '12px' }}>
             &copy;{' '}
            <Link
              to='https://mrphilip.pythonanywhere.com/'
              style={{
                fontWeight: 'bolder',
                color: 'green',
                fontFamily:"cursive"
              }}
            >
              Philip Titus
            </Link>{' '}
            <img
    src='https://mrphilip.pythonanywhere.com/static/images/og.svg'
    alt='Logo'
    style={{ maxWidth: '20px', maxHeight: '20px', margin:"4px" }}
/>

            All Rights Reserved
          </h4>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
