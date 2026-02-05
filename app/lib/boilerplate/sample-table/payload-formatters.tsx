import { AnySampleEnum, type AnySample } from '~/lib/staff/product/types';

export function formatDataIntoAnySample(command: any) {
  const createCheckoutSessionRequestBody: AnySample = {
    intent: AnySampleEnum.enum.ACTION_PAYLOAD,
    body: { command },
  };

  return createCheckoutSessionRequestBody;
}
