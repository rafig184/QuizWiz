import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

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

export default function HorizontalLinearAlternativeLabelStepper(props: { key: number, activeStep: number }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={props.activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={Math.random()}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}