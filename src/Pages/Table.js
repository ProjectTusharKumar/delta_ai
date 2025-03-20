import React, { useEffect, useState } from 'react';
import api from '../api'

const TableManager = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [error, setError] = useState(null);
  const [loadingTables, setLoadingTables] = useState(true);

  // Fetch the list of table names when the component mounts.
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await api.get('/api/table');
        if (!response.ok) {
          throw new Error('Failed to fetch table names');
        }
        const result = await response.json();
        // Assume the API returns an array of table names in result.tables
        setTables(result.tables);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingTables(false);
      }
    };

    fetchTables();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (loadingTables) return <div className="text-blue-500">Loading tables...</div>;

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Select a Table</h2>
        <div className="flex space-x-2">
          {tables.map((table, index) => (
            <button
              key={index}
              onClick={() => setSelectedTable(table)}
              className={`px-10 py-2 rounded ${
                selectedTable === table
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {table}
            </button>
          ))}
        </div>
      </div>
      {selectedTable && <TableDisplay selectedTable={selectedTable} />}
    </div>
  );
};

const TableDisplay = ({ selectedTable }) => {
  const [data, setData] = useState([]);
  const [tableName, setTableName] = useState('');
  const [error, setError] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  // Custom column order as provided.
  const customColumns = [
    'id',
    'name',
    'dob',
    'Phone No',
    'skills',
    'doj',
    'salary',
    'attendance last year',
    'projects completed',
    'projects currently on',
    'past projects'
  ];

  // Fetch data whenever the selected table changes.
  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/table?name=${encodeURIComponent(selectedTable)}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data for the selected table');
        }
        const result = await response.json();
        setData(result.data);
        setTableName(result.table_name);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [selectedTable]);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (loadingData) return <div className="text-blue-500">Loading data...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{tableName}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {customColumns.map((column) => (
                <th key={column} className="border px-4 py-2">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {customColumns.map((col, colIndex) => (
                  <td key={colIndex} className="border px-4 py-2">
                    {row[col] !== undefined ? row[col] : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableManager;
