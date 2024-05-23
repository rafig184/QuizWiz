import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoneIcon from '@mui/icons-material/Done';

const steps = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
];




export default function HorizontalLinearAlternativeLabelStepper(props: { key: number, activeStep: number, isWrongIndex: number[] }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={props.activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
            icon?: React.ReactNode;
          } = {};
          const stepProps: {
            completed?: boolean
          } = {};
          if (props.isWrongIndex.includes(index)) {
            labelProps.error = true;
            labelProps.icon = <CloseIcon style={{ color: "white", backgroundColor: "#fa2e20", padding: "1.5%", borderRadius: "50px" }} color="error" />;
          } else if (props.activeStep > index) {
            stepProps.completed = true;
            labelProps.icon = <DoneIcon style={{ color: "white", backgroundColor: "#20c428", padding: "1.5%", borderRadius: "50px" }} color="success" />;
          }


          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );

        })}
      </Stepper>
    </Box>
  );
}