import { useRouter } from "next/router";

export default function VendoritemPage() {
  const router = useRouter();

  console.log(router.query.itemId, router.query.vendoritemId);

  return <></>;
}
