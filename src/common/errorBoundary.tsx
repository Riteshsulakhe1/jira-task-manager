import React from 'react';
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

const AppErrorBoundary = (props: any) => {

    const fallbackRender = (fallbackProps: FallbackProps) => {
        console.log('fallbackProps==>', fallbackProps);
        return (
            <div {...fallbackProps}>Something went wrong...</div>
        );
    };

    return (
        <ErrorBoundary fallbackRender={(fallbackProps) => fallbackRender(fallbackProps)} />
    );
};
export default AppErrorBoundary;