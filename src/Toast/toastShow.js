import { toaster } from "../components/ui/toaster";
export const errorToast = (tt, des) => {
  toaster.create({
    title: `${tt}`,
    description: `${des}`,
    duration: 3000,
    type: "error",
  });
};
export const successToast = (tt, des) => {
  toaster.create({
    title: `${tt}`,
    description: `${des}`,
    duration: 3000,
    type: "success",
  });
};
export const warningToast = (tt, des) => {
  toaster.create({
    title: `${tt}`,
    description: `${des}`,
    duration: 3000,
    type: "warning",
  });
};
