import { Text, Loader, ClientCard } from "components";
import { AuthContext } from "context/AuthContext";
import { useHttp } from "hooks/http.hook";
import { useState, useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

function NewClientPage() {
  const [client, setClient] = useState(null);
  const clientId = useParams().id;
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  const getClient = useCallback(async () => {
    try {
      const fetched = await request(`/api/client/${clientId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setClient(fetched);
    } catch (e) {}
  }, [token, clientId, request]);

  useEffect(() => {
    getClient();
  }, [getClient]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Text variant="h1" className="page__title">
        Client just added to your account
        {!loading && client && <ClientCard client={client} />}
      </Text>
    </>
  );
}

export default NewClientPage;
