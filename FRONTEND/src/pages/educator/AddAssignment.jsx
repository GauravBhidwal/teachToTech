import React, { useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "../../assets/css/adminCSS/AddNotes.css";

const AddAssignment= () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [editor, setQuillEditor] = useState(null);

  

  useEffect(() => {
    const quillinstance = new Quill("#editor-container", { theme: "snow" });
    setQuillEditor(quillinstance);
    fetchTopics();
    
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await fetch("http://localhost:8080/topic/getAll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTopics(data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const handleBack = () => {
    window.history.back();
  };
  const handleSubmit = async () => {
    if (!editor || !selectedTopic) {
      alert("Please select a topic and write the assignment content.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/assignment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topicId: selectedTopic,
          qa: editor.root.innerHTML,
          userId: "123", // constant
        }),
      });
  
      const result = await response.json();
  
      if (result.status === "SUCCESS") {
        alert("Assignment created successfully!");
        window.location.reload();
      } else {
        alert("May be there is already an existing assignment for this topic. Please choose the new topic");
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
      alert("Failed to create assignment. Please check your connection.");
    }
  };
  

  return (
    <>
      <button type="button" className="back-button" onClick={handleBack}>
        ← Back
      </button>
      <h1 className="add-notes">Add Assignment</h1>
      <div className="editor-container">
        <select
          className="title-input"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="" disabled>Select a Topic</option>
          {topics.map((topic) => (
            <option key={topic.topicId} value={topic.topicId}>
              {topic.name}
            </option>
          ))}
        </select>

        

        <div id="editor-container" className="text-editor"></div>

        <button type="button" className="submit-notes-button" onClick={handleSubmit}>
          Submit Assignment
        </button>
      </div>
    </>
  );
};

export default AddAssignment;
