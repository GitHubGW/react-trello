import styled from "styled-components";
import Modal from "react-modal";

const StyledModal = styled(Modal)`
  outline: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 200px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;

  button {
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    outline: none;
    background-color: rgba(178, 190, 195, 0.5);
    color: white;
    padding: 8px 10px;
    border-radius: 50%;
    font-size: 13px;
    cursor: pointer;
  }
  form {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 100%;
      text-align: center;
      h1 {
        text-align: center;
        margin-bottom: 50px;
        font-size: 25px;
        font-weight: 400;
      }
      input {
        border: none;
        outline: none;
        font-size: 16px;
        padding: 17px 20px;
        padding-left: 13px;
        border-radius: 5px;
        width: calc(100% - 100px);
      }
    }
  }
`;

export default StyledModal;
