function Table({ columns, data }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">

      <table className="min-w-full">

        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="text-left px-6 py-3 text-sm font-semibold text-gray-600"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>

          {data.map((row, index) => (
            <tr key={index} className="border-t">

              {row.map((cell, i) => (
                <td key={i} className="px-6 py-4 text-sm">
                  {cell}
                </td>
              ))}

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default Table