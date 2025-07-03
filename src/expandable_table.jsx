import React, { useEffect, useState } from "react";
import "./expandable_table.css";

function ExpandableTable() {
  const [rows, setRows] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState({});

  useEffect(() => {
    fetch("/rows.json")
      .then((res) => res.json())
      .then((data) => setRows(data.rows));
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSelect = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderRows = (rows, level = 0) =>
    rows.map((row) => (
      <React.Fragment key={row.id}>
        <tr
          className={`et-row${selected[row.id] ? " et-row-selected" : ""}`}
          onClick={() => toggleSelect(row.id)}
        >
          <td style={{ paddingLeft: `${level * 2}rem` }}>
            {row.children && row.children.length > 0 && (
              <button
                className="et-expand-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(row.id);
                }}
                aria-label={expanded[row.id] ? "Collapse" : "Expand"}
              >
                {expanded[row.id] ? (
                  <span>&#9660;</span>
                ) : (
                  <span>&#9654;</span>
                )}
              </button>
            )}
            <span className="et-cell-text">{row.text1}</span>
          </td>
          <td>
            <span className="et-cell-text">{row.text2}</span>
          </td>
        </tr>
        {expanded[row.id] &&
          row.children &&
          row.children.length > 0 &&
          renderRows(row.children, level + 1)}
      </React.Fragment>
    ));

  return (
    <div className="et-container">
      <h2 className="et-title">Exp</h2>
       <h2 className="et-title">Exp</h2>
      <table className="et-table">
        <thead>
          <tr>
            <th>Text 1</th>
            <th>Text 2</th>
          </tr>
        </thead>
        <tbody>{renderRows(rows)}</tbody>
      </table>
      <div className="et-instructions">
        <strong>Instructions:</strong> Click a row to select/deselect select. Click the arrow to expand/collapse children.
           <strong>Instructions:</strong> Click a row to select/deselect. Click the arrow to expand/collapse children.
      </div>
    </div>
  );
}

export default ExpandableTable;
