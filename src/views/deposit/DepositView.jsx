import React, { useRef, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const DepositView = () => {
  const [inputPrice, setInputPrice] = useState("");
  const [isNull, setIsNull] = useState(true);

  const inputRef = useRef();
  const location = useLocation();
  const { bank, account, defaultPrice, id } = location.state;

  const handleInputPrice = (e) => {
    e.target.value !== "" ? setIsNull(false) : setIsNull(true);
    setInputPrice(e.target.value);
  };

  const handleSubmit = () => {
    // axios.post(`http://localhost:8080/api/v1/users/challenges/${id}/saving`, {
    //   challenge_payment: inputRef.current.value,
    //   physical_account_number: account,
    //   cma_account_number: CMA 계좌
    // });
  };

  return (
    <>
      <DepositViewContainer>
        <DepositAccount>
          <Text>
            <Span>내 {bank}(CMA) 계좌</Span>로
          </Text>
          <Text>{account}</Text>
        </DepositAccount>
        <Input
          ref={inputRef}
          type="number"
          onChange={handleInputPrice}
          value={inputPrice}
          placeholder={`${
            defaultPrice &&
            defaultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }원 입력하세요`}
        />
        {inputPrice !== "" && inputPrice < defaultPrice && (
          <WarningLabel>
            <Text>
              {defaultPrice > 10000
                ? `${defaultPrice / 10000}만원 `
                : `${defaultPrice / 1000}천원 `}
              보다 적게 저축하면 달성률이 떨어질 수 있어요
            </Text>
          </WarningLabel>
        )}
        <ButtonContainer>
          <Link to="/success">
            <Button isNull={isNull} disabled={isNull} onClick={handleSubmit}>
              저축하기
            </Button>
          </Link>
        </ButtonContainer>
      </DepositViewContainer>
    </>
  );
};

const DepositViewContainer = styled.div`
  padding: 40px 16px 0;
`;

const DepositAccount = styled.div`
  margin-bottom: 46px;
`;

const Text = styled.p`
  &:nth-child(1) {
    margin-bottom: 8px;
  }

  &:nth-child(2) {
    color: ${({ theme }) => theme.colors.colorLightGray1};
    font-size: ${({ theme }) => theme.fontSize.fontXSmall};
    font-weight: ${({ theme }) => theme.fontWeights.weightNormal};
    text-decoration: underline;
    text-underline-position: under;
  }
`;

const Span = styled.span`
  color: ${({ theme }) => theme.colors.colorDarkGary1};
  font-size: ${({ theme }) => theme.fontSize.fontSmall};
  font-weight: ${({ theme }) => theme.fontWeights.weightBold};
`;

const Input = styled.input`
  color: ${({ theme }) => theme.colors.colorDarkGray1};
  font-size: ${({ theme }) => theme.fontSize.fontXLarge};
  font-weight: ${({ theme }) => theme.fontWeights.weightNormal};
  margin-bottom: 18px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.colorLightGray1};
  }
`;

const WarningLabel = styled.div`
  height: 28px;
  border-radius: 6px;
  padding: 6px 8px;
  background-color: ${({ theme }) => theme.colors.colorLightGray2};

  ${Text}:nth-child(1) {
    width: 300px;
    color: ${({ theme }) => theme.colors.colorBlue2};
    font-size: ${({ theme }) => theme.fontSize.fontXSmall};
    line-height: 16px;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
`;
export default DepositView;
