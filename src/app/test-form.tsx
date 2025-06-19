import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

import TestFormPage from "@/modules/test-form/test-form.page";

export default function TestForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Open Drawer</Button>
      <TestFormPage />
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <DrawerContent>
          <DrawerHeader>Drawer Header</DrawerHeader>
          <DrawerBody className="w-full">
            <TestFormPage />
          </DrawerBody>
          <DrawerFooter className="flex flex-row gap-2">
            <Button variant="bordered" onPress={onOpenChange}>
              Cancel
            </Button>
            <Button onPress={onOpenChange}>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
