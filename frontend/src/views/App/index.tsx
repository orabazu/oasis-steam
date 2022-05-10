import { Result } from 'antd';
import { Footer } from 'components/Footer';
import Header from 'components/Header';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Advertisement from 'views/Advertisement';
import Dashboard from 'views/Dashboard';
import Governance from 'views/Governance';

import { AccountContextProvider } from '../../contexts/accountContext';
import Gamer from '../Gamer';

function App() {
  return (
    <div className="App">
      <AccountContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<Dashboard />} />
              <Route path="gamer" element={<Gamer />} />
              <Route path="advertiser" element={<Advertisement />} />
              <Route path="governance" element={<Governance />} />
            </Route>
            <Route
              path="*"
              element={
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                />
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AccountContextProvider>
    </div>
  );
}

export default App;
