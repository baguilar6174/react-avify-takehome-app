import React from 'react';

import { useGenerationDataStore } from './stores';

const App = () => {

  const isLoading = useGenerationDataStore((state) => state.isLoading);
	const generationdata = useGenerationDataStore((state) => state.generationdata);
	const fetchGenerationData = useGenerationDataStore((state) => state.fetchGenerationData);

  /**
   * Fetch data
   */
  React.useEffect(() => {
    fetchGenerationData();
  }, []);

  return (
    <div >
      <h1 className='mt-12'>UK Energy Mix</h1>
    </div>
  );
};

export {
    App
}