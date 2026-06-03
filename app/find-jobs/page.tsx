import { PostHogIdentify } from "@/components/analytics/PostHogIdentify";
import { Navbar } from "@/components/layout/Navbar";
import { requireUser } from "@/lib/auth";

export default async function FindJobsPage() {
  const user = await requireUser();

  return (
    <>
      <PostHogIdentify userId={user.id} />
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1440px] flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-xl border border-border bg-surface p-6 shadow-card">
          <h1 className="text-base font-semibold leading-6 text-text-primary">
            Find Jobs
          </h1>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Job search controls and listings will be built in Phase 3.
          </p>
        </section>
      </main>
    </>
  );
}
