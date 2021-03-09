import React, {ComponentType} from 'react';
import {Preloader} from "../common/preloader/Preloader";


export function withSuspense <T>(WrappedComponent: ComponentType<T>) {

    return (props: T) => {
        return (
            <React.Suspense fallback={<Preloader/>}>
                <WrappedComponent {...props}/>
            </React.Suspense>
        );
    };
}
