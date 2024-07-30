// Модули
import React, {useState, useEffect} from "react";
// Компоненты
// Стили

export default function SheetPage() {
  const [data, setData] = useState([]);
  const [editedData, setEditedData] = useState([]);
  const [sheetUrl, setSheetUrl] = useState(localStorage.getItem("sheetUrl") || "");
  const username = localStorage.getItem("username") || "defaultUser";

  useEffect(() => {
    const savedData = localStorage.getItem("sheetData");
    if (savedData) {
      setEditedData(JSON.parse(savedData));
    }
  }, []);

  const fetchSheetData = () => {
    if (!sheetUrl) {
      return;
    }

    fetch(sheetUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (!data.users) {
          throw new Error("Invalid data format");
        }
        setData(data.users);
        setEditedData(data.users);
        localStorage.setItem("sheetData", JSON.stringify(data.users));
        localStorage.setItem("sheetUrl", sheetUrl);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (sheetUrl) {
      fetchSheetData();
    }
  }, [sheetUrl]);

  const handleInputChange = (index, field, value) => {
    const newData = [...editedData];
    newData[index][field] = value;

    if (field === "Status" || field === "Cause") {
      if (value === "") {
        newData[index]["Date"] = "";
        newData[index]["Name"] = "";
      } else {
        newData[index]["Date"] = new Date().toLocaleDateString();
        newData[index]["Name"] = username;
      }
    }

    setEditedData(newData);
    localStorage.setItem("sheetData", JSON.stringify(newData));
  };

  const handleSubmit = () => {
    if (!sheetUrl) {
      return;
    }

    const filteredData = editedData.filter(
      (user) =>
        (user.Status === "Принято" && !user.Cause) || (user.Status === "Отклонено" && user.Cause)
    );

    if (filteredData.length === 0) {
      return;
    }

    fetch(sheetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({users: filteredData}),
    }).catch(() => {});
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const handleIdClick = (barcode) => {
    copyToClipboard(barcode);
  };

  return (
    <div style={{marginTop: "60px"}}>
      <input
        type="text"
        placeholder="Enter Google Sheet URL"
        value={sheetUrl}
        onChange={(e) => setSheetUrl(e.target.value)}
      />
      <button onClick={fetchSheetData}>Load Data</button>
      {editedData.length > 0 && (
        <div style={{overflowX: "auto"}}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Barcode</th>
                <th>Status</th>
                <th>Cause</th>
                <th>Date</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {editedData.map((user, index) => (
                <tr key={index}>
                  <td>{index + 2}</td>
                  <td>
                    <a
                      href={`https://admin.kazanexpress.ru/kazanexpress/product/${user.ID}/change`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleIdClick(user.Barcode)}
                    >
                      {user.ID}
                    </a>
                  </td>
                  <td onClick={() => copyToClipboard(user.Barcode)} style={{cursor: "pointer"}}>
                    {user.Barcode}
                  </td>
                  <td>
                    <select
                      value={user.Status}
                      onChange={(e) => handleInputChange(index, "Status", e.target.value)}
                    >
                      <option value="">Выберите статус</option>
                      <option value="Принято">Принято</option>
                      <option value="Отклонено">Отклонено</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={user.Cause}
                      onChange={(e) => handleInputChange(index, "Cause", e.target.value)}
                    />
                  </td>
                  <td>{user.Date}</td>
                  <td>{user.Name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}
