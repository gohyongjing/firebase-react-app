import { Toast } from "lib/radixUi";

type Props = {
  isOpen: boolean,
  onIsOpenChange: (isOpen: boolean) => void
}

export function SaveUserSettingsToast({
  isOpen,
  onIsOpenChange
}: Props) {
  return (
    <Toast.Provider>
      <Toast.Root
        className="px-4 py-2 rounded-xl border-0 text-primary-1 bg-background-300 dark:bg-background-700 dark:border-primary-3"
        open={isOpen}
        onOpenChange={onIsOpenChange}
        duration={3000}
      >
        <Toast.Title className="text-lg dark:text-primary-3">
          <b>
            Changes Saved
          </b>
        </Toast.Title>
        <Toast.Description className="dark:text-background-50">
          Your profile settings have been saved.
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-2 wide"/>
    </Toast.Provider>
  )
}
