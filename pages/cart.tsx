import authService from "../src/services/auth.service";
import {useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "react-query";
import { GetServerSideProps, GetStaticProps, NextApiRequest, NextApiResponse } from 'next';
const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20 * 1000,
    }
  }
})
export default function CartPage() {
  useEffect(()=>{
    authService.login("jingeon27@gmail.com", "1q2w3e4r");
    console.log(Cookies.get("accessToken"))
  }, [])
  return (
<></>
  )
}

const Cartprops = ({cartdata}: any) => {
  const {isLoading, isError, error, data} = useQuery(
    'cartdata',
    getCart,
    {initialData: cartdata}
  )
  if(isLoading){
    return (
      <div>
        <p>Loading..</p>
      </div>
    )
  }
  if(isError) return <p>error</p>
  return(<>
{data}  </>)
}
export const getCart = async () => {
   const token = Cookies.get("accessToken");
  const res = await axios.get(process.env.NEXT_REPUBLIC_API_HOST + "/cart", 
  {headers: {
Authorization: `Bearer ${token}`
  }}
  )
  console.log(res);
  return res;
}