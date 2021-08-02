import React, { useState, useEffect } from 'react';
import { Header, CommentBox, ErrorModal } from '../components';

function Home() {
  return (
    <main>
      {/* <ErrorModal /> */}
      <Header />
      <CommentBox />
    </main>
  );
}

export default Home;
