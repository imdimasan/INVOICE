import {Text} from "components";
import "./ClientList.scss"
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PaymentIcon from '@material-ui/icons/Payment';
import {Buttons} from "components"
import { useHttp } from "hooks/http.hook";
import { AuthContext } from "context/AuthContext";
import { useCallback, useContext } from "react";

const ClientsList = ({clients, user, getClients}) => {
  const {removing} = useHttp()
  const {token} = useContext(AuthContext)
  const paid = user
  const removeClient = useCallback(async (id) => {
    try {
      await removing(`/api/client/remove/${id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
      getClients()
    } catch (e) {
    }
  }, [token, removing, getClients]);



  if (!clients.length) {
      return <Text variant={"p"} className={"page__title"}>No clients here =(</Text>
  }

 
  if (paid || clients.length < 5) {
    return (
      <>
      <table>
       <thead>
     <tr>
       <th>№</th>
       <th>Организация</th>
       <th>УНП</th>
     </tr>
     </thead>
     <tbody>
     {clients.map ((client, index) => {
       return (
         <tr key={index}>
           <td>{index+1}</td>
           <td>{client.organization}</td>
           <td>{client.unp}</td>
           <td><IconButton aria-label="delete" dataset-id={client._id} onClick={()=>removeClient(client._id)} >
         <DeleteIcon />
       </IconButton></td>
         </tr>
       )
     })}
     </tbody>
   </table>

   </>
   )
  } else {
      return (
        <>
        <table>
         <thead>
       <tr>
         <th>№</th>
         <th>Организация</th>
         <th>УНП</th>
       </tr>
       </thead>
       <tbody>
       {clients.slice(0, 5).map ((client, index) => {
         return (
           <tr key={index}>
             <td>{index+1}</td>
             <td>{client.organization}</td>
             <td>{client.unp}</td>
             <td><IconButton aria-label="delete" onClick={() => { removeClient(client._id) }}>
           <DeleteIcon />
         </IconButton></td>
           </tr>
         )
       })}
       </tbody>
     </table>
     <Text variant="p">В вашем аккаунте <strong>{clients.length}</strong> записей. Чтобы увидеть их все перейдите на Pro тариф.</Text>
     <Buttons startIcon={<PaymentIcon />}>Сменить тариф на Pro</Buttons>
     </>
     )
    }






}

export default ClientsList