import React, { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
import Follower from './Follower';

function App () {
  const {loading, data} = useFetch(); 
  const [page, setPage] = useState(0); 
  const [followers, setFollowers] = useState([]); 
  // const [value, setValue] = useState(0); 
  
  useEffect(() => {
    if(loading) return
    setFollowers(data[page])
  }, [loading, page, data])
  
  const handlePageChange = (index) => {
    setPage(index)
  }
  
  const hendleNextPage = () => {
    setPage(oldPage => {
      let nextPage = page + 1; 
      if (nextPage > data.length - 1) {
        nextPage = 0
      }
      return nextPage
    })
  }
  
  const handlePrevPage = () => {
    setPage(oldPage => {
      let prevPage = page - 1; 
      if (prevPage < 0) {
        prevPage = data.length - 1; 
      }
      return prevPage
    })
  }
  
  return (
    <main>
      <div className='section-title'>
        <h1>{loading ? 'loading ...' : 'pagination'}</h1>
        <div className='underline'></div>
      </div>
      <section className='followers'>
        <div className='container'>
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />;
          })}
        </div>
        {!loading && (
          <div className='btn-container'>
            <button className='prev-btn' onClick={handlePrevPage}>
              Prev
            </button>
            {data.map((item, index) => {
              return (
                <button
                  className={`page-btn ${index === page && 'active-btn'}`}
                  key={index}
                  onClick={() => handlePageChange(index)}
                >
                  {index + 1}
                </button>
              );
            })}
            <button className='next-btn' onClick={hendleNextPage}>
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
