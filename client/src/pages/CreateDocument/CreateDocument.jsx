import { useState, useEffect, useCallback, useContext } from "react";
import { useHttp } from "hooks/http.hook";
import { AuthContext } from "context/AuthContext";
import { Text, Buttons, Input } from "components";
import { Loader } from "components";
import "./CreateDocument.scss";
import { NavigationLink } from "components";
import { pageRoutes } from "constants/pageRoutes";
import { format } from "date-fns";
import logo from "assets/images/qr-code.png";
import logowebp from "assets/images/qr-code.svg";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import html2pdf from "html2pdf.js";
import axios from "axios";

function CreateDocument() {
  const { loading, request, getting } = useHttp();
  const { token, userId } = useContext(AuthContext);
  const date = Date.now();
  const formattedDate = format(date, "yyyy-MM-dd");
  const pdfDate = format(date, "dd-MM-yyyy");

  const [clientinfo, setClientInfo] = useState({
    organization: "",
    unp: "",
    legaladdress: "",
    bankaccount: "",
    bankname: "",
    bic: "",
    noticeact: "",
    noticeinvoice: "",
    contractdate: "",
    contractname: "",
  });
  const [clients, setClients] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [docType, setDocType] = useState("Акт выполненных работ");
  const [docDate, setDocDate] = useState({
    date: formattedDate,
  });
  const [amount, setAmount] = useState({
    amount: 0.0,
  });
  const [worknservice, setWorknService] = useState("");

  const changeDate = (event) => {
    setDocDate({ ...docDate, [event.target.name]: event.target.value });
  };
  const changeAmount = (event) => {
    setAmount({
      ...amount,
      [event.target.name]:
        event.target.type === "number"
          ? parseFloat(event.target.value)
          : event.target.value,
    });
  };

  const changeWorknService = (event) => {
    setWorknService(event.target.value);
  };

  const rubles = require("rubles").rubles;
  const textAmount = rubles(amount.amount.toFixed(2));

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

  const getUserInfo = useCallback(async () => {
    try {
      const fetched = await getting(`/api/auth/info/${userId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setUserInfo(fetched);
    } catch (e) {}
  }, [token, getting, userId]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  document.addEventListener("wheel", function () {
    if (document.activeElement.type === "number") {
      document.activeElement.blur();
    }
  });
  const fillClientInfo = function (client) {
    for (const key in client) {
      if (Object.hasOwnProperty.call(client, key)) {
        setClientInfo((clientinfo) => {
          return {
            ...clientinfo,
            [key]: client[key],
          };
        });
      }
    }
  };

  const exportPdf = function () {
    const element = document.getElementById("element-to-print");
    const opt = {
      margin: [0.1, 0.7],
      filename: `${clientinfo.unp}-${pdfDate}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Text variant="h1" className="page__title">
        Create Document with one click
      </Text>

      {/* BEGIN PAINTING TABLE */}
      <div className="wrapper">
        <div className="main__buttons">
          {userInfo.pro || clients.length < 5
            ? clients.map((client, index) => {
                return (
                  <Buttons
                    key={index}
                    onClick={() => fillClientInfo(client)}
                    className="main__buttons_btn"
                  >
                    {client.organization}
                  </Buttons>
                );
              })
            : clients.slice(0, 5).map((client, index) => {
                return (
                  <Buttons
                    key={index}
                    onClick={() => fillClientInfo(client)}
                    className="main__buttons_btn"
                  >
                    {client.organization}
                  </Buttons>
                );
              })}

          {userInfo.pro || clients.length < 5 ? (
            <Buttons className="main__buttons_btn">
              <NavigationLink
                href={pageRoutes.ADD}
                className={"header__menu__item"}
                title={"Create document with one click"}
              >
                +
              </NavigationLink>
            </Buttons>
          ) : (
            <>
              <Buttons className="main__buttons_btn">
                <NavigationLink
                  href={pageRoutes.CLIENTS}
                  className={"header__menu__item"}
                  title={"Create document with one click"}
                >
                  +{clients.length - 5}
                </NavigationLink>
              </Buttons>
              <Buttons className="main__buttons_btn">
                <NavigationLink
                  href={pageRoutes.ADD}
                  className={"header__menu__item"}
                  title={"Create document with one click"}
                >
                  +
                </NavigationLink>
              </Buttons>
            </>
          )}
        </div>

        <div className="main__type">
          <Buttons
            className="main__buttons_btn"
            onClick={() => {
              setDocType("Акт выполненных работ");
            }}
          >
            Акт выполненных работ
          </Buttons>
          <Buttons
            className="main__buttons_btn"
            onClick={() => {
              setDocType("Счет фактура");
            }}
          >
            Счет-фактура
          </Buttons>
        </div>

        {/* <div className="main__services">
        <Buttons className="main__buttons_btn">Услуга</Buttons>
        </div> */}

        <div className="main__date">
          <Input
            label="Дата оформления документа"
            type="date"
            id="date"
            name="date"
            value={docDate.date ? docDate.date : formattedDate}
            onChange={changeDate}
          />
        </div>

        <div className="main__inputs">
          <Input
            type="number"
            id="amount"
            name="amount"
            label="Сумма работ"
            onChange={changeAmount}
            value={amount.amount}
          ></Input>
        </div>

        <div className="main__document" id="element-to-print">
          <div className="doc__header">
            <div className="doc__header_logo">
              <picture>
                <source type="image/webp" srcSet={logowebp} />
                <source srcSet={logo} />
                <img src={logo} alt="StarLink Web-Studio" loading="lazy" />
              </picture>
            </div>
            <div className="doc__header_info">
              <p>
                {userInfo.unp}
                <br></br>
                {userInfo.organization}
                <br></br>
                {userInfo.legaladdress}
                <br></br>
              </p>
            </div>
          </div>
          <div className="doc__row">
            <div className="doc__type col-1">
              <p>{docType}</p>
            </div>
            <div className="doc__number_p col-2">
              <p>№</p>
            </div>
            <div className="doc__number col-3">
              <p>
                {new Intl.DateTimeFormat("ru-RU")
                  .format(new Date(docDate.date))
                  .replace(/[.]/g, "")}
              </p>
            </div>
            <div className="doc__date_p col-4">
              <p>от</p>
            </div>
            <div className="doc__date col-5">
              <p>
                {new Intl.DateTimeFormat("ru-RU").format(
                  new Date(docDate.date)
                )}
              </p>
            </div>
          </div>
          <div className="doc__row">
            <div className="contract col-1">
              <p>Основание: договор</p>
            </div>
            <div className="contract__number_p col-2">
              <p>№</p>
            </div>
            <div className="contract__number col-3">
              <p>{clientinfo.contractname}</p>
            </div>
            <div className="contract__date_p col-4">
              <p>от</p>
            </div>
            <div className="contract__date col-5">
              <p>
                {clientinfo.contractdate
                  ? new Intl.DateTimeFormat("ru-RU").format(
                      new Date(clientinfo.contractdate)
                    )
                  : ""}
              </p>
            </div>
          </div>

          <div className="doc__body">
            <div className="doc__body__number col-1">
              <p>
                <strong>№</strong>
              </p>
            </div>
            <div className="col-2">
              <p>
                <strong>Наименование работы (услуги)</strong>
              </p>
            </div>
            {/* <div className="col-3">
              <p><strong>URL Адрес</strong></p>
            </div> */}
            <div className="col-4">
              <p>
                <strong>Кол-во</strong>
              </p>
            </div>
            <div className="col-5">
              <p>
                <strong>Цена</strong>
              </p>
            </div>
            <div className="col-6">
              <p>
                <strong>Сумма</strong>
              </p>
            </div>
          </div>
          <div className="doc__body">
            <div className="doc__body__number col-1">
              <p>1</p>
            </div>
            <div className="doc__body__service col-2 worknservice">
              <Input
                label=" "
                type="text"
                id="worknservice"
                name="worknservice"
                onChange={changeWorknService}
                value={worknservice}
              />
            </div>
            {/* <div className="doc__body__url col-3"></div> */}
            <div className="doc__body__qty col-4">
              <p>1</p>
            </div>
            <div className="doc__body__cost col-5">
              <p>{amount.amount ? amount.amount.toFixed(2) : ""}</p>
            </div>
            <div className="doc__body__amount col-6">
              <p>{amount.amount ? amount.amount.toFixed(2) : ""}</p>
            </div>
          </div>
          <div className="doc__body doc__body_second_row">
            <div className="col-1">
              <p></p>
            </div>
            <div className="col-2"></div>
            {/* <div className="col-3"></div> */}
            <div className="col-4"></div>
            <div className="col-5"></div>
            <div className="col-6"></div>
          </div>
          <div className="doc__body">
            <div className="col-7">
              <p>Итого:</p>
            </div>
            <div className="doc__body__total col-8">
              <p>{amount.amount ? amount.amount.toFixed(2) : ""}</p>
            </div>
          </div>
          <div className="doc__body">
            <div className="col-7">
              <p>Без налога (НДС):</p>
            </div>
            <div className="doc__body__totalwotax col-8"></div>
          </div>
          <div className="doc__body">
            <div className="col-7">
              <p>Всего (с учетом НДС):</p>
            </div>
            <div className="doc__body__totalwtax col-8">
              <p>{amount.amount ? amount.amount.toFixed(2) : ""}</p>
            </div>
          </div>
          <div className="doc__middle">
            <p>
              <strong>Всего услуг на сумму:</strong>
            </p>

            <div className="doc__middle__amount">
              <div className="doc__middle__roubles">
                <p>
                  {textAmount
                    ? textAmount.charAt(0).toUpperCase() + textAmount.slice(1)
                    : ""}
                </p>
              </div>
            </div>
          </div>

          <div className="doc__bottom">
            <p>
              <strong>Реквизиты сторон:</strong>
            </p>
            <div className="doc__bottom__left">
              <p>
                {userInfo.organization}
                <br></br>
                {userInfo.legaladdress}
                <br></br>
                УНП: {userInfo.unp}
                <br></br>
                {userInfo.bankaccount}
                <br></br>
                {userInfo.bankname}
                <br></br>
                {userInfo.bic}
                <br></br>
                {userInfo.phone}
                <br></br>
              </p>
            </div>
            <div className="doc__bottom__right">
              <p>
                {clientinfo.organization}
                <br></br>
                {clientinfo.legaladdress}
                <br></br>
                УНП: {clientinfo.unp}
                <br></br>
                {clientinfo.bankaccount}
                <br></br>
                {clientinfo.bankname}
                <br></br>
                {clientinfo.bic}
                <br></br>
              </p>
            </div>

            <div className="doc__bottom__notice">
              <div className="doc__bottom__notice__content">
                <p>
                  {docType === "Акт выполненных работ"
                    ? clientinfo.noticeact
                    : clientinfo.noticeinvoice}
                </p>
              </div>
            </div>

            <div className="doc__bottom__left_sign">
              <p>Исполнитель</p>
            </div>
            <div className="doc__bottom__right_sign">
              <p>Заказчик</p>
            </div>
          </div>
        </div>
        <Buttons onClick={exportPdf} className="main__buttons_btn pdf__btn">
          <PictureAsPdfIcon fontSize={"large"} /> Экспорт PDF
        </Buttons>
      </div>
      {/* END PAINTTING TABLE */}
    </>
  );
}

export default CreateDocument;
