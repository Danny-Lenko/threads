import ThreadsTab from "@/components/shared/ThreadsTab";
import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { FormProvider } from "@/components/communities/FormProvider";
import RequestsTab from "@/components/communities/RequestsTab";
import { MembershipStatus } from "@/components/communities/MembershipStatus";
import CommunityTabsList from "@/components/communities/CommunityTabsList";
import MembersTab from "@/components/communities/MembersTab";
import { acceptOrRejectRequest } from "@/lib/actions/request/update.actions";
import { getOneCommunityData } from "@/lib/helpers/communities/getOneCommunityData";

interface Props {
  params: { id: string };
  searchParams?: { tag: string };
}

async function Page({ params: { id }, searchParams }: Props) {
  const data = await getOneCommunityData({ id, searchParams });
  if (!data) return null;

  const {
    communityDetails,
    membershipBadgeProps,
    threadsTabProps,
    members,
    requestsTabProps,
  } = data;

  return (
    <section className="relative">
      <ProfileHeader data={communityDetails}>
        <MembershipStatus {...membershipBadgeProps} />
      </ProfileHeader>

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <CommunityTabsList communityDetails={communityDetails} />

          <TabsContent value="threads" className="w-full text-light-1">
            <ThreadsTab {...threadsTabProps} />
          </TabsContent>

          <TabsContent value="members" className="mt-9 w-full text-light-1">
            <MembersTab members={members} />
          </TabsContent>

          <TabsContent value="requests" className="w-full text-light-1">
            <FormProvider action={acceptOrRejectRequest}>
              <RequestsTab {...requestsTabProps} />
            </FormProvider>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
