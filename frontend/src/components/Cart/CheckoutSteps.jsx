import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { AccountBalanceOutlined, LibraryAddCheck } from "@mui/icons-material";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: "Shipping Details",
      icon: <LocalShippingIcon />,
    },
    {
      label: "Confirm Order",
      icon: <LibraryAddCheck />,
    },
    {
      label: "Payment",
      icon: <AccountBalanceOutlined />,
    },
  ];

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((step, index) => (
        <Step
          key={index}
          active={activeStep === index ? true : false}
          completed={activeStep >= index ? true : false}
        >
          <StepLabel
            style={{
              color: activeStep >= index ? "#c0392b" : "rgba(0, 0, 0, 0,649)",
            }}
            icon={step.icon}
          >
            {step.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckoutSteps;
