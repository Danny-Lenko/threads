import Image from "next/image";

import { ICommunityDocument } from "@/lib/models/community.model";
import { User } from "@clerk/nextjs/dist/types/server";
import { MembershipBadge } from "./MembershipBadge";
import { MembershipDialog } from "./MembershipDialog";
import { FormProvider } from "./FormProvider";

export function MembershipStatus({
  communityDetails,
  user,
  userHasSentRequest,
}: {
  communityDetails: ICommunityDocument;
  user: User;
  userHasSentRequest: boolean;
}) {
  const members = communityDetails.members;
  const userIsMember = !!members.find((member) => member.id === user.id);

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
      <FormProvider>
        {!userIsMember && !userHasSentRequest && (
          <MembershipDialog communityId={communityDetails.id} userId={user.id}>
            <span className="hidden sm:block">Request Membership</span>
          </MembershipDialog>
        )}
      </FormProvider>
      {(userIsMember || userHasSentRequest) && (
        <MembershipBadge>{membershipBadgeContent}</MembershipBadge>
      )}
    </>
  );
}
