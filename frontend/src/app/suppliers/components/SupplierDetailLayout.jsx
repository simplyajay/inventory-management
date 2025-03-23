"use client";
import React, { useState, useEffect, useMemo } from "react";
import SupplierDocuments from "./SupplierDocuments";
import SupplierDetailCollapsed from "./supplier-detail/SupplierDetailCollapsed";
import FormDialog from "@/components/dialogs/FormDialog";
import BasicForm from "@/components/forms/basic-form/BasicForm";
import { BusinessEntitySchema } from "@/utils/schema/businessEntity.validationSchema";
import {
  getEntityFormComponents,
  getEntityFormValues,
  entityFormLabels,
} from "@/utils/form/bussinessEntity.util";
import { getFetchOptions } from "@/services/options";
import { updateSupplier } from "@/services/api/supplier";
import { notify } from "@/components/toast/ToastProvider";
import { useRouter } from "next/navigation";

const SupplierDetailLayout = ({ supplier, geoData }) => {
  const entityValues = getEntityFormValues(supplier);
  const entityComponents = getEntityFormComponents(entityValues, geoData);
  const [state, setState] = useState({
    formVisible: false,
    loading: false,
    updating: false,
    formComponents: entityComponents,
  });

  const { formVisible, loading, updating, formComponents } = state;

  const route = useRouter();

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async ({ values }) => {
    const fetchOptions = getFetchOptions("PUT", { _id: supplier._id, ...values }, true, false);
    const data = await updateSupplier(fetchOptions, supplier._id);
    updateState({ formVisible: !formVisible });
    notify(data.message);
    route.refresh();
  };

  const confirmProps = { text: "Save" };
  const cancelProps = { text: "Cancel", onClick: () => updateState({ formVisible: !formVisible }) };

  return loading ? (
    <>loading</>
  ) : (
    <div className="w-full h-full flex flex-col flex-wrap items-center gap-1 shadow-sm  ">
      <div className="w-full">
        <SupplierDetailCollapsed
          supplier={supplier}
          onEdit={() => updateState({ formVisible: !formVisible })}
        />
      </div>
      <div className="flex-1 w-full">
        <SupplierDocuments />
      </div>
      {formVisible && (
        <FormDialog title="SUPPLIER INFORMATION">
          <BasicForm
            values={entityValues}
            onSubmit={handleSubmit}
            components={formComponents}
            validationSchema={BusinessEntitySchema}
            labels={entityFormLabels}
            submitProps={confirmProps}
            cancelProps={cancelProps}
          />
        </FormDialog>
      )}
    </div>
  );
};

export default SupplierDetailLayout;
