import { SubmitHandler, useForm } from 'react-hook-form';
import { InputsProps } from './Main';

export const EditForm = (props: any) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputsProps>({
    defaultValues: props.currentData,
  });
  console.log({ props });

  setValue('firstName', props.currentData.firstName);
  setValue('lastName', props.currentData.lastName);
  setValue('gender', props.currentData.gender);
  setValue('initialDate', props.currentData.initialDate);
  setValue('finalDate', props.currentData.finalDate);

  const onSubmit: SubmitHandler<InputsProps> = (data) => {
    data.id = props.currentData.id;
    props.updateData(props.currentData.id, data);
  };

  return (
    <div>
      <div style={{ marginLeft: 10 }}>
        <label>edit form</label>
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
        <input type="text" {...register('firstName', { required: true })} />
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
        <input type="Date" {...register('initialDate', { required: true })} />
        {errors.initialDate && <span>required</span>}
        <br />
        <label>Final Date</label>
        <input type="Date" {...register('finalDate', { required: true })} />
        {errors.finalDate && <span>required</span>}
        <br />
        <button>edit</button>
        <button onClick={() => props.setViewEditForm(false)}>cancel</button>
      </form>
    </div>
  );
};
