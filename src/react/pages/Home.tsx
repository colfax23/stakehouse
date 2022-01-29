import { useHistory } from "react-router-dom";
import React, { FC, ReactElement, useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Container, Divider, Grid, Modal, Tooltip, Typography } from "@material-ui/core";
import { Button } from '@material-ui/core';
import { NetworkPicker } from "../components/NetworkPicker";
import { Network, StepSequenceKey } from '../types'
import VersionFooter from "../components/VersionFooter";

const StyledMuiContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NetworkDiv = styled.div`
  margin-top: 35px;
  margin-right: 35px;
  align-self: flex-end;
  color: gray;
`;

const LandingHeader = styled(Typography)`
  font-size: 36px;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const SubHeader = styled(Typography)`
  margin-top: 20px;
`;

const Links = styled.div`
  margin-top: 20px;
`;

const StyledLink = styled(Typography)`
  cursor: pointer;
  display: inline;
`;

const InfoLabel = styled.span`
  color: gray;
`;

const EnterGrid = styled(Grid)`
  margin-top: 35px;
  align-items: center;
`;

const ContentGrid = styled(Grid)`
  height: 320px;
  margin-top: 16px;
`;

type HomeProps = {
  network: Network,
  setNetwork: Dispatch<SetStateAction<Network>>
}

/**
 * Home page and entry point of the app.  This page displays general information
 * and options for a user to create a new secret recovery phrase or use an 
 * existing one.
 * 
 * @param props passed in data for the component to use
 * @returns the react element to render
 */
const Home: FC<HomeProps> = (props): ReactElement => {
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [networkModalWasOpened, setNetworkModalWasOpened] = useState(false);
  const [enterSelected, setEnterSelected] = useState(false);

  let history = useHistory();

  const handleOpenNetworkModal = () => {
    setShowNetworkModal(true);
    setNetworkModalWasOpened(true);
  }

  const handleCloseNetworkModal = (event: object, reason: string) => {
    if (reason !== 'backdropClick') {
      setShowNetworkModal(false);

      if (enterSelected) {
        handleEnter();
      }
    }
  }

  const sendToGithub = () => {
    window.electronAPI.shellOpenExternal("https://github.com/stake-house/wagyu-installer");
  }

  const sendToDiscord = () => {
    window.electronAPI.shellOpenExternal("https://discord.io/ethstaker");
  }

  const handleEnter = () => {
    setEnterSelected(true);

    if (!networkModalWasOpened) {
      handleOpenNetworkModal();
    } else {
      const location = {
        pathname: `/wizard/${StepSequenceKey.Install}`
      }

      history.push(location);
    }
  }

  const tabIndex = (priority: number) => showNetworkModal ? -1 : priority;

  return (
    <StyledMuiContainer>
      <NetworkDiv>
        Select Network: <Button color="primary" onClick={handleOpenNetworkModal} tabIndex={tabIndex(1)}>{props.network}</Button>
      </NetworkDiv>
      <Modal
        open={showNetworkModal}
        onClose={handleCloseNetworkModal}
      >
        {/* Added <div> here per the following link to fix error https://stackoverflow.com/a/63521049/5949270 */}
        <div>
          <NetworkPicker handleCloseNetworkModal={handleCloseNetworkModal} setNetwork={props.setNetwork} network={props.network}></NetworkPicker>
        </div>
      </Modal>

      <LandingHeader variant="h1">Welcome!</LandingHeader>
      <ContentGrid />
      <SubHeader>Your installer for staking on Ethereum</SubHeader>

      <Links>
        <StyledLink display="inline" color="primary" onClick={sendToGithub} tabIndex={tabIndex(0)}>Github</StyledLink>
        &nbsp;|&nbsp;
        <StyledLink display="inline" color="primary" onClick={sendToDiscord} tabIndex={tabIndex(0)}>Discord</StyledLink>
      </Links>

      <EnterGrid>
        <Button variant="contained" color="primary" onClick={handleEnter} tabIndex={tabIndex(1)}>
          Enter
        </Button>
      </EnterGrid>
      <VersionFooter />
    </StyledMuiContainer>
  );
};

export default Home;
