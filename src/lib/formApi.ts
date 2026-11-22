import type { FormType } from "@/lib/formPayloads";
import { sendToWeb3Forms } from "@/lib/web3forms";

export type FormSubmitResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function submitForm(
  type: FormType,
  data: Record<string, unknown>,
): Promise<FormSubmitResult> {
  try {
    const response = await fetch(`/api/forms/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = (await response.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
      errors?: Record<string, string>;
      payload?: Record<string, string>;
    } | null;

    if (response.ok && result?.success) {
      if (!result.payload) {
        return {
          success: false,
          message:
            "We could not prepare your enquiry. Please call or WhatsApp us instead.",
        };
      }

      const delivery = await sendToWeb3Forms(result.payload);

      return {
        success: delivery.success,
        message: delivery.message,
      };
    }

    return {
      success: false,
      message:
        result?.message ||
        "We could not send your enquiry. Please call or WhatsApp us instead.",
      errors: result?.errors,
    };
  } catch {
    return {
      success: false,
      message:
        "Something went wrong while sending your enquiry. Please check your connection or call us directly.",
    };
  }
}
