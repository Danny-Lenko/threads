import Image from "next/image";

import { createRequest } from "@/lib/actions/request/create.actions";
import { ICommunityDocument } from "@/lib/models/community.model";
import { MembershipBadge } from "./MembershipBadge";
import { MembershipDialog } from "./MembershipDialog";
import { FormProvider } from "./FormProvider";

type Props = {
  userHasSentRequest: boolean;
  communityDetails: ICommunityDocument;
  userIsMember: boolean;
  userId: string;
};

export async function MembershipStatus({
  userHasSentRequest,
  communityDetails,
  userIsMember,
  userId,
}: Props) {
  // const { userHasSentRequest, communityDetails, userIsMember, userId } = props;

  const membershipBadgeContent = userHasSentRequest ? (
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
    <>
      {/* TODO: add the show rejection status */}
      <FormProvider action={createRequest}>
        {!userIsMember && !userHasSentRequest && (
          <MembershipDialog communityId={communityDetails.id} userId={userId} />
        )}
      </FormProvider>
      {(userIsMember || userHasSentRequest) && (
        <MembershipBadge>{membershipBadgeContent}</MembershipBadge>
      )}
    </>
  );
}
