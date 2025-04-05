import React, { useState } from "react";
import { toast } from "react-toastify";

const EmployeeForm = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    dob: "",
    phone: "",
  });

  const [customFields, setCustomFields] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  // Handle custom field change
  const handleCustomChange = (index, e) => {
    let newFields = [...customFields];
    newFields[index].value = e.target.value;
    setCustomFields(newFields);
  };

  // Add a new custom field
  const addField = () => {
    setCustomFields([...customFields, { name: "", value: "" }]);
  };

  // Handle custom field name change
  const handleFieldNameChange = (index, e) => {
    let newFields = [...customFields];
    newFields[index].name = e.target.value;
    setCustomFields(newFields);
  };

  // Submit data to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = { ...employeeData, customFields };

    const response = await fetch("http://localhost:5000/save-employee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Employee data saved successfully! 🎉");
      setEmployeeData({ name: "", dob: "", phone: "",email:"", skills: "", doj: "", salary: "", feedback: "" });
      setCustomFields([]);
    } else {
      toast.error("Failed to save employee data! ❌");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">Employee Form</h3>
      <form onSubmit={handleSubmit}>
        {/* Default Fields */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" placeholder="Full name" className="form-control" value={employeeData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input type="date" name="dob"placeholder="Enter the date of birth" className="form-control" value={employeeData.dob} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input type="tel" name="phone"placeholder="Enter the Phone Number" className="form-control" value={employeeData.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email"placeholder="Enter the Email" className="form-control" value={employeeData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Skills</label>
          <input type="text" name="skills"placeholder="Enter the Skills" className="form-control" value={employeeData.skills} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Joining</label>
          <input type="date" name="doj"placeholder="Enter the Date of Joining" className="form-control" value={employeeData.doj} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input type="number" name="salary"placeholder="Enter the Salary" className="form-control" value={employeeData.salary} onChange={handleChange} required />
        </div>
        <h3 className="text-center">Feedback</h3>
        <div className="mb-3">
          <label className="form-label">Behavior</label>
          <input type="number" name="feedback"placeholder="Give Rating out of 5 " className="form-control" value={employeeData.behavior} onChange={handleChange} required />
        </div>

        {/* Dynamic Fields */}
        {customFields.map((field, index) => (
          <div className="mb-3" key={index}>
            <input type="text" className="form-control mb-2" placeholder="Field Name" value={field.name} onChange={(e) => handleFieldNameChange(index, e)} required />
            <input type="text" className="form-control" placeholder="Field Value" value={field.value} onChange={(e) => handleCustomChange(index, e)} required />
          </div>
        ))}

        {/* Add Custom Field Button */}
        <button type="button" className="btn btn-secondary mb-3" onClick={addField}>+ Add Field</button>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">Save Employee</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
