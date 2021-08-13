import { useState, useEffect, useCallback, useContext } from "react";
import { useHttp } from "hooks/http.hook";
import { AuthContext } from "context/AuthContext";
import { Text, LinksList } from "components";
import {Loader} from "components";

function ClientPage() {
const [links, setLinks] = useState([])
const {loading, request} = useHttp()
const {token} = useContext(AuthContext)


const getLink = useCallback(async () => {
  try {
    const fetched = await request(`/api/link/`, "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    setLinks(fetched);
    console.log(fetched);
  } catch (e) {}
}, [token, request]);

useEffect(() => {
  getLink();
}, [getLink]);


if (loading) {
  return <Loader />
}


  return (
    <>
      <Text variant="h1" className="page__title">
        Account Clients Page
      </Text>
      {!loading && <LinksList links={links}/>}
    </>
  );
}

export default ClientPage;
