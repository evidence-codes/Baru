import React, { createContext, useContext, useState } from "react";

interface FormData {
  receiverName?: string;
  receiverPhoneNumber?: string;
  category?: string;
  packageName?: string;
  weight?: number;
  quantity?: number;
  value?: number;
  preferredVehicle?: string[];
  pickupLocation?: string;
  dropOffLocation?: string;
  deliveryInstructions?: string;
  distance?: number;
}

interface FormContextType {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
  resetFormData: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>({});

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const resetFormData = () => {
    setFormData({});
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </FormContext.Provider>
  );
};
