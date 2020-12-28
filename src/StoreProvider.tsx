import React from 'react';

type PropsType = {
   children: React.ReactNode
   store: any
}

export const StoreContext = React.createContext<any>(null);

export function Provider(props: PropsType) {

   return <StoreContext.Provider value={props.store}>
      {props.children}
   </StoreContext.Provider>
}