import React from 'react';

// Component for Rendering Table Header
// Iterate through props and render as Table Header
export default ({headers}) => (
  <thead>
    <tr>
      {
      headers.map((item, i) => (
          <th key={i} scope="col">{item}</th>
        ))
      }
    </tr>
  </thead>
);