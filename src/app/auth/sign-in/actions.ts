'use server';

import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
import { OnBoarding, OnBoardingStepNumber } from "@/app/onboarding/actions";

export async function facebookSignOut() {
  cookies().delete('FB_ACCESS_TOKEN')
  redirect('/auth/sign-in')
}

export async function facebookSignIn(accessToken: string) {
  cookies().set('FB_ACCESS_TOKEN', accessToken)
  await checkOnBoardingCookieExists()
  redirect('/dashboard')
}

export async function checkOnBoardingCookieExists() {
  const onboarding = cookies().get('IS_ONBOARDING')
  const defaultOn: OnBoarding = { onboarding: true, step: 0 }

  if (!onboarding) {
    cookies().set('IS_ONBOARDING', JSON.stringify(defaultOn))
  }
}

export async function setOnboardingCookie(step: OnBoardingStepNumber, isOnboarding = true) {
  const onboarding: OnBoarding = { onboarding: isOnboarding, step }
  cookies().set('IS_ONBOARDING', JSON.stringify(onboarding))
}
