import * as React from "react";
import { useRouter } from "next/router";
import { observer, inject } from "mobx-react";

import SubLayout from "components/SubLayout";
import UserStore from "store/user";

interface Props {
  userStore: UserStore;
}

const Profile: React.FunctionComponent<Props> = (props: Props) => {
  const userStore = props.userStore;
  const router = useRouter();

  return (
    <SubLayout activeMenu="profile">
      <div>Hi~ {userStore.username}</div>
    </SubLayout>
  );
};

export default inject("userStore")(observer(Profile));
