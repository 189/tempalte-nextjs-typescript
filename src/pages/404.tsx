import * as React from "react";
import Image from "next/image";
import { getLayout } from "components/PrimaryLayout";
import styled from "styled-components";

const StyledBack = styled.h4`
  margin-top: 50px;
  cursor: pointer;
`;

export default function Custom404() {
  const onBack = React.useCallback(() => {
    history.back();
  }, []);
  return (
    <div className="ui-column-center">
      <Image src="/images/404.png" width={369} height={200} />
      <StyledBack onClick={onBack}>返回</StyledBack>
    </div>
  );
}

Custom404.getLayout = getLayout;
