import { useState, useEffect, useCallback, useContext } from "react";
import { useHttp } from "hooks/http.hook";
import { AuthContext } from "context/AuthContext";
import { Text, LinksList } from "components";
import {Loader} from "components";

function ClientPage() {
const [clients, setClients] = useState([])
const {loading, request} = useHttp()
const {token} = useContext(AuthContext)


const getClients = useCallback(async () => {
  try {
    const fetched = await request(`/api/client/`, "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    setClients(fetched);
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
      {!loading && <LinksList clients={clients} getClients={getClients}/>}
    </>
  );
}

export default ClientPage;
