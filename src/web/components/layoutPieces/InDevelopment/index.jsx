import React from 'react';
import {  textAreaInDevelopment } from './styles.module.css'

export default function InDevelopment() {
  return (
    <div className={textAreaInDevelopment}>
      <h2>Em desenvolvimento: </h2>
      <p>
        <mark>Para mais informações, consulte o manual de uso no menu lateral.</mark>
      </p>
    </div>
  );
}
