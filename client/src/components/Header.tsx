import React, { Component } from 'react';
import { useFetchUserQuery } from '../store';

export default function Header() {
  const { data, error, isLoading } = useFetchUserQuery();
  
  function renderContent() {    
    switch (data) {
      case null: 
        return 'Still deciding';
      case false:
        return 'im loggedout';
      default:
        return 'im logged in';
    }
  }

  return(
      <div>
        <div className="nav-wrapper">
          <a className="left brand-logo">
            Macros
          </a>
          <ul className="right">
            <li>
              {renderContent()}
            </li>
          </ul>
        </div>
      </div>
    );
}