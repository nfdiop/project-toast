import React from "react";

export function useBoolean(initialValue = false) {
    const [value, setValue] = React.useState(initialValue);
    const setTrue = React.useCallback(() => {
      setValue(true);
    }, []);
    const setFalse = React.useCallback(() => {
      setValue(false);
    }, []);
    return { value, setValue, setTrue, setFalse };
  }
