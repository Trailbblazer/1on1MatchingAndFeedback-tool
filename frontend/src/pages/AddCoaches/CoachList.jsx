import React, { useState, useEffect } from 'react';

import { getCoaches } from '../../api/coachApi';

const CoachList = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const data = await getCoaches();
        setCoaches(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  if (loading) return <div>Loading coaches...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="coach-list">
      <h2>Coaches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coaches.map(coach => (
          <CoachCard key={coach.CoachId} coach={coach} />
        ))}
      </div>
    </div>
  );
};

export default CoachList;