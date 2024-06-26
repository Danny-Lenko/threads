import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { profileTabs } from "@/constants";
import RepliesTab from "@/components/profile/RepliesTab";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchUser } from "@/lib/actions/user";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const profileHeaderChildren = (
    <Link href="/profile/edit">
      <div className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
        <Image src="/assets/edit.svg" alt="logout" width={16} height={16} />

        <p className="text-light-2 max-sm:hidden">Edit</p>
      </div>
    </Link>
  );

  return (
    <section>
      <ProfileHeader data={userInfo}>{profileHeaderChildren}</ProfileHeader>

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="threads" className="w-full text-light-1">
            {/* @ts-ignore */}
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

          <TabsContent value="reposts" className="w-full text-light-1">
            <ThreadsTab
              currentUserId={user.id}
              accountId={userInfo._id}
              accountType="UserReposts"
              id=""
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
export default Page;
