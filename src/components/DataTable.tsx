import { DefaultDataProps } from './Main';

export const DataTable = (props: any) => {
  const GREY = '#9E9E9E';
  return (
    <div
      style={{
        width: 'auto',
        border: '1px solid ',
        padding: 50,
        margin: 50,
        boxShadow: `4px 4px 4px ${GREY}`,
      }}
    >
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>firsname</th>
            <th>lastname</th>
            <th>gender</th>
            <th>initial date</th>
            <th>final date</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {props.myData &&
            props.myData.map((x: DefaultDataProps) => (
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.firstName}</td>
                <td>{x.lastName}</td>
                <td>{JSON.stringify(x.gender)}</td>
                <td>{x.initialDate.toString()}</td>
                <td>{x.finalDate.toString()}</td>
                <td>
                  <button onClick={() => props.editFormValue(x)} >edit</button>
                  <button onClick={() => props.deleteData(x.id)}>delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
