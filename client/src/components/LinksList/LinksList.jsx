import {NavigationLink, Text} from "components"

const LinksList = ({links}) => {


    if (!links.length) {
        return <Text variant={"p"} className={"page__title"}>No links here =(</Text>
    }


    return (
        // <Table />
        <table>
        <thead>
          <tr>
              <th>#</th>
              <th>Original Link</th>
              <th>Short Link</th>
              <th>Open</th>
          </tr>
        </thead>

        <tbody>
            {links.map ((link, index) => {
                return (
          <tr key={link._id}>
            <td>{index +1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td><NavigationLink
                href={`/detail/${link._id}`}
                title={"Go to link"}
                externalLink = {true}
              >
               Open Link
              </NavigationLink></td>
          </tr>

                )
            })}
          
        </tbody>
      </table>
    )
}

export default LinksList