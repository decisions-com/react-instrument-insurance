import React from "react";

interface SelectOptionsProps extends React.HTMLProps<{}> {
  // optionNames: string[];
}

const getOption = (name: React.ReactNode) => (
  <option key={name as string}>{name}</option>
);

export default function SelectOptions({ children }: SelectOptionsProps) {
  return (
    <React.Fragment>
      <option value="" disabled>
        Select
      </option>
      {React.Children.map(children, getOption)}
    </React.Fragment>
  );
}
