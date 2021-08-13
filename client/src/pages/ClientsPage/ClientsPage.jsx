import { useState, useEffect, useCallback, useContext } from "react";
import { useHttp } from "hooks/http.hook";
import { AuthContext } from "context/AuthContext";
import { Text, LinksList } from "components";
import {Loader} from "components";

function ClientPage() {
// const [links, setLinks] = useState([])
const [clients, setClients] = useState([])
const {loading, request} = useHttp()
const {token} = useContext(AuthContext)


// const getLink = useCallback(async () => {
//   try {
//     const fetched = await request(`/api/link/`, "GET", null, {
//       Authorization: `Bearer ${token}`,
//     });
//     setLinks(fetched);
//     console.log(fetched);
//   } catch (e) {}
// }, [token, request]);

// useEffect(() => {
//   getLink();
// }, [getLink]);
const getClients = useCallback(async () => {
  try {
    const fetched = await request(`/api/client/`, "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    setClients(fetched);
    console.log(fetched);
  } catch (e) {}
}, [token, request]);

useEffect(() => {
  getClients();
}, [getClients]);


if (loading) {
  return <Loader />
}


  return (
    <>
      <Text variant="h1" className="page__title">
        Account Clients Page
      </Text>
      {/* {!loading && <LinksList links={links}/>} */}
      {!loading && <LinksList clients={clients}/>}
    </>
  );
}

export default ClientPage;
