import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";

import TestForm from "./test.form";

import { GridLayout } from "@/layouts/grid-layout";
import { FloatLayout } from "@/layouts/float-layout";

export default function TestPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <GridLayout>
      <Drawer isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>Drawer Header</DrawerHeader>
          <DrawerBody className="w-full">
            <TestForm />
          </DrawerBody>
          <DrawerFooter className="flex flex-row gap-2">
            <Button variant="bordered" onPress={onOpenChange}>
              Cancel
            </Button>
            <Button onPress={onOpenChange}>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <TestForm />
      <FloatLayout>
        <Button onPress={onOpen}>Open Drawer</Button>
      </FloatLayout>
    </GridLayout>
  );
}
