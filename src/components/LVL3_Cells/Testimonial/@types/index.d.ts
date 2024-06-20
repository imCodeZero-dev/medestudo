import { ReactNode } from "react";
import { ResultDataType } from "../../../../utils/constants/DataTypes";

export interface TestimonialProps {
  data: Testimonialmsg[];
}

interface Testimonialmsg {
  msg: string;
  pic: string;
  title: string;
}
