import axios from "axios";
import { useQuery } from "react-query";

export default function ProductListPage() {
  const { data } = useQuery("products", () =>
    axios.get(
      process.env.NEXT_PUBLIC_API_HOST +
        "/products?offset=0&limit=20&sorter=bestAsc"
    )
  );

  console.log(data);

  return <>상품 목록 페이지입니다.</>;
}
