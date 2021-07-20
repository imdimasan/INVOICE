import { Text, Input, Buttons } from "components";
import { AuthContext } from "context/AuthContext";
import { useState, useContext } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import "./AddPage.scss";

function AddPage() {
  const { request } = useHttp();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const date = Date.now();
  const formattedDate = format(date, "yyyy-MM-dd");

  const saveHandler = async () => {
    try {
      const data = await request(
        "/api/link/generate",
        "POST",
        {
          from: link,
        },
        { Authorization: `Bearer ${auth.token}` }
      );
      console.log(data);
      history.push(`/detail/${data.link._id}`);
    } catch (error) {}
  };
  const saveClient = async () => {
    try {
      const data = await request(
        "/api/client/save",
        "POST",
        { ...clientinfo },
        { Authorization: `Bearer ${auth.token}` }
      );
      history.push(`/newclient/${data.client._id}`);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [link, setLink] = useState();

  const [clientinfo, setClientInfo] = useState({
    organization: "",
    unp: "",
    bank: "",
    bic: "",
    notice: "",
    contractdate: "",
    contractname: "",
  });
  const changeClient = (event) => {
    setClientInfo({ ...clientinfo, [event.target.name]: event.target.value });
  };
  console.log(link);
  console.log(clientinfo);

  return (
    <div className="wrapper">
      <Text variant="h1" className="page__title">
        Add new client
      </Text>
      <div className="link__wrapper">
        <div className="link__input">
          <Input
            label="Введите ссыль"
            type="text"
            id="link"
            value={link}
            defaultValue=""
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="link__button">
          <Buttons onClick={saveHandler}>Short Link</Buttons>
        </div>
      </div>

      <div className="client__wrapper">
        <div className="client__input">
          <Input
            label="Название организации"
            type="text"
            id="organization"
            name="organization"
            value={clientinfo.organization}
            onChange={changeClient}
          />
          <Input
            label="УНП"
            type="text"
            id="unp"
            name="unp"
            value={clientinfo.unp}
            onChange={changeClient}
          />
          <Input
            label="Реквизиты"
            type="text"
            id="bank"
            name="bank"
            value={clientinfo.bank}
            onChange={changeClient}
          />
          <Input
            label="БИК"
            type="text"
            id="bic"
            name="bic"
            value={clientinfo.bic}
            onChange={changeClient}
          />
          <Input
            label="Примечание"
            type="text"
            id="notice"
            name="notice"
            value={clientinfo.notice}
            onChange={changeClient}
          />
          <Input
            label="Договор"
            type="text"
            id="contractname"
            name="contractname"
            value={clientinfo.contractname}
            onChange={changeClient}
          />
          <Input
            label="Дата договора"
            type="date"
            id="contractdate"
            name="contractdate"
            value={formattedDate}
            onChange={changeClient}
          />
          {/* <DateTime
            onChange={changeClient}
            date={changeClient}
            name="contractdate"
            id="contractdate"
            value={clientinfo.contractdate}
          /> */}
        </div>
        <div className="client__button">
          <Buttons onClick={saveClient}>Add New Client</Buttons>
        </div>
      </div>
    </div>
  );
}

export default AddPage;
