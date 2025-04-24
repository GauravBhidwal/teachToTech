import React from 'react';

const EditDeleteButtons = () => {
  const styles = {
    buttonContainer: {
      display: 'flex',
      gap: '10px',
      marginLeft: '500px',
    },
    editButton: {
      backgroundColor: '#ffa500', // yellowish-orange
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    deleteButton: {
      backgroundColor: '#dc3545', 
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.buttonContainer}>
      <button style={styles.editButton}>Edit</button>
      <button style={styles.deleteButton}>Delete</button>
    </div>
  );
};

export default EditDeleteButtons;
