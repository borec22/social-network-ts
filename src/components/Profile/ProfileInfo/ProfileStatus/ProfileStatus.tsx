import React, {ChangeEvent, useState} from 'react';

type PropsType = {
   status: string
}

export const ProfileStatus: React.FC<PropsType> = (props) => {
   const [status, setStatus] = useState<string>(props.status);
   let [editMode, setEditMode] = useState<boolean>(false);

   let onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setStatus(e.currentTarget.value);

   const activateEditMode = () => setEditMode(true);
   const deactivateEditMode = () => {
      setEditMode(false);
   }

   return (
      <div> {editMode ?
         <input value={status} onChange={onStatusChangeHandler} onBlur={deactivateEditMode} autoFocus/> :
         <span onDoubleClick={activateEditMode}> {status} </span>}
      </div>
   );
}