'use client'

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { finishOnboarding } from "../actions";

export function FinishOnboardingButton() {
  return (
    <DialogClose asChild>
      <Button className="w-fit" onClick={() => finishOnboarding()}>
        Continuar
      </Button>
    </DialogClose>
  )
}
