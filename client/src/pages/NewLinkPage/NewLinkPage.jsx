import { Text, Loader, LinkCard } from "components";
import { AuthContext } from "context/AuthContext";
import { useHttp } from "hooks/http.hook";
import { useState, useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

function NewLinkPage() {
  const [link, setLink] = useState(null);
  const linkId = useParams().id;
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLink(fetched);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Text variant="h1" className="page__title">
        Your Link Added Page
        {!loading && link && <LinkCard link={link} />}
      </Text>
    </>
  );
}

export default NewLinkPage;
