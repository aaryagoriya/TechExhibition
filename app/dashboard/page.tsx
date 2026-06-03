import { PostHogIdentify } from "@/components/analytics/PostHogIdentify";
import { PostHogLogoutLink } from "@/components/analytics/PostHogLogoutLink";
import { Navbar } from "@/components/layout/Navbar";
import { requireUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await requireUser();

  const logoutLinkClassName =
    "mt-6 inline-flex min-h-10 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary hover:bg-surface-secondary";

  return (
    <>
      <PostHogIdentify userId={user.id} />
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1440px] flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-xl border border-border bg-surface p-6 shadow-card">
          <h1 className="text-base font-semibold leading-6 text-text-primary">
            Dashboard
          </h1>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            The dashboard UI and analytics will be built in Phase 5.
          </p>
          <PostHogLogoutLink className={logoutLinkClassName}>
            Sign out
          </PostHogLogoutLink>
        </section>
      </main>
    </>
  );
}
