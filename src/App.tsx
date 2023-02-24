import axios from 'axios';
import { FC, useEffect, useState } from 'react';

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(
        '/.netlify/functions/getDownloadLinks?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DF_oOtaxb0L8'
      )
      .then((res: any) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err: any) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return <div>{isLoading ? 'Loading...' : JSON.stringify(data)}</div>;
};

export default App;
