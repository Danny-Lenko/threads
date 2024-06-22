import { currentUser } from "@clerk/nextjs";

import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import { fetchPendingRequestsByCommunityId } from "@/lib/actions/request/read.actions";
import { User } from "@/lib/models/community.model";

type Params = {
  id: string;
  searchParams?: { tag: string };
};

export async function getOneCommunityData({ id, searchParams }: Params) {
  const user = await currentUser();
  if (!user) return null;

  const { id: userId } = user;

  const communityDetails = await fetchCommunityDetails(id);
  const members = communityDetails.members as User[];
  const userIsMember = !!members.find((member) => member.id === userId);

  const requests = await fetchPendingRequestsByCommunityId(
    communityDetails._id,
    searchParams
  );
  const userHasSentRequest = !!requests.find(
    (request) => request.user.id === userId
  );

  const membershipBadgeProps = {
    userHasSentRequest,
    communityDetails,
    userIsMember,
    userId,
  };

  const threadsTabProps = {
    currentUserId: userId,
    accountId: communityDetails._id,
    id,
    accountType: "Community",
  };

  const requestsTabProps = {
    user,
    requests,
    userIsMember,
    orgId: communityDetails._id,
  };

  return {
    communityDetails,
    members,
    membershipBadgeProps,
    threadsTabProps,
    requestsTabProps,
  };
}
