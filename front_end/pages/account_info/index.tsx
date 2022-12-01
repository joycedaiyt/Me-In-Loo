import { AccountInfo } from "../../components/AccountInfo";

// const AccountInfo = dynamic(
//   () => {
//     return import("../../components/AccountInfo");
//   },
//   { ssr: false }
// );

export const showAcc = () => {
  return <AccountInfo />;
};
export default showAcc;
