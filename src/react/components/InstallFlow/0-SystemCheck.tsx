import React, { FC, ReactElement } from 'react';
import { Grid, Typography } from '@material-ui/core';
import StepNavigation from '../StepNavigation';
import styled from 'styled-components';

type SystemCheckProps = {
  onStepBack: () => void,
  onStepForward: () => void,
}

const ContentGrid = styled(Grid)`
  height: 320px;
  margin-top: 16px;
`;

/**
 * This page is the first step of the install process where system checks are run.
 * 
 * @param props the data and functions passed in, they are self documenting
 * @returns 
 */
const SystemCheck: FC<SystemCheckProps> = (props): ReactElement => {

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h1">
          System Check
        </Typography>
      </Grid>
      <ContentGrid>
        
      </ContentGrid>
      {/* props.children is the stepper */}
      {props.children}
      <StepNavigation
        onPrev={props.onStepBack}
        onNext={props.onStepForward}
        backLabel={"Back"}
        nextLabel={"Next"}
        disableBack={false}
        disableNext={false}
      />
    </Grid>
  );
}

export default SystemCheck;
