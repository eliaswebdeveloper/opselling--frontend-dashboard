import { ProductUpdateActionTrigger } from './action-trigger';

export function ProductUpdateDialogContent({ productId, newProductData }: any) {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-3xl font-medium">Retiro de solicitudes</p>
      </div>
      <ProductUpdateActionTrigger
        productId={productId}
        newProductData={newProductData}
      />
    </div>
  );
}
