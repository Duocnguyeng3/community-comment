import React from 'react';
import { Header, CommentBox, Pagination } from '../components';

function Home() {
  return (
    <main>
      {/* <ErrorModal /> */}
      <Header />
      <CommentBox />
      <Pagination />
    </main>
  );
}

export default Home;
