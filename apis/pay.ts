import axios, { AxiosResponse } from "axios";
import axiosInstance from "./index";
//begin api thanh toán PayOs
export const CreateLinkPayOs = async (data: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `pay/create-payment-link`,
      data
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};
export const ReceiveHook = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `pay/receive-hook`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};
export const InfomationsPayment = async (id: number) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `pay/get-payment-infomations/${id}`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};
export const CancelPaymentLink = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `pay/cancel-payment-link/:idorder`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};
export const ConfirmWebhookPayos = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `pay/confirm-webhook-payos`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};
//end api thanh toán PayOs

//begin api thanh toán ZaloPay
export const PaymentZalopay = async (data: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `pay/payment-zalopay`,data
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const CallbackZalo = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `pay/callback-zalo`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const StatusZalopay = async (id: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `pay/order-status-zalopay/${id}`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const TransactionRefund = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `pay/transaction-refund`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const RefundStatus = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `pay/transaction-refund-status`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};
// end api thanh toán ZaloPay

export const InformationCourse = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `pay/information-course`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const PostInformationCourse = async (data: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `pay/post-information-course`, data
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const UpdateInformation = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.put(
      `pay/update-information-course/:id`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const DeleteInformation = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.put(
      `pay/delete-information-course/:id`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const CheckPaidCourse = async (courseId: string) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `pay/check-paid-course/${courseId}`
    );
    return response.data;
  } catch {
    throw new Error("Error check paid course");
  }
};
