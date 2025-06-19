import { countries } from "dff-util";
import { ConstMessages } from "dff-util/dist/main/const-messages";

export const TestValidation = {
  name: {
    required: {
      value: true,
      message: ConstMessages.REQUIRED,
    },
    minLength: {
      value: 3,
      message: "Name must be at least 3 characters",
    },
    maxLength: {
      value: 100,
      message: "Name must be at most 100 characters",
    },
  },
  country: {
    required: {
      value: true,
      message: ConstMessages.REQUIRED,
    },
  },
  countries: {
    required: {
      value: true,
      message: ConstMessages.REQUIRED,
    },
  },
  lang: {
    required: {
      value: true,
      message: ConstMessages.REQUIRED,
    },
  },
  eventDate: {
    required: {
      value: true,
      message: ConstMessages.REQUIRED,
    },
  },
};
