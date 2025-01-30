'use server'

import { ONBOARDING_STEPS } from "@/constants/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type OnBoardingStepNumber = 0 | 1 | 2 | 3

export interface OnBoarding {
  onboarding: boolean
  step: OnBoardingStepNumber
}

export async function finishOnboarding() {
  const onboarding: OnBoarding = { step: 0, onboarding: false }
  cookies().set('IS_ONBOARDING', JSON.stringify(onboarding))
}

export async function handleOnBoarding() {
  const cookie = cookies().get('IS_ONBOARDING');
  if (!cookie) {
    redirect('/auth/sign-in')
  }

  const onBoarding: OnBoarding = JSON.parse(cookie.value);
  if (onBoarding.onboarding) {
    const redirectUrl = ONBOARDING_STEPS[onBoarding.step];
    redirect(redirectUrl);
  }
}

export async function getNextOnBoardingStep(): Promise<{ step: OnBoardingStepNumber, url: string }> {
  const fallbackRoute = '/onboarding/import'
  const cookie = cookies().get('IS_ONBOARDING');
  if (!cookie) {
    return { url: fallbackRoute, step: 0 }
  }

  const onBoarding: OnBoarding = JSON.parse(cookie.value);
  const nextStep = (onBoarding.step) + 1 as OnBoardingStepNumber;

  if (onBoarding.onboarding) {
    const nextStepOrCurrent = nextStep > Object.keys(ONBOARDING_STEPS).length ? onBoarding.step : nextStep
    return { url: ONBOARDING_STEPS[nextStepOrCurrent], step: nextStepOrCurrent }
  }

  return { url: fallbackRoute, step: nextStep }
}
