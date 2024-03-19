import Image from "next/image";
import { currentUser } from "@clerk/nextjs";

import { communityTabs } from "@/constants";

import UserCard from "@/components/cards/UserCard";
import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { MembershipDialog } from "@/components/communities/MembershipDialog";

import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import { MembershipBadge } from "@/components/communities/MembershipBadge";
import { User } from "@/lib/models/community.model";
import RequestTab from "@/components/communities/RequestsTab";
import { fetchRequestsByCommunityId } from "@/lib/actions/request/read.actions";

async function Page({ params: { id } }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const communityDetails = await fetchCommunityDetails(id);
  const members = communityDetails.members as User[];
  const userIsMember = !!members.find((member) => member.id === user.id);

  const requests = await fetchRequestsByCommunityId(communityDetails._id);
  const userSentRequest = !!requests.find(
    (request) => request.user.id === user.id
  );

  console.log("REQUESTS:", requests);

  const membershipBadgeContent = userSentRequest ? (
    <>
      <Image
        src="/assets/request.svg"
        alt="logout"
        width={16}
        height={16}
        className="min-w-[1rem] brightness-0 invert sm:-translate-x-2"
      />
      <span className="hidden sm:block">You requested membership</span>
    </>
  ) : (
    <>
      <Image
        src="/assets/members.svg"
        alt="logout"
        width={16}
        height={16}
        className="min-w-[1rem] brightness-0 invert sm:-translate-x-2"
      />
      <span className="hidden sm:block">You&apos;re a member</span>
    </>
  );

  return (
    <section className="relative">
      <ProfileHeader
        accountId={communityDetails.createdBy?.id as string}
        authUserId={user.id}
        name={communityDetails.name}
        username={communityDetails.username}
        imgUrl={communityDetails.image!}
        bio={communityDetails.bio!}
        type="Community"
      />

      {!userIsMember && !userSentRequest && (
        <MembershipDialog communityId={communityDetails.id} userId={user.id} />
      )}
      {(userIsMember || userSentRequest) && (
        <MembershipBadge>{membershipBadgeContent}</MembershipBadge>
      )}

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {communityTabs.map((tab) => (
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
                    {communityDetails.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="threads" className="w-full text-light-1">
            {/* @ts-ignore */}
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType="Community"
            />
          </TabsContent>

          <TabsContent value="members" className="mt-9 w-full text-light-1">
            <section className="section">
              {members.map((member) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image!}
                  personType="User"
                />
              ))}
            </section>
          </TabsContent>

          <TabsContent value="requests" className="w-full text-light-1">
            {/* @ts-ignore */}
            <RequestTab
              user={user}
              requests={requests}
              userIsMember={userIsMember}
              orgId={communityDetails.id}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
