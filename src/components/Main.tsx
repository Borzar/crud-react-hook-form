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

export interface InputsProps {
  id: string;
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  initialDate: Date;
  finalDate: Date;
}

// fake data
const initialData = [
  {
    id: uuidv4(),
    firstName: 'Ps',
    lastName: 'Hero',
    gender: GenderEnum.female,
    initialDate: new Date(),
    finalDate: addHours(new Date(), 1),
  },
  {
    id: uuidv4(),
    firstName: 'Chris',
    lastName: 'Griffing',
    gender: GenderEnum.male,
    initialDate: new Date(),
    finalDate: addHours(new Date(), 1),
  },
  {
    id: uuidv4(),
    firstName: 'Train',
    lastName: 'Wreck',
    gender: GenderEnum.female,
    initialDate: new Date(),
    finalDate: addHours(new Date(), 1),
  },
];

const GREY = '9E9E9E';

export function Main() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsProps>();

  const [myData, setMyData] = useState<InputsProps[]>(initialData);
  // edit data form
  const [viewEditForm, setViewEditForm] = useState(false);
  const [initialEditFormState, setInitialEditFormState] = useState<InputsProps>(
    {
      id: '',
      firstName: '',
      lastName: '',
      gender: GenderEnum.female,
      initialDate: new Date(),
      finalDate: addHours(new Date(), 1),
    }
  );
  const [currentData, setCurrentData] =
    useState<InputsProps>(initialEditFormState);

  const editFormValue = (input: InputsProps) => {
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

  const updateData = (id: string, updatedData: InputsProps) => {
    setViewEditForm(false);
    setMyData(
      myData.map((data: InputsProps) => (data.id === id ? updatedData : data))
    );
  };

  // add new data
  const addData = (data: InputsProps) => {
    data.id = uuidv4();
    setMyData([...myData, data]);
  };

  const onSubmit: SubmitHandler<InputsProps> = (data) => {
    addData(data);
  };
  console.log(myData);

  const deleteData = (id: string) => {
    setMyData(myData.filter((x: InputsProps) => x.id !== id));
  };

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
        <DataTable
          editFormValue={editFormValue}
          myData={myData}
          deleteData={deleteData}
        />
      </div>
    </div>
  );
}
