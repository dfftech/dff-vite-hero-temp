import { Button, Drawer, DrawerContent, DrawerBody } from "@heroui/react";
import { useSignals } from "@preact/signals-react/runtime";

import TestForm from "./test.form";
import { drawerOpen } from "./common/service";

import { GridLayout } from "@/layouts/grid-layout";
import { FloatLayout } from "@/layouts/float-layout";
import { PageLayout } from "@/layouts/page-layout";

export default function TestPage() {
  useSignals();

  return (
    <PageLayout>
      <GridLayout>
        <TestForm />
        <FloatLayout>
          <Button onPress={() => (drawerOpen.value = true)}>Open Drawer</Button>
        </FloatLayout>
      </GridLayout>
      <Drawer
        hideCloseButton={true}
        isOpen={drawerOpen.value}
        size="4xl"
        onOpenChange={(val) => (drawerOpen.value = val)}
      >
        <DrawerContent>
          {/* <DrawerHeader>Drawer Header</DrawerHeader> */}
          <DrawerBody>
            <TestForm />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </PageLayout>
  );
}
