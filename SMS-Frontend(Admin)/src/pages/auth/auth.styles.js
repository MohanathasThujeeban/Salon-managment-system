import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw; /* Full width of the viewport */
  height: 100vh; /* Full height of the viewport */
  margin: 0; /* Remove any margin */
  padding: 0; /* Remove any padding */
  overflow: hidden; /* Prevent scrollbars */
`;

export const Logo = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 450px) {
    width: 100px;
    height: 100px;
  }
`;

export const Form = styled.form`
  display: grid;
  gap: 10px;
  width: 100%;

  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;

export const BannerContainer = styled.div`
  width: 50%; /* Adjust width as needed */
  height: 100%; /* Full height */
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.colorBlack};
  flex: 1; /* Allow it to grow */
  @media screen and (max-width: 850px) {
    display: none; /* Hide on smaller screens */
  }
`;

export const FormContainer = styled.div`
  width: 50%; /* Adjust width as needed */
  height: 100%; /* Full height */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;

  h3 {
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    color: ${colors.colorBlack};
    margin: 10px;
  }

  @media screen and (max-width: 850px) {
    width: 100%; /* Full width on smaller screens */
    height: auto; /* Adjust height */
    max-width: 500px;
    margin: auto;
  }

  @media screen and (max-width: 450px) {
    height: 100vh;
    padding: 0 20px;

    h3 {
      font-size: 16px;
    }
  }
`;

export const BarberShopAddress = styled.span`
  font-size: 12px;
  color: ${colors.colorGrayDark};
  font-weight: 500;
  margin: 2px 0;
`;