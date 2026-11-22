export type Web3FormsPayload = Record<string, string>;

export type Web3FormsResult = {
  success: boolean;
  message: string;
  status: number;
};

const ENDPOINT = "https://api.web3forms.com/submit";

export function isWeb3FormsConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_WEB3FORMS_KEY);
}

export async function sendToWeb3Forms(
  payload: Web3FormsPayload,
): Promise<Web3FormsResult> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  if (!accessKey) {
    return {
      success: false,
      status: 503,
      message:
        "Our enquiry form is being connected. Please call or WhatsApp us and we will help you right away.",
    };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ access_key: accessKey, ...payload }),
    });

    const data = (await response.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
    } | null;

    if (response.ok && data?.success) {
      return {
        success: true,
        status: 200,
        message: "Thank you! Our team will contact you shortly.",
      };
    }

    return {
      success: false,
      status: 502,
      message:
        data?.message ||
        "We could not send your enquiry. Please call or WhatsApp us instead.",
    };
  } catch {
    return {
      success: false,
      status: 502,
      message:
        "Something went wrong while sending your enquiry. Please check your connection or call us directly.",
    };
  }
}
