import React, {ChangeEvent, useEffect, useState} from 'react';

type PropsType = {
   status: string
   updateProfileStatus: (status: string) => void
}

export const ProfileStatus: React.FC<PropsType> = (props) => {
   const [status, setStatus] = useState<string>(props.status);
   let [editMode, setEditMode] = useState<boolean>(false);

   useEffect(() => {
      setStatus(props.status);
   }, [props.status])

   let onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setStatus(e.currentTarget.value);

   const activateEditMode = () => setEditMode(true);
   const deactivateEditMode = () => {
      setEditMode(false);
      props.updateProfileStatus(status);
   }

   return (
      <div> {editMode ?
         <input value={status} onChange={onStatusChangeHandler} onBlur={deactivateEditMode} autoFocus/> :
         <span onDoubleClick={activateEditMode}> {status || '---------'} </span>}
      </div>
   );
}