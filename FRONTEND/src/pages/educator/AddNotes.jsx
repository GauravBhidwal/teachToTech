import React, { useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "../../assets/css/adminCSS/AddNotes.css";

const AddNotes = () => {
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [quillEditor, setQuillEditor] = useState(null);

  const userId = "user123"; // Replace with dynamic user ID if needed
  

  useEffect(() => {
    const editor = new Quill("#editor-container", { theme: "snow" });
    setQuillEditor(editor);
    fetchTopics();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/category/getallcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCreateTopic = async () => {
    if (!selectedCategory || !newTopicName) {
      alert("Please select a category and enter a topic name.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/topic/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId: selectedCategory,
          name: newTopicName,
        }),
      });

      const data = await response.json();
      alert(`Topic "${data.name}" created successfully!`);
      setNewTopicName("");
      setSelectedCategory("");
      setShowCreateForm(false);
      fetchTopics(); // Refresh topic list
    } catch (error) {
      console.error("Error creating topic:", error);
      alert("Failed to create topic");
    }
  };

  const handleSubmitNotes = async () => {
    if (!selectedTopic) {
      alert("Please select a topic.");
      return;
    }

    const content = quillEditor.root.innerHTML;

    if (!content || content.trim() === "<p><br></p>") {
      alert("Please write some content before submitting.");
      return;
    }

    const payload = {
      notesList: [
        {
          topic: selectedTopic,
          content,
          userId,
        },
      ],
      userCredentials: {
        userId,
      },
    };

    try {
      const response = await fetch("http://localhost:8080/notes/createNotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.status === "SUCCESS") {
        alert("Notes added successfully!");
        quillEditor.setContents([]); // Clear editor
        setSelectedTopic("");
      } else {
        alert("Failed to add notes");
      }
    } catch (error) {
      console.error("Error submitting notes:", error);
      alert("Error submitting notes.");
    }
  };

  const handleBack = () => {
    window.history.back();
  };
  const handleCategoryChange = async (e) => {
    const value = e.target.value;
    if (value === "add-category") {
      const categoryName = prompt("Enter new category name:");
      if (categoryName && categoryName.trim() !== "") {
        try {
          const response = await fetch("http://localhost:8080/category/addcategory", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: categoryName }),
          });
  
          const data = await response.json();
          alert(`Category "${data.title}" created successfully!`);
          await fetchCategories();
          setSelectedCategory(data.id); // set newly created category as selected
        } catch (error) {
          console.error("Error creating category:", error);
          alert("Failed to create category.");
        }
      }
    } else {
      setSelectedCategory(value);
    }
  };
  

  return (
    <>
      <button type="button" className="back-button" onClick={handleBack}>
        ← Back
      </button>
      <h1 className="add-notes">Add Notes</h1>
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

        <div className="create-topic-section">
          <button
            type="button"
            className="create-topic-button"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            + Create Topic
          </button>

          {showCreateForm && (
            <div className="create-topic-form">
              <select
  className="category-dropdown"
  value={selectedCategory}
  onChange={handleCategoryChange}
>
  <option value="" disabled>Select Category</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.title}
    </option>
  ))}
  <option value="add-category">+ Create New Category</option>
</select>


              <input
                type="text"
                className="new-topic-input"
                placeholder="Enter topic name"
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
              />

              <button type="button" onClick={handleCreateTopic}>
                Submit Topic
              </button>
            </div>
          )}
        </div>

        <div id="editor-container" className="text-editor"></div>

        <button type="button" className="submit-notes-button" onClick={handleSubmitNotes}>
          Submit Notes
        </button>
      </div>
    </>
  );
};

export default AddNotes;
