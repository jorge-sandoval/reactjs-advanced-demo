import { useRouteError } from 'react-router-dom';

export default function RouteError() {
  const error = useRouteError() as Error;

  return (
    <>
      <h1>Error - Something went wrong</h1>
      {import.meta.env.MODE !== 'production' && (
        <>
          <pre> {error.message}</pre>
          <pre> {error.stack}</pre>
        </>
      )}
    </>
  );
}
