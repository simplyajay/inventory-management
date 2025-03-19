"use client";
import React, { useState, useEffect, useMemo } from "react";
import SupplierDocuments from "./SupplierDocuments";
import SupplierDetailCollapsed from "./supplier-detail/SupplierDetailCollapsed";
import FormDialog from "@/components/dialogs/FormDialog";
import BasicForm from "@/components/forms/basic-form/BasicForm";
import { BusinessEntitySchema } from "@/utils/schema/businessEntity.validationSchema";
import {
  getEntityFormInputs,
  getEntityFormValues,
  entityFormLabels,
} from "@/utils/form/bussinessEntity.util";
import { getCountries } from "@/services/api/countries";

const SupplierDetailLayout = ({ supplier }) => {
  const [state, setState] = useState({
    formVisible: false,
    loading: true,
    inputs: [],
    updating: false,
  });

  const { formVisible, loading, updating, inputs } = state;

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = () => {};

  const values = getEntityFormValues(supplier);

  const getInputs = async () => {
    if (!loading) {
      updateState({ loading: true });
    }

    const data = await getCountries();
    const i = getEntityFormInputs(updating, data.countries);
    if (i) {
      updateState({ inputs: i });
    }
    updateState({ loading: false });
  };

  const confirmProps = {
    text: "Save",
    onClick: () => updateState({ formVisible: !formVisible }),
  };

  const cancelProps = {
    text: "Cancel",
    onClick: () => updateState({ formVisible: !formVisible }),
  };

  useEffect(() => {
    getInputs();
  }, []);

  return loading ? (
    <>loading</>
  ) : (
    <div className="w-full h-full flex flex-col flex-wrap items-center gap-2 shadow-sm  ">
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
            values={values}
            onSubmit={handleSubmit}
            inputs={inputs}
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
