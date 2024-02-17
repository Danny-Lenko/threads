import Image from "next/image";
// import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user";
// import { getActivity } from "@/lib/actions/thread";
import { Tabs, 
  // TabsContent, 
TabsList, TabsTrigger } from "@/components/ui/tabs";
import { acitivityTabs } from "@/constants";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // const activity = await getActivity(userInfo._id);

  return (
    <>
      <h1 className="head-text">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {acitivityTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                {tab.icon && (
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* <TabsContent value="threads" className="w-full text-light-1">
            <ThreadsTab
              currentUserId={user.id}
              accountId={userInfo.id}
              accountType="User"
            />
          </TabsContent>

          <TabsContent value="replies" className="w-full text-light-1">
            <RepliesTab
              currentUserId={user.id}
              accountId={userInfo._id}
              accountType="User"
            />
          </TabsContent>

          <TabsContent value="tagged" className="w-full text-light-1">
            <ThreadsTab
              currentUserId={user.id}
              accountId={userInfo.id}
              accountType="User"
            />
          </TabsContent> */}
        </Tabs>
      </section>
    </>
  );
}

export default Page;

// {
  /* <section className="mt-10 flex flex-col gap-5">
{activity.length > 0 ? (
  <>
    {activity.map((activity) => (
      <Link key={activity._id} href={`/thread/${activity.parentId}`}>
        <article className="activity-card">
          <Image
            src={activity.author.image}
            alt="user_logo"
            width={20}
            height={20}
            className="rounded-full object-cover"
          />
          <p className="!text-small-regular text-light-1">
            <span className="mr-1 text-primary-500">
              {activity.author.name}
            </span>{" "}
            replied to your thread
          </p>
        </article>
      </Link>
    ))}
  </>
) : (
  <p className="!text-base-regular text-light-3">No activity yet</p>
)}
</section>
 */
// }
