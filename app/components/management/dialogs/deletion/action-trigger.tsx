import { useNavigation, useSubmit } from 'react-router';
import { Button } from '~/components/ui/button';
import { triggerGenericAction } from '~/lib/boilerplate/sample-table/action-triggers';
import { useTableDialog } from '~/lib/various/dialogs/table-dialog-context';

export function ProductDeletionActionTrigger({ productId }: any) {
  const { closeAssignationModal } = useTableDialog();
  const submit = useSubmit();
  const navigation = useNavigation();

  const triggerAction = () => {
    const command = {
      productId,
    };
    triggerGenericAction(productId, command, submit, navigation);
  };

  return (
    <div className="space-y-6">
      <h3 className="justify-self-center text-2xl font-medium">
        ¿Seguro que deseas retirar la solicitud seleccionada?
      </h3>
      <div className="flex gap-8 justify-self-center">
        <Button
          type="button"
          disabled={false} // must adjust to proper flag
          onClick={close}
          className="bg-gray-700 text-white hover:bg-gray-700 focus:ring-2 focus:ring-black focus:outline-none">
          {'No, cancelar operación'}
        </Button>
        <Button
          type="button"
          disabled={false} // must adjust to proper flag
          className="bg-red-400 text-white focus:ring-2 focus:ring-black focus:outline-none"
          onClick={() => {
            triggerAction();
            closeAssignationModal();
          }}>
          {/* {FLAG ? 'Retirando...' : 'Sí, retirar'} */}
        </Button>
      </div>
    </div>
  );
}
