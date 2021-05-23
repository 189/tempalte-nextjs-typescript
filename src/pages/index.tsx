import React from "react";
import { getLayout } from "components/PrimaryLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

// import clazz from "classnames";

interface Props extends InferGetServerSidePropsType<typeof getServerSideProps> {
  children: React.ReactNode;
}

export default function Home(props: Props) {
  return (
    <React.Fragment>
      <h1>首页 - {props.message}</h1>
      <NextSeo title="KaaS Home" description="KaaS description" />
      {props.children}
    </React.Fragment>
  );
}

type GetServerSideReturn = Promise<{ props: { message: string } }>;

export const getServerSideProps: GetServerSideProps = async function(): GetServerSideReturn {
  console.log("Server Side Render /");
  return {
    props: { message: "this is home page" },
  };
};
Home.getLayout = getLayout;
