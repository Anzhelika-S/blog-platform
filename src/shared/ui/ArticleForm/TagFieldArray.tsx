import { Button, Box } from "@mui/material";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";

import styles from "../Form/Form.module.scss";
import React from "react";

interface TagFieldArrayProps {
  register: UseFormRegister<{
    title: string;
    desc: string;
    textBody: string;
    tags: {
        value: string;
    }[];
}>,
  control: Control<{
    title: string;
    desc: string;
    textBody: string;
    tags: {
        value: string;
    }[];
}, any>
}

export const TagFieldArray : React.FC<TagFieldArrayProps>= ({ register, control }) => {
  const { fields, append, remove } = useFieldArray({
    name: "tags",
    control,
  });

  return (
    <>
      <div>Tags</div>
      <Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
        <div>
          {fields.map((field, index) => {
            return (
              <div key={field.id} style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <input
                  className={styles.input}
                  style={{ maxWidth: 300, marginRight: 10, marginTop: 0 }}
                  type="text"
                  {...register(`tags.${index}.value`)}
                />
                <Button variant="outlined" color="error" onClick={() => remove(index)}>
                  Delete
                </Button>
              </div>
            );
          })}
        </div>

        <Button variant="outlined" sx={{ alignSelf: "flex-end" }} color="info" onClick={() => append({value: ''})}>
          Add tag
        </Button>
      </Box>
    </>
  );
};
