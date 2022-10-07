import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { addHours } from 'date-fns';
import { DataTable } from './DataTable';
import { EditForm } from './EditForm';

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}

export interface Inputs {
  id: string;
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  initialDate: Date;
  finalDate: Date;
}

export interface DefaultDataProps {
  id: string;
  firstName: string;
  lastName: string;
  gender: {};
  initialDate: Date;
  finalDate: Date;
}

// fake data
const initialData = [
  {
    id: uuidv4(),
    firstName: 'Ps',
    lastName: 'Hero',
    gender: 'female',
    initialDate: new Date(),
    finalDate: addHours(new Date(), 1),
  },
  {
    id: uuidv4(),
    firstName: 'Chris',
    lastName: 'Griffing',
    gender: 'male',
    initialDate: new Date(),
    finalDate: addHours(new Date(), 1),
  },
  {
    id: uuidv4(),
    firstName: 'Train',
    lastName: 'Wreck',
    gender: 'other',
    initialDate: new Date(),
    finalDate: addHours(new Date(), 1),
  },
];

const GREY = '#9E9E9E';

export function Main() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [myData, setMyData] = useState<DefaultDataProps[]>(initialData);
  // edit data form
  const [viewEditForm, setViewEditForm] = useState(false);
  const [initialEditFormState, setInitialEditFormState] =
    useState<DefaultDataProps>({
      id: '',
      firstName: '',
      lastName: '',
      gender: '',
      initialDate: new Date(),
      finalDate: addHours(new Date(), 1),
    });
  const [currentData, setCurrentData] =
    useState<DefaultDataProps>(initialEditFormState);

  const editFormValue = (input: any) => {
    setViewEditForm(true);
    setCurrentData({
      id: input.id,
      firstName: input.firstName,
      lastName: input.lastName,
      gender: input.gender,
      initialDate: input.initialDate,
      finalDate: input.finalDate,
    });
  };

  const updateData = (id: string, updatedData: any) => {
    setViewEditForm(false);
    setMyData(
      myData.map((data: DefaultDataProps) =>
        data.id === id ? updatedData : data
      )
    );
  };

  // add new data
  const addData = (data: any) => {
    data.id = uuidv4();
    setMyData([...myData, data]);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addData(data);
  };
  console.log(myData);

  const deleteData = (id:any) => {
    setMyData(myData.filter( (x: DefaultDataProps) =>  x.id !== id )) 
  }

  return (
    <div>
      <div
        style={{
          width: 300,
          border: '1px solid ',
          padding: 50,
          margin: 50,
          boxShadow: `4px 4px 4px ${GREY}`,
        }}
      >
        {viewEditForm ? (
          <EditForm
            currentData={currentData}
            setViewEditForm={setViewEditForm}
            updateData={updateData}
          />
        ) : (
          <div>
            <div style={{ marginLeft: 10 }}>
              <label>new form</label>
            </div>
            <br />
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
              }}
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* register your input into the hook by invoking the "register" function */}
              <label>Firstname</label>
              <input
                type="text"
                {...register('firstName', { required: true })}
              />
              {errors.firstName && <span>required</span>}
              <br />
              <label>Lastname</label>
              <input
                placeholder="last name"
                {...register('lastName', { required: true })}
              />
              {errors.lastName && <span>required</span>}
              <br />
              <label>Gender</label>
              <select {...register('gender')}>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
              </select>
              {errors.gender && <span>required</span>}
              <br />
              <label>Initial Date</label>
              <input
                type="Date"
                {...register('initialDate', { required: true })}
              />
              {errors.initialDate && <span>required</span>}
              <br />
              <label>Final Date</label>
              <input
                type="Date"
                {...register('finalDate', { required: true })}
              />
              {errors.finalDate && <span>required</span>}
              <br />
              <button>submit</button>
            </form>
          </div>
        )}
      </div>
      <div>
        <DataTable editFormValue={editFormValue} myData={myData} deleteData={deleteData} />
      </div>
    </div>
  );
}
