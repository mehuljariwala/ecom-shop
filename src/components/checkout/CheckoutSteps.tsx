"use client";

import { CheckIcon } from "@heroicons/react/24/solid";

interface CheckoutStepsProps {
  currentStep: number;
  isAuthenticated: boolean;
}

const CheckoutSteps = ({
  currentStep,
  // isAuthenticated is required by the interface but not used in the component
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isAuthenticated,
}: CheckoutStepsProps) => {
  const steps = [
    {
      id: 0,
      name: "Sign In",
      status:
        currentStep > 0
          ? "complete"
          : currentStep === 0
            ? "current"
            : "upcoming",
    },
    {
      id: 1,
      name: "Shipping",
      status:
        currentStep > 1
          ? "complete"
          : currentStep === 1
            ? "current"
            : "upcoming",
    },
    {
      id: 2,
      name: "Payment",
      status:
        currentStep > 2
          ? "complete"
          : currentStep === 2
            ? "current"
            : "upcoming",
    },
  ];

  return (
    <nav aria-label="Progress" className="mb-12">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps.map((step) => (
          <li key={step.name} className="md:flex-1">
            {step.status === "complete" ? (
              <div className="group flex flex-col border-l-4 border-primary-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-primary-600">
                  {step.id + 1}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
                <span className="ml-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 md:ml-0">
                  <CheckIcon
                    className="h-3 w-3 text-white"
                    aria-hidden="true"
                  />
                </span>
              </div>
            ) : step.status === "current" ? (
              <div
                className="flex flex-col border-l-4 border-primary-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                aria-current="step"
              >
                <span className="text-sm font-medium text-primary-600">
                  {step.id + 1}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : (
              <div className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-gray-500">
                  {step.id + 1}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CheckoutSteps;
