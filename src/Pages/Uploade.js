import React, { useState } from 'react';
import axios from 'axios';
import Button from "../Components/Button";
import Card from "../Components/Card";
import Input from "../Components/Input";
import CardContent from "../Components/CardContent";

export default function UploadExcel() {
    const [file, setFile] = useState(null);
    const [tableName, setTableName] = useState("");
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => setFile(e.target.files[0]);
    const handleTableNameChange = (e) => setTableName(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !tableName) {
            setMessage("Please provide both a file and table name.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("table_name", tableName);

        try {
            const response = await axios.post("http://localhost:5000/api/upload", formData);
            setMessage(response.data.success || response.data.error);
        } catch (error) {
            setMessage(`Error: ${error.response?.data.error || error.message}`);
        }
    };

    return (
        <Card className="p-4 max-w-md mx-auto mt-10">
            <CardContent>
                <h1 className="text-xl font-bold mb-4">Upload Excel File</h1>
                <form onSubmit={handleSubmit}>
                    <Input type="file" accept=".xlsx" onChange={handleFileChange} className="mb-2" />
                    <Input 
                        type="text" 
                        placeholder="Enter table name" 
                        value={tableName} 
                        onChange={handleTableNameChange} 
                        className="mb-2"
                    />
                    <Button type="submit">Upload</Button>
                </form>
                {message && <p className="mt-4 text-center">{message}</p>}
            </CardContent>
        </Card>
    );
}
