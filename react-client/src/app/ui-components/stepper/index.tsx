import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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
          if (props.isWrongIndex.includes(index)) {
            labelProps.optional = (
              <Typography variant="caption" color="error">

              </Typography>
            );
            labelProps.error = true;
            labelProps.icon = <CloseIcon color="error" />;
          }
          return (
            <Step key={index}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}