import type { Navigation } from 'react-router';
import {
  useSubmitFromReactRouter,
  type BaseUseFormSubmitOptions,
  type SubmitFunctionAbstraction,
} from '~/lib/various/form-submission/utils';
import { formatDataIntoAnySample } from './payload-formatters';

function generateSubmitOptions(
  entityId: string,
  submit: SubmitFunctionAbstraction['useSubmit']
) {
  const BASE_SUBMIT_OPTIONS_FOR_ORDERING: BaseUseFormSubmitOptions = {
    method: 'POST' as const,
    action: `/course/${entityId}/checkout` as const,
    contentType: 'application/json' as const,
    submit,
  };

  return BASE_SUBMIT_OPTIONS_FOR_ORDERING;
}

export function submitOptions_withNavigation(
  entityId: string,
  submit: SubmitFunctionAbstraction['useSubmit'],
  navigation: Navigation
) {
  return {
    ...generateSubmitOptions(entityId, submit),
    navigation,
  };
}

export function triggerGenericAction(
  entityId: string,
  command: any,
  submit: SubmitFunctionAbstraction['useSubmit'],
  navigation: Navigation
) {
  const options = submitOptions_withNavigation(entityId, submit, navigation);

  // Remember that, in order to leverage isSubmitting value
  // the below hook should be used directly into the component
  const { submitForm, isSubmitting } = useSubmitFromReactRouter(options);
  const formattedData = formatDataIntoAnySample(command);

  submitForm(formattedData);
}
