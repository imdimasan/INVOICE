import { useState, useEffect, useCallback, useContext } from "react";
import { useHttp } from "hooks/http.hook";
import { AuthContext } from "context/AuthContext";
import { Text, ClientList } from "components";
import {Loader} from "components";

function ClientPage() {
const [clients, setClients] = useState([])
const [user, setUser] = useState([])
const {loading, request, getting} = useHttp()
const {token, userId} = useContext(AuthContext)


const getClients = useCallback(async () => {
  try {
    const fetched = await request(`/api/client/`, "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    setClients(fetched);
  } catch (e) {}
}, [token, request]);

const getUser = useCallback(async () => {
  try {
    const fetched = await getting(`/api/auth/info/${userId}`, "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    setUser(fetched.pro)
  } catch (e) {
  }
}, [token, getting, userId]);


useEffect(() => {
  getClients();
  getUser()
}, [getClients, getUser]);


if (loading) {
  return <Loader />
}


  return (
    <>
      <Text variant="h1" className="page__title">
        Account Clients Page
      </Text>
      {/* {!loading && <LinksList links={links}/>} */}
      {!loading && <ClientList clients={clients} user={user} getClients={getClients}/>}
    </>
  );
}

export default ClientPage;
