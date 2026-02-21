import React, { useState, useEffect } from "react";

function App() {
  const [title, setTitle] = useState("Loading...");
  useEffect(() => {
    fetch("http://localhost:8080/api/sheet-title")
      .then((response) => response.text())
      .then((data) => setTitle(data))
      .catch((error) => {
        console.error("Error:", error);
        setTitle("Failed to load title.");
      });
  }, []);

  const [formData, setFormData] = useState({
    date: "",
    description: "",
    cost: "",
    category: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setShowSuccess(false);

    try {
      await fetch("http://localhost:8080/api/add-expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setFormData({ date: "", description: "", cost: "", category: "" }); // Clear form
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Budget Tracker</h1>
        <h2>File Title: {title}</h2>
      </div>

      <div
        style={{
          maxWidth: "400px",
          margin: "50px auto",
          fontFamily: "arial",
        }}
      >
        <h2>Add Expense</h2>

        {showSuccess && (
          <div
            style={{ color: "green", marginBottom: "15px", fontWeight: "bold" }}
          >
            Expense added.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            type="month"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            placeholder="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="cost"
            step="0.01"
            placeholder="cost"
            value={formData.cost}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Rent">Rent</option>
            <option value="Car loan">Car loan</option>
            <option value="Car Insurance">Car Insurance</option>
            <option value="Eating out">Eating out</option>
          </select>

          <button
            type="submit"
            disabled={isSaving}
            style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
          >
            {isSaving ? "Saving..." : "Add Expense"}
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
