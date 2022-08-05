import { useEffect, useState } from "react";
import Utils from "../../utils/utils";
import styles from "./Card.module.css";
import Spinner from "../Spinner/Spinner";

const API_NAMES = [
    "accounts",
    "assets",
    "customers",
    "datapoints",
    "devices",
    "documents",
    "forms",
    "invites",
    "media",
    "messages",
    "namespaces",
    "orders",
    "patients",
    "relationships",
    "rules",
    "templates",
    "users",
    "workflows"
  ];
  
  const CardStatus: React.FC = () => {

    const [apiResponse, setApiResponse] = useState<any[]>([]);
    const [errorsApiResponse, setErrorsApiResponse] = useState<any[]>([]);
    const { getCardTitleFormatted, getTimeFormatted, getStatusFormatted, getCardErrorTitleFormatted } = Utils;
    const isLoading: boolean = apiResponse.length === 0;

    useEffect(() => {
      const NUMBER_OF_SECONDS_INTERVAL = 15000;
      setInterval(() => {
        setApiResponse([])
        setErrorsApiResponse([])
        Promise.all(
          API_NAMES.map((apiName) => {
          return fetch(`https://api.factoryfour.com/${apiName}/health/status`)
            .then((res) => {
              if(!res.ok) {
                setErrorsApiResponse((prev) => [
                  ...prev,
                  res
                ])
              }
              return res.json();
            })
            .then((data) => {
              setApiResponse((prev) => [
                ...prev,
                data
              ])
            })
            .catch( err => console.error('Error:', err.message))
        })
      );
      }, NUMBER_OF_SECONDS_INTERVAL);
    }, []);


    return (
      <>
       {
         isLoading ? (<Spinner />)
         :
         ( <div className={styles.wrapper}>
          {
            apiResponse.map(({ message, hostname, time }, i) => {
              return <div className={styles.card} key={i}>
                <h1 className={styles.title} >{getCardTitleFormatted(hostname)}</h1>
                <p className={styles.healthy} >{getStatusFormatted(message)}</p>
                <p>{hostname}</p>
                <p>{getTimeFormatted(time)}</p>
              </div>
            })
          }
  
          {
            errorsApiResponse.map(({ status, url }, i) => {
              return <div className={styles.card} key={i}>
                <h1 className={styles.title}>{getCardErrorTitleFormatted(url)}</h1>
                <p className={styles.error}>Error</p>
                <p className={styles.outage}>OUTAGE</p>
                <p className={styles.errorDetail}>{status}</p>
                <p className={styles.errorDetail}>Service Temporarily Unavailable</p>
              </div>
            })
          }
        </div>
        )
       }</>
     );
  };
  
  export default CardStatus;
  