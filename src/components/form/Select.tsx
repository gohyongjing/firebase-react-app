import { CaretDownIcon, Select as _Select } from "lib/radixUi";

export type SelectProps = _Select.SelectProps
  & {
    selectItems?: {
      value: string,
      label: string
    }[]
  };

export function Select({
  selectItems = [],
  ...props
}: SelectProps) {
  return (
    <_Select.Root
      {...props}
    >
      <_Select.Trigger
        className="rounded-t-lg data-[state=closed]:rounded-b-lg px-1 font-semibold border-2 text-primary-1 bg-background-100 border-primary-1 dark:border-primary-3 dark:bg-background-950 dark:text-background-100 flex justify-between items-center"
      >
        <_Select.Value />
        <_Select.Icon>
          <CaretDownIcon className="w-8 h-8"/>
        </_Select.Icon>
      </_Select.Trigger>
      <_Select.Portal className="">
        <_Select.Content position='popper' className="w-[var(--radix-select-trigger-width)] max-h-[var(--radix-select-content-available-height)] bg-background-200 border-2 border-primary-1 border-t-0 rounded-b-lg">
          <_Select.Viewport>
            {
              selectItems.map(item => (
                <_Select.Item
                  key={item.value}
                  value={item.value}
                  className="px-1 hover:bg-background-400"
                >
                  <_Select.ItemText className="">
                    { item.label }
                  </_Select.ItemText>
                </_Select.Item>
              ))
            }
          </_Select.Viewport>
        </_Select.Content>
      </_Select.Portal>
    </_Select.Root>
  );
}
