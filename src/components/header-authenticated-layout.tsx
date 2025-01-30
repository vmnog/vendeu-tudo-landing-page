import { ToggleSidebarMobileButton } from './sidebar';
import { SignOutButton } from './sign-out-button';
import { ThemeToggle } from './theme-toggle';

export function HeaderAuthenticatedLayout() {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-background px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <ToggleSidebarMobileButton />

      {/* Separator */}
      <div className="h-6 w-px bg-border lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 justify-end gap-x-4">
        <SignOutButton />

        <ThemeToggle />
      </div>
    </div>
  )
}
