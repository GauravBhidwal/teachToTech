import React from 'react';
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <>
      <style>
        {`
          .search-form {
            max-width: 36rem;
            width: 100%;
            height: 2.5rem;
            display: flex;
            align-items: center;
            background-color: white;
            border: 1px solid rgba(128, 128, 128, 0.2);
            border-radius: 0.375rem;
            padding: 0 0.5rem;
          }
          .search-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 0.75rem;
          }
          .search-input {
            flex: 1;
            height: 100%;
            outline: none;
            color: rgba(128, 128, 128, 0.8);
            border: none;
            text-align: center;
            background: transparent;
            font-size: 1rem;
            
          }
          .search-input::placeholder {
            text-align: center;
            color: rgba(128, 128, 128, 0.5);
            padding: 4px 4px;
          }
          .search-button {
            background-color: #5fcf80;
            border-radius: 0.375rem;
            color: white;
            padding: 0.75rem 2rem;
            margin-left: 0.5rem;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 80%;
          }
          @media (max-width: 768px) {
            .search-form {
              height: 3rem;
            }
            .search-button {
              padding: 0.5rem 1.5rem;
            }
          }
        `}
      </style>
      <form className='search-form'>
        <FaSearch className='search-icon'/>
        <input type='text' placeholder='Search here' className='search-input'/>
        <button type='submit' className='search-button'>Submit</button>
      </form>
    </>
  );
};

export default Searchbar;
