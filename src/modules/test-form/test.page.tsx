import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/react";
import { useSignals } from "@preact/signals-react/runtime";

import TestForm from "./test.form";
import { drawerOpen } from "./common/service";

import { GridLayout } from "@/layouts/grid-layout";
import { FloatLayout } from "@/layouts/float-layout";

export default function TestPage() {
  useSignals();

  return (
    <>
      <GridLayout>
        <TestForm />
        <FloatLayout>
          <Button onPress={() => (drawerOpen.value = true)}>Open Drawer</Button>
        </FloatLayout>
      </GridLayout>
      <Drawer
        isOpen={drawerOpen.value}
        size="4xl"
        onOpenChange={(val) => (drawerOpen.value = val)}
      >
        <DrawerContent>
          <DrawerHeader>Drawer Header</DrawerHeader>
          <DrawerBody className="w-full">
            <TestForm />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
