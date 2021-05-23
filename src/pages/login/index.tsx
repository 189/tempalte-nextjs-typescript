import * as React from "react";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";

import LoginBox from "components/LoginBox";
import { getLayout } from "components/AccountLayout";

interface Props extends InferGetServerSidePropsType<typeof getServerSideProps> {}

export const getServerSideProps: GetServerSideProps = async function(context) {
  const { query } = context;
  return {
    props: {
      type: query.type || "",
    },
  };
};

export default function Login(props: Props) {
  return <LoginBox type={props.type} />;
}

Login.getLayout = getLayout;
