import React from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';

import srcSpinner from '../../img/spinner.svg';
import srcCheck from '../../img/check.svg';

const Wrapper = styled.div`
  margin-left: 1em;
`;

const ImgSpinner = styled.img`
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  width: 1.875em;
  height: 1.875em;
  animation: rotation 1s infinite linear;

  &.hidden {
    display: none;
  }
`;

const ImgCheck = styled.img`
  width: 1.875em;
  height: 1.875em;

  &.hidden {
    display: none;
  }
`;

const Spinner = ({ isUpdating }) => {
  return (
    <Wrapper>
      <ImgSpinner
        src={srcSpinner}
        alt="Updating"
        className={isUpdating ? '' : 'hidden'}
      />
      <ImgCheck
        src={srcCheck}
        alt="Update complete"
        className={isUpdating ? 'hidden' : ''}
      />
    </Wrapper>
  );
};

Spinner.propTypes = {
  isUpdating: bool.isRequired,
};

export default Spinner;
