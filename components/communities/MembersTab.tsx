import { User } from "@/lib/models/community.model";
import UserCard from "../cards/UserCard";

async function MembersTab({ members }: { members: User[] }) {
  return (
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
  );
}

export default MembersTab;
