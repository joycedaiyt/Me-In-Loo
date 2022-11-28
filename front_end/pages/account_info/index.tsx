import dynamic from "next/dynamic";

const AccountInfo = dynamic(
  () => {
    return import("../../components/account_info");
  },
  { ssr: false }
);

export const showAcc = () => {
  return <AccountInfo />;
};
export default showAcc;
