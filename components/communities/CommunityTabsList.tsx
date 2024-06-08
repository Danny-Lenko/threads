import Image from "next/image";

import { communityTabs } from "@/constants";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { ICommunityDocument } from "@/lib/models/community.model";

async function CommunityTabsList({
  communityDetails: { threads },
}: {
  communityDetails: ICommunityDocument;
}) {
  return (
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
              {threads?.length}
            </p>
          )}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}

export default CommunityTabsList;
