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

  if(!generationdata || isLoading) return <div className="loader"/>;

  return (
    <main>
      <h1 className="centered-title">UK Energy Mix</h1>
      <div className="dashboard-container">
      {
        generationdata.data.generationmix.map((item) => {
          return (
            <div className="dashboard-card" key={item.fuel}>
              <div className="card-header" style={{backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`}}>
                  <h2>{item.fuel}</h2>
              </div>
              <div className="card-content">
                  <p>{item.perc}%</p>
              </div>
            </div>
          );
        })
      }
      </div>
    </main>
  );
};

export {
    App
}