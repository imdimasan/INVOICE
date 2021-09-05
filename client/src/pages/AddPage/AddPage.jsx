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

  const saveClient = async () => {
    try {
      const data = await request(
        "/api/client/save",
        "POST",
        { ...clientinfo },
        { Authorization: `Bearer ${auth.token}` }
      );
      history.push(`/newclient/${data.client._id}`);

    } catch (error) {
    }
  };

  const [clientinfo, setClientInfo] = useState({
    organization: "",
    unp: "",
    legaladdress: "",
    bankaccount: "",
    bankname: "",
    bic: "",
    noticeact: "",
    noticeinvoice: "",
    contractdate: formattedDate,
    contractname: "",
  });
  const changeClient = (event) => {
    setClientInfo({ ...clientinfo, [event.target.name]: event.target.value });
  };

  return (
    <div className="wrapper">
      <Text variant="h1" className="page__title">
        Add new client
      </Text>

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
            type="number"
            id="unp"
            name="unp"
            value={clientinfo.unp}
            onChange={changeClient}
          />
          <Input
            label="Юридический адрес"
            type="text"
            id="legaladdress"
            name="legaladdress"
            value={clientinfo.legaladdress}
            onChange={changeClient}
          />
          <Input
            label="Расчетный счет IBAN"
            type="text"
            id="bankaccount"
            name="bankaccount"
            value={clientinfo.bankaccount}
            onChange={changeClient}
          />
          <Input
            label="Название банка"
            type="text"
            id="bankname"
            name="bankname"
            value={clientinfo.bankname}
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
            label="Примечание для акта выполненных работ"
            type="text"
            id="noticeact"
            name="noticeact"
            value={clientinfo.noticeact}
            onChange={changeClient}
          />
          <Input
            label="Примечание для счет-фактуры"
            type="text"
            id="noticeinvoice"
            name="noticeinvoice"
            value={clientinfo.noticeinvoice}
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
            value={clientinfo.contractdate? clientinfo.contractdate : formattedDate}
            onChange={changeClient}
          />
          
        </div>
        <div className="client__button">
          <Buttons onClick={saveClient}>Add New Client</Buttons>
        </div>
      </div>
    </div>
  );
}

export default AddPage;
