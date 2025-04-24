import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/students/Header';
import Footer from '../../components/students/Footer';
import '../../assets/css/Notes.css';
import Sidebar from '../../components/students/Sidebar';
import axios from 'axios';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const Notes = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [topicName, setTopicName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [topicId, setTopicId] = useState(null);
  const [assignmentContent, setAssignmentContent] = useState("");
  const [assignmentId, setAssignmentId] = useState(null);
  const editorRef = useRef(null);
  const quillRef = useRef(null);



  //for article
  const [editModeAssignment, setEditModeAssignment] = useState(false);
  const [editedContentAssignment, setEditedContentAssignment] = useState('');
  const editorRefAssignment = useRef(null);
  const quillRefAssignment = useRef(null);


  const fetchNoteByTopic = async (topicId, topicTitle) => {
    setLoading(true);
    setTopicName(topicTitle);
    setTopicId(topicId);
    try {
      const response = await axios.post("http://localhost:8080/notes/getNotesByTopic", {
        topicId: topicId,
      });

      if (response.data && response.data.noteId) {
        setNote(response.data);
      } else {
        console.error("Note not found for this topic.");
        setNote(null);
      }
    } catch (err) {
      console.error("Error fetching note:", err);
      setNote(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!note?.noteId) {
      alert("No note selected to delete.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      const response = await axios.post("http://localhost:8080/notes/deletenotes", {
        noteId: note.noteId,
      });

      if (response.data.status === "SUCCESS") {
        alert("Note deleted successfully.");
        setNote(null);
        setTopicName('');
      } else {
        alert("Failed to delete the note.");
      }
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("An error occurred while deleting the note.");
    }
  };

  const handleUpdate = () => {
    if (!note) return;
    setEditedContent(note.content);
    setEditMode(true);
  };

  const handleSave = async () => {
    if (!note || !topicId) {
      alert("Missing required information.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/notes/updatenotes", {
        noteId: note.noteId,
        topic: topicId, // ✅ using globally stored topicId
        content: editedContent,
        userId: "user123",
      });

      if (response.data.status === "SUCCESS") {
        alert("Note updated successfully.");
        setNote(response.data.notesList[0]);
        setEditMode(false);
        window.location.reload();
      } else {
        alert("Failed to update the note.");
      }
    } catch (error) {
      console.error("Error updating note:", error.response?.data || error.message);
      alert("An error occurred while updating the note.");
    }
  };

  useEffect(() => {
    if (editMode && editorRef.current && !quillRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
          ],
        },
      });

      quill.root.innerHTML = editedContent;

      quill.on('text-change', () => {
        setEditedContent(quill.root.innerHTML);
      });

      quillRef.current = quill;
    }

    return () => {
      if (!editMode && quillRef.current) {
        quillRef.current = null;
      }
    };
  }, [editMode]);

  const fetchAssignmentByTopic = async () => {
    try {
      const response = await fetch("http://localhost:8080/assignment/getByTopic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topicId: topicId }), // using your variable
      });

      const result = await response.json();

      if (result.status === "SUCCESS" && result.assignmentList.length > 0) {
        const latestAssignment = result.assignmentList[0];
        setAssignmentContent(latestAssignment.qa);
        setAssignmentId(latestAssignment.assignmentId);
        
      } else {
        setAssignmentContent("<p>No assignment available for this topic.</p>");
       
      }
    } catch (error) {
      console.error("Error fetching assignment:", error);
      setAssignmentContent("<p>Error loading assignment.</p>");
      
    }
  };
  useEffect(() => {
    if (topicId) {
      fetchAssignmentByTopic();
    }
  }, [topicId]);
  
  
  const handleDeleteAssignment = async () => {
    if (!assignmentId || !topicId) {
      alert("Missing required information.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8080/assignment/delete", {
        assignmentId: assignmentId, 
       
      });
  
      if (response.data.status === "SUCCESS") {
        alert("Assignment deleted successfully.");
        setAssignmentContent(null); 
        setAssignmentId(null);
      } else {
        alert("Failed to delete the assignment.");
      }
    } catch (error) {
      console.error("Error deleting assignment:", error.response?.data || error.message);
      alert("An error occurred while deleting the assignment.");
    }
  };
  const handleUpdateAssignment = () => {
    if (!assignmentContent) return;
    setEditedContentAssignment(assignmentContent);
    console.log(assignmentContent)
    setEditModeAssignment(true);
  };
  const handleSaveAssignment = async () => {
    if (!assignmentContent || !topicId || !assignmentId) {
      alert("Missing required information.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/assignment/update", {
        assignmentId: assignmentId,
        topicId: topicId, 
        qa: editedContentAssignment,
        userId: "123",
      });
      console.log(response.data)

      if (response.data.status === "SUCCESS") {
        alert("Assignment updated successfully.");
        setAssignmentContent(response.data.assignmentList[0].qa);
        setEditModeAssignment(false);
        
      } else {
        alert("Failed to update the assignment.");
      }
    } catch (error) {
      console.error("Error updating assignment:", error.response?.data || error.message);
      alert("An error occurred while updating the assignment.");
    }
  }; 
  useEffect(() => {
    if (editModeAssignment && editorRefAssignment.current && !quillRefAssignment.current) {
      const quillAssignment = new Quill(editorRefAssignment.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
          ],
        },
      });

      quillAssignment.root.innerHTML = editedContentAssignment;

      quillAssignment.on('text-change', () => {
        setEditedContentAssignment(quillAssignment.root.innerHTML);
      });

      quillRefAssignment.current = quillAssignment;
    }

    return () => {
      if (!editModeAssignment && quillRefAssignment.current) {
        quillRefAssignment.current = null;
      }
    };
  }, [editModeAssignment]); 

  return (
    <>
      <Header />
      <div className="notes-container">
        <Sidebar onNoteClick={fetchNoteByTopic} />
        <div className="notes-content">
          <div className="notes-content-heading">
            {loading ? 'Loading...' : note ? topicName : 'Select a Topic'}
          </div>

          <div className="notes-content-description">
            {note ? (
              editMode ? (
                <div ref={editorRef} style={{ minHeight: '300px' }} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: note.content }} />
              )
            ) : (
              !loading && <p>Select a topic first to view the notes or notes maybe are in progress.</p>
            )}
          </div>

          {note && (
            <div className="edit-delete-buttons">
              {!editMode ? (
                <>
                  <button className="edit-button" onClick={handleUpdate}>Edit</button>
                  <button className="delete-button" onClick={handleDelete}>Delete</button>
                </>
              ) : (
                <>
                  <button className="save-button" onClick={handleSave}>Save</button>
                  <button className="delete-button" onClick={() => setEditMode(false)}>Cancel</button>
                </>
              )}
            </div>
          )}

          <div className="assignment-content">
            <h1>Assignment</h1>
            <div dangerouslySetInnerHTML={{ __html: assignmentContent }} className='assignment-description' />
            <div className="assignment-content-description">
              {assignmentContent ? (
                  editModeAssignment ? (
                    <div ref={editorRefAssignment} style={{ minHeight: '300px' }} />
                  ):(
                    <div dangerouslySetInnerHTML={{ __html: assignmentContent.qa }} />
                  )       
              ) : (
                !loading && <p>Select a topic first to view the assignment or assignment may be in progress</p>
              )}
            </div>

            {assignmentContent && (
              <div className="edit-delete-buttons">
                {!editModeAssignment ? (
          <>
            <button className="edit-button" onClick={handleUpdateAssignment}>Edit</button>
            <button className="delete-button" onClick={handleDeleteAssignment}>Delete</button>
          </>
        ) : (
          <>
            <button className="save-button" onClick={handleSaveAssignment}>Save</button>
            <button className="delete-button" onClick={() => setEditModeAssignment(false)}>Cancel</button>
          </>
        )}
              </div>
            )}

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notes;
