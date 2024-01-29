import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";

const EditableTable = ({ object }) => {
  const user = JSON.parse(localStorage.getItem("USER"));
  const [rows, setRows] = useState([]);
  const [newName, setNewName] = useState("");
  const [editState, setEditState] = useState({});
  const collectionRef = collection(db, object);
  const [opeLoader, setOpeLoader] = useState("");

  useEffect(() => {
    const getRows = async () => {
      const q = query(collectionRef, where("userID", "==", user.uid));
      const data = await getDocs(q);
      setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getRows();
  }, [opeLoader]);
  const handleAdd = async () => {
    const newRow = { name: newName, userID: user.uid };
    await addDoc(collectionRef, newRow);
    setOpeLoader("Add");
    setNewName("");
  };

  const handleDelete = async (index) => {
    await deleteDoc(doc(db, object, rows[index]?.id));
    setOpeLoader("Delete");
  };

  const startEdit = (index) => {
    setEditState({ index, name: rows[index].name, id: rows[index].id });
  };

  const handleEditChange = (e) => {
    setEditState({ ...editState, name: e.target.value });
  };

  const saveEdit = async () => {
    await updateDoc(doc(db, object, editState.id), { name: editState.name });
    setOpeLoader("Edit");
    setEditState({});
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg py-[50px] ">
      <div className="flex gap-3 mb-4 items-center">
        <input
          className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg px-3 py-2 w-4/5"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter name"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 transition duration-150 ease-in-out w-1/5"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-4/5 font-Lora">
              Name
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/5 font-Lora">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                {editState.index === index ? (
                  <input
                    className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg px-3 py-2 w-full"
                    type="text"
                    value={editState.name}
                    onChange={handleEditChange}
                  />
                ) : (
                  <span>{row.name}</span>
                )}
              </td>
              <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm flex gap-2">
                {editState.index === index ? (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 transition duration-150 ease-in-out"
                    onClick={saveEdit}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg px-4 py-2 transition duration-150 ease-in-out"
                    onClick={() => startEdit(index)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 transition duration-150 ease-in-out"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
