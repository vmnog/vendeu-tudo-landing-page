'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { setOnboardingCookie } from "@/app/auth/sign-in/actions"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ONBOARDING_STEPS } from "@/constants/routes"
import { OnBoardingStepNumber, getNextOnBoardingStep } from "./actions"

export function NextStepButton() {
  const searchParams = useSearchParams()
  const sessionIdSearchParam = searchParams.get('session_id') ? `?session_id=${searchParams.get('session_id')}` : ''
  const [isLastStep, setIsLastStep] = useState(false)
  const [nextStep, setNextStep] = useState<null | { step: OnBoardingStepNumber, url: string }>(null)

  useEffect(() => {
    if (!nextStep) return
    const lastStep = nextStep.step === Object.keys(ONBOARDING_STEPS).length + 1
    setIsLastStep(lastStep)
  }, [nextStep])

  useEffect(() => {
    getNextOnBoardingStep().then(step => {
      setNextStep(step)
    })
  }, [])

  return (
    nextStep && (
      <Button className="w-fit" asChild onClick={() => setOnboardingCookie(nextStep.step, !isLastStep)}>
        <Link href={`${nextStep.url}${sessionIdSearchParam}`}>
          Continuar
        </Link>
      </Button>
    )
  )
}
